import { DialogButton } from '@/components/UploadButton';
import Image from 'next/image'

import Link from 'next/link';

export default function Home() {
  return (
   <div className='h-screen flex justify-center items-center'>

<Link href='/login'>Click me</Link>
<div>
<DialogButton/>
</div>

   </div>
  )
}
