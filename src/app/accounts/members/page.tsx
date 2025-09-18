'use client';

import React, { useEffect, useState } from 'react';
import MemberDetailsBodyShape from './details/MembersBodyShape';
import { FaCheckCircle, FaUser, FaMapMarkerAlt, FaEnvelope, FaCog, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import MembersProfileForm from './details/MembersProfileForm';

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Member {
  id: number;
  avatar?: string;
  bio?: string;
  phone?: string;
  address?: string;
  user: User;
  social_media?: Record<string, unknown>;
  role?: string;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface BodyProfile {
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
  const [MemberNotification, setMemberNotification] = useState(true);
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [API_URL]);

  // check if member data are filled or not
  const isMemberDataComplete = member && member.bio && member.phone && member.address && member.avatar;
  const isBodyProfileComplete = bodyProfile && bodyProfile.height && bodyProfile.weight && bodyProfile.chest && bodyProfile.waist && bodyProfile.hips;
  // you can add more fields to check as needed
  const [isProfileFormVisible, setIsProfileFormVisible] = useState(false);

  if (loading) return <div>Loading member data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!member) return <div>No member data found.</div>;

  return (
    <div className=" p-2 mb-20 w-full h-full items-start gap-4 border-amber-400 border-2 rounded-4xl bg-white shadow-lg flex flex-col">
      <div className='w-full flex flex-col lg:flex-row items-start gap-4'>
        {/* Member Info & Body Profile */}
        <div className="relative w-full lg:w-[25%] bg-white border-2 border-gray-200 rounded-3xl shadow-lg p-2
         flex flex-col items-center text-center ">
          {/* completed your profile */}
          <div className="absolute w-full flex justify-end pr-4 z-10 top-4">
            <button
              onClick={() => {
                setIsProfileFormVisible(!isProfileFormVisible);
                setMemberNotification(false);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl mb-2 p-1"
            >
              {isProfileFormVisible ? (
                <FaTimes className="text-[1rem]" />
              ) : (
                <FaCog className="text-[1rem]" />
              )}
            </button>
          </div>
          {MemberNotification && (
            <>
              {!isMemberDataComplete && (
                <div className="w-full mb-4">
                  <div className="relative w-full text-center border-yellow-500 bg-yellow-100 border-l-4 p-4 rounded-2xl 
                    flex flex-col items-center">
                    <div className="w-full flex justify-end">
                      <button
                        onClick={() => (setMemberNotification(!MemberNotification))}
                        className="absolute bg-yellow-500 hover:bg-yellow-600 text-white font-extrabold rounded-lg p-1 hidden"
                      >
                        <FaTimes className="text-[1rem]" />
                      </button>
                    </div>
                    <div
                      className="  text-yellow-700  w-full rounded-lg flex flex-col items-center lg:intems-start"
                      role="alert"
                    >
                      <h4 className="font-extrabold text-xl underline">Complete Your Profile</h4>
                      <p className='text'>For a better experience, please ensure your profile is complete.</p>
                    </div>
                    {/* complete button */}
                    <div className="mt-2 w-full">
                      <button
                        onClick={() => (setIsProfileFormVisible(!isProfileFormVisible))}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg
                        w-[90%] "
                      >
                        Complete Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {/* profile form */}
          {isProfileFormVisible && (
            <div className=" text-black w-full mb-4">
              <MembersProfileForm />
            </div>
          )}
          {member.avatar && (
            <div className="w-[100%] h-[50vh] rounded-2xl overflow-hidden mb-4 relative">
              <Image
                src={member.avatar!.startsWith('http') ? member.avatar! : `${API_URL!}${member.avatar!}`}
                alt="Member Avatar"
                fill
                className="object-cover"
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
        <div className="w-full lg:w-[75%] h-[73vh] px-2 pb-2 bg-white rounded-2xl shadow-inner
          border-2 border-gray-100 overflow-y-auto text-black">
          {/* completed your body profile */}
          {!isBodyProfileComplete && (
            <div className="w-full">
              <div className="w-full text-center  border-yellow-500 bg-yellow-100 border-l-4  rounded-xl flex flex-col  items-center">
                <div
                  className="  text-yellow-700 p-4  w-full rounded-lg flex flex-col items-center "
                  role="alert"
                >
                  <p className="font-extrabold text-xl">Complete Your Body Profile</p>
                  <p>For a better experience, please ensure your body profile is complete.</p>
                </div>
              </div>
            </div>
          )} 
          <MemberDetailsBodyShape bodyProfile={bodyProfile || undefined} />
        </div>
      </div>
    </div>
  );
};

export default MemberAccountDetails;