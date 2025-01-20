import React, { useEffect, useState } from 'react';

import Chat from './Chat';
import RoomMenu, { Room } from './RoomMenu';
import { BrowserWindow } from 'electron';
import Layout from './Layout';
import UserMenu, { User } from './UserMenu';

function App() {
  console.log(window.ipcRenderer);

  const [room, setRoom] = useState<Room>({ id: '', name: '' });
  const [user, setUser] = useState<User>({ id: 0, name: '' });

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  if (!room.id) {
    return <RoomMenu setRoom={setRoom} />;
  } else if (!user.id) {
    return <UserMenu setUser={setUser} />;
  } else {
    return <Layout room={room} user={user} />;
  }
}

export default App;
