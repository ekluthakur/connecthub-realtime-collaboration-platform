import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";
import socket from "../../services/socket/socket";
import { useAuth } from "../../context/AuthContext";
import {startScreenShare, stopScreenShare,} from "../../services/webrtc/screenShare";
import { getLocalStream } from "../../services/webrtc/media";
import { createPeerConnection } from "../../services/webrtc/peer";
import { createOffer,createAnswer,receiveAnswer,addIceCandidate,sendIceCandidate, } from "../../services/webrtc/signaling";
import ChatPanel from "../../components/chat/ChatPanel";
import Whiteboard from "../../components/whiteboard/Whiteboard";
import FileSharing from "../../components/files/FileSharing";
import VideoGrid from "../../components/meeting/VideoGrid";

export default function MeetingRoom() {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const peerRef = useRef(null);
  const targetSocketRef = useRef(null);

  const [localStream, setLocalStream] = useState(null);

  const [participants, setParticipants] = useState([]);

  const [connectionStatus, setConnectionStatus] =
    useState("Connecting...");

  const [micEnabled, setMicEnabled] = useState(true);

  const [cameraEnabled, setCameraEnabled] = useState(true);

  const [isSharingScreen, setIsSharingScreen] = useState(false);

  useEffect(() => {
    if (!user) return;

    initializeMeeting();

    return () => {
      cleanupMeeting();
    };
  }, []);

  async function initializeMeeting() {
    try {
      const stream = await getLocalStream();

      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      socket.connect();

      socket.on("connect", () => {
        setConnectionStatus("Connected");

        socket.emit("join-room", {
          meetingId,
          user,
        });
      });

      socket.on("participants-update", (users) => {
        setParticipants(users);
      });

      socket.on("existing-participants", async (users) => {
        if (users.length === 0) return;

        const target = users[0];

        targetSocketRef.current = target.socketId;

        if (peerRef.current) return;

        peerRef.current = createPeerConnection(
          stream,
          (remoteStream) => {
           if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            }
          },
          (candidate) => {
            sendIceCandidate(target.socketId, candidate);
          }
        );

        await createOffer(peerRef.current, target.socketId);
      });

      socket.on(
        "offer",
        async ({ offer, caller }) => {
          targetSocketRef.current = caller;

          if (!peerRef.current) {
            peerRef.current =
              createPeerConnection(
                stream,

                (remoteStream) => {
                  if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject =
                      remoteStream;
                  }
                },

                (candidate) => {
                  sendIceCandidate(
                    caller,
                    candidate
                  );
                }
              );
          }

          await createAnswer(
            peerRef.current,
            offer,
            caller
          );
        }
      );

      socket.on(
        "answer",
        async ({ answer }) => {
          await receiveAnswer(
            peerRef.current,
            answer
          );
        }
      );

      socket.on(
        "ice-candidate",
        async ({ candidate }) => {
          await addIceCandidate(
            peerRef.current,
            candidate
          );
        }
      );
    } catch (err) {
      console.error(err);

      alert(
        "Camera or microphone permission denied."
      );
    }
  }

  function cleanupMeeting() {
    socket.off();

    socket.disconnect();

    if (peerRef.current) {
      peerRef.current.close();
    }

    if (localStream) {
      localStream
        .getTracks()
        .forEach((track) => track.stop());
    }
  }

  function toggleMic() {
    if (!localStream) return;

    localStream
      .getAudioTracks()
      .forEach(
        (track) =>
          (track.enabled = !track.enabled)
      );

    setMicEnabled((prev) => !prev);
  }

  function toggleCamera() {
    if (!localStream) return;

    localStream
      .getVideoTracks()
      .forEach(
        (track) =>
          (track.enabled = !track.enabled)
      );

    setCameraEnabled((prev) => !prev);
  }

  async function handleScreenShare() {
  if (!peerRef.current) {
    alert("Another participant is required.");

    return;
  }

  if (!isSharingScreen) {
    const screenStream = await startScreenShare();

    if (!screenStream) return;

    const screenTrack = screenStream.getVideoTracks()[0];

    const sender = peerRef.current
      .getSenders()
      .find((sender) => sender.track?.kind === "video");

    if (sender) {
      sender.replaceTrack(screenTrack);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = screenStream;
    }

    screenTrack.onended = async () => {
      const cameraTrack =
        localStream.getVideoTracks()[0];

      sender.replaceTrack(cameraTrack);

      localVideoRef.current.srcObject =
        localStream;

      stopScreenShare();

      setIsSharingScreen(false);
    };

    setIsSharingScreen(true);
  } else {
    const cameraTrack =
      localStream.getVideoTracks()[0];

    const sender = peerRef.current
      .getSenders()
      .find((sender) => sender.track?.kind === "video");

    sender.replaceTrack(cameraTrack);

    localVideoRef.current.srcObject =
      localStream;

    stopScreenShare();

    setIsSharingScreen(false);
  }
}

  function leaveMeeting() {
    cleanupMeeting();

    navigate("/dashboard");
  }

  return (
    <>
  <Navbar />

  <main className="max-w-7xl mx-auto p-6">

    {/* Header */}

    <div className="bg-white rounded-2xl shadow-lg border p-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            ConnectHub Meeting
          </h1>

          <p className="mt-2 text-slate-500">
            Meeting ID
          </p>

          <div className="mt-2 rounded-lg bg-slate-100 p-3 font-mono break-all">
            {meetingId}
          </div>

        </div>

        <div>

          <span className="rounded-full bg-green-100 px-5 py-2 text-green-700 font-semibold">
            🟢 {connectionStatus}
          </span>

        </div>

      </div>

    </div>

    {/* Participants */}

    <div className="mt-8 bg-white rounded-2xl shadow-lg border p-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Participants
        </h2>

        <span className="bg-blue-600 text-white rounded-full px-4 py-2">
          {participants.length}
        </span>

      </div>

      <div className="mt-5 space-y-3">

        {participants.length === 0 ? (

          <p className="text-slate-500">
            Waiting for participants...
          </p>

        ) : (

          participants.map((participant) => (

            <div
              key={participant.socketId}
              className="rounded-lg bg-slate-100 p-3 flex justify-between items-center"
            >

              <div>

                <p className="font-semibold">
                  {participant.username}
                </p>

                <p className="text-xs text-slate-500">
                  {participant.email}
                </p>

              </div>

              <div className="text-green-600 font-semibold">
                Online
              </div>

            </div>

          ))

        )}

      </div>

    </div>

<VideoGrid
    localVideoRef={localVideoRef}
    remoteVideoRef={remoteVideoRef}
    participants={participants}
    connectionStatus={connectionStatus}
/>


    {/* Controls */}

    <div className="sticky bottom-5 mt-8">

      <div className="bg-white rounded-2xl shadow-2xl border p-5">

        <div className="flex flex-wrap justify-center gap-4">

          <button
            onClick={toggleMic}
            className={`px-5 py-3 rounded-xl text-white transition ${
              micEnabled
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {micEnabled ? "🎤 Mic On" : "🎤 Mic Off"}
          </button>

          <button
            onClick={toggleCamera}
            className={`px-5 py-3 rounded-xl text-white transition ${
              cameraEnabled
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {cameraEnabled ? "📷 Camera On" : "📷 Camera Off"}
          </button>

          <button
    onClick={handleScreenShare}
    className={`px-5 py-3 rounded-xl text-white ${
        isSharingScreen
            ? "bg-green-600"
            : "bg-slate-800"
    }`}
>
    {isSharingScreen
        ? "🛑 Stop Share"
        : "🖥️ Share Screen"}
</button>

          <Whiteboard
            meetingId={meetingId}
          />

          <button className="px-5 py-3 rounded-xl bg-slate-800 text-white">
            💬 Chat
          </button>

          <FileSharing 
            meetingId={meetingId}
          />

          <button
            onClick={leaveMeeting}
            className="px-5 py-3 rounded-xl bg-red-600 text-white"
          >
            Leave Meeting
          </button>

        </div>

      </div>

    </div>

  </main>

</>
);
}