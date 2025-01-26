export type User = {
  id: number;
  name: string;
};

export type Room = {
  id: string;
  name: string;
};

export type Message = {
  roomId: string;
  authorId: number;
  message: string;
};
