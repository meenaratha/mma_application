import { useRef, useState } from "react";

interface GymProfile {
  gymName: string;
  branchName: string;
  dateOpened: string;
  eligibility: string;
  address: string;
  state: string;
  city: string;
  pinCode: string;
  workingHours: string;
  workingStaff: string;
  email: string;
  contactNumber: string;
  language: string;
  shortDescription: string;
  avatarUrl: string | null;
}

const defaultProfile: GymProfile = {
  gymName: "Raj GYM",
  branchName: "M.K.B Nagar",
  dateOpened: "10/2/2026",
  eligibility: "Male - Female",
  address: "West Mambalam, Chennai -600 033",
  state: "Tamil Nadu",
  city: "Chennai",
  pinCode: "600 033",
  workingHours: "Mon - Sat ( 05:00 AM - 10:00 PM )",
  workingStaff: "05",
  email: "Rajgym.03@gmail.com",
  contactNumber: "9345665444",
  language: "English, Tamil",
  shortDescription:
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
  avatarUrl: null,
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1">
    <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{label} :</span>
    <span className="text-sm text-gray-600">{value}</span>
  </div>
);

export default function GymProfilePage() {
  const [profile] = useState<GymProfile>(defaultProfile);
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg py-8 px-6 sm:px-10">

        {/* Top row: avatar + edit button */}
        <div className="flex items-start justify-between mb-8">
          {/* Avatar */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-20 h-20">
              <div
                className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-yellow-800 via-green-900 to-black flex items-center justify-center cursor-pointer"
                onClick={() => fileRef.current?.click()}
              >
                {avatar ? (
                  <img src={avatar} alt="gym logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-yellow-400">G</span>
                )}
              </div>
              {/* Edit pencil badge */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute top-0 right-0 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
            </div>
          </div>

          {/* Edit Profile button */}
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-md whitespace-nowrap"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Edit Profile
          </button>
        </div>

        {/* Info Card */}
        <div className="border border-gray-200 rounded-2xl p-5 sm:p-7 flex flex-col gap-5">

          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoItem label="Gym Name" value={profile.gymName} />
            <InfoItem label="Branch Name" value={profile.branchName} />
            <InfoItem label="Date Of Opened" value={profile.dateOpened} />
            <InfoItem label="Eligibility" value={profile.eligibility} />
          </div>

          <hr className="border-gray-100" />

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoItem label="Address" value={profile.address} />
            <InfoItem label="State" value={profile.state} />
            <InfoItem label="City" value={profile.city} />
            <InfoItem label="Pin code" value={profile.pinCode} />
          </div>

          <hr className="border-gray-100" />

          {/* Row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem label="Working Hours" value={profile.workingHours} />
            <InfoItem label="Working Staff" value={profile.workingStaff} />
            <InfoItem label="Email id" value={profile.email} />
          </div>

          <hr className="border-gray-100" />

          {/* Row 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Contact Number" value={profile.contactNumber} />
            <InfoItem label="Language" value={profile.language} />
          </div>

          <hr className="border-gray-100" />

          {/* Short Description */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Short Description :</span>
            <span className="text-sm text-gray-600">{profile.shortDescription}</span>
          </div>

        </div>
      </div>
    </div>
  );
}