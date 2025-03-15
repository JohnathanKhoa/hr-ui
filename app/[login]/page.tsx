'use client'

import { Button } from "@/components/typescript/button";
import { ErrorMessage, Field, Label } from "@/components/typescript/fieldset";
import { Input } from "@/components/typescript/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent } from "react";
require('dotenv').config()

export default function Page() {
  const url = process.env.NEXT_PUBLIC_LOCAL;
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    signIn("credentials", { callbackUrl: url });
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 mt-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex-col items-center justify-items-center">
        <h1 className="text-center justify-self-center">Login</h1>
        <form onSubmit={handleLogin}>
        <Field>
          <Label>Email</Label>
          <Input className=" m-4 text-black" name="email" />
          
        </Field>
        <Field>
          <Label>Password</Label>
          <Input className=" m-4 text-black" name="password" type="password" />
          
        </Field>
        <Button type="submit" className=" items-center justify-items-center">Login</Button>
        </form>
      </div>
    </div>
  );
}
