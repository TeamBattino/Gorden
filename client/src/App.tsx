import React from 'react';
import AppContextProvider, { AppContext } from './Context';
import UserSelector from './UserSelector';
import RoomSelector from './RoomSelector';
import Chat from './Chat';

function App() {
  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {({ user, room }) => (room === null ? <RoomSelector /> : user === null ? <UserSelector /> : <Chat />)}
      </AppContext.Consumer>
    </AppContextProvider>
  );
}

export default App;
