import prisma from "@lib/database";
import { faker } from "@faker-js/faker";
import { BaseService } from "./baseService";
import { Creatable, Readable } from "../interfaces";

export class RoomService
  extends BaseService
  implements Creatable, Readable<any, string>
{
  async create() {
    const room = await this.prisma.room.create({
      data: {
        id: faker.string.alpha({ length: 6, casing: "lower" }),
        name: faker.color.human() + " " + faker.animal.type(),
      },
    });
    return room;
  }

  async getById(roomId: string): Promise<any | undefined> {
    return this.getRoom(roomId);
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
