'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Globe, Shield, CreditCard, Bell, Palette,
  Save, Key
} from 'lucide-react';

const MotionDiv = motion.div;
const MotionButton = motion.button;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'site', label: 'Site Config', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your platform preferences</p>
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
              className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${activeTab === tab.id
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

      {/* Content */}
      {activeTab === 'general' && <GeneralSettings />}
      {activeTab === 'site' && <SiteSettings />}
      {activeTab === 'security' && <SecuritySettings />}
      {activeTab === 'billing' && <BillingSettings />}
      {activeTab === 'notifications' && <NotificationSettings />}
      {activeTab === 'appearance' && <AppearanceSettings />}
    </MotionDiv>
  );
}

function GeneralSettings() {
  const [formData, setFormData] = useState({
    companyName: 'TE KAIRIRI MOTORS',
    email: 'admin@tekairiri.com',
    phone: '+254712345678',
    address: 'Nairobi, Kenya',
    timezone: 'Africa/Nairobi',
    currency: 'JPY',
    language: 'en',
  });

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">General Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
          <select
            value={formData.timezone}
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="Africa/Nairobi">Africa/Nairobi</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Currency</label>
          <select
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="JPY">Japanese Yen (JPY)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="KES">Kenyan Shilling (KES)</option>
            <option value="TZS">Tanzanian Shilling (TZS)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <MotionButton
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </MotionButton>
      </div>
    </MotionDiv>
  );
}

function SiteSettings() {
  const [siteData, setSiteData] = useState({
    domain: 'tekairirimotor.com',
    name: 'TE KAIRIRI MOTORS',
    theme: 'blue',
    logo: '',
    contactEmail: 'info@tekairiri.com',
    phone: '+254712345678',
    whatsapp: '+254712345678',
    address: 'Nairobi, Kenya',
  });

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Site Configuration</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domain</label>
          <input
            type="text"
            value={siteData.domain}
            onChange={(e) => setSiteData({ ...siteData, domain: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Name</label>
          <input
            type="text"
            value={siteData.name}
            onChange={(e) => setSiteData({ ...siteData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Color</label>
          <select
            value={siteData.theme}
            onChange={(e) => setSiteData({ ...siteData, theme: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Email</label>
            <input
              type="email"
              value={siteData.contactEmail}
              onChange={(e) => setSiteData({ ...siteData, contactEmail: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={siteData.phone}
              onChange={(e) => setSiteData({ ...siteData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">WhatsApp</label>
            <input
              type="tel"
              value={siteData.whatsapp}
              onChange={(e) => setSiteData({ ...siteData, whatsapp: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
            <input
              type="text"
              value={siteData.address}
              onChange={(e) => setSiteData({ ...siteData, address: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

function SecuritySettings() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>
          </div>
          <MotionButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Key className="w-4 h-4" />
            Update Password
          </MotionButton>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Two-Factor Authentication</h3>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5 rounded" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable 2FA for admin accounts</span>
          </label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Requires SMS or authenticator app</p>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Login Attempts</h3>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5 rounded" defaultChecked />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lock account after 5 failed attempts</span>
          </label>
        </div>
      </div>
    </MotionDiv>
  );
}

function BillingSettings() {
  const [billingData] = useState({
    plan: 'professional',
    status: 'active',
    nextBilling: '2024-08-01',
    amount: 299,
    autoRenew: true,
  });

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Billing & Plans</h2>
      <div className="space-y-6">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
          <h3 className="text-lg font-semibold">Current Plan: Professional</h3>
          <p className="text-2xl font-bold mt-2">${billingData.amount}/month</p>
          <p className="text-sm mt-1">Next billing: {billingData.nextBilling}</p>
          <p className="text-xs mt-2">Unlimited vehicles • Multi-currency • Priority support</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Payment Method</h3>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/25</p>
                </div>
              </div>
              <MotionButton
                whileHover={{ scale: 1.02 }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Update
              </MotionButton>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Billing History</h3>
          <div className="space-y-2">
            {[
              { date: 'Jul 1, 2024', amount: '$299.00', status: 'Paid' },
              { date: 'Jun 1, 2024', amount: '$299.00', status: 'Paid' },
              { date: 'May 1, 2024', amount: '$299.00', status: 'Paid' },
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{invoice.date}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.status}</p>
                </div>
                <p className="font-bold text-gray-800 dark:text-white">{invoice.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}

function NotificationSettings() {
  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Notification Preferences</h2>
      <div className="space-y-4">
        {[
          { id: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
          { id: 'sms', label: 'SMS Notifications', desc: 'Receive updates via SMS' },
          { id: 'push', label: 'Push Notifications', desc: 'Receive browser push notifications' },
          { id: 'vehicle', label: 'Vehicle Alerts', desc: 'Get notified when new vehicles are added' },
          { id: 'order', label: 'Order Updates', desc: 'Get notified about order status changes' },
          { id: 'payment', label: 'Payment Reminders', desc: 'Get notified about upcoming payments' },
        ].map((notification) => (
          <label key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded mt-1"
              defaultChecked={['email', 'vehicle', 'order'].includes(notification.id)}
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800 dark:text-white">{notification.label}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{notification.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </MotionDiv>
  );
}

function AppearanceSettings() {
  const [theme, setTheme] = useState('light');

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-800"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Appearance</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
          <div className="grid grid-cols-3 gap-4">
            <MotionButton
              whileHover={{ scale: 1.02 }}
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border-2 ${theme === 'light' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white`}
            >
              <div className="w-full h-8 bg-blue-500 rounded mb-2"></div>
              <p className="text-sm font-medium">Light</p>
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.02 }}
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border-2 ${theme === 'dark' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'
                } bg-gray-900`}
            >
              <div className="w-full h-8 bg-gray-700 rounded mb-2"></div>
              <p className="text-sm font-medium text-white">Dark</p>
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 1.02 }}
              onClick={() => setTheme('auto')}
              className={`p-4 rounded-xl border-2 ${theme === 'auto' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-700'
                } bg-gradient-to-b from-white to-gray-900`}
            >
              <div className="w-full h-8 bg-gradient-to-r from-blue-500 to-gray-700 rounded mb-2"></div>
              <p className="text-sm font-medium">Auto</p>
            </MotionButton>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
          <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
            <option>English</option>
            <option>Swahili</option>
            <option>Japanese</option>
            <option>French</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Size</label>
          <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </div>
      </div>
    </MotionDiv>
  );
}