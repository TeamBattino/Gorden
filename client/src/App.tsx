import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Chat from './Chat';
import RoomMenu, { Room } from './RoomMenu';

function App() {
  console.log(window.ipcRenderer);

  const { t } = useTranslation();

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

  return <div className="bg-[#221d23]">{room.id ? <Chat /> : <RoomMenu setRoom={setRoom} />}</div>;
}

export default App;
