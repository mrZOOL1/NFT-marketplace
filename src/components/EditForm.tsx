'use client';

import React, {useState, useTransition} from 'react'
import { UpdatePriceAction } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { usePathname } from 'next/navigation';
import { TooManyDecimals } from '@/lib/utils';
import { ActionHandler } from '@/lib/utils';
import LoadingAction from './LoadingAction';

interface props {
  oldprice: string;
}

const EditForm = ({oldprice}:props) => {

    const [Range, SetRange] = useState(true);
    const [Different, SetDifferent] = useState(true);
    const [Decimal, SetDecimal] = useState(true);
    const [isPending, startTransition] = useTransition();
    const path = usePathname();

    const edit = function (e: React.FormEvent<HTMLFormElement>) {

      e.preventDefault();
      e.stopPropagation();

      SetRange(true);
      SetDifferent(true);
      SetDecimal(true);
  
      const newprice = document.querySelector('#newprice') as HTMLInputElement;
      SetRange(true);
      SetDifferent(true);
  
      let allgood = true;

      if (newprice.value.toString().length === 0 || parseFloat(newprice.value.toString()) > 9999 || parseFloat(newprice.value.toString()) < 0.01) {
        SetRange(false);
        allgood = false;
      }

      else if (newprice.value.toString() === oldprice) {
        SetDifferent(false);
        allgood = false;
      }

      else if (TooManyDecimals(newprice.value.toString())) {
        SetDecimal(false);
        allgood = false;
      }
  
      if (allgood) {
        SetRange(true); 
        SetDifferent(true);
        SetDecimal(true);
      }

      ActionHandler('#editform', UpdatePriceAction, startTransition);

    }

  return (
    <>
      {isPending && <LoadingAction/>}

      <Card className="w-[min(350px,90%)]">

        <CardHeader>
          <CardTitle>Edit Price</CardTitle>
          <CardDescription>Change the price of your NFT (ETH)</CardDescription>
        </CardHeader>

        <CardContent>
            <form onSubmit={(e) => edit(e)} id='editform' noValidate>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col gap-3">
                        <div className='gap-1'>
                            <Label htmlFor="newprice">New Price</Label>
                            <Input className='bg-accent' type='number' step='any' id="newprice" name='newprice' placeholder={oldprice} autoComplete="off"/>
                            <input type="text" id="cardid" name='cardid' hidden defaultValue={path.toString().substring(path.length - 21)} />
                            <input type="text" id="sameprice" name='sameprice' hidden defaultValue={oldprice} />
                        </div>
                    </div>
                </div>
            </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center">
          <Button type='submit' form='editform' >Edit</Button>
          <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Range ? 'none' : ''}}>Price must be between 0.01 and 9999</p>
          <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Different ? 'none' : ''}}>Price must be different</p>
          <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Decimal ? 'none' : ''}}>Maximum 2 decimal digits</p>
        </CardFooter>

      </Card>

    </>
  )
}

export default EditForm