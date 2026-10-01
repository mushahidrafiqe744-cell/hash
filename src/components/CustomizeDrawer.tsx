import React from 'react';
import { X, RotateCcw, Upload, Sliders } from 'lucide-react';
import { ProfileData, DEFAULT_PROFILE } from '../data/portfolioData';

interface CustomizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onChangeProfile: (updated: ProfileData) => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  onClose,
  profile,
  onChangeProfile,
}) => {
  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChangeProfile({ ...profile, portraitUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#061021] border-l border-[#0EA5E9]/30 h-full flex flex-col justify-between overflow-y-auto p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0EA5E9]" />
              <h3 className="text-base font-bold text-white font-display">Customize Portfolio</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Profile Portrait Photo (Hero & About)
              </label>
              <label className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-dashed border-[#0EA5E9]/50 bg-[#0A192F]/50 hover:bg-[#0A192F] text-xs font-medium text-[#38BDF8] cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Your Own Portrait Photo</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">First Name / Brand</label>
                <input
                  type="text"
                  value={profile.brandFirst}
                  onChange={(e) =>
                    onChangeProfile({
                      ...profile,
                      brandFirst: e.target.value,
                      aboutIntroName: e.target.value,
                      personalName: e.target.value,
                    })
                  }
                  className="w-full rounded-lg bg-[#040B18] border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Brand Suffix</label>
                <input
                  type="text"
                  value={profile.brandSecond}
                  onChange={(e) => onChangeProfile({ ...profile, brandSecond: e.target.value })}
                  className="w-full rounded-lg bg-[#040B18] border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Primary Role</label>
                <input
                  type="text"
                  value={profile.roleHighlight}
                  onChange={(e) => onChangeProfile({ ...profile, roleHighlight: e.target.value })}
                  className="w-full rounded-lg bg-[#040B18] border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Secondary Role</label>
                <input
                  type="text"
                  value={profile.roleSecondary}
                  onChange={(e) => onChangeProfile({ ...profile, roleSecondary: e.target.value })}
                  className="w-full rounded-lg bg-[#040B18] border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Age</label>
                <input
                  type="text"
                  value={profile.personalAge}
                  onChange={(e) => onChangeProfile({ ...profile, personalAge: e.target.value })}
                  className="w-full rounded-lg bg-[#040B18] border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Father's Name</label>
                <input
                  type="text"
                  value={profile.fatherName}
                  onChange={(e) => onChangeProfile({ ...profile, fatherName: e.target.value })}
                  className="w-full rounded-lg bg-[#040B18] border border-slate-800 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Hero Bio Paragraph</label>
              <textarea
                rows={3}
                value={profile.heroBio}
                onChange={(e) => onChangeProfile({ ...profile, heroBio: e.target.value })}
                className="w-full rounded-lg bg-[#040B18] border border-slate-800 px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onChangeProfile(DEFAULT_PROFILE)}
            className="px-3.5 py-2 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Ahtasham Dev
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#0EA5E9] hover:bg-[#0284C7] text-xs font-semibold text-white"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};
