"use server"

import { nanoid } from "nanoid";
import { CreateCard, DeleteCard, AddToCart, AddLike, RemoveLike } from "./prisma"

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
    await AddToCart(userid, cardid);
}

export async function DeleteCardAction(FormData: FormData) {
    const cardid = FormData.get('cardid') as string;
    await DeleteCard(cardid);
}

export async function ToggleLikeAction(FormData: FormData) {
    const userid = FormData.get('userid') as string;
    const cardid = FormData.get('cardid') as string;
    const isliked = FormData.get('isliked') as string;
    console.log(isliked);
    if (isliked === 'true') {
        await RemoveLike(cardid, userid);
    } else {
        await AddLike(cardid, userid);
    }
}