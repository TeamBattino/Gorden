import wailsLogo from "./assets/wails.png";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./App.css";
import { Label } from "@/components/ui/label";

import { GetChats, InitValues, AddToChats } from "../wailsjs/go/main/App";

import { useState, useEffect } from "react";
import { Content } from "@radix-ui/react-dialog";
import { UUID } from "crypto";

type Message = {
  Content: string;
  Author: string;
  UUID: number[];
};

type PlainMessage = {
  Content: string;
  Author: string;
};

function App() {
  InitValues();
  const [chats, setChats] = useState<Message[]>([]);

  useEffect(() => {
    GetChats().then((chats) => {
      setChats(chats);
    });
  }, []);

  const addChat = (chat: string) => {
    let message: PlainMessage = {
      Content: chat,
      Author: "me",
    };

    AddToChats(message);
    GetChats().then((chats) => {
      setChats(chats);
    });
  };
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="bg-slate-600 w-full">
      {/* <SidebarProvider>
        <AppSidebar />
            <SidebarTrigger /> */}
      <main className="w-full">
        <div className="min-h-screen w-full bg-white grid grid-cols-1 place-items-center justify-items-center mx-auto py-8">
          {chats.map((chat, i) => (
            <div className="flex bg-gray-200 rounded-md p-2">
              <Label>{chat.Author}</Label>
              <div key={i} className=" mb-2 ">
                {chat.Content}
              </div>
            </div>
          ))}
          <div className="flex items-center">
            <Input
              value={inputValue}
              className="text-white"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="button" onClick={() => addChat(inputValue)}>
              {" "}
              Send
            </button>
          </div>
        </div>
      </main>
      {/* </SidebarProvider> */}
    </div>
  );
}

export default App;
