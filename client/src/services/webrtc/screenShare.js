let screenStream = null;

export async function startScreenShare() {
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });

    return screenStream;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function stopScreenShare() {
  if (!screenStream) return;

  screenStream.getTracks().forEach((track) => track.stop());

  screenStream = null;
}

export function getScreenStream() {
  return screenStream;
}