import Image from 'next/image';
import React from 'react'

const Reels = () => {
  return (
    <div className='flex justify-center items-center'>
        <Image width={500} height={500} src='/images/no-data-found.gif' alt='No Data Found' />
    </div>
  )
}

export default Reels;