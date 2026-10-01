import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Mail } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  recipientEmail: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialSubject = '',
  recipientEmail,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Web Development');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setMessage(`Hi Ahtasham, I would like to discuss a project similar to "${initialSubject}".`);
    }
  }, [initialSubject]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#071326] border border-[#0EA5E9]/40 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#040B18] border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0EA5E9]/15 border border-[#0EA5E9]/40 flex items-center justify-center text-[#0EA5E9]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">Let's Work Together</h3>
              <p className="text-xs text-slate-400">Direct message to {recipientEmail}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            aria-label="Close contact modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white font-display">Message Sent Successfully!</h4>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Thank you, <span className="text-white font-semibold">{name}</span>. Ahtasham has received your{' '}
              <span className="text-[#38BDF8]">{service}</span> inquiry and will reply shortly.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-xs font-semibold text-white transition-colors"
            >
              Back to Portfolio
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ali Raza"
                  className="w-full rounded-xl bg-[#040B18] border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ali@example.com"
                  className="w-full rounded-xl bg-[#040B18] border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Service</label>
              <div className="grid grid-cols-2 gap-2">
                {['Web Development', 'Photo Editing', 'UI/UX Design', 'Creative Solutions'].map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setService(srv)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-left transition-colors truncate ${
                      service === srv
                        ? 'bg-[#0EA5E9]/20 border-[#0EA5E9] text-white'
                        : 'bg-[#040B18] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Project Details</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your website, app, or photo editing requirements..."
                className="w-full rounded-xl bg-[#040B18] border border-slate-800 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#0EA5E9]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 rounded-full border border-slate-700 text-xs font-medium text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0EA5E9] hover:to-[#38BDF8] text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-[#0EA5E9]/25 transition-all whitespace-nowrap"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
