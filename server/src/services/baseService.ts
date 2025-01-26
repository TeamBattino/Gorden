import prisma from "@lib/database";

export class BaseService {
  protected prisma = prisma;
}