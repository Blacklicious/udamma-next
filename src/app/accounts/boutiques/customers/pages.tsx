'use client';

import React, { useEffect, useState } from 'react';

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
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [API_URL, boutiqueId]);

  if (loading) return <div>Loading members...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!members.length) return <div>No members linked to this boutique.</div>;

  return (
    <div className="p-4">
      <ul className="space-y-4">
        {members.map((member) => (
          <li key={member.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
            {member.avatar && (
              <img
                src={member.avatar.startsWith('http') ? member.avatar : `${API_URL}${member.avatar}`}
                alt={member.user.first_name}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <div className="font-semibold">{member.user.first_name} {member.user.last_name}</div>
              <div className="text-sm text-gray-500">{member.user.email}</div>
              <div className="text-sm">{member.phone}</div>
              <div className="text-sm">{member.address}</div>
              <div className="text-sm hidden lg:block">{member.bio}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoutiqueMembersList;