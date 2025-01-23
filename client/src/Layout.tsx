import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { Room } from './RoomMenu';
import { User } from './UserMenu';

interface LayoutMenuProps {
  room: Room;
  user: User;
}

function Layout({ room, user }: LayoutMenuProps) {
  console.log(window.ipcRenderer);

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    window.Main.removeLoading();
    setMessages(['Hello', 'World']);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-[#151515] h-24 w-full items-center flex justify-between px-4 text-2xl font-bold">
        <div className="text-3xl">{room.name}</div>
        <div>
          <div className="text-sm">Room ID:</div>
          <div className="text-[#fb7e14]">{room.id}</div>
        </div>
      </div>
      <Chat room={room} user={user} />
    </div>
  );
}

export default Layout;
