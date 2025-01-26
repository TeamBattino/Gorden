import { BaseService } from "./baseService";
import { faker } from "@faker-js/faker";

export class RoomService extends BaseService {
  async createRoom() {
    const room = await this.prisma.room.create({
      data: {
        id: faker.string.alpha({ length: 6, casing: 'lower' }),
        name: faker.color.human() + " " + faker.animal.type(),
      },
    });
    return room;
  }

  async getRoom(roomId: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });
    return room;
  }
}