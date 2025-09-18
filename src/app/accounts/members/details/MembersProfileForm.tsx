'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaUser, FaPhone, FaMapMarkerAlt, FaFileImage, FaInfoCircle, FaSave } from 'react-icons/fa';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

interface MemberProfile {
  id: number;
  user: { username: string; email: string; first_name: string; last_name: string };
  bio?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role?: string;
  social_media?: Record<string, string>;
}

const MembersProfileForm = () => {
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/accounts/members/api/`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data.member);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('boutique', 'Udamma Online');
      if (profile?.bio) formData.append('bio', profile.bio);
      if (profile?.phone) formData.append('phone', profile.phone);
      if (profile?.address) formData.append('address', profile.address);
      if (profile?.social_media) formData.append('social_media', JSON.stringify(profile.social_media));
      if (avatarFile) formData.append('avatar', avatarFile);

      const res = await fetch(`${API_URL}/accounts/members/api/`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update profile');
      }

      setSuccess('✅ Profile updated successfully!');
      setAvatarFile(null);
      window.location.reload();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading profile...</div>;
  if (!profile) return <div className="p-6 text-center text-gray-500">No profile found.</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto bg-white p-2 rounded-2xl shadow-xl space-y-2"
    >
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaUser className="text-blue-600" /> Edit Member Profile
      </h2>

      {error && <div className="text-red-600 bg-red-50 p-2 rounded">{error}</div>}
      {success && <div className="text-green-600 bg-green-50 p-2 rounded">{success}</div>}

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative w-full h-88 mb-2">
          <Image
            src={
              avatarPreview
                ? avatarPreview
                : profile.avatar
                ? `${API_URL}${profile.avatar}`
                : '/img/avatar-placeholder.png'
            }
            alt="Avatar"
            fill
            className="rounded-2xl object-cover border shadow"
            unoptimized
          />
        </div>
        <label className="cursor-pointer flex items-center gap-2 text-sm text-blue-600 hover:underline">
          <FaFileImage /> Change Avatar
          <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </label>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" /> Bio
        </label>
        <textarea
          name="bio"
          value={profile.bio || ''}
          onChange={handleProfileChange}
          rows={3}
          className="w-full border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 flex items-center gap-2">
          <FaPhone className="text-blue-500" /> Phone
        </label>
        <input
          type="text"
          name="phone"
          value={profile.phone || ''}
          onChange={handleProfileChange}
          className="w-full border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-500" /> Address
        </label>
        <input
          type="text"
          name="address"
          value={profile.address || ''}
          onChange={handleProfileChange}
          className="w-full border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Save button */}
      <div className="pt-4 w-full">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 
            bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
            hover:from-blue-600 hover:to-blue-800 
            text-white font-semibold rounded-full shadow-lg 
            transition-all duration-300 focus:ring-2 focus:ring-blue-300"
        >
          <FaSave /> Save Changes
        </button>
      </div>
    </form>
  );
};

export default MembersProfileForm;
