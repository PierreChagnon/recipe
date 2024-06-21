import React from 'react';
import NavBar from './components/NavBar';
import PeriodicTable from './components/PeriodicTable';
import Abstract from './components/Abstract';
import Contributors from './components/Contributors';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="py-20 px-24 flex flex-col gap-44">
        <PeriodicTable />
        <Abstract />
        <Contributors />
      </main>
    </div>
  );
}

export default App;
