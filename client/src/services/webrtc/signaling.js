import socket from "../socket/socket";

export async function createOffer(peer, targetSocketId) {
  const offer = await peer.createOffer();

  await peer.setLocalDescription(offer);

  socket.emit("offer", {
    target: targetSocketId,
    offer,
  });
}

export async function createAnswer(peer, offer, targetSocketId) {
  await peer.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  const answer = await peer.createAnswer();

  await peer.setLocalDescription(answer);

  socket.emit("answer", {
    target: targetSocketId,
    answer,
  });
}

export async function receiveAnswer(peer, answer) {
  await peer.setRemoteDescription(
    new RTCSessionDescription(answer)
  );
}

export async function addIceCandidate(peer, candidate) {
  try {
    await peer.addIceCandidate(
      new RTCIceCandidate(candidate)
    );
  } catch (err) {
    console.error(err);
  }
}

export function sendIceCandidate(targetSocketId, candidate) {
  socket.emit("ice-candidate", {
    target: targetSocketId,
    candidate,
  });
}