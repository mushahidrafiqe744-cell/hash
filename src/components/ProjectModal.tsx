import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Send, Heart, MessageCircle, Share2, Car, Film, Sparkles } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquireProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquireProject,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive'>('overview');

  // Interactive demo state: Car Showroom
  const [carTrim, setCarTrim] = useState<'GT Cobalt' | 'Stealth Carbon' | 'Track Edition'>('GT Cobalt');

  // Interactive demo state: WhatsApp Clone
  const [chatMessages, setChatMessages] = useState([
    { sender: 'client', text: 'Hey Ahtasham! Can we preview the new dark UI layout?', time: '10:42 AM' },
    { sender: 'me', text: 'Absolutely! Just pushed the responsive build with emerald accents.', time: '10:43 AM' },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Interactive demo state: Movie Poster filter
  const [movieGenre, setMovieGenre] = useState<'All' | 'Sci-Fi' | 'Action'>('All');

  // Interactive demo state: Short Video likes
  const [videoLiked, setVideoLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1420);

  if (!project) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'me', text: userMsg, time: 'Just now' },
      { sender: 'client', text: 'Looks super clean and fast! Great job on the transitions.', time: 'Just now' },
    ]);
    setChatInput('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-[#071326] border border-[#0EA5E9]/30 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#040B18]">
          <div>
            <p className="text-xs text-[#38BDF8] font-medium">
              {project.client} · {project.year}
            </p>
            <h3 className="text-xl font-bold text-white font-display">{project.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#0A192F] p-1 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-[#0EA5E9] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Case Study
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'interactive'
                    ? 'bg-[#0EA5E9] text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive Preview
              </button>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project modal"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <div className="p-6 space-y-6">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#040B18] border border-slate-800">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040B18] via-transparent to-transparent opacity-60" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <h4 className="text-base font-semibold text-white">Project Overview</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{project.longDescription}</p>
                <div className="space-y-2 pt-2">
                  <h5 className="text-xs font-semibold text-slate-400">Key Engineering Highlights</h5>
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#0EA5E9] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#040B18] rounded-xl p-4 border border-slate-800/80 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-slate-400 block">Built With</span>
                    <p className="text-sm font-medium text-[#38BDF8] mt-1">
                      {project.technologies.join(' · ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Deliverable Type</span>
                    <p className="text-sm font-medium text-white mt-0.5 capitalize">
                      {project.category === 'web'
                        ? 'Responsive Web Platform'
                        : project.category === 'app'
                        ? 'Interactive Web Application'
                        : 'Media & Lightbox Gallery'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setActiveTab('interactive')}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Try Interactive Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onInquireProject(project.title);
                    }}
                    className="w-full py-2 px-4 rounded-lg border border-slate-700 hover:border-[#0EA5E9] text-slate-300 hover:text-white text-xs font-medium transition-colors whitespace-nowrap"
                  >
                    Request Similar Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {project.demoType === 'car-showroom' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#040B18] p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Car className="w-5 h-5 text-[#0EA5E9]" />
                    <div>
                      <p className="text-sm font-semibold text-white">Apex GT Coupé Configurator</p>
                      <p className="text-xs text-slate-400">Select trim package to inspect live telemetry</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#091528] p-1 rounded-lg">
                    {(['GT Cobalt', 'Stealth Carbon', 'Track Edition'] as const).map((trim) => (
                      <button
                        key={trim}
                        type="button"
                        onClick={() => setCarTrim(trim)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                          carTrim === trim ? 'bg-[#0EA5E9] text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {trim}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{
                      filter:
                        carTrim === 'Stealth Carbon'
                          ? 'saturate(0.35) contrast(1.15)'
                          : carTrim === 'Track Edition'
                          ? 'hue-rotate(35deg) saturate(1.25)'
                          : 'none',
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#38BDF8] block">{carTrim} Specification</span>
                      <span className="text-base font-bold text-white">
                        {carTrim === 'GT Cobalt'
                          ? '640 HP · 0-100 km/h in 2.8s'
                          : carTrim === 'Stealth Carbon'
                          ? '680 HP · Full Carbon Aero Kit'
                          : '740 HP · Active Track Telemetry'}
                      </span>
                    </div>
                    <span className="text-sm font-mono tabular-nums text-white font-semibold">
                      {carTrim === 'GT Cobalt'
                        ? '$142,000'
                        : carTrim === 'Stealth Carbon'
                        ? '$158,500'
                        : '$174,900'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {project.demoType === 'whatsapp-clone' && (
              <div className="bg-[#040B18] rounded-xl border border-slate-800 overflow-hidden">
                <div className="px-4 py-3 bg-[#09192A] border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Project Client Thread</p>
                    <p className="text-xs text-emerald-400">Online · End-to-End Encrypted UI Demo</p>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-60 overflow-y-auto">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs ${
                        msg.sender === 'me'
                          ? 'ml-auto bg-emerald-600/90 text-white'
                          : 'mr-auto bg-[#0F243C] text-slate-200 border border-slate-800'
                      }`}
                    >
                      <span>{msg.text}</span>
                      <span className="text-[10px] opacity-70 mt-1 self-end tabular-nums">{msg.time}</span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type a message to test the WhatsApp Clone UI..."
                    className="flex-1 bg-[#0A192F] text-xs text-white rounded-lg px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send
                  </button>
                </form>
              </div>
            )}

            {project.demoType === 'movie-poster' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-[#040B18] p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-[#0EA5E9]" />
                    <span className="text-xs font-semibold text-white">Interactive Poster Filter</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {(['All', 'Sci-Fi', 'Action'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setMovieGenre(g)}
                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                          movieGenre === g ? 'bg-[#0EA5E9] text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { title: 'Cyber Horizon 2089', genre: 'Sci-Fi', rating: '9.2' },
                    { title: 'Solaris Protocol', genre: 'Sci-Fi', rating: '8.9' },
                    { title: 'Crimson Velocity', genre: 'Action', rating: '9.0' },
                  ]
                    .filter((m) => movieGenre === 'All' || m.genre === movieGenre)
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden bg-[#040B18] border border-slate-800 p-3 space-y-2"
                      >
                        <div className="aspect-[3/4] rounded-lg overflow-hidden">
                          <img
                            src={project.image}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                        <p className="text-[11px] text-slate-400 tabular-nums">
                          {item.genre} · ★ {item.rating}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {project.demoType === 'short-video' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-[#040B18] p-4 rounded-xl border border-slate-800">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#38BDF8]">
                    <Sparkles className="w-4 h-4" />
                    <span>PulseReels Vertical Player Controls</span>
                  </div>
                  <h4 className="text-base font-bold text-white">@ahtasham.dev · Golden Hour Edit</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Color-graded sunset reel edited in Lightroom & Premiere with custom JavaScript audio-reactive progress bar.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setVideoLiked(!videoLiked);
                        setLikeCount((c) => (videoLiked ? c - 1 : c + 1));
                      }}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                        videoLiked
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-[#0A192F] border-slate-700 text-slate-200 hover:border-slate-500'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${videoLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="tabular-nums">{likeCount} Likes</span>
                    </button>
                    <span className="text-xs text-slate-400 flex items-center gap-1 tabular-nums">
                      <MessageCircle className="w-3.5 h-3.5 text-[#38BDF8]" /> 84 Comments
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5 text-[#38BDF8]" /> Share
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
