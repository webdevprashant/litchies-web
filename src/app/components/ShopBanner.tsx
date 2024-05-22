import React from 'react';
import { BACKEND_URL } from '../utils/Constant'

const getShopBanners = async () => {
  const categoriesResponse = await fetch(BACKEND_URL + "/shopBanner" , {
      method: 'GET',
      headers: {
          'Content-Type' : 'application/json',
      }
  });
  const data = await categoriesResponse.json();
  return data;
}

const ShopBanners = async () => {
    const allShopBanners = await getShopBanners();
    return (
        <div className='m-4 p-4 banner'>
            {
                allShopBanners.data.map((banner : any) => (
                    <div key={banner._id} className='w-full' >
                        <img className='h-full w-full object-cover scroll-smooth' src={banner.thumbnail} />
                    </div>
                 ) )
            }
        </div>
    );
}

export default ShopBanners;