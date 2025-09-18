import React, { useState, useEffect } from 'react';
import {
  FaRulerVertical, FaWeight, FaArrowsAltH, FaChild,
  FaHandPaper, FaCompressAlt,
} from 'react-icons/fa';
import { GiArmBandage, GiBodyHeight, GiLeg } from 'react-icons/gi';
import { TbRulerMeasure } from 'react-icons/tb';
import type { BodyProfile } from '../page';



const measurementMeta: {
  key: keyof BodyProfile;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: 'height', label: 'Height', icon: <GiBodyHeight /> },
  { key: 'weight', label: 'Weight', icon: <FaWeight /> },
  { key: 'neck', label: 'Neck', icon: <FaRulerVertical /> },
  { key: 'shoulder_width', label: 'Shoulder Width', icon: <FaArrowsAltH /> },
  { key: 'bicep', label: 'Bicep', icon: <GiArmBandage /> },
  { key: 'arm_length', label: 'Arm Length', icon: <GiArmBandage /> },
  { key: 'sleeve_length', label: 'Sleeve Length', icon: <FaCompressAlt /> },
  { key: 'wrist', label: 'Wrist', icon: <FaHandPaper /> },
  { key: 'back_length', label: 'Back Length', icon: <TbRulerMeasure /> },
  { key: 'torso_length', label: 'Torso Length', icon: <TbRulerMeasure /> },
  { key: 'chest', label: 'Chest', icon: <FaChild /> },
  { key: 'bust', label: 'Bust', icon: <FaChild /> },
  { key: 'waist', label: 'Waist', icon: <FaCompressAlt /> },
  { key: 'front_rise', label: 'Front Rise', icon: <TbRulerMeasure /> },
  { key: 'crotch_depth', label: 'Crotch Depth', icon: <TbRulerMeasure /> },
  { key: 'hips', label: 'Hips', icon: <FaCompressAlt /> },
  { key: 'thigh', label: 'Thigh', icon: <GiLeg /> },
  { key: 'knee', label: 'Knee', icon: <GiLeg /> },
  { key: 'calf', label: 'Calf', icon: <GiLeg /> },
  { key: 'ankle', label: 'Ankle', icon: <GiLeg /> },
  { key: 'inseam', label: 'Inseam', icon: <TbRulerMeasure /> },
  { key: 'skirt_length', label: 'Skirt Length', icon: <TbRulerMeasure /> },
  { key: 'dress_length', label: 'Dress Length', icon: <TbRulerMeasure /> },
];

const EditableMemberDetailsBodyShape = ({
  bodyProfile,
}: {
  bodyProfile?: BodyProfile;
}) => {
  const [formData, setFormData] = useState<Partial<BodyProfile>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (bodyProfile) {
      setFormData({ ...bodyProfile });
    }
  }, [bodyProfile]);

  const handleChange = (key: keyof BodyProfile, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/accounts/members/api/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          body_profile: formData,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update body profile');
      }

      setSuccess('Body measurements updated successfully!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!bodyProfile) {
    return <div className="text-gray-500">No body profile data available.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <h3 className=" bg-gray-100 p-2 rounded-lg  px-3 font-black text-xl mb-2 shadaw-sm">Edit Body Measurements</h3>
      {loading && (
        <div className="flex justify-center items-center mb-4">
          <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></span>
          <span className="ml-2 text-blue-600">Saving...</span>
        </div>
      )}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {measurementMeta.map(({ key, label, icon }) => (
          <div
            key={key}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-100 hover:shadow-md transition"
          >
            <label className="flex flex-col text-sm text-gray-700 gap-1">
              <div className="flex items-center gap-2 font-medium text-gray-800">
                <span className="text-blue-600 text-lg">{icon}</span>
                {label}
              </div>
              <input
                type="text"
                value={
                  typeof formData[key] === 'string' || typeof formData[key] === 'number'
                    ? formData[key]
                    : ''
                }
                onChange={(e) => handleChange(key, e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Enter ${label.toLowerCase()}`}
                disabled={loading}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right w-full">
        <button
          type="submit"
          className="px-6 py-3 w-full rounded-xl shadow-lg text-white font-semibold
            bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
            hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
            focus:outline-none focus:ring-2 focus:ring-blue-300
            transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default EditableMemberDetailsBodyShape;
