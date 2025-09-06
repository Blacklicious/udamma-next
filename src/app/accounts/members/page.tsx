'use client';

import React, { useEffect, useState } from 'react';
import MemberDetailsBodyShape from './details/MembersBodyShape';
import { FaCheckCircle, FaUser, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Member {
  id: number;
  avatar?: string;
  bio?: string;
  phone?: string;
  address?: string;
  user: User;
  social_media?: any;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

interface BodyProfile {
  id: number;
  member: Member;
  height?: string;
  weight?: string;
  neck?: string;
  shoulder_width?: string;
  bicep?: string;
  arm_length?: string;
  sleeve_length?: string;
  wrist?: string;
  back_length?: string;
  torso_length?: string;
  chest?: string;
  bust?: string;
  waist?: string;
  front_rise?: string;
  crotch_depth?: string;
  hips?: string;
  thigh?: string;
  knee?: string;
  calf?: string;
  ankle?: string;
  inseam?: string;
  skirt_length?: string;
  dress_length?: string;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse {
  member: Member;
  body_profile?: BodyProfile;
}

const MemberAccountDetails = () => {
  const [member, setMember] = useState<Member | null>(null);
  const [bodyProfile, setBodyProfile] = useState<BodyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setError('API URL is not configured.');
      setLoading(false);
      return;
    }

    const fetchMember = async () => {
      try {
        const res = await fetch(`${API_URL}/accounts/members/api`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch member data');
        const data: ApiResponse = await res.json();
        setMember(data.member);
        setBodyProfile(data.body_profile || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [API_URL]);

  if (loading) return <div>Loading member data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!member) return <div>No member data found.</div>;

  return (
    <div className=" p-4 mb-20 flex flex-col lg:flex-row items-start gap-4 border-amber-400 border-2 rounded-4xl bg-gray-200/70 ]">
      <div className="w-full lg:w-[25%] bg-white rounded-3xl shadow-lg p-3 flex flex-col items-center text-center h-[60vh] overflow-y-auto">
        {/* Avatar */}
        {member.avatar && (
          <div className="w-full h-62 rounded-2xl overflow-hidden mb-4 relative">
            <img
              src={member.avatar.startsWith('http') ? member.avatar : `${API_URL}${member.avatar}`}
              alt="Member Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Name & Verified */}
        <div className="flex items-center gap-1 mb-1">
          <h2 className="text-lg font-semibold text-gray-900">
            {member.user.first_name} {member.user.last_name}
          </h2>
          <FaCheckCircle className="text-green-500 w-5 h-5" />
        </div>

        {/* Stats */}
        <div className="flex flex-col justify-between items-center w-full px-6 mb-4 text-gray-500 text-sm">
          <div className="flex items-center gap-1">
            <FaUser className="w-4 h-4" />
            <span>{member.phone || '—'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{member.address || '—'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEnvelope className="w-4 h-4" />
            <span>{member.user.email || 'N/A'}</span>
          </div>
        </div>

        {/* Additional Details */}
        <div className="p-4 bg-gray-100 rounded-2xl shadow-inner w-full">
          <div className="text-left space-y-2 text-sm text-gray-700">
            <div>
              <strong>Bio:</strong> {member.bio || 'N/A'}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[75%] h-[60vh] p-4 bg-white rounded-2xl shadow-inner 
	  overflow-y-auto">
        <MemberDetailsBodyShape bodyProfile={bodyProfile || undefined} />
      </div>
    </div>
  );
};

export default MemberAccountDetails;