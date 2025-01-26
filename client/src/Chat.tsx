import React, { useEffect, useState } from 'react';
import { Room } from './RoomMenu';
import { User } from './UserMenu';
import { getRequest, postRequest } from './Api';

interface ChatMenuProps {
  room: Room;
  user: User;
}

interface Message {
  roomId: string;
  authorId: number;
  message: string;
}

function Chat({ room, user }: ChatMenuProps) {
  console.log(window.ipcRenderer);

  const [messages, setMessages] = useState<Message[]>([]);

  const [userMap, setUserMap] = useState<{ [key: number]: String }>({});

  const getRoomMessages = async (roomId: string) => {
    const response = await getRequest<Message[]>(`/roomMessages?roomId=${roomId}`);
    console.log(response);

    if (response.status === 200) {
      setMessages(response.data);
      return response.data;
    }
    return [];
  };

  const getRoomUpdates = async (roomId: string) => {
    const lastMessageId = messages[messages.length - 1].authorId;
    const response = await getRequest<Message[]>(`/roomUpdates?roomId=${roomId}&lastMessageId=${lastMessageId}`);
    console.log(response);

    if (response.status === 200) {
      setMessages([...messages, ...response.data]);
      response.data.forEach((message) => {
        getUserName(message.authorId);
      });
    }
  };

  const sendMessage = async (message: Message) => {
    const response = await postRequest<Message>(
      `/message?roomId=${message.roomId}&authorId=${message.authorId}&message=${message.message}`
    );

    if (response.status === 201) {
      setMessages([...messages, message]);
    }
  };

  const getUserName = async (userId: number) => {
    if (!userMap[userId]) {
      console.log('Getting user name:', userId);
      const response = await getRequest<User>(`/user?id=${userId}`);
      console.log(response);

      if (response.status === 200) {
        setUserMap((prevUserMap) => ({ ...prevUserMap, [userId]: response.data.name }));
        return response.data.name;
      }
    }
    return userMap[userId];
  };

  useEffect(() => {
    getRoomMessages(room.id).then((messages) => {
      messages.forEach((message) => {
        getUserName(message.authorId);
      });
    });
    setUserMap((prevUserMap) => ({ ...prevUserMap, [user.id]: 'You' }));
    window.Main.removeLoading();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getRoomUpdates(room.id);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col min-h-screen bg-hollow-black">
      <div className="h-full w-full overflow-y-auto">
        {messages.map((message, index) => (
          <div key={message.authorId} className="bg-hollow-gray p-4 m-4 rounded-lg w-fit">
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
              console.log('Sending message:', input.value);
              console.log('Room:', room.id);
              console.log('User:', user.id);
              sendMessage({ roomId: room.id, authorId: user.id, message: input.value });
              input.value = '';
            }
          }}
          className="bg-hollow-orange text-hollow-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
