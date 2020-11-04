#!/usr/bin/env python

import asyncio
import websockets

from concurrent.futures import ThreadPoolExecutor
_executor = ThreadPoolExecutor(1)

from speech import listen_for_word

async def listen(websocket, path):
    while True:
        try:
            message = await loop.run_in_executor(_executor, listen_for_word)
            print('sending message across', message)
            await websocket.send(message)
        except websockets.exceptions.ConnectionClosedOK:
            await websocket.close();


start_server = websockets.serve(listen, "127.0.0.1", 5678)

loop = asyncio.get_event_loop()

loop.run_until_complete(start_server)
loop.run_forever()
