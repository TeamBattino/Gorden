// src/interfaces.ts

export interface Creatable<CreationData = any, ReturnType = any> {
    create(data?: CreationData): Promise<ReturnType>;
  }
  
  export interface Readable<T, ID> {
    getById(id: ID): Promise<T | undefined>;
  }
  
  export interface MessageSendingService<MessageType = any> {
    sendMessage(message: MessageType): Promise<any>;
    getRoomMessages(roomId: string): Promise<MessageType[]>;
    getRoomUpdates(roomId: string, lastMessageId: number): Promise<MessageType[]>;
  }