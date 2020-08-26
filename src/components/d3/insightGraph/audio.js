import { useEffect, useRef } from 'react';

const Audio = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;

    const handleSuccess = function (stream) {
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const processor = context.createScriptProcessor(1024, 1, 1);

      source.connect(processor);
      processor.connect(context.destination);

      processor.onaudioprocess = function (e) {
        // Do something with the data, e.g. convert it to WAV
        console.log(e.inputBuffer);
      };
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }, [playerRef]);

  return (
    <audio ref={playerRef} className='hidden' id='player' controls></audio>
  );
};

export default Audio;
