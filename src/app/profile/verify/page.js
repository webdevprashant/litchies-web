"use client"
import React from 'react';
import Router from 'next/router';

const Verify = () => {
  const otp = Router.query.otp
  const mobile = Router.query.mobile;
  console.log(otp, mobile);
  return (
    <div className='w-1/2 block m-auto my-10'>
      <p className='text-2xl font-bold'>OTP Verification</p>
      <p className='text-gray-400 my-4'>OTP has sent to +91 8218475408 </p>
      <form onSubmit={handleSubmit}>
      <div class="flex gap-3">
            <input
                type="number"
                className="w-1/3 h-14 text-2xl font-extrabold text-slate-900 bg-gray-200 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="4" />
        </div>
          <button type="submit" onClick={() => router.push("/profile/verify")} className="w-4/12 text-center my-8 cursor-pointer bg-gray-500 hover:bg-gray-300 text-white py-2 px-12 rounded-lg">Continue</button>
      </form>
    </div>
  )
}
export default Verify;