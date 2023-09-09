import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='text-white w-full flex p-5 items-center justify-between'>
            <h1 className='text-3xl'>Logo</h1>
            <div className='gap-5 flex items-center '>
                <Link href={"/"} className='px-4 py-2 bg-white text-black rounded-xl'>Home</Link>
                <Link href={"/dashboard"} className='px-4 py-2 bg-white text-black rounded-xl'>Dashboard</Link>
            </div>
        </div>
    )
}

export default Header