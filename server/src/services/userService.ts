import prisma from "@lib/database";

export class UserService {
  async createUser(name: string) {
    const user = await prisma.user.create({
      data: {
        name: name,
      },
    });
    return user;
  }

  async getUser(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
}