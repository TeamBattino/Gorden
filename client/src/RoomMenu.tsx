import { create } from 'domain';
import { get } from 'http';
import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from './Api';

interface RoomMenuProps {
  setRoom: React.Dispatch<React.SetStateAction<Room>>;
}

export interface Room {
  id: string;
  name: string;
}

function RoomMenu({ setRoom }: RoomMenuProps) {
  console.log(window.ipcRenderer);

  const getRoom = async (roomId: string) => {
    const response = await getRequest<Room>(`/rooms/${roomId}`);

    if (response.status === 200) {
      setRoom(response.data);
    }
  };

  const createRoom = async () => {
    const response = await postRequest<Room>('/rooms');

    if (response.status === 200) {
      setRoom(response.data);
    }
  };

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-4 items-center bg-[#4f3824] p-4 rounded">
          <text>Create Room</text>
          <button className="bg-[#d1603d] text-white p-2 rounded">Create</button>
        </div>
        <div className="flex flex-col gap-4 items-center bg-[#4f3824] p-4 rounded">
          <text>Join Room</text>
          <div className="flex flex-row gap-4 items-center">
            <input className="rounded-lg p-2 w-full text-black"></input>
            <button
              onClick={() => {
                const inputElement = document.querySelector('input');
                const roomId = inputElement ? inputElement.value : '';
                getRoom(roomId);
              }}
              className="bg-[#d1603d] text-white p-2 rounded"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomMenu;
