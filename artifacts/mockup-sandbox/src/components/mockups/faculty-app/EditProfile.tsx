import React, { useState } from "react";
import {
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  GraduationCap,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  User,
  X,
} from "lucide-react";

const skills = ["Python", "Machine Learning", "NLP", "TensorFlow", "Deep Learning", "Data Analysis"];
const newSkill = "Research Methods";

export function EditProfile() {
  return (
    <div className="max-w-[390px] mx-auto min-h-[844px] bg-slate-50 flex flex-col relative">
      {/* Header */}
      <div className="bg-indigo-950 pt-14 pb-6 px-5 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-violet-600/25 rounded-full blur-[60px]" />
        <div className="relative z-10 flex items-center gap-3 mb-6">
          <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg flex-1">Edit Profile</h1>
          <button className="h-9 px-4 rounded-full bg-violet-600 flex items-center gap-1.5">
            <Check className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">Save</span>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-violet-200 border-4 border-white/20 flex items-center justify-center text-indigo-950 font-extrabold text-2xl shadow-lg">
              AR
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-violet-600 border-2 border-indigo-950 flex items-center justify-center shadow">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-violet-300 text-xs mt-2">Tap to change photo</p>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 pb-10">

        {/* Personal Info */}
        <Section title="Personal Information" icon={<User className="w-4 h-4 text-violet-600" />}>
          <Field label="Full Name" value="Dr. Aisha Raza" />
          <Field label="Title / Designation" value="Assistant Professor" />
          <Field label="Current Institution" value="IISAT University" />
          <Field label="Department" value="Computer Science" />
        </Section>

        {/* Contact */}
        <Section title="Contact Details" icon={<Mail className="w-4 h-4 text-violet-600" />}>
          <Field label="Email Address" value="aisha.raza@iisat.edu.pk" type="email" icon={<Mail className="w-4 h-4 text-slate-400" />} />
          <Field label="Phone Number" value="+92 300 1234567" type="tel" icon={<Phone className="w-4 h-4 text-slate-400" />} />
          <Field label="City, Country" value="Lahore, Pakistan" icon={<MapPin className="w-4 h-4 text-slate-400" />} />
        </Section>

        {/* Online Presence */}
        <Section title="Online Presence" icon={<Globe className="w-4 h-4 text-violet-600" />}>
          <Field label="LinkedIn Profile" value="linkedin.com/in/aisharaza" icon={<Linkedin className="w-4 h-4 text-slate-400" />} />
          <Field label="Personal Website" value="aisharaza.dev" icon={<Globe className="w-4 h-4 text-slate-400" />} />
        </Section>

        {/* Education */}
        <Section title="Education" icon={<GraduationCap className="w-4 h-4 text-violet-600" />}>
          <div className="space-y-3">
            <EduCard degree="PhD Computer Science" uni="MIT" year="2019" />
            <EduCard degree="MS Artificial Intelligence" uni="LUMS" year="2015" />
          </div>
          <button className="mt-3 flex items-center gap-2 text-violet-600 text-sm font-semibold">
            <div className="w-6 h-6 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center">
              <Plus className="w-3.5 h-3.5 text-violet-600" />
            </div>
            Add Education
          </button>
        </Section>

        {/* Skills */}
        <Section title="Skills" icon={<Check className="w-4 h-4 text-violet-600" />}>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {s}
                <button className="text-indigo-400 hover:text-indigo-700">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {/* Newly adding skill */}
            <span className="flex items-center gap-1.5 bg-violet-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {newSkill}
              <button className="text-violet-200">
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <input
              className="flex-1 h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-600 placeholder:text-slate-400 outline-none focus:border-violet-400"
              placeholder="Add a skill..."
              readOnly
              value=""
            />
            <button className="h-9 w-9 rounded-xl bg-violet-600 flex items-center justify-center shrink-0">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </Section>

        {/* Bio */}
        <Section title="Professional Bio" icon={<User className="w-4 h-4 text-violet-600" />}>
          <textarea
            className="w-full h-28 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-600 resize-none outline-none focus:border-violet-400"
            readOnly
            value="AI researcher and educator with 6+ years of experience in machine learning, NLP, and deep learning. Published 12 research papers in top-tier conferences. Passionate about bridging academic research with real-world applications."
          />
          <p className="text-right text-[10px] text-slate-400 mt-1">214 / 500</p>
        </Section>

        {/* Preferences */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-violet-50 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-violet-600" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Job Preferences</h3>
          </div>
          {[
            { label: "Preferred Roles", value: "Assistant / Associate Professor" },
            { label: "Preferred Subjects", value: "AI, ML, Data Science" },
            { label: "Job Type", value: "Full-time, Remote" },
            { label: "Expected Salary", value: "PKR 2,50,000 / month" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-[10px] text-slate-400 font-medium mb-0.5">{item.label}</p>
                <p className="text-xs text-slate-700 font-semibold">{item.value}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          ))}
        </div>

        {/* Save Button */}
        <button className="w-full py-4 bg-gradient-to-r from-indigo-950 to-violet-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-violet-900/20 mt-2">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-violet-50 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-3 last:mb-0">
      <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1 block">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}
        <input
          type={type}
          readOnly
          defaultValue={value}
          className={`w-full h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 font-medium outline-none focus:border-violet-400 focus:bg-white transition-colors ${icon ? "pl-9 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  );
}

function EduCard({ degree, uni, year }: { degree: string; uni: string; year: string }) {
  return (
    <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
        <GraduationCap className="w-4 h-4 text-indigo-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-800 truncate">{degree}</p>
        <p className="text-[10px] text-slate-500">{uni} · {year}</p>
      </div>
      <button className="text-slate-400">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
