import { BaseService } from "./baseService";
import { Creatable, Readable } from "../interfaces";

export class UserService
  extends BaseService
  implements Creatable, Readable<any, number>
{
  async create(name: string) {
    const user = await this.prisma.user.create({
      data: {
        name: name,
      },
    });
    return user;
  }

  async getById(userId: number): Promise<any | undefined> {
    return this.getUser(userId);
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
