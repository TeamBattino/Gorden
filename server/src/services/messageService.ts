import { BaseService } from "./baseService";
import { MessageSendingService, Readable } from "../interfaces";
import { Message } from "@prisma/client";

interface SendMessagePayload {
  roomId: string;
  authorId: number;
  message: string;
}

export class MessageService
  extends BaseService
  implements
    MessageSendingService<SendMessagePayload>,
    Readable<Message, string>
{
  async sendMessage(messagePayload: SendMessagePayload): Promise<Message> {
    const message: Message = await this.prisma.message.create({
      data: messagePayload,
    });
    return message;
  }

  async getRoomMessages(roomId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "asc",
      },
    }) as Promise<Message[]>;
  }

  async getRoomUpdates(
    roomId: string,
    lastMessageId: number
  ): Promise<Message[]> {
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
    }) as Promise<Message[]>;
  }

  async getById(messageId: string): Promise<Message | undefined> {
    const message = await this.prisma.message.findUnique({
      where: {
        id: parseInt(messageId, 10),
      },
    });
    return message || undefined;
  }
}
