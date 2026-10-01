import React, { useState } from 'react';
import {
  Download,
  ArrowRight,
  Mail,
  User,
  Calendar,
  Users,
  Code2,
  Image as ImageIcon,
  Palette,
  Settings,
  ExternalLink,
  Globe,
  PenTool,
  Lightbulb,
  Sliders,
  FolderKanban,
  Award,
  BookOpen,
} from 'lucide-react';
import {
  DEFAULT_PROFILE,
  ProfileData,
  SKILLS_DATA,
  PROJECTS_DATA,
  SERVICES_DATA,
  COURSES_DATA,
  ProjectItem,
} from './data/portfolioData';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ContactModal } from './components/ContactModal';
import { CustomizeDrawer } from './components/CustomizeDrawer';

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [activeNav, setActiveNav] = useState<string>('home');
  const [projectFilter, setProjectFilter] = useState<'all' | 'web' | 'app' | 'media'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [socialToast, setSocialToast] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const filteredProjects =
    projectFilter === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === projectFilter);

  const handleOpenContact = (subject = '') => {
    setContactSubject(subject);
    setIsContactOpen(true);
  };

  const handleSocialClick = (platform: string, handle: string) => {
    setSocialToast(`${platform}: ${handle}`);
    setTimeout(() => {
      setSocialToast((prev) => (prev === `${platform}: ${handle}` ? null : prev));
    }, 3200);
  };

  const handleImageError = (key: string) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="min-h-screen bg-[#030914] text-[#F1F5F9] relative selection:bg-[#0EA5E9] selection:text-white">
      {/* Subtle Ambient Background Glows matching reference image */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-28 right-1/4 w-[520px] h-[520px] rounded-full bg-[#0088FF]/10 blur-[130px]" />
        <div className="absolute top-[38%] left-10 w-[420px] h-[420px] rounded-full bg-[#0EA5E9]/8 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[460px] h-[460px] rounded-full bg-[#0284C7]/10 blur-[130px]" />
      </div>

      {/* Social Toast Notification */}
      {socialToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#07162C] border border-[#0EA5E9]/50 text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
          <span>Connected Profile — {socialToast}</span>
          <button
            type="button"
            onClick={() => handleOpenContact(`Connecting via ${socialToast}`)}
            className="text-[#38BDF8] underline ml-1 font-semibold"
          >
            Message
          </button>
        </div>
      )}

      {/* TOP BAR CONTRACT: 3 Zones (Brand Wordmark | 5 Nav Links | Primary Actions) */}
      <header className="sticky top-0 z-40 bg-[#030914]/90 backdrop-blur-md border-b border-[#0EA5E9]/15">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-18 flex items-center justify-between gap-4">
          {/* Zone 1: Single Brand Wordmark Element */}
          <a
            href="#home"
            onClick={() => setActiveNav('home')}
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display whitespace-nowrap shrink-0"
          >
            <svg
              className="w-7 h-7 text-[#0095FF] shrink-0"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 3L3 32H11.5L18 18.5L24.5 32H33L18 3Z"
                fill="currentColor"
              />
              <path
                d="M11 24.5H25L22 19H14L11 24.5Z"
                fill="#38BDF8"
              />
            </svg>
            <span>
              {profile.brandFirst} <span className="text-[#0095FF]">{profile.brandSecond}</span>
            </span>
          </a>

          {/* Zone 2: Clean Typography Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {[
              { id: 'home', label: 'Home', href: '#home' },
              { id: 'about', label: 'About', href: '#about' },
              { id: 'skills', label: 'Skills', href: '#skills' },
              { id: 'projects', label: 'Projects', href: '#projects' },
              { id: 'courses', label: 'Courses', href: '#courses' },
              { id: 'services', label: 'Services', href: '#services' },
              { id: 'contact', label: 'Contact', href: '#contact', extra: true },
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`${item.extra ? 'hidden xl:inline-block' : ''} relative py-1.5 transition-colors whitespace-nowrap ${
                  activeNav === item.id
                    ? 'text-[#38BDF8] font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeNav === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0095FF] rounded-full shadow-[0_0_8px_#0095FF]" />
                )}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsCustomizeOpen(true)}
              className="px-3.5 py-2 rounded-full border border-slate-700/80 hover:border-[#0EA5E9] bg-[#071326]/80 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="hidden sm:inline">Customize</span>
            </button>
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="px-4 py-2 rounded-full border border-[#0EA5E9]/50 hover:border-[#38BDF8] bg-[#06152D] hover:bg-[#0A2246] text-xs font-semibold text-white flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Download CV</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section
          id="home"
          className="relative border-b border-[#0EA5E9]/20 overflow-hidden"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-8 pb-10 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              {/* Left Column: Intro, Headlines, Bio, CTAs, Socials */}
              <div className="lg:col-span-6 space-y-5">
                <p className="text-lg sm:text-xl font-medium text-slate-200 tracking-wide">
                  {profile.greeting}
                </p>

                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display leading-[1.08]">
                    {profile.brandFirst}{' '}
                    <span className="text-[#0095FF] drop-shadow-[0_0_20px_rgba(0,149,255,0.35)]">
                      {profile.brandSecond}
                    </span>
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-bold font-display">
                    <span className="text-[#00A6FF]">{profile.roleHighlight}</span>{' '}
                    <span className="text-white">{profile.roleSecondary}</span>
                  </h2>
                </div>

                <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed max-w-xl">
                  {profile.heroBio}
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#projects"
                    onClick={() => setActiveNav('projects')}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0088FF] to-[#00B4FF] hover:from-[#0095FF] hover:to-[#38BDF8] text-white text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-[0_0_25px_rgba(0,149,255,0.45)] transition-all whitespace-nowrap"
                  >
                    <FolderKanban className="w-4 h-4" />
                    <span>View My Work</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenContact('General Portfolio Inquiry')}
                    className="px-6 py-3 rounded-full bg-[#051020]/90 hover:bg-[#0A1E3A] border border-slate-600/80 hover:border-[#0EA5E9] text-white text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all whitespace-nowrap"
                  >
                    <span>Contact Me</span>
                    <Mail className="w-4 h-4 text-slate-300" />
                  </button>
                </div>

                {/* Social Media Row: TikTok, YouTube, Instagram, GitHub, X */}
                <div className="flex items-center gap-4 pt-3 text-slate-300">
                  {/* TikTok */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('TikTok', '@ahtasham.dev')}
                    aria-label="TikTok"
                    className="p-2 rounded-lg hover:text-[#38BDF8] hover:bg-white/5 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
                    </svg>
                  </button>
                  {/* YouTube */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('YouTube', 'youtube.com/@ahtashamdev')}
                    aria-label="YouTube"
                    className="p-2 rounded-lg hover:text-[#38BDF8] hover:bg-white/5 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </button>
                  {/* Instagram */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('Instagram', '@ahtasham.edits')}
                    aria-label="Instagram"
                    className="p-2 rounded-lg hover:text-[#38BDF8] hover:bg-white/5 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                  {/* GitHub */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('GitHub', 'github.com/ahtasham-dev')}
                    aria-label="GitHub"
                    className="p-2 rounded-lg hover:text-[#38BDF8] hover:bg-white/5 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </button>
                  {/* X (Twitter) */}
                  <button
                    type="button"
                    onClick={() => handleSocialClick('X', '@ahtasham_dev')}
                    aria-label="X"
                    className="p-2 rounded-lg hover:text-[#38BDF8] hover:bg-white/5 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Developer Portrait + Neon Triangle Glow + "Code Edit Create" Script */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                {/* Neon Blue Geometric Backlight */}
                <div className="relative w-full max-w-[540px] flex items-center justify-center">
                  <div className="relative w-72 sm:w-84 aspect-[3/4] rounded-2xl overflow-hidden border border-[#0095FF]/40 shadow-[0_0_50px_rgba(0,149,255,0.28)] bg-[#061326]">
                    {!imgErrors['hero'] ? (
                      <img
                        src={profile.portraitUrl}
                        alt={`${profile.brandFirst} ${profile.brandSecond}`}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError('hero')}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#071A36] to-[#030914] p-6 text-center">
                        <User className="w-16 h-16 text-[#0EA5E9] mb-2" />
                        <span className="text-base font-bold text-white">
                          {profile.brandFirst} {profile.brandSecond}
                        </span>
                      </div>
                    )}
                    {/* Bottom gradient blend into dark canvas */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#030914] via-[#030914]/50 to-transparent" />
                  </div>

                  {/* Handwritten Script Accent on Right: "Code Edit Create" */}
                  <div className="hidden sm:flex flex-col items-start -ml-4 z-20 select-none transform -rotate-12">
                    <span className="font-script text-4xl lg:text-5xl font-bold text-white/95 leading-[0.95] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {profile.heroScriptTop}
                    </span>
                    <span className="font-script text-4xl lg:text-5xl font-bold text-white/95 leading-[0.95] ml-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {profile.heroScriptMid}
                    </span>
                    <span className="font-script text-4xl lg:text-5xl font-bold text-white/95 leading-[0.95] ml-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {profile.heroScriptBottom}
                    </span>
                    {/* Glowing Blue Brush Underline */}
                    <svg
                      className="w-36 h-6 text-[#00A6FF] mt-1 ml-2 drop-shadow-[0_0_10px_#00A6FF]"
                      viewBox="0 0 160 24"
                      fill="none"
                    >
                      <path
                        d="M4 18C45 6 105 4 156 10"
                        stroke="currentColor"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M22 21C65 13 115 11 148 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT ME & MY SKILLS (2-COLUMN SPLIT) ================= */}
        <section className="border-b border-[#0EA5E9]/20">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
              {/* Left Column: About Me / Who I Am? */}
              <div
                id="about"
                className="lg:col-span-6 lg:pr-6 lg:border-r lg:border-slate-800/90"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Framed Portrait on Left */}
                  <div className="sm:col-span-5">
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#0095FF]/40 bg-[#051226] shadow-[0_0_25px_rgba(0,149,255,0.18)]">
                      {!imgErrors['about'] ? (
                        <img
                          src={profile.portraitUrl}
                          alt={profile.personalName}
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError('about')}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#06152D]">
                          <User className="w-12 h-12 text-[#0EA5E9]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Who I Am Content on Right */}
                  <div className="sm:col-span-7 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#00A6FF]">
                        <span className="w-5 h-[2px] bg-[#00A6FF] rounded-full" />
                        <span>About Me</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                        Who I Am?
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      I'm{' '}
                      <span className="text-[#38BDF8] font-semibold">
                        {profile.aboutIntroName}
                      </span>
                      , {profile.aboutAgeText} {profile.aboutBio}
                    </p>

                    {/* 3 Personal Metadata Columns: Name | Age | Father's Name */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-[#00A6FF] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[11px] text-[#38BDF8] block">Name</span>
                          <span className="text-xs sm:text-sm font-bold text-white truncate block">
                            {profile.personalName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-l border-slate-800 pl-2.5">
                        <Calendar className="w-5 h-5 text-[#00A6FF] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[11px] text-[#38BDF8] block">Age</span>
                          <span className="text-xs sm:text-sm font-bold text-white tabular-nums truncate block">
                            {profile.personalAge}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-l border-slate-800 pl-2.5">
                        <Users className="w-5 h-5 text-[#00A6FF] shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[11px] text-[#38BDF8] block truncate">
                            Father's Name
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white truncate block">
                            {profile.fatherName}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Handwritten Script: "Turning Ideas Into Digital Reality" */}
                    <div className="pt-2 select-none">
                      <p className="font-script text-2xl sm:text-[26px] text-white/95 -rotate-2">
                        {profile.aboutScript}
                      </p>
                      <svg
                        className="w-56 h-4 text-[#00A6FF] mt-0.5 drop-shadow-[0_0_8px_#00A6FF]"
                        viewBox="0 0 240 16"
                        fill="none"
                      >
                        <path
                          d="M4 12C75 3 160 3 236 8"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: My Skills / What I Do? */}
              <div id="skills" className="lg:col-span-6 space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#00A6FF]">
                    <span className="w-5 h-[2px] bg-[#00A6FF] rounded-full" />
                    <span>My Skills</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    What I Do?
                  </h2>
                </div>

                <div className="divide-y divide-slate-800/80">
                  {SKILLS_DATA.map((skill) => {
                    const iconBorder =
                      skill.iconType === 'code'
                        ? 'border-[#0EA5E9]/40 text-[#38BDF8] bg-[#0EA5E9]/10'
                        : skill.iconType === 'photo'
                        ? 'border-[#38BDF8]/40 text-[#38BDF8] bg-[#0EA5E9]/10'
                        : skill.iconType === 'design'
                        ? 'border-teal-400/40 text-teal-300 bg-teal-500/10'
                        : 'border-amber-400/40 text-amber-300 bg-amber-500/10';

                    return (
                      <div
                        key={skill.id}
                        className="py-3.5 first:pt-1 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${iconBorder}`}
                          >
                            {skill.iconType === 'code' && <Code2 className="w-5 h-5" />}
                            {skill.iconType === 'photo' && <ImageIcon className="w-5 h-5" />}
                            {skill.iconType === 'design' && <Palette className="w-5 h-5" />}
                            {skill.iconType === 'problem' && <Settings className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-white">
                              {skill.title}
                            </h3>
                            <p className="text-xs text-slate-400">{skill.subtitle}</p>
                          </div>
                        </div>

                        {/* Progress Bar + Percentage */}
                        <div className="flex items-center gap-3 sm:w-48 shrink-0">
                          <div className="flex-1 h-2.5 rounded-full bg-[#09192F] overflow-hidden p-[1px] border border-slate-800">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${skill.barColor}`}
                              style={{ width: `${skill.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-200 tabular-nums w-9 text-right">
                            {skill.percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MY PROJECTS / RECENT WORK ================= */}
        <section id="projects" className="border-b border-[#0EA5E9]/20">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 space-y-7">
            {/* Section Header + Filter / View All */}
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#00A6FF]">
                  <span className="w-5 h-[2px] bg-[#00A6FF] rounded-full" />
                  <span>My Projects</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Recent Work
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Interactive Segmented Filter Controls */}
                <div className="flex items-center gap-1 bg-[#061325] p-1 rounded-xl border border-slate-800">
                  {[
                    { key: 'all', label: 'All Work' },
                    { key: 'web', label: 'Websites' },
                    { key: 'app', label: 'Apps' },
                    { key: 'media', label: 'Gallery UI' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() =>
                        setProjectFilter(tab.key as 'all' | 'web' | 'app' | 'media')
                      }
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        projectFilter === tab.key
                          ? 'bg-[#0095FF] text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setProjectFilter('all');
                    setSelectedProject(PROJECTS_DATA[0]);
                  }}
                  className="text-xs sm:text-sm font-semibold text-[#38BDF8] hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <span>View All Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4-Column Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer rounded-2xl bg-[#051122] border border-[#0EA5E9]/25 hover:border-[#00A6FF] transition-all duration-200 overflow-hidden flex flex-col justify-between p-3.5 shadow-[0_6px_25px_rgba(0,0,0,0.45)]"
                >
                  <div>
                    {/* Thumbnail Container */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#030914] border border-slate-800/80 mb-3.5">
                      {!imgErrors[project.id] ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(project.id)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#071A36] to-[#030914] p-4 text-center">
                          <Code2 className="w-8 h-8 text-[#0EA5E9] mb-1.5" />
                          <span className="text-xs font-semibold text-white">
                            {project.title}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#051122]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-[11px] font-semibold text-[#38BDF8]">
                          Click for Live Demo →
                        </span>
                      </div>
                    </div>

                    {/* Title & External Link Icon */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors font-display truncate">
                        {project.title}
                      </h3>
                      <span
                        className="text-slate-400 group-hover:text-[#38BDF8] transition-colors shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Clean Unboxed Tech Stack Metadata (Zero-Pill Compliance) */}
                  <div className="pt-3.5 mt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs font-medium text-[#38BDF8]">
                    {project.technologies.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {idx < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MY COURSES & CERTIFICATIONS ================= */}
        <section id="courses" className="border-b border-[#0EA5E9]/15">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 space-y-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00A6FF]">
                <span className="w-5 h-[2px] bg-[#00A6FF] rounded-full" />
                <span>My Education</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Courses & Certifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSES_DATA.map((course) => (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl bg-[#051122] border border-[#0EA5E9]/20 hover:border-[#00A6FF]/60 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-lg shadow-black/40 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 flex items-center justify-center text-[#38BDF8]">
                          {course.iconType === 'web' && <Code2 className="w-5 h-5" />}
                          {course.iconType === 'photo' && <ImageIcon className="w-5 h-5" />}
                          {course.iconType === 'design' && <Palette className="w-5 h-5" />}
                          {course.iconType === 'logic' && <Award className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors font-display">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-400">{course.provider}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold uppercase tracking-wider shrink-0">
                        {course.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Skills learned tag block - clean unboxed typography per zero-pill rules */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="text-[11px] text-slate-400 font-medium mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>Skills Acquired:</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-semibold text-[#38BDF8]">
                      {course.skillsLearned.map((skill, idx) => (
                        <React.Fragment key={skill}>
                          <span>{skill}</span>
                          {idx < course.skillsLearned.length - 1 && (
                            <span aria-hidden="true" className="text-slate-700 font-normal">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MY SERVICES / WHAT I OFFER ================= */}
        <section id="services" className="border-b border-[#0EA5E9]/15 text-slate-100">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 space-y-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00A6FF]">
                <span className="w-5 h-[2px] bg-[#00A6FF] rounded-full" />
                <span>My Services</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                What I Offer
              </h2>
            </div>

            {/* 4-Column Horizontal Service Strip with Hairline Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-800/90">
              {SERVICES_DATA.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => handleOpenContact(`${service.title} Service Inquiry`)}
                  className={`group cursor-pointer flex items-start gap-4 ${
                    index > 0 ? 'lg:pl-6' : ''
                  } ${index < SERVICES_DATA.length - 1 ? 'lg:pr-6' : ''}`}
                >
                  <div className="w-12 h-12 rounded-full border border-[#0095FF]/40 bg-[#05152D] group-hover:bg-[#0095FF]/20 group-hover:border-[#38BDF8] flex items-center justify-center text-[#38BDF8] shrink-0 shadow-[0_0_15px_rgba(0,149,255,0.18)] transition-all">
                    {service.iconType === 'globe' && <Globe className="w-5 h-5" />}
                    {service.iconType === 'image' && <ImageIcon className="w-5 h-5" />}
                    {service.iconType === 'pen' && <PenTool className="w-5 h-5" />}
                    {service.iconType === 'bulb' && <Lightbulb className="w-5 h-5" />}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors font-display">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ================= LET'S WORK TOGETHER CTA BANNER ================= */}
            <div
              id="contact"
              className="mt-8 rounded-2xl bg-gradient-to-r from-[#051329] via-[#071936] to-[#051329] border border-[#0095FF]/40 p-6 sm:px-8 sm:py-6 shadow-[0_0_35px_rgba(0,149,255,0.16)] flex flex-col lg:flex-row items-center justify-between gap-6"
            >
              {/* Left: Mail Icon + Text */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0095FF]/20 border border-[#00A6FF]/50 flex items-center justify-center text-[#38BDF8] shrink-0 shadow-[0_0_20px_rgba(0,166,255,0.3)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    {profile.ctaTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                    {profile.ctaSubtitle}
                  </p>
                </div>
              </div>

              {/* Center: Send Message Button */}
              <button
                type="button"
                onClick={() => handleOpenContact('New Project Collaboration')}
                className="px-7 py-3 rounded-full bg-[#041022] hover:bg-[#0095FF] border border-[#00A6FF]/60 text-white text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,166,255,0.25)] transition-all whitespace-nowrap"
              >
                <span>Send Message</span>
                <ArrowRight className="w-4 h-4 text-[#38BDF8] group-hover:text-white" />
              </button>

              {/* Right: Handwritten Script "Better Together" */}
              <div className="hidden sm:flex flex-col items-center select-none -rotate-6">
                <span className="font-script text-3xl font-bold text-white leading-none">
                  {profile.ctaScriptTop}
                </span>
                <span className="font-script text-3xl font-bold text-white leading-none ml-3">
                  {profile.ctaScriptBottom}
                </span>
                <svg
                  className="w-28 h-4 text-[#00A6FF] mt-1 drop-shadow-[0_0_8px_#00A6FF]"
                  viewBox="0 0 120 14"
                  fill="none"
                >
                  <path
                    d="M3 11C38 4 85 3 117 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 bg-[#020710] py-6">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="tabular-nums">
            © 2026{' '}
            <span className="text-white font-semibold">
              {profile.brandFirst} {profile.brandSecond}.
            </span>{' '}
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Projects', href: '#projects' },
              { label: 'Courses', href: '#courses' },
              { label: 'Services', href: '#services' },
              { label: 'Contact', href: '#contact' },
            ].map((item, idx, arr) => (
              <React.Fragment key={item.label}>
                <a href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </a>
                {idx < arr.length - 1 && (
                  <span aria-hidden="true" className="text-slate-700">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-3 text-slate-300">
            <button
              type="button"
              onClick={() => handleSocialClick('TikTok', '@ahtasham.dev')}
              aria-label="TikTok"
              className="hover:text-[#38BDF8] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialClick('YouTube', 'youtube.com/@ahtashamdev')}
              aria-label="YouTube"
              className="hover:text-[#38BDF8] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialClick('Instagram', '@ahtasham.edits')}
              aria-label="Instagram"
              className="hover:text-[#38BDF8] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialClick('GitHub', 'github.com/ahtasham-dev')}
              aria-label="GitHub"
              className="hover:text-[#38BDF8] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSocialClick('X', '@ahtasham_dev')}
              aria-label="X"
              className="hover:text-[#38BDF8] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals & Drawers */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireProject={(title) => handleOpenContact(title)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialSubject={contactSubject}
        recipientEmail={profile.email}
      />

      <CustomizeDrawer
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        profile={profile}
        onChangeProfile={setProfile}
      />
    </div>
  );
}
