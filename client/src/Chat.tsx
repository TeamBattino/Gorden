import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from './Api';
import { AppContext } from './Context';
import { Message, User } from './types';

function Chat() {
  const { user, room } = React.useContext(AppContext);

  const [messages, setMessages] = useState<Message[]>([]);

  const [userMap, setUserMap] = useState<{ [key: number]: string }>({});

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
    if (room) {
      getRoomMessages(room.id).then((messages) => {
        messages.forEach((message) => {
          getUserName(message.authorId);
        });
      });
    }
    if (user) {
      setUserMap((prevUserMap) => ({ ...prevUserMap, [user.id]: `You (Id: ${user.id})` }));
    }
    window.Main.removeLoading();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (room && messages.length > 0) {
        getRoomUpdates(room.id);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-hollow-gray absolute h-24 w-full items-center flex justify-between px-4 text-2xl font-bold">
        <div className="text-3xl">{room?.name}</div>
        <div>
          <div className="text-sm">Room ID:</div>
          <div className="text-hollow-orange">{room?.id}</div>
        </div>
      </div>
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
                if (room && user) {
                  sendMessage({ roomId: room.id, authorId: user.id, message: input.value });
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
