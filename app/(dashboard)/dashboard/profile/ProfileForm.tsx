"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  User as UserIcon, Mail, Phone, MapPin, Building, Save, X, Camera,
  Lock, Globe, Edit2, ArrowRight
} from 'lucide-react';
import { updateProfile } from '@/app/actions/profile';
import { toast } from 'react-hot-toast';

const MotionDiv = motion.div;
const MotionButton = motion.button;

interface ProfileFormProps {
  user: {
    id: number;
    name: string | null;
    email: string | null;
    phone: string | null;
    country: string | null;
    role: string;
    image: string | null;
  };
  company: {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
  } | null;
}

export default function ProfileForm({ user, company }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    country: user.country || 'Kenya',
    companyName: company?.name || '',
    companyAddress: company?.address || '',
    companyPhone: company?.phone || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        companyName: formData.companyName,
        companyAddress: formData.companyAddress,
        companyPhone: formData.companyPhone,
      });

      if (result.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch {
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
          <MotionButton
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-4 right-4 p-3 bg-white dark:bg-gray-900 rounded-full shadow-lg"
          >
            <Camera className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </MotionButton>
        </div>

        <div className="px-6 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-32 h-32 bg-gray-200 dark:bg-gray-800 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center overflow-hidden relative">
                {user.image ? (
                   <Image 
                     src={user.image} 
                     alt={formData.name || 'User profile'} 
                     fill
                     className="object-cover" 
                   />
                ) : (
                  <UserIcon className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <MotionButton
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full shadow-lg"
              >
                <Camera className="w-4 h-4 text-white" />
              </MotionButton>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{formData.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">{formData.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
              </span>
            </div>

            {!isEditing ? (
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </MotionButton>
            ) : (
              <div className="flex gap-2">
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </MotionButton>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-50 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-50 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-50 transition-all"
                  placeholder="+254712345678"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  aria-label="Select Country"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-50 transition-all appearance-none"
                >
                  <option value="Kenya">Kenya</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Japan">Japan</option>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-4 mt-2">Company Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-50 transition-all"
                  placeholder="ACME Corp"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.companyPhone}
                  onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-50 transition-all"
                  placeholder="+254712345678"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.companyAddress}
                  onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                  disabled={!isEditing || isSubmitting}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white disabled:opacity-50 transition-all resize-none"
                  placeholder="123 Business Rd, Nairobi"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex justify-end gap-4"
            >
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:bg-blue-400"
              >
                {isSubmitting ? (
                   <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </MotionButton>
            </MotionDiv>
          )}
        </form>

        {/* Security Section */}
        {!isEditing && (
          <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mt-6 mb-4">Security & Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MotionButton
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">Change Password</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">Language Settings</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </MotionButton>
            </div>
          </div>
        )}
      </div>
    </MotionDiv>
  );
}
