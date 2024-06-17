"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react'
import Products from '../components/product/All';

const Search = () => {
  const searchParams = useSearchParams();
  const text = searchParams.get('query');
  console.log("Text : ", text);
  return (
    <Products route={`/common/search/?query=${text}`} query={true} />
  )
}

export default Search;