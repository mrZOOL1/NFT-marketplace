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

interface props {
  email: string;
  funds: string;
}

const CreateForm = ({email, funds}:props) => {

  const [Range, SetRange] = useState(true);

  const showlabel = function () {

    const funds = document.querySelector('input[name="money"]') as HTMLInputElement;
    SetRange(true);

    let allgood = true;

    if (funds.value.toString().length === 0 || parseFloat(funds.value.toString()) > 1000 || parseFloat(funds.value.toString()) < 0.01) {
      SetRange(false);
      allgood = false;
    }

    if (allgood) {
      SetRange(true); 
    }

  }

  return (
    <Card className="w-[min(350px,90%)] shadow2">

    <CardHeader>
      <CardTitle>Add Funds</CardTitle>
      <CardDescription>{`You have ${funds} ETH in your account`}</CardDescription>
    </CardHeader>

    <CardContent>
      <form action={AddFundsAction} onSubmit={showlabel} id='createform' noValidate>
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-3">

            <input id="email" name='email' autoComplete="off" hidden defaultValue={email}/>

            <div className='gap-1'>
              <Label htmlFor="money">Amount</Label>
              <Input type='number' id="money" name='money' autoComplete="off"/>
            </div>

            </div>
        </div>
      </form>
    </CardContent>

    <CardFooter className="flex flex-col items-center justify-center">
      <Button type='submit' form='createform' >Add Funds</Button>
      <p className='text-red-500 font-semibold mt-4' style={{display: Range ? 'none' : ''}}>Amount must be between 0.01 and 1000</p>
    </CardFooter>

    </Card>
  )
}

export default CreateForm