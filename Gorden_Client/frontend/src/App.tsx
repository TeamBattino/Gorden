import wailsLogo from "./assets/wails.png";
import "./App.css";
import { Greet } from "../wailsjs/go/main/App"
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState<string>()
  useEffect(() => {
    Greet("popconr").then(setName);
  }, []);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    Greet(event.target.value).then(setName);
  }

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 place-items-center justify-items-center mx-auto py-8">
      <div className="text-blue-900 text-2xl font-bold font-mono">
        <h1 className="content-center">Vite - React + TS + Tailwind</h1>
      </div>
      <div className="w-fit max-w-md">
        <input type="text" onChange={changeName} />
        <a href="https://wails.io" target="_blank">
        {name}
        </a>
      </div>
    </div>
  );
}

export default App;
