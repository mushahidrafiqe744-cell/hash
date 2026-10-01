export interface SkillItem {
  id: string;
  title: string;
  subtitle: string;
  percentage: number;
  barColor: string;
  iconType: 'code' | 'photo' | 'design' | 'problem';
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'web' | 'app' | 'media';
  image: string;
  technologies: string[];
  liveUrl: string;
  year: string;
  client: string;
  highlights: string[];
  demoType: 'car-showroom' | 'whatsapp-clone' | 'movie-poster' | 'short-video';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  iconType: 'globe' | 'image' | 'pen' | 'bulb';
}

export interface CourseItem {
  id: string;
  title: string;
  provider: string;
  duration: string;
  status: 'Completed' | 'In Progress';
  skillsLearned: string[];
  description: string;
  iconType: 'web' | 'photo' | 'design' | 'logic';
}

export interface ProfileData {
  brandFirst: string;
  brandSecond: string;
  greeting: string;
  roleHighlight: string;
  roleSecondary: string;
  heroBio: string;
  heroScriptTop: string;
  heroScriptMid: string;
  heroScriptBottom: string;
  aboutIntroName: string;
  aboutAgeText: string;
  aboutBio: string;
  personalName: string;
  personalAge: string;
  fatherName: string;
  aboutScript: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaScriptTop: string;
  ctaScriptBottom: string;
  portraitUrl: string;
  email: string;
  location: string;
}

