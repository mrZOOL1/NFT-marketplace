'use client';

import React, {useState} from 'react'
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

interface props {
  oldprice: string;
}

const EditForm = ({oldprice}:props) => {

    const [Range, SetRange] = useState(true);
    const [Different, SetDifferent] = useState(true);
    const [Decimal, SetDecimal] = useState(true);
    const path = usePathname();

    const showlabel = function () {

      SetRange(true);
      SetDifferent(true);
      SetDecimal(true);
  
      const newprice = document.querySelector('input[name="newprice"]') as HTMLInputElement;
      SetRange(true);
      SetDifferent(true);
  
      let allgood = true;

      if (newprice.value.toString().length === 0 || parseFloat(newprice.value.toString()) > 9999 || parseFloat(newprice.value.toString()) < 0.001) {
        SetRange(false);
        allgood = false;
      }

      else if (newprice.value.toString() === oldprice) {
        SetDifferent(false);
        allgood = false;
      }

      else if (newprice.value.toString().length > 4) {
        SetDecimal(false);
        allgood = false;
      }
  
      if (allgood) {
        SetRange(true); 
        SetDifferent(true);
        SetDecimal(true);
      }

    }

  return (
    <Card className="w-[min(350px,90%)] shadow2">

    <CardHeader>
      <CardTitle>Edit Price</CardTitle>
      <CardDescription>Change the price of your NFT (ETH)</CardDescription>
    </CardHeader>

    <CardContent>
        <form action={UpdatePriceAction} onSubmit={showlabel} id='createform' noValidate>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col gap-3">
                    <div className='gap-1'>
                        <Label htmlFor="newprice">New Price</Label>
                        <Input type='number' step='any' id="newprice" name='newprice' placeholder={oldprice} autoComplete="off"/>
                        <input type="text" id="cardid" name='cardid' hidden defaultValue={path.toString().substring(path.length - 21)} />
                        <input type="text" id="sameprice" name='sameprice' hidden defaultValue={oldprice} />
                    </div>
                </div>
            </div>
        </form>
    </CardContent>

    <CardFooter className="flex flex-col items-center justify-center">
      <Button type='submit' form='createform' >Edit</Button>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Range ? 'none' : ''}}>Price must be between 0.001 and 9999</p>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Different ? 'none' : ''}}>Price must be different</p>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Decimal ? 'none' : ''}}>Maximum 2 decimal digits</p>
    </CardFooter>

    </Card>
  )
}

export default EditForm