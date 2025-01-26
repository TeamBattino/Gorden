import React, { useEffect } from 'react';
import { getRequest, postRequest } from './Api';
import { User } from './types';
import { AppContext } from './Context';

function UserSelector() {
  const { setUser } = React.useContext(AppContext);

  const getRoom = async (userId: string) => {
    const response = await getRequest<User>(`/user?id=${userId}`);

    if (response.status === 200) {
      setUser(response.data);
    } else {
      throw new Error('User not found');
    }
  };

  const createUser = async (name: string) => {
    const response = await postRequest<User>(`/user?name=${name}`);
    console.log(response);

    if (response.status === 201) {
      setUser(response.data);
    } else {
      throw new Error('User not created');
    }
  };

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-hollow-black">
      <div className="flex flex-row gap-10">
        <div className="flex flex-col gap-4 items-center bg-hollow-gray p-4 rounded">
          <p>Create User</p>
          <div className="flex flex-row gap-4 items-center">
            <input className="rounded-lg p-2 w-full text-hollow-black"></input>
            <button
              onClick={() => {
                const inputElement = document.querySelector('input');
                const name = inputElement ? inputElement.value : '';
                createUser(name);
              }}
              className="bg-hollow-orange text-hollow-white p-2 rounded"
            >
              Create
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center bg-hollow-gray p-4 rounded">
          <p>Login with ID</p>
          <div className="flex flex-row gap-4 items-center">
            <input className="rounded-lg p-2 w-full text-hollow-black"></input>
            <button
              onClick={() => {
                const inputElements = document.querySelectorAll('input');
                const userId = inputElements[1] ? inputElements[1].value : '';
                getRoom(userId);
              }}
              className="bg-hollow-orange text-hollow-white p-2 rounded"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSelector;
