"use client";

import {
  Trophy,
  Medal,
  TrendingUp,
  Award,
  Crown,
  Star,
  Zap,
} from "lucide-react";

export default function Leaderboard() {
  // Mock leaderboard data
  const topUsers = [
    {
      rank: 1,
      name: "Sarah Johnson",
      points: 12450,
      reports: 156,
      avatar: "SJ",
      color: "from-yellow-400 to-amber-500",
      badge: "🏆",
      streak: 45,
    },
    {
      rank: 2,
      name: "Michael Chen",
      points: 11280,
      reports: 142,
      avatar: "MC",
      color: "from-slate-300 to-slate-400",
      badge: "🥈",
      streak: 38,
    },
    {
      rank: 3,
      name: "Emma Williams",
      points: 10950,
      reports: 138,
      avatar: "EW",
      color: "from-orange-400 to-amber-600",
      badge: "🥉",
      streak: 42,
    },
  ];

  const otherUsers = [
    {
      rank: 4,
      name: "James Anderson",
      points: 9840,
      reports: 124,
      avatar: "JA",
      streak: 28,
    },
    {
      rank: 5,
      name: "Olivia Martinez",
      points: 9320,
      reports: 118,
      avatar: "OM",
      streak: 31,
    },
    {
      rank: 6,
      name: "William Brown",
      points: 8750,
      reports: 110,
      avatar: "WB",
      streak: 25,
    },
    {
      rank: 7,
      name: "Sophia Davis",
      points: 8420,
      reports: 106,
      avatar: "SD",
      streak: 22,
    },
    {
      rank: 8,
      name: "Benjamin Wilson",
      points: 7980,
      reports: 101,
      avatar: "BW",
      streak: 19,
    },
    {
      rank: 9,
      name: "Isabella Garcia",
      points: 7650,
      reports: 96,
      avatar: "IG",
      streak: 17,
    },
    {
      rank: 10,
      name: "Lucas Rodriguez",
      points: 7320,
      reports: 92,
      avatar: "LR",
      streak: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Leaderboard</h1>
              <p className="text-slate-600">
                Top eco-warriors making a difference
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* 2nd Place */}
              <div className="order-1">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-6 text-center border-2 border-slate-300">
                  <div className="text-4xl mb-2">🥈</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {topUsers[1].avatar}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    {topUsers[1].name}
                  </h3>
                  <p className="text-2xl font-bold text-slate-700 mb-1">
                    {topUsers[1].points.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-600">
                    {topUsers[1].reports} reports
                  </p>
                </div>
              </div>

              {/* 1st Place */}
              <div className="order-2">
                <div className="bg-gradient-to-br from-yellow-100 to-amber-200 rounded-lg p-6 text-center border-2 border-yellow-400 relative -mt-4">
                  <Crown className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 ring-4 ring-yellow-300">
                    {topUsers[0].avatar}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    {topUsers[0].name}
                  </h3>
                  <p className="text-3xl font-bold text-yellow-700 mb-1">
                    {topUsers[0].points.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-600">
                    {topUsers[0].reports} reports
                  </p>
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{topUsers[0].rank}
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="order-3">
                <div className="bg-gradient-to-br from-orange-100 to-amber-200 rounded-lg p-6 text-center border-2 border-orange-300">
                  <div className="text-4xl mb-2">🥉</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                    {topUsers[2].avatar}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    {topUsers[2].name}
                  </h3>
                  <p className="text-2xl font-bold text-orange-700 mb-1">
                    {topUsers[2].points.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-600">
                    {topUsers[2].reports} reports
                  </p>
                </div>
              </div>
            </div>

            {/* Rest of Leaderboard */}
            <div className="space-y-3">
              {otherUsers.map((user) => (
                <div
                  key={user.rank}
                  className="bg-white border border-slate-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-slate-700">
                        #{user.rank}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.avatar}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {user.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>{user.reports} reports</span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-orange-500" />
                          {user.streak} day streak
                        </span>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">
                        {user.points.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">points</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Stats */}
          <div className="space-y-6">
            {/* Your Rank Card */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-5 h-5" />
                <h3 className="font-semibold">Your Rank</h3>
              </div>
              <div className="text-4xl font-bold mb-2">#24</div>
              <p className="text-green-100 text-sm mb-4">
                Keep going! You are in top 5%
              </p>
              <div className="bg-white/20 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress to #23</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div
                    className="bg-white rounded-full h-2"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      First Report
                    </p>
                    <p className="text-xs text-slate-600">
                      Submitted your first waste report
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl">🔥</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      7 Day Streak
                    </p>
                    <p className="text-xs text-slate-600">
                      Reported waste for 7 days straight
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Community Hero
                    </p>
                    <p className="text-xs text-slate-600">
                      Reached 50 reports milestone
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                This Month
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">
                    Reports Submitted
                  </span>
                  <span className="text-lg font-bold text-slate-900">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Points Earned</span>
                  <span className="text-lg font-bold text-green-600">
                    1,840
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Current Streak</span>
                  <span className="text-lg font-bold text-orange-600">
                    12 days
                  </span>
                </div>
              </div>
            </div>

            {/* Rewards Info */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-6 text-white">
              <Medal className="w-8 h-8 mb-3" />
              <h3 className="font-semibold mb-2">Unlock Rewards</h3>
              <p className="text-sm text-purple-100 mb-3">
                Reach top 10 to unlock exclusive eco-friendly rewards!
              </p>
              <button className="w-full bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors text-sm">
                View Rewards
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
