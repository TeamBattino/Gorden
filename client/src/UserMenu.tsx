import { create } from 'domain';
import { get } from 'http';
import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from './Api';

interface UserMenuProps {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export interface User {
  id: number;
  name: string;
}

function UserMenu({ setUser }: UserMenuProps) {
  console.log(window.ipcRenderer);

  const createUser = async (userName: string) => {
    const response = await postRequest<User>('/user?name=' + userName);

    if (response.status === 201) {
      setUser(response.data);
      console.log('User created:', response.data);
    }
  };

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-hollow-black">
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-4 items-center bg-hollow-gray p-4 rounded">
          <p>Enter your Name:</p>
          <div className="flex flex-row gap-4 items-center">
            <input className="rounded-lg p-2 w-full text-hollow-black"></input>
            <button
              onClick={() => {
                const inputElement = document.querySelector('input');
                const userName = inputElement ? inputElement.value : '';
                createUser(userName);
              }}
              className="bg-hollow-orange text-hollow-white p-2 rounded"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
