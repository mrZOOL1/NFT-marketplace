"use server"

import { nanoid } from "nanoid";
import { redirect } from 'next/navigation';
import { CreateCard, DeleteCard, AddToCart, ReadCart, AddLike, RemoveLike, RemoveItemFromCart, UpdatePrice, BuyCard, AddFunds, DecreaseFunds } from "./prisma"

export async function CreateCardAction(FormData: FormData) {
    const id = nanoid();
    const userid = FormData.get('userid') as string;
    const owner = FormData.get('owner') as string;
    const title = FormData.get('title') as string;
    const price = FormData.get('price') as string;
    const image = FormData.get('image') as File | null;

    const IsImage = image?.type === ('image/png' || 'image/jpg' || 'image/jpeg')
    if (title !== '' && price !== '' && IsImage) {
        await CreateCard(id, userid, owner, title, price, image);
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
}

export async function DeleteCardAction(FormData: FormData) {
    const cardid = FormData.get('cardid') as string;
    await DeleteCard(cardid);
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
}

export async function DeleteCartItemsAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const IdToDelete = FormData.get('IdToDelete') as string;
    const IdToDeleteArray = IdToDelete.split('#');
    IdToDeleteArray.forEach(async (id) => {
        await RemoveItemFromCart(userid, id);
    });
}

export async function DeleteCartItemAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const cardid = FormData.get('cardid') as string;
    await RemoveItemFromCart(userid, cardid);
}

export async function UpdatePriceAction(FormData: FormData) {
    const newprice = FormData.get('newprice') as string;
    const cardid = FormData.get('cardid') as string;
    await UpdatePrice(newprice, cardid);
}

export async function BuyAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const name = FormData.get('name') as string;
    const allid = FormData.get('allid') as string;
    const totalstring = FormData.get('total') as string;
    const fundsstring = FormData.get('funds') as string;
    const total = parseFloat(totalstring)
    const funds = parseFloat(fundsstring)
    const IdArray = allid.split('#');

    if (funds >= total) {
        IdArray.forEach(async (id) => {
            if (id !== '') {
                await BuyCard(id, userid, name);
                await RemoveItemFromCart(userid, id);
            }
        });
        DecreaseFunds(userid, funds - total);
    }
}

export async function AddFundsAction(FormData: FormData) {
    const email = FormData.get('email') as string;
    const input = FormData.get('money') as string;
    const money = parseFloat(input);
    await AddFunds(email, money);
}

