import React from 'react';
import PeriodicTable from './components/PeriodicTable';
import Abstract from './components/Abstract';
import Contributors from './components/Contributors';

function App() {
  return (
    <main className="py-20 bg-[#fafafa] px-24 flex flex-col items-center gap-32">
      <PeriodicTable />
      <Abstract />
      <Contributors />
    </main>
  );
}

export default App;
