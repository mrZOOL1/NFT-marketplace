"use server"

import { nanoid } from "nanoid";
import { CreateCard, DeleteCard, AddToCart, AddLike, RemoveLike, RemoveItemFromCart } from "./prisma"

export async function CreateCardAction(FormData: FormData) {
    const id = nanoid();
    const userid = FormData.get('userid') as string;
    const owner = FormData.get('owner') as string;
    const title = FormData.get('title') as string;
    const price = FormData.get('price') as string;
    const image = FormData.get('image') as string;
    if (userid !== '' && owner !== '' && title !== '' && price !== '' && image !== '') {
        await CreateCard(id, userid, owner, title, price, image);
    }
}

export async function AddToCartAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const cardid = FormData.get('cardid') as string;
    const cartid = nanoid();
    await AddToCart(userid, cardid, cartid);
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