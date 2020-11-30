import { useEffect, useRef, useState } from 'react';

import jsfeat from 'jsfeat';
import CompatibilityHelper from '@helpers/compatibility';

export default () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [error, setError] = useState();

  useEffect(() => {
    const video = videoRef.current;

    const compatibility = new CompatibilityHelper();

    try {
      let attempts = 0;
      const readyListener = () => findVideoSize();

      const findVideoSize = () => {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          video.removeEventListener('loadeddata', readyListener);
          onDimensionsReady(video.videoWidth, video.videoHeight);
        } else {
          if (attempts < 10) {
            attempts++;
            setTimeout(findVideoSize, 200);
          } else {
            onDimensionsReady(640, 480);
          }
        }
      };

      const onDimensionsReady = function (width, height) {
        setupCanvas(width, height);
        compatibility.requestAnimationFrame(tick);
      };

      video.addEventListener('loadeddata', readyListener);

      compatibility.getUserMedia(
        { video: true },
        function (stream) {
          if (video.srcObject !== undefined) {
            video.srcObject = stream;
          } else {
            try {
              video.src = compatibility.URL.createObjectURL(stream);
            } catch (error) {
              video.src = stream;
            }
          }
          setTimeout(function () {
            video.play();
          }, 500);
        },
        function (error) {
          console.log(error);
          setError(true);
        }
      );
    } catch (error) {
      console.log(error);
      setError(true);
    }

    var gui, options, ctx, canvasWidth, canvasHeight;
    var img_u8;

    var setupOptions = () => ({
      blur_radius: 2,
      low_threshold: 20,
      high_threshold: 50,
    });

    function setupCanvas(videoWidth, videoHeight) {
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(0,255,0)';
      ctx.strokeStyle = 'rgb(0,255,0)';

      img_u8 = new jsfeat.matrix_t(640, 480, jsfeat.U8C1_t);

      options = setupOptions();
    }

    function tick() {
      compatibility.requestAnimationFrame(tick);
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        ctx.drawImage(video, 0, 0, 640, 480);
        var imageData = ctx.getImageData(0, 0, 640, 480);

        jsfeat.imgproc.grayscale(imageData.data, 640, 480, img_u8);

        var r = options.blur_radius | 0;
        var kernel_size = (r + 1) << 1;

        jsfeat.imgproc.gaussian_blur(img_u8, img_u8, kernel_size, 0);

        jsfeat.imgproc.canny(
          img_u8,
          img_u8,
          options.low_threshold | 0,
          options.high_threshold | 0
        );

        // render result back to canvas
        var data_u32 = new Uint32Array(imageData.data.buffer);
        var alpha = 0xff << 24;
        var i = img_u8.cols * img_u8.rows,
          pix = 0;
        while (--i >= 0) {
          pix = img_u8.data[i];
          data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
        }

        ctx.putImageData(imageData, 0, 0);
      }
    }

    return () => {
      video.pause();
      video.src = null;
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        id='webcam'
        width='640'
        height='480'
        style={{ display: 'none' }}></video>
      {!error && (
        <>
          <canvas
            ref={canvasRef}
            id='canvas'
            width='640'
            height='480'
            style={{
              width: '640px',
              height: '480px',
              margin: '10px auto',
            }}
          />
        </>
      )}
      {error && (
        <div
          id='no_rtc'
          className='alert alert-error'
          style={{ display: 'none' }}>
          WebRTC not available.
        </div>
      )}
    </div>
  );
};
