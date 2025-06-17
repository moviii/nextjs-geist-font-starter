"use client";

import React from 'react';
import IPTracker from '../components/iptracker/IPTracker';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-white">Real IP Tracker</h1>
        <p className="mt-2 text-lg text-center text-gray-300">Enter an IP address to retrieve detailed geolocation information.</p>
      </header>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl p-6">
        <IPTracker />
      </div>
    </main>
  );
}
