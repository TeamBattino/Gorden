import { BaseService } from "./baseService";

export class UserService extends BaseService {
  async createUser(name: string) {
    const user = await this.prisma.user.create({
      data: {
        name: name,
      },
    });
    return user;
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