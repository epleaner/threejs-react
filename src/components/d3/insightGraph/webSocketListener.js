import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SOCKET_STATUS = {
  '0': 'Attempting to connect...',
  '1': 'Open',
  '2': 'Closing',
  '3': 'Closed',
};

const WebSocketListener = ({ onMessage }) => {
  const [socket, setSocket] = useState(null);
  const [socketState, setSocketState] = useState('disconnected');

  useEffect(() => {
    const connectToWebSocket = () => {
      // Create WebSocket connection.
      const socket = new WebSocket('ws://localhost:5678');

      socket.onopen = (event) => {
        setSocketState('connected');
      };

      socket.onmessage = (event) => {
        console.log('Message from server ', event.data);
        onMessage(JSON.parse(event.data));
      };

      socket.onclose = (event) => {
        console.log('Connection closed');
        setSocketState('disconnected');
        setTimeout(() => connectToWebSocket(), 1000);
      };

      socket.onerror = (error) => {
        console.log('Error', error);
        setSocketState('error');
      };

      setSocket(socket);
    };

    connectToWebSocket();

    return () => socket && socket.close();
  }, []);

  return (
    <div className='absolute right-0 m-2 text-gray-200'>
      Socket:{' '}
      <span
        className={
          socketState === 'connected' ? 'text-green-400' : 'text-red-400'
        }>
        {socket && SOCKET_STATUS[socket.readyState]}
      </span>
    </div>
  );
};

WebSocketListener.propTypes = {
  onMessage: PropTypes.func.isRequired,
};

export default WebSocketListener;
