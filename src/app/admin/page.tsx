"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Truck,
  BarChart3,
  Leaf,
  Users,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  MapPin,
  Calendar,
  Download,
  Filter,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="font-bold text-lg">Z</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg text-slate-900">ZeroBin</h1>
                <p className="text-xs text-slate-500">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<Truck size={20} />}
            label="Fleet"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<BarChart3 size={20} />}
            label="Analytics"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<Leaf size={20} />}
            label="Carbon Offsets"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<Users size={20} />}
            label="Users"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Settings"
            sidebarOpen={sidebarOpen}
          />
        </nav>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <svg
            className={`w-4 h-4 text-slate-600 transition-transform ${
              sidebarOpen ? "" : "rotate-180"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  AD
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-900">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-500">admin@zerobin.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Waste Collected"
              value="24.8 tons"
              change="+12.5%"
              trend="up"
              icon={<Truck className="w-5 h-5" />}
            />
            <StatCard
              title="Recycle Rate"
              value="82.4%"
              change="+5.2%"
              trend="up"
              icon={<Leaf className="w-5 h-5" />}
            />
            <StatCard
              title="CO2 Saved"
              value="112 kg"
              change="-2.1%"
              trend="down"
              icon={<TrendingUp className="w-5 h-5" />}
            />
            <StatCard
              title="Active Vehicles"
              value="24"
              change="+3"
              trend="up"
              icon={<MapPin className="w-5 h-5" />}
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Waste Collection Trends
                  </h3>
                  <p className="text-sm text-slate-500">Last 7 days</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Calendar size={18} className="text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Download size={18} className="text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-3">
                {[65, 78, 45, 89, 72, 95, 68].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {height}%
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <ActivityItem
                  title="Route EV-01 completed"
                  time="5 min ago"
                  type="success"
                />
                <ActivityItem
                  title="New user registered"
                  time="12 min ago"
                  type="info"
                />
                <ActivityItem
                  title="Bin #234 needs attention"
                  time="1 hour ago"
                  type="warning"
                />
                <ActivityItem
                  title="Report generated"
                  time="2 hours ago"
                  type="success"
                />
                <ActivityItem
                  title="System maintenance"
                  time="3 hours ago"
                  type="info"
                />
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Fleet Status
                </h3>
                <p className="text-sm text-slate-500">
                  Real-time vehicle tracking
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Vehicle ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <TableRow
                    vehicle="EV-001"
                    driver="John Smith"
                    status="active"
                    location="Downtown"
                    progress={75}
                  />
                  <TableRow
                    vehicle="EV-002"
                    driver="Sarah Johnson"
                    status="active"
                    location="Westside"
                    progress={45}
                  />
                  <TableRow
                    vehicle="EV-003"
                    driver="Mike Davis"
                    status="idle"
                    location="Depot"
                    progress={100}
                  />
                  <TableRow
                    vehicle="EV-004"
                    driver="Emma Wilson"
                    status="active"
                    location="Eastside"
                    progress={62}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  sidebarOpen,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  sidebarOpen: boolean;
}) {
  return (
    <Link
      href="#"
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        active
          ? "bg-emerald-50 text-emerald-700 font-medium"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span className={active ? "text-emerald-600" : ""}>{icon}</span>
      {sidebarOpen && <span className="text-sm">{label}</span>}
    </Link>
  );
}

function StatCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
          {icon}
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            trend === "up" ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-sm text-slate-500">{title}</p>
    </div>
  );
}

function ActivityItem({
  title,
  time,
  type,
}: {
  title: string;
  time: string;
  type: "success" | "warning" | "info";
}) {
  const colors = {
    success: "bg-emerald-100 text-emerald-600",
    warning: "bg-amber-100 text-amber-600",
    info: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-2 h-2 rounded-full mt-2 ${colors[type].replace(
          "100",
          "500"
        )}`}
      ></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{time}</p>
      </div>
    </div>
  );
}

function TableRow({
  vehicle,
  driver,
  status,
  location,
  progress,
}: {
  vehicle: string;
  driver: string;
  status: string;
  location: string;
  progress: number;
}) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-slate-900">{vehicle}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-slate-600">{driver}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            status === "active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-slate-600">{location}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-slate-500 w-10 text-right">
            {progress}%
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button className="p-1 hover:bg-slate-100 rounded transition-colors">
          <MoreVertical size={16} className="text-slate-400" />
        </button>
      </td>
    </tr>
  );
}
