import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    result();
  }, []);
  const result = async (e) => {
    try {
      const r = await fetch('http://localhost:5000', {
        method: 'GET',

        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(r);
      const rd = await r.json();
      console.log('check frontend');
      console.log(rd);
      setdata(rd);
    } catch (e) {
      console.log(`error is ${e}`);
    }
  };

  return (
    <div className="start">
      <div className=" flex flex-col items-center w-screen ">
        <div className="flex flex-row w-screen justify-evenly p1 bg-purple-900">
          <div>
            <h2 className="Title">HOLODOFIY</h2>
          </div>
          <div className="flex flex-row justify-between gap-8 title2 bg-zinc-400 rounded-lg mt-2 p-1">
            <div>Best Price To Trade</div>
            <div className="ml-3">INR</div>
            <div className="ml-3">ETH</div>
          </div>
          <div className="flex flex-row justify-between gap-3 title3 rounded-lg mt-2 p-1 bg-zinc-400 gap-12">
            <div>Connect Telegram</div>
            <div>Contact Us</div>
            <div className="buy">BUY SOON</div>
          </div>
        </div>

        <div className="flex flex-row w-screen justify-evenly p2 text-yellow-400 bg-purple-900 h-auto p-4">
          <div>PLATFORM</div>
          <div>BUY</div>
          <div>SELL</div>
          <div>LAST</div>
          <div>VOLUME</div>
        </div>

        {data.map((d) => {
          return (
            <div className="flex flex-row w-screen justify-evenly bg-black text-white h-auto p-6">
              <div className="bg-slate-700 p-8">{d.name}</div>
              <div className="bg-slate-700 p-8">{d.buy}</div>
              <div className="bg-slate-700 p-8">{d.sell}</div>
              <div className="bg-slate-700 p-8">{d.last}</div>
              <div className="bg-slate-700 h-auto  p-8">{d.volume}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
