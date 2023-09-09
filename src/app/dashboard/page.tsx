import { createCheckoutLink, createCustomerIfNull, createCustomerPortalLink, fetchSession, hasSubscription } from '@/lib/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardPage = async () => {

    const session = await fetchSession();

    if (!session) {
        redirect("/")
    }

    await createCustomerIfNull(session);

    const subStatus = await hasSubscription(session);

    const checkoutLink = await createCheckoutLink(session);

    const billingPortalLink = await createCustomerPortalLink(session);

    return (
        <div className='text-white p-10'>
            {
                subStatus ? (
                    <div className='flex items-center justify-center w-full flex-col gap-24'>
                        <Link href={billingPortalLink ? billingPortalLink : ""} className='white_button'>Manage Billing</Link>
                        <div className='flex flex-col gap-5'>
                            <h1 className='text-2xl'>Your Secret Image is:</h1>
                            <Image width={700} height={700} src={"/dog.avif"} alt='Dog Image' />
                        </div>
                    </div>
                ) : (
                    <div className='space-y-[100px] w-full'>
                        <div className='min-h-[100px] bg-gray-600 text-black flex items-center justify-center text-2xl gap-4 rounded-xl'>
                            No Active Subscription!
                            <Link href={"" + checkoutLink} className='black_button'>Checkout</Link>
                        </div>
                        <div className='text-white text-2xl text-center'>
                            You don&apos;t get to see the secret image!
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DashboardPage