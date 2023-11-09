"use server"

import { nanoid } from "nanoid";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Decimal } from 'decimal.js';

import { CreateCard, FilterCardsByUserId, DeleteCard, AddToCart, ReadCart, AddLike, RemoveLike, RemoveItemFromCart, UpdatePrice, BuyCard, AddFunds, DecreaseFunds } from "./prisma"

export async function CreateCardAction(FormData: FormData) {
    const id = nanoid();
    const userid = FormData.get('userid') as string;
    const owner = FormData.get('owner') as string;
    const title = FormData.get('title') as string;
    const image = FormData.get('image') as File | null;
    const price = FormData.get('price') as string;
    const decimalprice = new Decimal(parseFloat(price));

    const mycards = await FilterCardsByUserId(userid);
    const cardtitles = mycards.map(card => card.title);

    const IsImage = image?.type === ('image/png' || 'image/jpg' || 'image/jpeg')
    if (price.length <= 4 && title !== '' && price !== '' && IsImage && !cardtitles.includes(title) && decimalprice.lessThanOrEqualTo(9999) && decimalprice.greaterThanOrEqualTo(0.01)) {
        await CreateCard(id, userid, owner, title, price, image);
        await revalidatePath('/profile/nfts');
        await redirect('/profile/nfts');
    }
}

export async function AddToCartAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const cardid = FormData.get('cardid') as string;
    const cartid = nanoid();
    if (userid === 'Unknown') {
        redirect('/api/auth/signin?callbackUrl=/');
    } else {
        const cartitems = await ReadCart(userid);
        let exists = false;
        cartitems.forEach(item => {
            if (item.cardid === cardid) {
                exists = true;
            }
        });
        if (!exists) {
            await AddToCart(userid, cardid, cartid);
        }
    }
    await revalidatePath('/', 'layout');
}

export async function DeleteCardAction(FormData: FormData) {
    const cardid = FormData.get('cardid') as string;
    await DeleteCard(cardid);
    await revalidatePath('/profile/nfts');
    await redirect('/profile/nfts');
}

export async function ToggleLikeAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const cardid = FormData.get('cardid') as string;
    const isliked = FormData.get('isliked') as string;
    if (isliked === 'true') {
        await RemoveLike(cardid, userid);
    } else {
        await AddLike(cardid, userid);
    }
    await revalidatePath(`/${cardid}`);
}

export async function DeleteCartItemsAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const IdToDelete = FormData.get('idtodelete') as string;
    const IdToDeleteArray = IdToDelete.split('#');
    IdToDeleteArray.forEach(async (id) => {
        await RemoveItemFromCart(userid, id);
    });
    await revalidatePath('/cart');
}

export async function DeleteCartItemAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const cardid = FormData.get('cardid') as string;
    await RemoveItemFromCart(userid, cardid);
    await revalidatePath('/cart');
}

export async function UpdatePriceAction(FormData: FormData) {

    const newprice = FormData.get('newprice') as string;
    const cardid = FormData.get('cardid') as string;
    const sameprice = FormData.get('sameprice') as string;
    const decimalnewprice = new Decimal(newprice);
    const decimalsameprice = new Decimal(sameprice);

    if (newprice.length <= 4 && decimalnewprice.greaterThanOrEqualTo(0.001) && decimalnewprice.lessThanOrEqualTo(9999) && !(decimalnewprice.equals(decimalsameprice))) {
        await UpdatePrice(newprice, cardid);
        await revalidatePath('/profile/nfts');
        await redirect('/profile/nfts');
    }
}

export async function BuyAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const name = FormData.get('name') as string;
    const allid = FormData.get('allid') as string;
    const totalstring = FormData.get('total') as string;
    const fundsstring = FormData.get('funds') as string;
    const funds = new Decimal(parseFloat(fundsstring));
    const total = new Decimal(parseFloat(totalstring));
    const IdArray = allid.split('#');

    if (funds.greaterThanOrEqualTo(total)) {
        IdArray.forEach(async (id) => {
            if (id !== '') {
                await BuyCard(id, userid, name);
                await RemoveItemFromCart(userid, id);
            }
        });
        const money = Decimal.sub(funds, total)
        await DecreaseFunds(userid, money);
        await revalidatePath('/cart');
    }
}

export async function AddFundsAction(FormData: FormData) {
    const email = FormData.get('email') as string;
    const input = FormData.get('money') as string;
    const money = new Decimal(parseFloat(input));
    if (money.greaterThanOrEqualTo(0.01) && money.lessThanOrEqualTo(1000) && input.length <= 4) {
        await AddFunds(email, money);
        await revalidatePath('/profile/wallet');
    }
}