export type Card_Type = {
    id: string;
    userid: string;
    title: string;
    price: string;
    image: string;
    owner: string;
}

export type Cart_Type = {
    userid: string;
    cardid: string;
    cartid: string;
}