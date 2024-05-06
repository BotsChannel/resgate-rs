function playAudio() {
  const audioCtx = new AudioContext();
  fetch("https://s3.sa-east-1.amazonaws.com/botschannel.public/sounds/notification.mp3", {
    cache: "force-cache",
  })
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
    .then((decodedAudio) => {
      const audioSource = audioCtx.createBufferSource();
      audioSource.buffer = decodedAudio;
      audioSource.connect(audioCtx.destination);
      audioSource.start();
    })
    .catch((error) => console.error("Error loading audio:", error));
}

export default playAudio;
