"use client";
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'
import Products from '../components/product/All';
import Loader from '../components/home/loading';

const SearchContent = () => {
  const searchParams = useSearchParams();
  const text = searchParams.get('query');
  return (
    <Products route={`/common/search/?query=${text}`} query={true} />
  )
}

const Search = () => {
  return (
    <Suspense fallback={ <Loader /> }>
        <SearchContent />
    </Suspense>
  )
}

export default Search;