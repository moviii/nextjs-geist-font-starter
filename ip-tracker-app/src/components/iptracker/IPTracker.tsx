"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import dynamic from 'next/dynamic';

// Dynamically import MapViewer to avoid SSR issues with Leaflet
const MapViewer = dynamic(() => import('./MapViewer'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 rounded-lg animate-pulse" />
});

interface IPDetails {
  ip: string;
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp?: string;
}

export default function IPTracker() {
  const [ipInput, setIpInput] = useState('');
  const [ipDetails, setIpDetails] = useState<IPDetails | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<IPDetails[]>([]);

  const validateIP = (ip: string) => {
    // IPv4 validation
    const ipv4Segments = ip.split('.');
    if (ipv4Segments.length === 4) {
      return ipv4Segments.every(segment => {
        const num = parseInt(segment, 10);
        return num >= 0 && num <= 255 && segment === num.toString();
      });
    }
    
    // IPv6 validation
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv6Regex.test(ip);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIpDetails(null);

    if (!ipInput.trim()) {
      setError('Please enter an IP address.');
      return;
    }

    if (!validateIP(ipInput)) {
      setError('Please enter a valid IP address.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://ipapi.co/${ipInput}/json/`);
      if (!response.ok) {
        throw new Error('Failed to fetch IP details.');
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.reason || 'Failed to fetch IP details.');
      }
      
      const formattedData = {
        ip: data.ip,
        city: data.city || 'Unknown City',
        region: data.region || 'Unknown Region',
        country: data.country_name || 'Unknown Country',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        timezone: data.timezone || 'Unknown Timezone',
        isp: data.org || 'Unknown ISP',
      };

      setIpDetails(formattedData);
      setHistory((prev) => [formattedData, ...prev].slice(0, 10)); // Keep only last 10 searches
    } catch (err: any) {
      console.error('IP Lookup Error:', err);
      setError(err.message || 'Failed to fetch IP details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const formEvent = new Event('submit', { bubbles: true, cancelable: true });
    handleSubmit(formEvent as any);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="w-full max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <form 
          onSubmit={handleSubmit} 
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="Enter IP Address..."
                className="w-full h-12 text-lg px-4 bg-white/90"
                disabled={loading}
              />
              {error && (
                <p className="text-red-500 mt-2 text-sm font-medium">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={loading || !ipInput}
              className="h-12 px-8 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleButtonClick}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Tracking...</span>
                </span>
              ) : (
                'Track IP'
              )}
            </Button>
          </div>
        </form>
      </div>

      {ipDetails && (
        <>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">IP Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">IP Address</p>
                <p className="font-semibold">{ipDetails.ip}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{ipDetails.city}, {ipDetails.region}, {ipDetails.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Coordinates</p>
                <p className="font-semibold">{ipDetails.latitude}, {ipDetails.longitude}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Timezone</p>
                <p className="font-semibold">{ipDetails.timezone}</p>
              </div>
              {ipDetails.isp && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">ISP</p>
                  <p className="font-semibold">{ipDetails.isp}</p>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Location Map</h2>
            <MapViewer latitude={ipDetails.latitude} longitude={ipDetails.longitude} />
          </Card>
        </>
      )}

      {history.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Search History</h3>
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                onClick={() => setIpDetails(item)}
              >
                <p className="font-semibold">{item.ip}</p>
                <p className="text-sm text-gray-500">{item.city}, {item.country}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
