'use client'

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
} from "@/components/ui/card"

const page = () => {

  const [Correct, SetCorrect] = useState(true);

  const showlabel = function () {

    const userid = document.querySelector('input[name="userid"]') as HTMLInputElement;
    const title = document.querySelector('input[name="title"]') as HTMLInputElement;
    const price = document.querySelector('input[name="price"]') as HTMLInputElement;
    const image = document.querySelector('input[name="image"]') as HTMLInputElement;

    const arr = [userid, title, price, image];
    let allgood = true;

    arr.forEach(item => {
        if (item.value.length === 0) {
            SetCorrect(false);
            allgood = false;
        }
    });
    if (allgood) {
        SetCorrect(true); 
    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-4'>
      <Card className="w-[min(350px,90%)]">

        <CardHeader>
          <CardTitle>Create NFT</CardTitle>
          <CardDescription>Create your own NFT and put it up for sale</CardDescription>
        </CardHeader>

        <CardContent>
          <form action={CreateCardAction} onSubmit={showlabel} id='createform'>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-3">

                <div className='gap-1'>
                  <Label htmlFor="userid">userid</Label>
                  <Input id="userid" name='userid' autoComplete="off"/>
                </div>

                <div className='gap-1'>
                  <Label htmlFor="owner">owner</Label>
                  <Input id="owner" name='owner' autoComplete="off"/>
                </div>

                <div className='gap-1'>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name='title' autoComplete="off"/>
                </div>

                <div className='gap-1'>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name='price' type='number' autoComplete="off"/>
                </div>

                <div className='gap-1'>
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" name='image' autoComplete="off"/>
                </div>

              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center">
          <Button type='submit' form='createform' >Create</Button>
        </CardFooter>

        <div className='flex flex-col items-center'>
          <p className='text-red-500' style={{display: Correct ? 'none' : ''}}>All fields are required</p>
        </div>

      </Card>
    </main>
  )
}

export default page