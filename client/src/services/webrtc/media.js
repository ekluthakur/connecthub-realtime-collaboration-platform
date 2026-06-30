// client/src/services/webrtc/media.js

export async function getLocalStream() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 1280,
        height: 720,
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    return stream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
    throw error;
  }
}