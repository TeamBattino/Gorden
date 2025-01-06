import prisma from "@lib/database";

export const createUser = async (name: string) => {
    const user = await prisma.user.create({
        data: {
            name: name,
        },
    });
    return user;
}

export const getUser = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    return user;
}