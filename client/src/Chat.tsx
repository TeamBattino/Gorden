import { getRequest } from './Api';
import { AppContext } from './Context';
import { Message, User } from './types';
import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

function Chat() {
  const { user, room, setRoom } = React.useContext(AppContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [userMap, setUserMap] = useState<{ [key: number]: string }>({});

  const getRoomMessages = async (roomId: string) => {
    const response = await getRequest<Message[]>(`/room-messages?roomId=${roomId}`);
    console.log(response);

    if (response.status === 200) {
      setMessages(response.data);
      return response.data;
    }
    return [];
  };

  const getUserName = async (userId: number) => {
    if (userId === user?.id) {
      userMap[userId] = 'You';
      return 'You';
    } else if (!userMap[userId]) {
      const response = await getRequest<User>(`/users?id=${userId}`);
      console.log(response);

      if (response.status === 200) {
        setUserMap((prevUserMap) => ({ ...prevUserMap, [userId]: response.data.name }));
        return response.data.name;
      }
    }
    return userMap[userId];
  };

  const handleNewMessage = (message: Message) => {
    getUserName(message.authorId);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessageViaWebSocket = (authorId: number, messageText: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('sendMessage', {
      roomId: room?.id,
      authorId: authorId,
      message: messageText
    });
  };

  useEffect(() => {
    if (!room) return;

    const socket = io('http://localhost:5252');
    socketRef.current = socket;

    socket.emit('joinRoom', room.id);
    if (user?.id) {
      sendMessageViaWebSocket(user.id, 'joined the room');
    }

    socket.on('newMessage', handleNewMessage);

    getRoomMessages(room.id).then((messages) => {
      setMessages(messages);
      messages.forEach((message) => getUserName(message.authorId));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [room?.id]);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-hollow-gray absolute h-24 w-full items-center flex justify-between px-4 text-2xl font-bold">
        <div>
          <div className="text-3xl">{room?.name}</div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-sm">ID:</div>
            <div className="text-hollow-orange">{room?.id}</div>
          </div>
        </div>
        <div className="items-center flex flex-col gap-2s">
          <div className="text-xl">{user?.name}</div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-lg">ID:</div>
            <div className="text-hollow-orange">{user?.id}</div>
          </div>
        </div>
        <button
          className="m-4 bg-hollow-orange text-hollow-white p-2 rounded"
          onClick={() => {
            if (socketRef.current) {
              socketRef.current.disconnect();
            }
            setRoom(null);
          }}
        >
          Exit Room
        </button>
      </div>
      <div className="flex flex-col min-h-screen bg-hollow-black">
        <div className="h-full w-full overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`bg-hollow-gray p-4 m-4 rounded-lg w-fit ${message.authorId === user?.id ? 'ml-auto' : ''}`}
            >
              <div className="text-hollow-orange">{userMap[message.authorId] || 'Loading ...'}</div>
              {message.message}
            </div>
          ))}
        </div>
        <div className="w-full flex p-10 gap-5 h-35">
          <input className="rounded-lg p-2 mb-4 w-full h-full text-hollow-black"></input>
          <button
            onClick={() => {
              const input = document.querySelector('input');
              if (input?.value) {
                if (room && user) {
                  sendMessageViaWebSocket(user.id, input.value);
                }
                input.value = '';
              }
            }}
            className="bg-hollow-orange text-hollow-white p-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
