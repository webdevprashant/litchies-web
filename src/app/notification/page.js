import Image from 'next/image';

const Notification = () => {
  return (
    <div className='w-full h-[50vh] flex justify-center items-center px-8 text-pretty font-semibold'>No Notifications <Image width={30} height={30} src="/images/no-notification.png" alt='Notification' /> </div>
  )
}

export default Notification;