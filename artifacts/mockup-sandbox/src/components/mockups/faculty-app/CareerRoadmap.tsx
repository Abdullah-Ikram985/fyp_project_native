import React from "react";
import { ArrowLeft, BookOpen, BrainCircuit, CheckCircle, ChevronDown, Clock, Home, Search, Briefcase, User, Sparkles, TrendingUp, PlayCircle } from "lucide-react";

export function CareerRoadmap() {
  return (
    <div className="max-w-[390px] mx-auto min-h-[844px] h-screen bg-slate-50 flex flex-col relative pb-20">
      
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 border-b border-slate-100 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <button className="w-8 h-8 flex items-center justify-center text-slate-600 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-800">Career Roadmap</h1>
          <div className="w-8"></div>
        </div>
        
        <div className="bg-slate-100 rounded-xl p-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">Target Role</p>
            <p className="text-sm font-bold text-slate-800">Professor of AI/ML</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        
        {/* Match Score Area */}
        <div className="bg-gradient-to-br from-indigo-950 to-violet-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-900/20">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="w-14 h-14 shrink-0 rounded-full border-4 border-white/20 flex items-center justify-center bg-violet-600/50">
              <span className="text-xl font-bold">71<span className="text-sm">%</span></span>
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">You're a 71% match.</h2>
              <p className="text-violet-200 text-xs mt-1">Here's what to improve to reach 90%+</p>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-[10px] font-semibold text-violet-200 mb-1.5">
              <span>Current: 71%</span>
              <span>Target: 95%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-[71%] rounded-full relative">
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BrainCircuit className="w-4 h-4 text-orange-500" />
            <h3 className="font-bold text-slate-800 text-sm">Identified Skill Gaps</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: "Research Publication", color: "bg-orange-100 text-orange-700 border-orange-200" },
              { name: "TensorFlow Advanced", color: "bg-red-100 text-red-700 border-red-200" },
              { name: "Grant Writing", color: "bg-amber-100 text-amber-700 border-amber-200" }
            ].map(skill => (
              <span key={skill.name} className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${skill.color}`}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="font-bold text-slate-800 text-sm mb-3">Recommended Actions</h3>
          <div className="space-y-3">
            
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">Advanced TensorFlow</h4>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+15% Match</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">Coursera • DeepLearning.AI</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 4 weeks</span>
                  <span className="flex items-center gap-1"><PlayCircle className="w-3 h-3" /> Online</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">NSF Grant Writing</h4>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+9% Match</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">Workshop • Nature Masterclasses</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2 days</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <button className="w-full py-4 rounded-xl bg-indigo-950 text-white font-semibold text-sm shadow-lg shadow-indigo-950/20">
          Start Learning Plan
        </button>

      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 flex justify-between items-center px-6 pb-4 pt-2 z-50">
        {[
          { icon: Home, label: "Home", active: false },
          { icon: Search, label: "Jobs", active: false },
          { icon: Briefcase, label: "Applications", active: false },
          { icon: User, label: "Profile", active: true }
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
