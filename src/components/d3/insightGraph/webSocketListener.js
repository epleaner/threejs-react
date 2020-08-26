import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SOCKET_STATUS = {
  '0': 'Connecting',
  '1': 'Open',
  '2': 'Closing',
  '3': 'Closed',
};

const WebSocketListener = ({ onMessage }) => {
  const [socket, setSocket] = useState(null);
  const [socketState, setSocketState] = useState('disconnected');

  useEffect(() => {
    // Create WebSocket connection.
    const socket = new WebSocket('ws://localhost:5678');

    // Connection opened
    socket.onopen = function (event) {
      socket.send('Hello Server!');
      setSocketState('connected');
    };

    // Listen for messages
    socket.onmessage = function (event) {
      console.log('Message from server ', event.data);
      onMessage(JSON.parse(event.data));
    };

    // Connection opened
    socket.onclose = function (event) {
      console.log('Connection closed');
      setSocketState('disconnected');
    };

    // Listen for messages
    socket.onerror = function (error) {
      console.log('Error', error);
      setSocketState('error');
    };

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      Socket:{' '}
      <span
        className={
          socketState === 'connected' ? 'text-green-400' : 'text-red-400'
        }>
        {SOCKET_STATUS[socket.readyState]}
      </span>
    </div>
  );
};

WebSocketListener.propTypes = {
  onMessage: PropTypes.func.isRequired,
};

export default WebSocketListener;
