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
    const response = await getRequest<Room>(`/room?id=${roomId}`);
    console.log(response);

    if (response.status === 200) {
      setRoom(response.data);
    }
  };

  const createRoom = async () => {
    const response = await postRequest<Room>('/room');

    if (response.status === 201) {
      setRoom(response.data);
    }
  };

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-4 items-center bg-[#292929] p-4 rounded">
          <p>Create Room</p>
          <button
            onClick={() => {
              createRoom();
            }}
            className="bg-[#fb7e14] text-white p-2 rounded"
          >
            Create
          </button>
        </div>
        <div className="flex flex-col gap-4 items-center bg-[#292929] p-4 rounded">
          <p>Join Room</p>
          <div className="flex flex-row gap-4 items-center">
            <input className="rounded-lg p-2 w-full text-black"></input>
            <button
              onClick={() => {
                const inputElement = document.querySelector('input');
                const roomId = inputElement ? inputElement.value : '';
                getRoom(roomId);
              }}
              className="bg-[#fb7e14] text-white p-2 rounded"
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
