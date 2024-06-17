import Image from 'next/image';
import React from 'react'

const Notification = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center px-8'>No Notifications <Image width={30} height={30} src="/images/no-notification.png" /> </div>
  )
}

export default Notification;