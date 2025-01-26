import prisma from "@lib/database";

interface Message {
  roomId: string;
  authorId: number;
  message: string;
}

export class MessageService {
  async sendMessage(message: Message) {
    return prisma.message.create({
      data: message,
    });
  }

  async getRoomMessages(roomId: string) {
    return prisma.message.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  async getRoomUpdates(roomId: string, lastMessageId: number) {
    return prisma.message.findMany({
      where: {
        roomId: roomId,
        id: {
          gt: lastMessageId,
        },
      },
      orderBy: {
        id: "asc",
      },
    });
  }
}