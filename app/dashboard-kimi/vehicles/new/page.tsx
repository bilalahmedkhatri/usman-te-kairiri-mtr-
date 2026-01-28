'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, Save, X, Upload, Package, Gauge, Palette, Settings,
  MapPin, FileText, CheckCircle, AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const MotionDiv = motion.div;
const MotionButton = motion.button;

export default function AddVehiclePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Vehicle state matching database schema
  const [vehicle, setVehicle] = useState({
    // Basic info
    stock_number: '',
    vin_chassis: '',
    make: '',
    model: '',
    year_manufacture: '',
    year_registration: '',
    price_fob: '',
    status: 'available',
    featured: false,
    
    // Specifications
    engine_code: '',
    engine_cc: '',
    fuel_type: 'petrol',
    transmission: 'automatic',
    drive_type: '2wd',
    steering: 'rhd',
    seats: '',
    doors: '',
    color_exterior: '',
    color_interior: '',
    trim_grade: '',
    mileage_km: '',
    vehicle_type: 'sedan',
    options: {
      sunroof: false,
      leather: false,
      navigation: false,
      camera: false,
      sensors: false
    },
    
    // Logistics
    length_cm: '',
    width_cm: '',
    height_cm: '',
    weight_kg: '',
    current_port_id: '',
    origin_country: 'Japan',
    hs_code: '',
    inspection_status: 'none',
    export_cert_status: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Calculate M3
    const m3 = (parseFloat(vehicle.length_cm) * parseFloat(vehicle.width_cm) * parseFloat(vehicle.height_cm)) / 1000000;
    
    // API call would go here
    console.log('Submitting vehicle:', {...vehicle, m3});
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/vehicles');
    }, 2000);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Car },
    { id: 'specs', label: 'Specifications', icon: Settings },
    { id: 'logistics', label: 'Logistics', icon: Package },
  ];

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Add New Vehicle</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Register a new vehicle in the inventory</p>
        </div>
        
        <div className="flex gap-2">
          <MotionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </MotionButton>
          <MotionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <AlertCircle className="w-4 h-4" />
                </motion.div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Vehicle
              </>
            )}
          </MotionButton>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <MotionButton
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </MotionButton>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Number</label>
                <input
                  type="text"
                  value={vehicle.stock_number}
                  onChange={(e) => setVehicle({...vehicle, stock_number: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">VIN/Chassis Number</label>
                <input
                  type="text"
                  value={vehicle.vin_chassis}
                  onChange={(e) => setVehicle({...vehicle, vin_chassis: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Make</label>
                <select
                  value={vehicle.make}
                  onChange={(e) => setVehicle({...vehicle, make: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  required
                >
                  <option value="">Select Make</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Subaru">Subaru</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Model</label>
                <input
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => setVehicle({...vehicle, model: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Manufacture Year</label>
                <input
                  type="number"
                  value={vehicle.year_manufacture}
                  onChange={(e) => setVehicle({...vehicle, year_manufacture: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Registration Year</label>
                <input
                  type="number"
                  value={vehicle.year_registration}
                  onChange={(e) => setVehicle({...vehicle, year_registration: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">FOB Price (JPY)</label>
                <input
                  type="number"
                  value={vehicle.price_fob}
                  onChange={(e) => setVehicle({...vehicle, price_fob: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <select
                  value={vehicle.status}
                  onChange={(e) => setVehicle({...vehicle, status: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                  <option value="shipped">Shipped</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={vehicle.featured}
                  onChange={(e) => setVehicle({...vehicle, featured: e.target.checked})}
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Feature this vehicle on homepage</span>
              </label>
            </div>
          </MotionDiv>
        )}

        {/* Specifications Tab */}
        {activeTab === 'specs' && (
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Engine & Performance */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Engine & Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Engine Code</label>
                  <input
                    type="text"
                    value={vehicle.engine_code}
                    onChange={(e) => setVehicle({...vehicle, engine_code: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Engine CC</label>
                  <input
                    type="number"
                    value={vehicle.engine_cc}
                    onChange={(e) => setVehicle({...vehicle, engine_cc: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fuel Type</label>
                  <select
                    value={vehicle.fuel_type}
                    onChange={(e) => setVehicle({...vehicle, fuel_type: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="ev">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Drive Type</label>
                  <select
                    value={vehicle.drive_type}
                    onChange={(e) => setVehicle({...vehicle, drive_type: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  >
                    <option value="2wd">2WD</option>
                    <option value="4wd">4WD</option>
                    <option value="awd">AWD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Steering</label>
                  <select
                    value={vehicle.steering}
                    onChange={(e) => setVehicle({...vehicle, steering: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  >
                    <option value="rhd">Right Hand Drive</option>
                    <option value="lhd">Left Hand Drive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seats</label>
                  <input
                    type="number"
                    value={vehicle.seats}
                    onChange={(e) => setVehicle({...vehicle, seats: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Doors</label>
                  <input
                    type="number"
                    value={vehicle.doors}
                    onChange={(e) => setVehicle({...vehicle, doors: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Exterior Color</label>
                  <div className="relative">
                    <Palette className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={vehicle.color_exterior}
                      onChange={(e) => setVehicle({...vehicle, color_exterior: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interior Color</label>
                  <input
                    type="text"
                    value={vehicle.color_interior}
                    onChange={(e) => setVehicle({...vehicle, color_interior: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trim Grade</label>
                  <input
                    type="text"
                    value={vehicle.trim_grade}
                    onChange={(e) => setVehicle({...vehicle, trim_grade: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mileage (km)</label>
                  <div className="relative">
                    <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={vehicle.mileage_km}
                      onChange={(e) => setVehicle({...vehicle, mileage_km: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vehicle Type</label>
                  <select
                    value={vehicle.vehicle_type}
                    onChange={(e) => setVehicle({...vehicle, vehicle_type: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  >
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="bus">Bus</option>
                    <option value="coupe">Coupe</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="wagon">Wagon</option>
                    <option value="van">Van</option>
                  </select>
                </div>
              </div >
            </div >

    {/* Options */ }
    < div className = "bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800" >
              <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Features & Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(vehicle.options).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setVehicle({...vehicle, options: {...vehicle.options, [key]: e.target.checked}})}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div >
          </MotionDiv >
        )}

{/* Logistics Tab */ }
{
    activeTab === 'logistics' && (
        <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
        >
            {/* Dimensions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Dimensions & Weight
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length (cm)</label>
                        <input
                            type="number"
                            value={vehicle.length_cm}
                            onChange={(e) => setVehicle({ ...vehicle, length_cm: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Width (cm)</label>
                        <input
                            type="number"
                            value={vehicle.width_cm}
                            onChange={(e) => setVehicle({ ...vehicle, width_cm: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (cm)</label>
                        <input
                            type="number"
                            value={vehicle.height_cm}
                            onChange={(e) => setVehicle({ ...vehicle, height_cm: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weight (kg)</label>
                        <input
                            type="number"
                            value={vehicle.weight_kg}
                            onChange={(e) => setVehicle({ ...vehicle, weight_kg: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Port</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                                value={vehicle.current_port_id}
                                onChange={(e) => setVehicle({ ...vehicle, current_port_id: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                            >
                                <option value="">Select Port</option>
                                <option value="1">Yokohama</option>
                                <option value="2">Nagoya</option>
                                <option value="3">Osaka</option>
                                <option value="4">Kobe</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Origin Country</label>
                        <input
                            type="text"
                            value={vehicle.origin_country}
                            onChange={(e) => setVehicle({ ...vehicle, origin_country: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HS Code</label>
                        <input
                            type="text"
                            value={vehicle.hs_code}
                            onChange={(e) => setVehicle({ ...vehicle, hs_code: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                            placeholder="e.g., 8703.23.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Inspection Status</label>
                        <select
                            value={vehicle.inspection_status}
                            onChange={(e) => setVehicle({ ...vehicle, inspection_status: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                        >
                            <option value="none">None</option>
                            <option value="pending">Pending</option>
                            <option value="passed">Passed</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={vehicle.export_cert_status}
                            onChange={(e) => setVehicle({ ...vehicle, export_cert_status: e.target.checked })}
                            className="w-5 h-5 rounded"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Export Certificate Ready</span>
                    </label>
                </div>
            </div>

            {/* Documentation */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documentation & Images
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Images</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-400">Multiple images allowed</p>
                            <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => console.log(e.target.files)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Documents</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Export certificates, inspection reports</p>
                            <input type="file" multiple accept=".pdf,.doc,.docx" className="hidden" />
                        </div>
                    </div>
                </div>
            </div>
        </MotionDiv>
    )
}
      </form >
    </MotionDiv >
  );
}