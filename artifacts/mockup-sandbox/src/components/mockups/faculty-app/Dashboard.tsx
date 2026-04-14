import React from "react";
import { Bell, Briefcase, ChevronRight, Eye, FileText, Home, Search, Target, User, Sparkles } from "lucide-react";

export function Dashboard() {
  return (
    <div className="max-w-[390px] mx-auto min-h-[844px] h-screen bg-slate-50 flex flex-col relative pb-20">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-indigo-950 text-white px-6 pt-14 pb-12 rounded-b-[32px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="relative z-10 flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-violet-200 border-2 border-white/20 overflow-hidden flex items-center justify-center text-indigo-950 font-bold text-lg">
                AR
              </div>
              <div>
                <p className="text-violet-200 text-sm font-medium">Good morning,</p>
                <h2 className="text-xl font-bold">Dr. Aisha</h2>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-indigo-950"></span>
            </button>
          </div>
        </div>

        {/* AI Match Card - Positioned to overlap header */}
        <div className="px-6 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex items-center gap-5">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-violet-600" strokeDasharray="87, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-lg font-bold text-indigo-950 leading-none mt-1">87<span className="text-[10px]">%</span></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                <h3 className="font-semibold text-slate-800 text-sm">Profile Match Score</h3>
              </div>
              <p className="text-xs text-slate-500 mb-2 leading-relaxed">Upload your latest resume to increase your score to 94%.</p>
              <button className="text-xs font-semibold text-violet-600 flex items-center gap-1">
                Upload Resume <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-6 py-6 grid grid-cols-3 gap-3">
          {[
            { label: "Applications", value: "4", icon: FileText, color: "bg-blue-50 text-blue-600" },
            { label: "Saved Jobs", value: "12", icon: Target, color: "bg-violet-50 text-violet-600" },
            { label: "Profile Views", value: "28", icon: Eye, color: "bg-emerald-50 text-emerald-600" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className={`w-8 h-8 rounded-full ${stat.color} flex items-center justify-center mb-2`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-800 leading-none mb-1">{stat.value}</span>
              <span className="text-[10px] font-medium text-slate-500">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Recommended Jobs */}
        <div className="pt-2 pb-6">
          <div className="px-6 flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-slate-800">Recommended for You</h3>
            <button className="text-xs font-medium text-violet-600">See All</button>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar px-6 gap-4 pb-4">
            {[
              {
                id: 1,
                uni: "Stanford University",
                role: "Assistant Professor",
                dept: "Computer Science",
                loc: "Stanford, CA",
                match: 94
              },
              {
                id: 2,
                uni: "MIT",
                role: "Associate Professor",
                dept: "AI & Machine Learning",
                loc: "Cambridge, MA",
                match: 89
              }
            ].map((job) => (
              <div key={job.id} className="w-[280px] shrink-0 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {job.uni.charAt(0)}
                  </div>
                  <div className="bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] font-bold text-emerald-700">{job.match}% Match</span>
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{job.role}</h4>
                <p className="text-xs text-slate-500 mb-1">{job.uni} • {job.dept}</p>
                <p className="text-xs text-slate-400 mb-4">{job.loc}</p>
                <button className="w-full py-2.5 bg-indigo-950 text-white text-xs font-semibold rounded-xl hover:bg-indigo-900 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex justify-between items-center px-6 pb-4 pt-2 z-50">
        {[
          { icon: Home, label: "Home", active: true },
          { icon: Search, label: "Jobs", active: false },
          { icon: Briefcase, label: "Applications", active: false },
          { icon: User, label: "Profile", active: false }
        ].map((item, i) => (
          <button key={i} className="flex flex-col items-center gap-1 p-2">
            <item.icon className={`w-6 h-6 ${item.active ? 'text-violet-600' : 'text-slate-400'}`} strokeWidth={item.active ? 2.5 : 2} />
            <span className={`text-[10px] font-medium ${item.active ? 'text-violet-600' : 'text-slate-400'}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
