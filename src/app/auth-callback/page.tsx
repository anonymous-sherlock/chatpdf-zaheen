"use client"

import {useRouter, useSearchParams} from 'next/navigation'
import { Loader2 } from 'lucide-react';
import { trpc } from '../_trpc/client'

export default function page() {
    const router =useRouter()
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

 trpc.authCallback.useQuery(undefined,{
    onSuccess:({success})=>{
      if (success) {
        return router.push(origin?`/${origin}`:'/dashboard')
      }
    },

    onError:(err)=>{
      if(err.data?.code==="UNAUTHORIZED"){
        router.push('/signin')
      }
    },
    retry:true,
    retryDelay:500
   })
    
  return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800'/>
          <p className='font-semibold text-x1'> Setting up your account...</p>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
  )
}
  	