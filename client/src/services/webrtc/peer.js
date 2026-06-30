const configuration = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

export function createPeerConnection(
  localStream,
  onTrack,
  onIceCandidate
) {
  const peer = new RTCPeerConnection(configuration);

  // Add local tracks
  localStream.getTracks().forEach((track) => {
    peer.addTrack(track, localStream);
  });

  // Remote stream
  peer.ontrack = (event) => {
    if (event.streams && event.streams[0]) {
      onTrack(event.streams[0]);
    }
  };

  // ICE Candidate
  peer.onicecandidate = (event) => {
    if (event.candidate) {
      onIceCandidate(event.candidate);
    }
  };

  return peer;
}