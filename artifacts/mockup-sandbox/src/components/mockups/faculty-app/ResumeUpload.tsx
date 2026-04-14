import React, { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, FileText, UploadCloud, Briefcase, GraduationCap, Tag, Sparkles } from "lucide-react";

export function ResumeUpload() {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: upload, 2: analyzing, 3: profile

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="max-w-[390px] mx-auto min-h-[844px] h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-14 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
        <button className="w-8 h-8 flex items-center justify-center text-slate-600 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-slate-800">AI Profile Builder</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        
        {step === 1 && (
          <div className="space-y-6 h-full flex flex-col">
            <div className="text-center space-y-2 mb-4">
              <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-violet-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Upload Your Resume</h2>
              <p className="text-sm text-slate-500 px-4">Our AI will extract your academic history, publications, and skills automatically.</p>
            </div>

            <div className="flex-1">
              <div className="border-2 border-dashed border-violet-200 bg-violet-50/50 rounded-3xl h-64 flex flex-col items-center justify-center p-6 text-center">
                <UploadCloud className="w-10 h-10 text-violet-400 mb-3" />
                <p className="text-sm font-semibold text-slate-700 mb-1">Tap to browse files</p>
                <p className="text-xs text-slate-500">PDF or DOCX, max 5MB</p>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-xl bg-indigo-950 text-white font-semibold text-sm shadow-lg shadow-indigo-950/20"
            >
              Select File
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 h-full flex flex-col items-center justify-center pb-20">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full animate-spin text-violet-200" viewBox="0 0 36 36">
                <circle className="stroke-current" strokeWidth="3" fill="none" cx="18" cy="18" r="16" />
              </svg>
              <svg className="w-full h-full absolute inset-0 text-violet-600" viewBox="0 0 36 36">
                <path className="stroke-current" strokeDasharray="30, 100" strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32" />
              </svg>
              <Sparkles className="w-8 h-8 text-violet-600 absolute animate-pulse" />
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-slate-800">Analyzing Resume...</h2>
              <p className="text-sm text-slate-500">Extracting academic credentials</p>
            </div>

            <div className="w-full max-w-[200px] h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 w-2/3 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 pb-8">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-emerald-800">Profile Extracted Successfully</h3>
                <p className="text-xs text-emerald-600/80 mt-1">Please review the details below before saving.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-violet-600" />
                  <h4 className="font-bold text-slate-800 text-sm">Key Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Machine Learning", "NLP", "Data Structures", "Research Design"].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-violet-600" />
                  <h4 className="font-bold text-slate-800 text-sm">Education</h4>
                </div>
                <div className="space-y-3">
                  <div className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-violet-600 before:rounded-full">
                    <h5 className="text-sm font-semibold text-slate-800">PhD Computer Science</h5>
                    <p className="text-xs text-slate-500">MIT • 2019</p>
                  </div>
                  <div className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-slate-300 before:rounded-full">
                    <h5 className="text-sm font-semibold text-slate-800">MS Computer Science</h5>
                    <p className="text-xs text-slate-500">Stanford University • 2015</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-violet-600" />
                  <h4 className="font-bold text-slate-800 text-sm">Experience</h4>
                </div>
                <div className="space-y-4">
                  <div className="relative pl-4 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-violet-600 before:rounded-full">
                    <h5 className="text-sm font-semibold text-slate-800">Senior Lecturer</h5>
                    <p className="text-xs text-slate-500 mb-1">IISAT • 2020 - Present</p>
                    <p className="text-xs text-slate-600 leading-relaxed">Taught advanced machine learning courses and supervised 5 graduate students.</p>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-indigo-950 text-white font-semibold text-sm shadow-lg shadow-indigo-950/20">
              Confirm & Save Profile
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
