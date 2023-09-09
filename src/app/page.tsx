import Image from 'next/image';
import Link from 'next/link'
import { fetchSession } from "@/lib/helpers";
import StripePricingTable from '@/components/StripePricingtable';

export default async function Home() {

  const session = await fetchSession();

  if (session) {
    return (
      <div className='text-white flex flex-col gap-10 p-10 items-center'>
        <Image src={session?.user?.image!} alt={"profile image"} width={50} height={50} className='rounded-full' />
        <h1 className="text-3xl">Logged In as {session.user?.name}</h1>
        <Link href={"/api/auth/signout"} className="bg-white text-black py-2 px-4 rounded-xl">Sign Out</Link>
        <StripePricingTable />
      </div>
    )
  }

  return (
    <div className='my-10 max-w-5xl flex items-start justify-center'>
      <Link href={"/sign-in"} className='bg-white text-black py-2 px-4 rounded-xl'>Sign in using discord</Link>
    </div>
  )
}
