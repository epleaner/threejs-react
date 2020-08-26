import speech_recognition as sr
from datetime import datetime,timezone
import json

def recognize_from_mic(recognizer, mic):
  if not isinstance(recognizer, sr.Recognizer):
    raise TypeError('`recognizer` must be `Recognizer` instance')

  if not isinstance(mic, sr.Microphone):
    raise TypeError('`mic` must be `Microphone` instance')

  response = {
    "success": True,
    "error": None,
    "transcription": None,
    "timestamp": None
  }

  with mic as source:
    print('adjusting mic...')
    recognizer.adjust_for_ambient_noise(source)

    print('listening...')
    audio = recognizer.listen(source)

    response["timestamp"] = datetime.now(timezone.utc).isoformat()

    try:
      print('processing what i heard...')

      response['transcription'] = recognizer.recognize_google(audio)
    
    except sr.RequestError:
      # API was unreachable or unresponsive
      response["success"] = False
      response["error"] = "API unavailable"

    except sr.UnknownValueError:  
      # speech was unintelligible
      response["error"] = "unrecognized"

    return response

def listen_for_word():
    r = sr.Recognizer()
    mic = sr.Microphone()

    response = recognize_from_mic(r, mic)

    if response['success']:
      print('this is what i heard:\n{}'.format(response['transcription']))
    else:
      print('sorry, {}'.format(response['error']))

    return json.dumps(response)