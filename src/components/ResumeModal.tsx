import React from 'react';
import { X, Download, Printer, Mail, MapPin, User, Award } from 'lucide-react';
import { ProfileData, SKILLS_DATA, PROJECTS_DATA, SERVICES_DATA, COURSES_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  const handleDownloadResume = () => {
    const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${profile.personalName} - Curriculum Vitae</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 24px; color: #0f172a; line-height: 1.6; }
  h1 { margin: 0; font-size: 32px; color: #0284c7; }
  h2 { border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-top: 28px; color: #0f172a; font-size: 18px; }
  .meta { color: #475569; font-size: 14px; margin-top: 4px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; }
  ul { padding-left: 20px; }
  li { margin-bottom: 6px; }
</style>
</head>
<body>
  <h1>${profile.brandFirst} ${profile.brandSecond}</h1>
  <div class="meta">${profile.roleHighlight} ${profile.roleSecondary} · Age: ${profile.personalAge} · Father's Name: ${profile.fatherName}</div>
  <div class="meta">${profile.email} · ${profile.location}</div>
  
  <h2>Profile Summary</h2>
  <p>${profile.heroBio} ${profile.aboutBio}</p>
  
  <h2>Core Skills</h2>
  <div class="grid">
    ${SKILLS_DATA.map((s) => `<div class="card"><strong>${s.title} (${s.percentage}%)</strong><br/><span>${s.subtitle}</span></div>`).join('')}
  </div>
  
  <h2>Completed Courses & Certifications</h2>
  <div class="grid">
    ${COURSES_DATA.map((c) => `<div class="card"><strong>${c.title}</strong><br/><small>${c.provider} · ${c.duration}</small><br/><span>${c.description}</span></div>`).join('')}
  </div>

  <h2>Selected Projects</h2>
  <div class="grid">
    ${PROJECTS_DATA.map((p) => `<div class="card"><strong>${p.title}</strong><br/><span>${p.description}</span><br/><small>${p.technologies.join(' · ')}</small></div>`).join('')}
  </div>
  
  <h2>Services Offered</h2>
  <ul>
    ${SERVICES_DATA.map((srv) => `<li><strong>${srv.title}:</strong> ${srv.description}</li>`).join('')}
  </ul>
</body>
</html>`;

    const blob = new Blob([resumeHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.personalName.toLowerCase().replace(/\s+/g, '_')}_cv_2026.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#071326] border border-[#0EA5E9]/40 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#040B18] border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              {profile.brandFirst} {profile.brandSecond} — Curriculum Vitae
            </h3>
            <p className="text-xs text-slate-400">Official Developer & Photo Editor Profile</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-[#0EA5E9] text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              type="button"
              onClick={handleDownloadResume}
              className="px-3.5 py-1.5 rounded-lg bg-[#0EA5E9] hover:bg-[#0284C7] text-xs font-semibold text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Save CV File
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV preview"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
            <div>
              <h4 className="text-2xl font-extrabold text-white font-display">
                {profile.brandFirst} <span className="text-[#0EA5E9]">{profile.brandSecond}</span>
              </h4>
              <p className="text-sm font-semibold text-[#38BDF8] mt-0.5">
                {profile.roleHighlight} {profile.roleSecondary}
              </p>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>
                  Age: {profile.personalAge} · Father: {profile.fatherName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[#38BDF8] mb-1.5">About Summary</h5>
            <p className="text-sm text-slate-300 leading-relaxed">
              {profile.heroBio} {profile.aboutBio}
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[#38BDF8] mb-3">Technical Proficiency</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILLS_DATA.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 rounded-xl bg-[#040B18] border border-slate-800/90 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{skill.title}</p>
                    <p className="text-xs text-slate-400">{skill.subtitle}</p>
                  </div>
                  <span className="text-xs font-bold text-[#38BDF8] tabular-nums">{skill.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[#38BDF8] mb-3">Completed Courses & Professional Training</h5>
            <div className="space-y-2.5">
              {COURSES_DATA.map((course) => (
                <div key={course.id} className="p-3 rounded-xl bg-[#040B18] border border-slate-800/90 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{course.title}</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0EA5E9]/15 text-[#38BDF8] font-semibold border border-[#0EA5E9]/25 shrink-0">
                      {course.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#38BDF8]">{course.provider}</p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{course.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[#38BDF8] mb-3">Featured Portfolio Work</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECTS_DATA.map((proj) => (
                <div key={proj.id} className="p-3 rounded-xl bg-[#040B18] border border-slate-800/90">
                  <p className="text-sm font-semibold text-white">{proj.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{proj.description}</p>
                  <p className="text-[11px] text-[#38BDF8] mt-1.5">{proj.technologies.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
