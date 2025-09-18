'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface Member {
  id: number;
  user: User;
  bio?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

const BoutiqueMembersList = ({ boutiqueId }: { boutiqueId: number }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_URL}/accounts/boutiques/${boutiqueId}/members/api/`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch members');
        const data = await res.json();
        setMembers(data.members || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [API_URL, boutiqueId]);

  if (loading) return <div>Loading members...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!members.length) return <div>No members linked to this boutique.</div>;

  const getAvatarUrl = (avatar: string) => {
    if (/^https?:\/\//i.test(avatar)) {
      return avatar;
    }
    return `${API_URL}${avatar}`;
  };

  return (
    <div className="py-4 ">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-4 bg-white p-2 rounded-3xl shadow h-min
           hover:scale-[1.02] transition">
            {member.avatar && (
              <div className="flex-shrink-0 ">
                <Image
                  src={getAvatarUrl(member.avatar)}
                  alt={member.user.first_name}
                  width={108}
                  height={208}
                  className="rounded-2xl object-cover h-[150px]"
                />
              </div>
            )}
            <div>
              <div className="font-semibold">
                {member.user.first_name} {member.user.last_name}
              </div>
              <div className="text-sm text-gray-500">
                {member.user.email}
              </div>
              {member.phone && <div className="text-sm">{member.phone}</div>}
              {member.address && <div className="text-sm">{member.address}</div>}
              {member.bio && (
                <div className="text-sm hidden lg:block">{member.bio}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoutiqueMembersList;