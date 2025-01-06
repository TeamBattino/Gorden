import prisma from "@lib/database";
import { faker } from "@faker-js/faker";

interface Room {
    id: string;
    name: string;
}


export const createRoom = async () => {
    const room = await prisma.room.create({
        data: {
            id:
                faker.string.alpha({ length: 6, casing: 'lower' }),
            name: faker.color.human() + " " + faker.animal.type(),
        },
    });
    return room;
}

export const getRoom = async (roomId: string) => {
    const room = await prisma.room.findUnique({
        where: {
            id: roomId,
        },
    });
    return room;
}