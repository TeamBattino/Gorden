// src/user.ts
import { BaseService } from "./baseService";
import { Creatable, Readable } from "../interfaces";

export class UserService extends BaseService implements Creatable, Readable<any, number> { // Using 'any' for User type for simplicity, replace with actual User type if defined
  async create(name: string) {
    const user = await this.prisma.user.create({
      data: {
        name: name,
      },
    });
    return user;
  }

  async getById(userId: number): Promise<any | undefined> { // Implementing getById for Readable
    return this.getUser(userId); // Reusing getUser logic
  }

  async getUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
}