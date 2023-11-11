"use server"

import { nanoid } from "nanoid";
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Decimal } from 'decimal.js';
import { TooManyDecimals } from "./utils";
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
    if (!TooManyDecimals(price) && title !== '' && price !== '' && IsImage && !cardtitles.includes(title) && decimalprice.lessThanOrEqualTo(9999) && decimalprice.greaterThanOrEqualTo(0.01)) {
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

export async function UpdatePriceAction(FormData: FormData) {

    const newprice = FormData.get('newprice') as string;
    const cardid = FormData.get('cardid') as string;
    const sameprice = FormData.get('sameprice') as string;
    const decimalnewprice = new Decimal(parseFloat(newprice));
    const decimalsameprice = new Decimal(parseFloat(sameprice));

    if (newprice.length > 0 && !TooManyDecimals(newprice) && decimalnewprice.greaterThanOrEqualTo(0.01) && decimalnewprice.lessThanOrEqualTo(9999) && !(decimalnewprice.equals(decimalsameprice))) {
        await UpdatePrice(newprice, cardid);
        await revalidatePath('/profile/nfts');
        await redirect('/profile/nfts');
    }
}

export async function DeleteCartItemAction(FormData: FormData) {

    const userid = FormData.get('userid') as string;
    const cardid = FormData.get('cardid') as string;

    await RemoveItemFromCart(userid, cardid);
    await revalidatePath('/cart');

}

export async function DeleteCartItemsAction(FormData: FormData) {

    const userid = FormData.get('userid') as string;
    const IdToDelete = FormData.get('idtodelete') as string;
    const IdToDeleteArray = IdToDelete.split('#');

    for (let i = 0; i < IdToDeleteArray.length; i++) {
        await RemoveItemFromCart(userid, IdToDeleteArray[i]);
    }

    await revalidatePath('/cart');

}

export async function BuyAction(FormData: FormData) {

    const userid = FormData.get('userid') as string;
    const name = FormData.get('name') as string;
    const totalstring = FormData.get('total') as string;
    const fundsstring = FormData.get('funds') as string;
    const funds = new Decimal(parseFloat(fundsstring));
    const total = new Decimal(parseFloat(totalstring));
    const IdToBuy = FormData.get('idtobuy') as string;
    const IdToBuyArray = IdToBuy.split('#');

    if (funds.greaterThanOrEqualTo(total)) {

        for (let i = 0; i < IdToBuyArray.length; i++) {
            if (IdToBuyArray[i] !== '') {
                await BuyCard(IdToBuyArray[i], userid, name);
                await RemoveItemFromCart(userid, IdToBuyArray[i]);
            }
        }

        const money = Decimal.sub(funds, total)
        await DecreaseFunds(userid, money.toString());
        await revalidatePath('/cart');

    }

}

export async function AddFundsAction(FormData: FormData) {
    const email = FormData.get('email') as string;
    const input = FormData.get('money') as string;
    const money = new Decimal(parseFloat(input));
    if (money.greaterThanOrEqualTo(0.01) && money.lessThanOrEqualTo(1000) && !TooManyDecimals(input)) {
        await AddFunds(email, money);
        await revalidatePath('/profile/wallet');
    }
}

export async function BuyOne(FormData: FormData) {

    const cardid = FormData.get('cardid') as string;
    const price = FormData.get('price') as string;
    const owner = FormData.get('owner') as string;
    const funds = FormData.get('funds') as string;
    const email = FormData.get('email') as string;
    const IsView = FormData.get('IsView') as string;
    const params = FormData.get('params') as string;

    if (IsView === 'true') {
        await redirect(`/editprice/${cardid}?${params}`);
    } else {

        if (parseFloat(funds) >= parseFloat(price)) {

            const money = Decimal.sub(parseFloat(funds), parseFloat(price))
            await BuyCard(cardid, email, owner);
            await DecreaseFunds(email, money.toString());
            await revalidatePath(`/${cardid}`);

        }

    }
}