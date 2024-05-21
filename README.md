This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



// const Category = async () => {
//   const allCategories = await getCategories();
//   return (
//     <div className='relative m-4 p-4'>
//       <p className='text-right p-2'><span className='font-serif'>Browser all Categories <img className='inline w-4' src='images/arrow-right.svg' /></span> </p>
//       <button
//         className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md`}
//       >
//         <img src='images/nav-arrow-left.svg' />
//       </button>
//       <div className='overflow-x-hidden flex scroll-smooth' 
//       >
//         {
//           allCategories.data.map((category : any) => (
//             <div key={category._id} className='category m-2 p-1 text-center bg-gray-100 rounded-lg hover:bg-gray-200 flex-shrink-0'>
//               <div className='flex justify-center category-image w-32'>
//                 <img className='rounded-2xl max-w-[100px] bg-cover' src={category.image} alt={category.name} />
//               </div>
//               <div className='category-name m-1 p-1 font-serif'>
//                 <p>{category.name}</p>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//       <button 
//         className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md`}
//       >
//         <img src='images/nav-arrow-right.svg' />
//       </button>
//     </div>
//   );


//   // return (
//   //   <div className='relative m-4 p-10 '>
//   //     <button 
//   //       className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md`}
//   //     >
//   //       ⬅️
//   //     </button>
//   //     {/* <div className='overflow-x-scroll scrollbar-hide flex'> */}
//   //     <div className='overflow-x-scroll flex'>
//   //       {
//   //         allCategories.data.map((category : any) => (
//   //           <div key={category._id} className='category m-2 p-1 text-center bg-gray-100 rounded-lg hover:bg-gray-200 flex-shrink-0'>
//   //             <div className='flex justify-center category-image w-32'>
//   //               <img className='rounded-2xl max-w-[100px] ' src={category.image} alt={category.name} />
//   //             </div>
//   //             <div className='category-name m-1 p-1 font-sans'>
//   //               <p>{category.name}</p>
//   //             </div>
//   //           </div>
//   //         ))
//   //       }
//   //     </div>
//   //     <button 
//   //       className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full shadow-md` }
//   //     >
//   //       ➡️
//   //     </button>
//   //   </div>
//   // );
// };

