'use client'
import React from 'react';
import PeriodicTable from './components/PeriodicTable';
import Abstract from './components/Abstract';
import Contributors from './components/Contributors';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <main className="py-20 bg-[#fafafa] px-24 2xl:px-32 3xl:px-64 4xl:px-96 flex flex-col items-center gap-32">
      <div className='flex lg:hidden w-full h-dvh justify-center'>
        <p>Please use a larger screen or landscape mode to visit this website.</p>
      </div>
      <div className='hidden lg:flex flex-col items-center gap-32'>
        <PeriodicTable />
        <Abstract />
        <Contributors />
        <ContactForm />
      </div>
    </main>
  );
}

export default App;
