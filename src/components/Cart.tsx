'use client'

import React, {useState, useRef, useEffect} from 'react';
import CartItem from '@/components/CartItem';
import { Card_Type } from '@/lib/types';
import { DeleteCartItemsAction, BuyAction } from '@/lib/actions';
import { Decimal } from 'decimal.js';

interface props {
    allcards: Card_Type[];
    email:string;
    name: string;
    funds: Decimal | undefined;
}

const Cart = ({allcards, email, name, funds}:props) => {

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
    const [CanAfford, SetCanAfford] = useState(true);
    const IdToDelete = useRef(GetDefaultIdArray());

    const CheckHandler = function (price:number, index: number, cardid:string) {
        const boxes = document.querySelectorAll('#checkbox') as NodeListOf<HTMLInputElement>;
        if (!boxes[index].checked) {
            boxes[index].checked = false;
            SetTotal(old => old - price);
            SetCheckedCount(old => old - 1);
            IdToDelete.current = IdToDelete.current.filter(id => id !== cardid);
        } else {
            boxes[index].checked = true;
            SetTotal(old => old + price);
            SetCheckedCount(old => old + 1);
            IdToDelete.current = [...IdToDelete.current, cardid];
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
            IdToDelete.current = [];

        } else {

            boxes.forEach(box => {
                box.checked = true;
            });

            SetCheckedCount(allcards.length);
            SetTotal(GetDefaultTotal());
            IdToDelete.current = GetDefaultIdArray();

        }
    }

    const showlabel = function () {

        let allgood = true;
        SetCanAfford(true);

        if (!(funds && parseFloat(funds.toString()) >= Total)) {
            SetCanAfford(false);
            allgood = false;
        }
    
        if (allgood) {
            SetCanAfford(true); 
        }
  
    }

    useEffect(() => {
        const input = document.querySelector('#idtodelete') as HTMLInputElement;
        input.value = IdToDelete.current.join('#');
    }, [CheckedCount]);

  return (
    <>
        <form action={BuyAction} className='hidden sm:bg-gray-200 sm:rounded-[12px] sm:max-w-[300px] sm:h-min sm:gap-2 sm:sticky sm:top-24 sm:flex sm:flex-col sm:items-start sm:justify-between sm:p-2 sm:shadow2' onSubmit={showlabel}>
            
            <p className='font-semibold text-2xl'>Summary</p>

            <div className='grid grid-cols-2 grid-rows-2'>
                <p>Total: </p>  <p className='break-all'>{`ETH ${Total.toString()}`}</p>
                <p>Funds: </p>  <p className='break-all'>{`ETH ${funds ? funds.toString() : '0'}`}</p>
            </div>

            <button className='purple text-white p-2 rounded-[12px] w-72 text-xl self-center'>Buy ({CheckedCount})</button>

            <p className='text-red-500 font-semibold w-full text-center' style={{display: CanAfford ? 'none' : ''}}>Not Enough Funds</p>

            <input type="text" id='userid' name='userid' hidden defaultValue={email} />
            <input type="text" id='name' name='name' hidden defaultValue={name} />
            <input type="text" id='funds' name='funds' hidden defaultValue={funds ? funds.toString() : '0'} />
            <input type="text" id='total' name='total' hidden defaultValue={Total.toString()} />
            <input type="text" id='allid' name='allid' hidden defaultValue={IdToDelete.current.join('#')} />

        </form>

        <div className='w-full h-full  flex flex-col items-center gap-2'>

            <div className='bg-gray-200 rounded-[12px] w-full min-h-20 p-2 flex flex-col gap-2 shadow2'>
                <h1 className='text-2xl font-semibold'>Shopping Cart ({CheckedCount})</h1>
                <div className='flex gap-4'>
                    <button onClick={SelectAll}>Select all items</button>
                    <form action={DeleteCartItemsAction}>
                        <button type='submit'>Delete selected items</button>
                        <input type="text" name='userid' id='userid' hidden defaultValue={email}/>
                        <input type="text" name='idtodelete' id='idtodelete' hidden defaultValue={IdToDelete.current.join('#')}/>
                    </form>
                </div>
            </div>

            <div className='flex flex-col bg-gray-200 rounded-[12px] w-full p-2 shadow2' style={{display: allcards.length===0 ? 'none' : 'inline-block'}}>
                {allcards.map((card:Card_Type, index:number) => <CartItem index={index} CheckHandler={CheckHandler} key={card.id} title={card.title} price={card.price} image={card.image} cardid={card.id} email={email}/>)}
            </div>

            <form action={BuyAction} className='bg-gray-200 rounded-[12px] h-min gap-2 w-full flex flex-col items-start justify-between p-2 sm:hidden shadow2' onSubmit={showlabel}>
                
                <p className='font-semibold text-2xl'>Summary</p>

                <div className='grid grid-cols-2 grid-rows-2'>
                    <p>Total: </p>  <p className='break-all'>{`ETH ${Total.toString()}`}</p>
                    <p>Funds: </p>  <p className='break-all'>{`ETH ${funds ? funds.toString() : '0'}`}</p>
                </div>


                <button type='submit' className='purple text-white p-2 rounded-[12px] w-full self-center text-xl'>Buy ({CheckedCount})</button>
                
                <p className='text-red-500 font-semibold w-full text-center' style={{display: CanAfford ? 'none' : ''}}>Not Enough Funds</p>

                <input type="text" id='userid' name='userid' hidden defaultValue={email} />
                <input type="text" id='name' name='name' hidden defaultValue={name} />
                <input type="text" id='funds' name='funds' hidden defaultValue={funds ? funds.toString() : '0'} />
                <input type="text" id='total' name='total' hidden defaultValue={Total.toString()} />
                <input type="text" id='allid' name='allid' hidden defaultValue={IdToDelete.current.join('#')} />

            </form>

        </div>
    </>
  )
}

export default Cart