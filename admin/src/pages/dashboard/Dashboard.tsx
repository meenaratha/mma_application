import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardStats, useMembers, useWorkoutFilter } from '../../hooks/useDashboard';
import StatCard from '../../components/dashboard/StatCard';
import BarChart from '../../components/dashboard/BarChart';
import WorkoutPanel from '../../components/dashboard/WorkoutPanel';
import MembersTable from '../../components/dashboard/MembersTable';
import { CHART_DATA } from '../../data/dashboard';


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { members, searchQuery, setSearchQuery } = useMembers();
  const { activeCategory, handleCategoryChange } = useWorkoutFilter();
  const { totalMembers, basicMembers, planMembers, totalEarnings } = useDashboardStats();

  return (
    <div className=" bg-gray-50/60 p-4 md:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 md:p-7 lg:p-8">

          {/* TOP SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_1.4fr] gap-5 mb-6">

            {/* Left: Branding */}
            <div className="flex flex-col gap-5">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm">🐄</span>
                </div>
                <span className="font-bold text-gray-800 text-lg">purplecow</span>
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                  Manage your<br />Fitness Business
                </h1>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl px-5 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                  aria-label="Add new member"
                  onClick={() => navigate('/admin/post')}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add new member
                </button>

                <button
                  className="border border-gray-300 text-gray-700 font-semibold rounded-xl px-5 py-3 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                  aria-label="Go to dashboard"
                  onClick={() => navigate('/admin')}
                >
                  Go To Dashboard
                </button>
              </div>
            </div>

            {/* Middle: Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                title="Total Members"
                value={`${totalMembers.toLocaleString()}`}
                subtitle="Strength"
                bgColor="bg-amber-50"
                textColor="text-amber-600"
                icon="🏋️"
              />
              <StatCard
                title="Total Earnings"
                value={`₹ ${totalEarnings.toLocaleString()}`}
                bgColor="bg-blue-50"
                textColor="text-blue-600"
                icon="💰"
              />
              <StatCard
                title="Basic Members"
                value={basicMembers.toLocaleString()}
                subtitle="Strength"
                bgColor="bg-pink-50"
                textColor="text-pink-500"
                icon="🎯"
              />
              <StatCard
                title="Plan Members"
                value={planMembers.toLocaleString()}
                subtitle="Strength"
                bgColor="bg-green-50"
                textColor="text-green-600"
                icon="📋"
              />
            </div>

            {/* Right: Chart */}
            <div className="bg-amber-50 rounded-2xl p-5">
              <h2 className="text-base font-bold text-amber-700 mb-4 flex items-center gap-2">
                <span>🏅</span> Total members statistics
              </h2>
              <div className="overflow-x-auto">
                <BarChart
                  data={CHART_DATA}
                  height={140}
                  showEmojis
                  aria-label="Monthly member statistics bar chart"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-5">
            {/* Workout Panel */}
            <WorkoutPanel
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Members Table */}
            <MembersTable
              members={members}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              className="border border-gray-100"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
