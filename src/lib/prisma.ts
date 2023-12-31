import { PrismaClient } from '@prisma/client';
import { unstable_noStore as noStore } from 'next/cache';
import { Card_Type, Cart_Type } from './types';
import { nanoid } from 'nanoid';
import { Decimal } from '@prisma/client/runtime/library';


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

export default prisma;

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

export const CreateCard = async function (id: string, userid: string, owner: string, title: string, price: string) {
    noStore();
    const card = await prisma.cards.create({
        data: {
            id,
            userid,
            owner,
            title,
            price
        }
    });
    return card;
}

export const AddToCart = async function (userid: string, cardid: string, cartid: string) {
    noStore();
    const cart = await prisma.carts.create({
        data: {
            userid,
            cardid,
            cartid
        }
    });
    return cart;
}

export const ReadCart = async function (userid: string) {
    noStore();
    const cart = await prisma.carts.findMany({
        where: {
            userid
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

export const GetCardsFromCartitems = async function (cartitems: Cart_Type[]) {
    noStore();
    let cards: Card_Type[] = [];
    for (let i = 0; i < cartitems.length; i++) {
        const card = await GetCardById(cartitems[i].cardid);
        if (card) {
            cards.push(card);
        }
    }
    return cards;
}

export const RemoveItemFromCart = async function (userid: string, cardid: string) {
    noStore();
    await prisma.carts.deleteMany({
        where: {
            userid,
            cardid
        }
    });
}

export const DeleteCard = async function (id: string) {
    noStore();
    await prisma.cards.delete({
        where: {
            id
        }
    });
    await prisma.carts.deleteMany({
        where: {
            cardid: id
        }
    });
    await prisma.likes.deleteMany({
        where: {
            cardid: id
        }
    });
}

export const GetCardById = async function (id: string) {
    noStore();
    const card = await prisma.cards.findFirst({
        where: {
            id
        }
    });
    return card;
}

export const GetLikesById = async function (cardid: string) {
    noStore();
    const likes = await prisma.likes.count({
        where: {
            cardid
        }
    });
    return likes;
}

export const AddLike = async function (cardid: string, userid: string) {
    noStore();
    await prisma.likes.create({
        data: {
            cardid,
            userid,
            likeid: nanoid()
        }
    });
}

export const RemoveLike = async function (cardid: string, userid: string) {
    noStore();
    await prisma.likes.deleteMany({
        where: {
            cardid,
            userid
        }
    });
}

export const IsLiked = async function (cardid: string, userid: string) {
    noStore();
    const like = await prisma.likes.findFirst({
        where: {
            cardid,
            userid
        }
    });
    if (like) {
        return true;
    }
    else {
        return false;
    }
}

export const UpdatePrice = async function (price: string, id: string) {
    noStore();
    await prisma.cards.update({
        where: {
            id
        },
        data: {
            price
        }
    });
}

export const BuyCard = async function (id: string, userid: string, owner: string) {
    noStore();
    await prisma.cards.update({
        where: {
            id
        },
        data: {
            userid,
            owner
        }
    });
}

export const GetFunds = async function (email: string) {
    noStore();
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    });
    return user?.money;
}

export const AddFunds = async function (email: string, money: Decimal) {
    noStore();

    const funds = await GetFunds(email);

    if (funds) {

        const oldfunds = new Decimal(parseFloat(funds));

        await prisma.users.update({
            where: {
                email
            },
            data: {
                money: Decimal.add(oldfunds, money).toString()
            }
        });

    } else {

        await prisma.users.create({
            data: {
                email,
                money: money.toString()
            }
        });

    }
}

export const DecreaseFunds = async function (email: string, money: string) {
    noStore();

    await prisma.users.update({
        where: {
            email
        },
        data: {
            money
        }
    });
}