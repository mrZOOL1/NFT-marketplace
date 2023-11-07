'use client'

import React, {useState} from 'react';
import CartItem from '@/components/CartItem';
import { Card_Type } from '@/lib/types';
import { DeleteCartItemsAction, BuyAction } from '@/lib/actions';

interface props {
    allcards: Card_Type[];
    email:string;
    name: string;
}

const Cart = ({allcards, email, name}:props) => {

    const GetDefaultTotal = function () {
        let DefaultTotal = 0;
        for (let i=0; i<allcards.length; i++) {
            DefaultTotal += parseFloat(allcards[i].price);
        }
        return DefaultTotal;   
    }

    const GetDefaultIdArray = function () {
        let AllId:string[] = [];
        allcards.forEach(card => {
            AllId.push(card.id);
        });
        return AllId;   
    }

    const [Total, SetTotal] = useState(GetDefaultTotal());
    const [CheckedCount, SetCheckedCount] = useState(allcards.length);
    const [IdToDelete, SetIdToDelete] = useState(GetDefaultIdArray());

    const CheckHandler = function (price:number, index: number, cardid:string) {
        const boxes = document.querySelectorAll('#checkbox') as NodeListOf<HTMLInputElement>;
        if (!boxes[index].checked) {
            boxes[index].checked = false;
            SetTotal(old => old - price);
            SetCheckedCount(old => old - 1);
            SetIdToDelete(old => old.filter(id => id !== cardid));
        } else {
            boxes[index].checked = true;
            SetTotal(old => old + price);
            SetCheckedCount(old => old + 1);
            SetIdToDelete(old => [...old, cardid]);
        }
    }

    const SelectAll = function () {
        const boxes = document.querySelectorAll('#checkbox') as NodeListOf<HTMLInputElement>;
        let allchecked = true;
        boxes.forEach(box => {
            if (!box.checked) {
                allchecked = false;
            }
        });

        if (allchecked) {

            boxes.forEach(box => {
                box.checked = false;
            });

            SetCheckedCount(0);
            SetTotal(0);
            SetIdToDelete([]);

        } else {

            boxes.forEach(box => {
                box.checked = true;
            });

            SetCheckedCount(allcards.length);
            SetTotal(GetDefaultTotal());
            SetIdToDelete(GetDefaultIdArray());

        }
    }

  return (
    <>
        <form action={BuyAction} className='hidden sm:bg-gray-200 sm:rounded-[12px] sm:h-32 sm:w-80 sm:sticky sm:top-24 sm:flex sm:flex-col sm:items-start sm:justify-between sm:p-2 shadow2'>
            <p className='font-semibold text-2xl'>Subtotal</p>
            <p>{`${Total.toString()} ETH`}</p>
            <button className='purple text-white p-2 rounded-[12px] w-full text-xl'>Buy ({CheckedCount})</button>
            <input type="text" id='userid' name='userid' hidden defaultValue={email} />
            <input type="text" id='name' name='name' hidden defaultValue={name} />
            <input type="text" id='allid' name='allid' hidden defaultValue={IdToDelete.join('#')} />
        </form>

        <div className='w-full h-full  flex flex-col items-center gap-2'>

            <div className='bg-gray-200 rounded-[12px] w-full min-h-20 p-2 flex flex-col gap-2 shadow2'>
                <h1 className='text-2xl font-semibold'>Shopping Cart ({CheckedCount})</h1>
                <div className='flex gap-4'>
                    <button onClick={SelectAll}>Select all items</button>
                    <form action={DeleteCartItemsAction}>
                        <button type='submit'>Delete selected items</button>
                        <input type="text" name='userid' hidden defaultValue={email}/>
                        <input type="text" name='IdToDelete' hidden defaultValue={IdToDelete.join('#')}/>
                    </form>
                </div>
            </div>

            <div className='flex flex-col bg-gray-200 rounded-[12px] w-full p-2 shadow2' style={{display: allcards.length===0 ? 'none' : 'inline-block'}}>
                {allcards.map((card:Card_Type, index:number) => <CartItem index={index} CheckHandler={CheckHandler} key={card.id} title={card.title} price={card.price} image={card.image} cardid={card.id} email={email}/>)}
            </div>

            <form action={BuyAction} className='bg-gray-200 rounded-[12px] h-32 w-full flex flex-col items-center justify-between p-2 sm:hidden'>
                <p className='font-semibold text-2xl'>Subtotal</p>
                <p>{`${Total.toString()} ETH`}</p>
                <button type='submit' className='purple text-white p-2 rounded-[12px] w-full text-xl'>Buy ({CheckedCount})</button>
                <input type="text" id='userid' name='userid' hidden defaultValue={email} />
                <input type="text" id='name' name='name' hidden defaultValue={name} />
                <input type="text" id='allid' name='allid' hidden defaultValue={IdToDelete.join('#')} />
            </form>

        </div>
    </>
  )
}

export default Cart