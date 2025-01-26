import React, { createContext, useState } from 'react';
import { Room, User } from './types';

type ContextState = {
  user: User | null;
  setUser: (user: User) => void;
  room: Room | null;
  setRoom: (room: Room) => void;
};

const contextDefaultValues: ContextState = {
  user: null,
  setUser: () => {},
  room: null,
  setRoom: () => {}
};

export const AppContext = createContext<ContextState>(contextDefaultValues);

const AppContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        room,
        setRoom
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
