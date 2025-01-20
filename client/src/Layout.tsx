import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { Room } from './RoomMenu';

function Layout(room: Room) {
  console.log(window.ipcRenderer);

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    window.Main.removeLoading();
    setMessages(['Hello', 'World']);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-[#151515] w-full h-20 items-center flex justify-between px-4 text-2xl font-bold">
        <div className="text-3xl">{room.name}</div>
        <div>
          <div className="text-sm">Room ID:</div>
          <div className="text-[#fb7e14]">{room.id}</div>
        </div>
      </div>
      <Chat {...room} />
    </div>
  );
}

export default Layout;
