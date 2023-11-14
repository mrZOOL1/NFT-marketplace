'use client';

import React, {useState} from 'react'
import { AddFundsAction } from '@/lib/actions'
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
import Decimal from 'decimal.js';
import { TooManyDecimals } from '@/lib/utils';

interface props {
  email: string;
  funds: string | undefined;
}

const FundsForm = ({email, funds}:props) => {

  const [Range, SetRange] = useState(true);
  const [DecimalOK, SetDecimalOK] = useState(true);
  const [Funds, SetFunds] = useState(funds ? parseFloat(funds) : 0);

  const showlabel = function () {
    
    SetRange(true);
    SetDecimalOK(true);

    const addfunds = document.querySelector('#money') as HTMLInputElement;
    SetRange(true);

    let allgood = true;

    if (addfunds.value.toString().length === 0 || parseFloat(addfunds.value.toString()) > 1000 || parseFloat(addfunds.value.toString()) < 0.01) {
      SetRange(false);
      allgood = false;
    }

    else if (TooManyDecimals(addfunds.value.toString())) {
      SetDecimalOK(false);
      allgood = false;
    }

    if (allgood) {
      SetRange(true); 
      SetDecimalOK(true);
      const newfunds = Decimal.sum(Funds, parseFloat(addfunds.value.toString())).toNumber();
      SetFunds(newfunds);
    }

  }

  return (
    <Card className="w-[min(350px,90%)]">

    <CardHeader>
      <CardTitle>Add Funds</CardTitle>
      <CardDescription>{`You have ${Funds} ETH in your account`}</CardDescription>
    </CardHeader>

    <CardContent>
      <form action={AddFundsAction} onSubmit={showlabel} id='editform' noValidate>
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-3">

            <input id="email" name='email' autoComplete="off" hidden defaultValue={email}/>

            <div className='gap-1'>
              <Label htmlFor="money">Amount</Label>
              <Input className='bg-accent' type='number' id="money" name='money' autoComplete="off"/>
            </div>

            </div>
        </div>
      </form>
    </CardContent>

    <CardFooter className="flex flex-col items-center justify-center">
      <Button type='submit' form='editform' >Add Funds</Button>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Range ? 'none' : ''}}>Amount must be between 0.01 and 1000</p>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: DecimalOK ? 'none' : ''}}>Maximum 2 decimal digits</p>
    </CardFooter>

    </Card>
  )
}

export default FundsForm