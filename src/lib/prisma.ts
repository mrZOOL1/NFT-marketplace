import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import { Card_Type } from './types';


interface CustomNodeJsGlobal {
    prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}





export const ReadAllCards = async function () {
    noStore();
    const cards = await prisma.cards.findMany({
        orderBy: {
            title: 'asc'
        }
    });
    if (cards) {
        return cards as Card_Type[];
    } else {
        return [] as Card_Type[];
    }
}

export const FilterCardsByTitle = async function (title: string) {
    noStore();
    const cards = await prisma.cards.findMany({
        where: {
            title
        },
        orderBy: {
            title: 'asc',
        }
    });
    if (cards) {
        return cards as Card_Type[];
    } else {
        return [] as Card_Type[];
    }
}

export const FilterCardsByUserId = async function (userid: string) {
    noStore();
    const cards = await prisma.cards.findMany({
        where: {
            userid
        },
        orderBy: {
            title: 'asc',
        }
    });
    if (cards) {
        return cards as Card_Type[];
    } else {
        return [] as Card_Type[];
    }
}

export const FilterCardsByUserIdAndTitle = async function (userid: string, title: string) {
    noStore();
    const cards = await prisma.cards.findMany({
        where: {
            userid,
            title
        },
        orderBy: {
            title: 'asc',
        }
    });
    if (cards) {
        return cards as Card_Type[];
    } else {
        return [] as Card_Type[];
    }
}

export const CreateCard = async function (id: string, userid: string, owner: string, title: string, price: string, image: string) {
    const card = await prisma.cards.create({
        data: {
            id,
            userid,
            owner,
            title,
            price,
            image
        }
    });
    return card;
}

export const AddToCart = async function (userid: string, cardid: string) {
    noStore();
    const cart = await prisma.carts.create({
        data: {
            userid,
            item: cardid
        }
    });
    return cart;
}

export const CountCartItems = async function (userid: string) {
    noStore();
    const num = await prisma.carts.count({
        where: {
            userid: userid
        }
    });
    return num;
}

export const DeleteCard = async function (id: string) {
    noStore();
    const card = await prisma.cards.delete({
        where: {
            id
        }
    });
    return card;
}