import React from 'react';
import '../index.css';
import { Header } from './assets/Header';
import art from './assets/art.png';

function ScreenPage() {
  return (
    <div
      onScroll={(evt) => {
        console.log(evt)
      }}
      className="bg-white min-h-screen"
    >
      <Header />
      <section className='flex flex-row items-center w-full min-h-screen px-28 mt-[-4rem]'>
        <div className=''>
          <h1 className='text-5xl font-semibold text-sky-800 leading-snug '>
            Lorem Ipsum <span className=' bg-sky-800 px-2 italic font-bold text-sky-100 rounded-lg'>Project Software</span>.
          </h1>
          <p className='text-sm mt-4 text-slate-400'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <img src={art} width={'60%'} alt="" />
      </section>
      <section className='relative flex flex-row items-center justify-center w-full min-h-screen px-28 mt-[-15rem]'>
        <div className='flex flex-row justify-center gap-6'>
          
          <div className='flex flex-col items-center justify-center gap-y-8 h-60 w-52 p-2 bg-gray-100 rounded-3xl transition-all  border-gray-300 border-[1px]  hover:scale-95'>
            <img
              src="https://avatars.githubusercontent.com/u/112342764?v=4"
              className='h-28 w-28 rounded-full'
              alt="" />
            <div className='mr-4'>
              <h5 className='text-base font-semibold text-sky-800'>Elias</h5>
              <p className='text-gray-500 text-sm'>Dev. Back-end</p>
            </div>
          </div>
         
          </div>
      </section>
    </div>
  );
}

export default ScreenPage;