import prisma from "@lib/database";
import { faker } from "@faker-js/faker";

export class RoomService {
  async createRoom() {
    const room = await prisma.room.create({
      data: {
        id: faker.string.alpha({ length: 6, casing: 'lower' }),
        name: faker.color.human() + " " + faker.animal.type(),
      },
    });
    return room;
  }

  async getRoom(roomId: string) {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    return room;
  }
}