import React, { useEffect, useState } from 'react';
import { Room } from './RoomMenu';

function Chat(room: Room) {
  console.log(window.ipcRenderer);

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    window.Main.removeLoading();
    setMessages(['Hello', 'World']);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="h-full w-full">
        {messages.map((message, index) => (
          <div key={index} className="bg-[#292929] p-4 m-4 rounded-lg w-fit">
            {message}
          </div>
        ))}
      </div>
      <div className="w-full flex p-10 gap-5 h-35">
        <input className="rounded-lg p-2 mb-4 w-full h-full text-black"></input>
        <button
          onClick={() => {
            const input = document.querySelector('input');
            if (input && input.value) {
              setMessages([...messages, input.value]);
              input.value = '';
            }
          }}
          className="bg-[#fb7e14] text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
