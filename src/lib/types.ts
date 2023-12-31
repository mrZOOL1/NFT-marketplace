export type Card_Type = {
    id: string;
    userid: string;
    title: string;
    price: string;
    owner: string;
    email?: string;
}

export type Cart_Type = {
    userid: string;
    cardid: string;
    cartid: string;
}