export const DEFAULT_PROFILE: ProfileData = {
  brandFirst: 'Ahtasham',
  brandSecond: 'Dev',
  greeting: "Hello, I'm",
  roleHighlight: 'Web Developer',
  roleSecondary: '& Photo Editor',
  heroBio:
    'I design and build modern websites, turn ideas into reality, and edit photos to make them look amazing. I love creating beautiful and responsive designs.',
  heroScriptTop: 'Code',
  heroScriptMid: 'Edit',
  heroScriptBottom: 'Create',
  aboutIntroName: 'Ahtasham',
  aboutAgeText: 'a 16 years old web developer and photo editor.',
  aboutBio:
    'I create modern websites, edit photos, and always try to learn new technologies and improve my skills.',
  personalName: 'Ahtasham',
  personalAge: '16 Years',
  fatherName: 'Javed',
  aboutScript: 'Turning Ideas Into Digital Reality',
  ctaTitle: "Let's Work Together",
  ctaSubtitle:
    "Got a project in mind? Feel free to contact me. I'm always open to new opportunities.",
  ctaScriptTop: 'Better',
  ctaScriptBottom: 'Together',
  portraitUrl: '/src/assets/images/developer_hero_portrait_1790853770777.jpg',
  email: 'ahtasham.dev@portfolio.io',
  location: 'Pakistan · Remote Worldwide',
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    subtitle: 'HTML, CSS, JavaScript, Responsive Design',
    percentage: 90,
    barColor: 'from-[#0088FF] to-[#00D4FF]',
    iconType: 'code',
  },
  {
    id: 'photo-edit',
    title: 'Photo Editing',
    subtitle: 'Photoshop, Lightroom, Retouching, Creative Edits',
    percentage: 85,
    barColor: 'from-[#7C3AED] to-[#A855F7]',
    iconType: 'photo',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    subtitle: 'Clean & Modern Designs, User Focused',
    percentage: 80,
    barColor: 'from-[#059669] to-[#10B981]',
    iconType: 'design',
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving',
    subtitle: 'Finding Better Solutions, Always Learning',
    percentage: 75,
    barColor: 'from-[#D97706] to-[#F59E0B]',
    iconType: 'problem',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'car-showroom',
    title: 'Car Showroom Website',
    description: 'Modern and responsive website for car showroom.',
    longDescription:
      'An interactive luxury automotive dealership platform featuring real-time exterior paint customizers, performance telemetry specs, 360-degree studio gallery lighting, and instant test-drive booking.',
    category: 'web',
    image: '/src/assets/images/project_car_showroom_1790853785256.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: '#car-showroom-demo',
    year: '2026',
    client: 'Apex Motors Studio',
    highlights: [
      'Responsive dark showroom layout with dynamic lighting accents',
      'Interactive specification comparison & trim selector',
      '60fps smooth scroll animations and instant inquiry booking',
    ],
    demoType: 'car-showroom',
  },
  {
    id: 'whatsapp-clone',
    title: 'WhatsApp Clone App',
    description: 'WhatsApp style chat application with modern UI.',
    longDescription:
      'A sleek real-time messaging interface inspired by WhatsApp Dark Mode, complete with instant message threads, voice note waveforms, read receipts, contact search, and media attachment previews.',
    category: 'app',
    image: '/src/assets/images/project_whatsapp_clone_1790853797648.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: '#whatsapp-clone-demo',
    year: '2026',
    client: 'ConnectUI Showcase',
    highlights: [
      'Real-time chat simulation with instant auto-replies',
      'Custom dark emerald glass theme with unread indicators',
      'Responsive split-pane desktop and mobile drawer architecture',
    ],
    demoType: 'whatsapp-clone',
  },
  {
    id: 'movie-poster',
    title: 'Movie Poster App',
    description: 'Image gallery with category filters and lightbox.',
    longDescription:
      'A high-contrast cinema discovery and poster showcase web app featuring instant genre filtering, full-resolution lightbox inspection, colour-graded artwork cards, and watchlist curation.',
    category: 'media',
    image: '/src/assets/images/project_movie_poster_1790853809922.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: '#movie-poster-demo',
    year: '2026',
    client: 'CineVault Gallery',
    highlights: [
      'Instant client-side category filtering (Sci-Fi, Action, Thriller)',
      'Zero-latency keyboard accessible lightbox inspector',
      'Custom Lightroom color-graded poster artwork presentation',
    ],
    demoType: 'movie-poster',
  },
  {
    id: 'short-video',
    title: 'Short Video App',
    description: 'TikTok style video app with full features.',
    longDescription:
      'A vertical short-form video feed application engineered with smooth snap scrolling, interactive like/bookmark counters, live comment drawer, and creator profile analytics.',
    category: 'app',
    image: '/src/assets/images/project_short_video_1790853818916.jpg',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: '#short-video-demo',
    year: '2026',
    client: 'PulseReels Media',
    highlights: [
      'Vertical snap-scroll feed with interactive engagement controls',
      'Creator audio marquee, live comment drawer, and share sheet',
      'Mobile-first viewport framing with multi-screen showcase mode',
    ],
    demoType: 'short-video',
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-web',
    title: 'Web Development',
    description: 'Modern, responsive and fast websites.',
    deliverables: ['Responsive Landing Pages', 'Interactive Web Apps', 'Performance Optimization'],
    iconType: 'globe',
  },
  {
    id: 'srv-photo',
    title: 'Photo Editing',
    description: 'Professional photo editing, retouching and color grading.',
    deliverables: ['Portrait Retouching', 'Cinematic Color Grading', 'Background Manipulation'],
    iconType: 'image',
  },
  {
    id: 'srv-uiux',
    title: 'UI/UX Design',
    description: 'Clean and modern designs for better user experience.',
    deliverables: ['Dark & Light Design Systems', 'Wireframing & Prototypes', 'Mobile-First Interfaces'],
    iconType: 'pen',
  },
  {
    id: 'srv-creative',
    title: 'Creative Solutions',
    description: 'Turning your ideas into reality with creativity.',
    deliverables: ['Brand Visual Identity', 'Social Media Visuals', 'Custom Digital Assets'],
    iconType: 'bulb',
  },
];

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'course-fullstack',
    title: 'Complete Full-Stack Web Development Course',
    provider: 'Meta & Google Developer Programs',
    duration: '48 Hours Course',
    status: 'Completed',
    skillsLearned: ['React 19', 'Tailwind CSS v4', 'Vite', 'TypeScript ES2022', 'Express.js', 'State Management'],
    description: 'Mastered responsive web layouts, component architecture, single-page application optimization, and real-time frontend integration with backend services.',
    iconType: 'web',
  },
  {
    id: 'course-photoshop',
    title: 'Advanced Photo Editing & Creative Grading Masterclass',
    provider: 'Adobe Certified Professionals Network',
    duration: '32 Hours Course',
    status: 'Completed',
    skillsLearned: ['Adobe Photoshop', 'Lightroom Classic', 'High-End Retouching', 'Color Grading', 'Manipulations'],
    description: 'Advanced-level training focusing on studio portrait skin retouching, custom neon glow effects, lighting manipulation, and professional cinematic color-grading templates.',
    iconType: 'photo',
  },
  {
    id: 'course-uiux',
    title: 'Modern UI/UX Design & Figma Workspace Essentials',
    provider: 'Interaction Design Institute',
    duration: '24 Hours Course',
    status: 'Completed',
    skillsLearned: ['Figma Workspace', 'Wireframing', 'Interactive Prototypes', 'Design Systems', 'Micro-Interactions'],
    description: 'Structured methodologies for creating clean, user-centric interfaces. Learned visual hierarchy rules, color budget formulas, and high-fidelity interaction design.',
    iconType: 'design',
  },
  {
    id: 'course-problem',
    title: 'Data Structures, Logic & Algorithm Masterclass',
    provider: 'Computer Science Network Academy',
    duration: '36 Hours Course',
    status: 'Completed',
    skillsLearned: ['JavaScript Logic', 'Clean Code Principles', 'Object Oriented Programming', 'DOM Manipulation'],
    description: 'Deepened computer science foundations focusing on writing scalable, clean logic code. Practiced interactive simulator engineering and client-side memory optimizations.',
    iconType: 'logic',
  },
];
