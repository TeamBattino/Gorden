import { BaseService } from "./baseService";

interface Message {
  roomId: string;
  authorId: number;
  message: string;
}

export class MessageService extends BaseService {
  async sendMessage(message: Message) {
    return this.prisma.message.create({
      data: message,
    });
  }

  async getRoomMessages(roomId: string) {
    return this.prisma.message.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  async getRoomUpdates(roomId: string, lastMessageId: number) {
    return this.prisma.message.findMany({
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