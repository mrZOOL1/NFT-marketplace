"use server"

import { CreateCard, DeleteCard, AddToCart } from "./prisma"
import { nanoid } from "nanoid";

export async function CreateCardAction(FormData: FormData) {
    const id = nanoid();
    const owner = FormData.get('userid') as string;
    const title = FormData.get('title') as string;
    const price = FormData.get('price') as string;
    const image = FormData.get('image') as string;
    if (owner !== '' && title !== '' && price !== '' && image !== '') {
        await CreateCard(id, owner, title, price, image);
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