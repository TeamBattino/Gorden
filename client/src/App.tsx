import React, { useEffect, useState } from 'react';

import Chat from './Chat';
import RoomMenu, { Room } from './RoomMenu';
import { BrowserWindow } from 'electron';
import Layout from './Layout';

function App() {
  console.log(window.ipcRenderer);

  const [room, setRoom] = useState<Room>({ id: '', name: '' });

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  /* colors
  #221d23
  #4f3824
  #d1603d
  #ddb967
  #d0e37f
  https://coolors.co/221d23-4f3824-d1603d-ddb967-d0e37f
  */

  return <div className="bg-[#000000]">{room.id ? <Layout {...room} /> : <RoomMenu setRoom={setRoom} />}</div>;
}

export default App;
