'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User, Save, X, Upload, Mail, Phone, Shield,
  AlertCircle, Eye, EyeOff, Building2, Clock
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const MotionDiv = motion.div;

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'MANAGER' | 'USER' | 'DEALER' | 'SUPPLIER' | 'BUYER' | 'VIEWER';
  status: 'active' | 'inactive';
  password: string;
  confirmPassword: string;
  bio: string;
  address: string;
  department: string;
  avatar?: File | null;
}

export default function EditUserPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'USER',
    status: 'active',
    password: '',
    confirmPassword: '',
    bio: '',
    address: '',
    department: '',
    avatar: null,
  });

  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock user data
        const mockUser = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+1 (555) 123-4567',
          role: 'MANAGER' as const,
          status: 'ACTIVE' as const,
          bio: 'Experienced manager with 10+ years in the industry.',
          address: '123 Main St, New York, NY 10001',
          department: 'Sales',
          password: '',
          confirmPassword: '',
          avatar: null,
        };

        setFormData(mockUser);
        setLastUpdated('2024-01-15 14:30:00');
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Only validate password if user wants to change it
    if (changePassword) {
      if (!formData.password || formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // API call would go here
      let updateData: Partial<UserFormData> | UserFormData;
      if (!changePassword) {
        const rest = { ...formData };
        // @ts-expect-error: password might not exist on rest
        delete rest.password;
        // @ts-expect-error: confirmPassword might not exist on rest
        delete rest.confirmPassword;
        updateData = rest;
      } else {
        updateData = formData;
      }

      console.log('Updating user:', updateData, 'for ID:', userId);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccessMessage('User updated successfully!');
      setTimeout(() => {
        router.push('/dashboard/users');
      }, 1500);
    } catch {
      setErrors({ email: 'Failed to update user. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatar: file }));
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'account', label: 'Account Settings', icon: Shield },
    { id: 'additional', label: 'Additional Info', icon: Building2 },
  ];

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">Edit User</h1>
            <Badge variant={formData.status === 'active' ? 'default' : 'secondary'}>
              {formData.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="w-4 h-4" />
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <AlertCircle className="w-4 h-4" />
                </motion.div>
                Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update User
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Alert className="mb-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <p className="text-green-800 dark:text-green-200">{successMessage}</p>
        </Alert>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Button>
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
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email (Read-only) */}
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      readOnly
                      className="pl-10 bg-muted cursor-not-allowed"
                      title="Email cannot be changed"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be modified</p>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Avatar Upload */}
                <div className="md:col-span-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => document.getElementById('avatar')?.click()}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('avatar')?.click(); }}
                    aria-label="Upload new profile picture"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" aria-hidden="true" />
                    <p className="text-sm text-muted-foreground">Click to upload new picture or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                    <label htmlFor="avatar">Profile Picture</label>
                    <input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                  {formData.avatar && (
                    <p className="text-sm text-muted-foreground mt-2">
                      New file selected: {formData.avatar.name}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </MotionDiv>
        )}

        {/* Account Settings Tab */}
        {activeTab === 'account' && (
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Settings
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Role */}
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value as UserFormData['role'])}
                      className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="USER">User</option>
                      <option value="MANAGER">Manager</option>
                      <option value="ADMIN">Admin</option>
                      <option value="DEALER">Dealer</option>
                      <option value="SUPPLIER">Supplier</option>
                      <option value="BUYER">Buyer</option>
                      <option value="VIEWER">Viewer</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <Label htmlFor="status">Status *</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value as UserFormData['status'])}
                      className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Change Password Toggle */}
                <div className="pt-4 border-t border-border">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={changePassword}
                      onChange={(e) => setChangePassword(e.target.checked)}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm font-medium">Change Password</span>
                  </label>
                </div>

                {/* Password Fields (only shown if changing) */}
                {changePassword && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* New Password */}
                    <div>
                      <Label htmlFor="password">New Password *</Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder="••••••••"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters</p>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                      <div className="relative mt-1">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="••••••••"
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </MotionDiv>
        )}

        {/* Additional Info Tab */}
        {activeTab === 'additional' && (
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Additional Information
              </h2>
              <div className="space-y-4">
                {/* Department */}
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="e.g., Sales, Engineering, Marketing"
                    className="mt-1"
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Bio / Description</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Brief description about the user..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Street address, City, State, ZIP"
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>
          </MotionDiv>
        )}
      </form>
    </MotionDiv>
  );
}