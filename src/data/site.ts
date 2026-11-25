/**
 * Personal details used across the site.
 * Change a value here and it changes everywhere (header, footer, home, contact...).
 */
export const SITE = {
  name: 'Nicolás Izquierdo Arruga',
  shortName: 'Nicolás Izquierdo',
  headline: 'FPGA and embedded hardware engineer, MSc student.',
  /** Who the site is written for first. Used in the home page intro. */
  focus: 'Looking for an FPGA hardware engineering internship at a high-frequency trading firm.',
  availability: 'Available for a summer 2027 internship.',
  location: 'Toulouse, France',
  description:
    'Portfolio of Nicolás Izquierdo Arruga, FPGA and embedded hardware engineer and MSc student at Toulouse INP–ENSEEIHT: VHDL, timing closure at 416 MHz on Artix-7, fixed-point verification and hardware bring-up.',

  // Contact. The phone number is intentionally NOT published.
  email: 'nicolasizquierdo25@gmail.com',
  schoolEmail: 'nicolas.izquierdo-arruga@etu.toulouse-inp.fr',
  github: 'https://github.com/NicolasIzquierdoArruga',
  linkedin: 'https://www.linkedin.com/in/nicolas-izquierdo-arruga-3b37782a2',
  linkedinLabel: 'nicolas-izquierdo-arruga',

  // CV files live in /public/cv/. Add the PDFs with exactly these names.
  cv: [
    {
      label: 'CV: FPGA and digital design',
      file: 'cv/Nicolas_Izquierdo_CV_FPGA.pdf',
      note: 'Education, experience, projects, skills. For FPGA and digital design roles.',
    },
    {
      label: 'CV: Space and hardware',
      file: 'cv/Nicolas_Izquierdo_CV_Space.pdf',
      note: 'Education, space projects, experience, skills. For space and on-board electronics roles.',
    },
  ],
} as const;

/**
 * Main navigation. The first six entries follow the ENSEEIHT e-portfolio
 * framework (Welcome, Engineering course, International mobility,
 * Sustainability & civic engagement, Sport & other activities, Career
 * development); Projects, About and Contact are added for recruiters.
 */
export const NAV = [
  { href: '/', label: 'Welcome' },
  { href: '/projects', label: 'Projects' },
  { href: '/engineering-course', label: 'Engineering course' },
  { href: '/career', label: 'Career' },
  { href: '/mobility', label: 'Mobility' },
  { href: '/engagement', label: 'Engagement' },
  { href: '/activities', label: 'Activities' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;
