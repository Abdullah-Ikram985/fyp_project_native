import React from "react";
import { Bookmark, Home, Search, Briefcase, User, SlidersHorizontal, MapPin, DollarSign, Sparkles } from "lucide-react";

export function JobRecommendations() {
  const jobs = [
    {
      id: 1,
      uni: "University of California, Berkeley",
      role: "Assistant Professor",
      dept: "Computer Science",
      loc: "Berkeley, CA",
      salary: "$120k - $150k",
      match: 96,
      bestMatch: true,
      color: "bg-blue-600"
    },
    {
      id: 2,
      uni: "Georgia Institute of Technology",
      role: "Associate Professor",
      dept: "Artificial Intelligence",
      loc: "Atlanta, GA",
      salary: "$130k - $160k",
      match: 88,
      bestMatch: false,
      color: "bg-amber-500"
    },
    {
      id: 3,
      uni: "University of Washington",
      role: "Lecturer",
      dept: "Machine Learning",
      loc: "Seattle, WA",
      salary: "$90k - $110k",
      match: 82,
      bestMatch: false,
      color: "bg-purple-600"
    }
  ];

  return (
    <div className="max-w-[390px] mx-auto min-h-[844px] h-screen bg-slate-50 flex flex-col relative pb-20">
      
      {/* Header & Search */}
      <div className="bg-white px-6 pt-14 pb-4 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search faculty positions..." 
              className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-violet-500/50 outline-none"
            />
          </div>
          <button className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1 -mx-6 px-6">
          {["All", "CS", "AI/ML", "Mathematics", "Remote"].map((filter, i) => (
            <button 
              key={filter} 
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border ${i === 0 ? 'bg-indigo-950 text-white border-indigo-950' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className={`bg-white rounded-2xl border ${job.bestMatch ? 'border-violet-300 shadow-md shadow-violet-100/50 relative overflow-hidden' : 'border-slate-200 shadow-sm'} p-5`}>
            {job.bestMatch && (
              <div className="absolute top-0 right-0 bg-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> BEST MATCH
              </div>
            )}
            
            <div className="flex gap-4 items-start mb-4">
              <div className={`w-12 h-12 rounded-xl ${job.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                {job.uni.charAt(0)}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-bold text-slate-800 text-base leading-tight">{job.role}</h3>
                <p className="text-xs text-slate-500 mt-1">{job.uni}</p>
              </div>
              <button className="text-slate-300 hover:text-violet-600 mt-1">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {job.loc}
              </span>
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1">
                <DollarSign className="w-3 h-3" /> {job.salary}
              </span>
              <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {job.match}% AI Match
              </span>
            </div>

            <div className="flex gap-2">
              <button className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${job.bestMatch ? 'bg-indigo-950 text-white hover:bg-indigo-900' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                Quick Apply
              </button>
              <button className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex justify-between items-center px-6 pb-4 pt-2 z-50">
        {[
          { icon: Home, label: "Home", active: false },
          { icon: Search, label: "Jobs", active: true },
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
