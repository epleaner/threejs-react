import { useEffect, useRef } from 'react';

import jsfeat from 'jsfeat';

export default () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  useEffect(() => {
    const video = videoRef.current;

    var compatibility = (function () {
      var lastTime = 0,
        isLittleEndian = true,
        URL = window.URL || window.webkitURL,
        requestAnimationFrame = function (callback, element) {
          var requestAnimationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };

          return requestAnimationFrame.call(window, callback, element);
        },
        cancelAnimationFrame = function (id) {
          var cancelAnimationFrame =
            window.cancelAnimationFrame ||
            function (id) {
              clearTimeout(id);
            };
          return cancelAnimationFrame.call(window, id);
        },
        getUserMedia = function (options, success, error) {
          var getUserMedia =
            window.navigator.getUserMedia ||
            window.navigator.mozGetUserMedia ||
            window.navigator.webkitGetUserMedia ||
            window.navigator.msGetUserMedia ||
            function (options, success, error) {
              error();
            };

          return getUserMedia.call(window.navigator, options, success, error);
        },
        detectEndian = function () {
          var buf = new ArrayBuffer(8);
          var data = new Uint32Array(buf);
          data[0] = 0xff000000;
          isLittleEndian = true;
          if (buf[0] === 0xff) {
            isLittleEndian = false;
          }
          return isLittleEndian;
        };

      return {
        URL: URL,
        requestAnimationFrame: requestAnimationFrame,
        cancelAnimationFrame: cancelAnimationFrame,
        getUserMedia: getUserMedia,
        detectEndian: detectEndian,
        isLittleEndian: isLittleEndian,
      };
    })();

    try {
      var attempts = 0;
      var readyListener = function (event) {
        findVideoSize();
      };
      var findVideoSize = function () {
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
      var onDimensionsReady = function (width, height) {
        demo_app(width, height);
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
          // $('#canvas').hide();
          // $('#log').hide();
          // $('#no_rtc').html('<h4>WebRTC not available.</h4>');
          // $('#no_rtc').show();
        }
      );
    } catch (error) {
      console.log(error);

      // $('#canvas').hide();
      // $('#log').hide();
      // $('#no_rtc').html('<h4>Something goes wrong...</h4>');
      // $('#no_rtc').show();
    }

    var gui, options, ctx, canvasWidth, canvasHeight;
    var img_u8;

    var demo_opt = function () {
      this.blur_radius = 2;
      this.low_threshold = 20;
      this.high_threshold = 50;
    };

    function demo_app(videoWidth, videoHeight) {
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      ctx = canvas.getContext('2d');

      ctx.fillStyle = 'rgb(0,255,0)';
      ctx.strokeStyle = 'rgb(0,255,0)';

      img_u8 = new jsfeat.matrix_t(640, 480, jsfeat.U8C1_t);

      options = new demo_opt();
      // gui = new dat.GUI();

      // gui.add(options, 'blur_radius', 0, 4).step(1);
      // gui.add(options, 'low_threshold', 1, 127).step(1);
      // gui.add(options, 'high_threshold', 1, 127).step(1);
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

        // $('#log').html(stat.log());
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
      <div>
        <canvas
          ref={canvasRef}
          id='canvas'
          width='640'
          height='480'
          style={{
            width: '640px',
            height: '480px',
            margin: '10px auto',
          }}></canvas>
        <div
          id='no_rtc'
          className='alert alert-error'
          style={{ display: 'none' }}></div>
        <div id='log' className='alert alert-info'></div>
      </div>
    </div>
  );
};
