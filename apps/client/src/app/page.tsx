"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  store_id: number;
  customers_in: number;
  customers_out: number;
  time_stamp: string;
};

export default function Home() {
  const [live, setLive] = useState<Message[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchLive = async () => {
      const res = await axios.get("http://localhost:4000/api/live");
      setLive(res.data);
    };
    const fetchHistory = async () => {
      const res = await axios.get("http://localhost:4000/api/history");
      setHistory(res.data);
    };

    fetchLive();
    fetchHistory();
    const interval = setInterval(() => {
      fetchLive();
      fetchHistory();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Customer Flow Dashboard</h1>

      {/* Live Table */}
      <section className="mb-12 bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          Live Activity
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Time</th>
                <th className="px-4 py-2 border">Store ID</th>
                <th className="px-4 py-2 border text-green-600">In</th>
                <th className="px-4 py-2 border text-red-600">Out</th>
              </tr>
            </thead>
            <tbody>
              {live.map((msg, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{msg.time_stamp}</td>
                  <td className="px-4 py-2 border">{msg.store_id}</td>
                  <td className="px-4 py-2 border">{msg.customers_in}</td>
                  <td className="px-4 py-2 border">{msg.customers_out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* History Table */}
      <section className="bg-white p-6 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">
          24-Hour History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Hour</th>
                <th className="px-4 py-2 border text-green-600">Total In</th>
                <th className="px-4 py-2 border text-red-600">Total Out</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{h.hour}</td>
                  <td className="px-4 py-2 border">{h.customers_in}</td>
                  <td className="px-4 py-2 border">{h.customers_out}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
