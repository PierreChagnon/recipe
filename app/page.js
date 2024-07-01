import React from 'react';
import PeriodicTable from './components/PeriodicTable';
import Abstract from './components/Abstract';
import Contributors from './components/Contributors';

function App() {
  return (
    <div className="App">  
      <main className="py-20 px-24 flex flex-col gap-44">
        <PeriodicTable />
        <Abstract />
        <Contributors />
      </main>
    </div>
  );
}

export default App;
