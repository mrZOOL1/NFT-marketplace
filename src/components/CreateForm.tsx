'use client';

import React, {useState} from 'react'
import { CreateCardAction } from '@/lib/actions'
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
} from "@/components/ui/card";
import { TooManyDecimals } from '@/lib/utils';


interface props {
  email: string;
  name: string | null | undefined;
  cardtitles: string[];
}

const CreateForm = ({email, name, cardtitles}:props) => {
    const [Correct, SetCorrect] = useState(true);
    const [DifferentName, SetDifferentName] = useState(true);
    const [Range, SetRange] = useState(true);
    const [Decimal, SetDecimal] = useState(true);

    const showlabel = function () {

      SetCorrect(true);
      SetDifferentName(true);
      SetRange(true);
      SetDecimal(true);
  
      const title = document.querySelector('input[name="title"]') as HTMLInputElement;
      const price = document.querySelector('input[name="price"]') as HTMLInputElement;
      const image = document.querySelector('input[name="image"]') as HTMLInputElement;
  
      let allgood = true;

      if (title.value.length === 0  || price.value.length === 0 || image.files?.length === 0) {
        SetCorrect(false);
        allgood = false;
      }

      else if (cardtitles.includes(title.value.toString())) {
        SetDifferentName(false);
        allgood = false;
      }

      else if (parseFloat(price.value.toString()) > 9999 || parseFloat(price.value.toString()) < 0.01) {
        SetRange(false);
        allgood = false;
      }

      else if (TooManyDecimals(price.value.toString())) {
        SetDecimal(false);
        allgood = false;
      }
  
      if (allgood) {
        SetCorrect(true); 
        SetDifferentName(true);
        SetRange(true);
        SetDecimal(true);
      }

    }

  return (
    <Card className="w-[min(350px,90%)] shadow2">

    <CardHeader>
      <CardTitle>Create NFT</CardTitle>
      <CardDescription>Create your own NFT and put it up for sale</CardDescription>
    </CardHeader>

    <CardContent>
        <form action={CreateCardAction} onSubmit={showlabel} id='createform' noValidate>
          <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-3">

                <input id="userid" name='userid' autoComplete="off" hidden defaultValue={email}/>
                <input id="owner" name='owner' autoComplete="off" hidden defaultValue={name || 'no name'}/>

                <div className='gap-1'>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name='title' autoComplete="off"/>
                </div>

                <div className='gap-1'>
                  <Label htmlFor="price">Price (ETH)</Label>
                  <Input id="price" name='price' type='number' autoComplete="off"/>
                </div>

                <div className='gap-1'>
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" name='image' type="file" accept="image/png, image/jpg, image/jpeg"/>
                </div>

              </div>
          </div>
        </form>
    </CardContent>

    <CardFooter className="flex flex-col items-center justify-center">
      <Button type='submit' form='createform' >Create</Button>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Correct ? 'none' : ''}}>All fields are required</p>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Range ? 'none' : ''}}>Price must be between 0.01 and 9999</p>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: DifferentName ? 'none' : ''}}>You already use this title</p>
      <p className='text-red-500 font-semibold mt-4 text-center' style={{display: Decimal ? 'none' : ''}}>Maximum 2 decimal digits</p>
    </CardFooter>

    </Card>
  )
}

export default CreateForm