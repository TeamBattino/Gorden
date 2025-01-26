// src/room.ts
import prisma from "@lib/database";
import { faker } from "@faker-js/faker";
import { BaseService } from "./baseService";
import { Creatable, Readable } from "../interfaces";

export class RoomService extends BaseService implements Creatable, Readable<any, string> { // Using 'any' for Room type for simplicity, replace with actual Room type if defined
  async create() {
    const room = await this.prisma.room.create({
      data: {
        id: faker.string.alpha({ length: 6, casing: 'lower' }),
        name: faker.color.human() + " " + faker.animal.type(),
      },
    });
    return room;
  }

  async getById(roomId: string): Promise<any | undefined> { // Implementing getById for Readable
    return this.getRoom(roomId); // Reusing getRoom logic
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