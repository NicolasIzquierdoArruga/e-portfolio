/**
 * Personal details used across the site.
 * Change a value here and it changes everywhere (header, footer, home, contact...).
 */
export const SITE = {
  name: 'Nicolás Izquierdo Arruga',
  shortName: 'Nicolás Izquierdo',
  headline: 'FPGA and embedded hardware engineer, MSc student.',
  /** Who the site is written for first. Used in the home page intro. */
  focus: 'Looking for a hardware engineering internship, FPGA-focused, in space, defence or high-frequency trading.',
  availability: 'Available for a summer 2027 internship.',
  location: 'Toulouse, France',
  description:
    'Portfolio of Nicolás Izquierdo Arruga, hardware engineer focused on FPGA and MSc student at Toulouse INP–ENSEEIHT: VHDL and timing closure at 416 MHz, board bring-up, analog measurement chains and hardware protections tested on real hardware.',

  // Contact. The phone number is intentionally NOT published.
  email: 'nicolasizquierdo25@gmail.com',
  schoolEmail: 'nicolas.izquierdo-arruga@etu.toulouse-inp.fr',
  github: 'https://github.com/NicolasIzquierdoArruga',
  linkedin: 'https://www.linkedin.com/in/nicolas-izquierdo-arruga-3b37782a2',
  linkedinLabel: 'nicolas-izquierdo-arruga',

  // The CV lives in /public/cv/ with exactly this name.
  cv: [
    {
      label: 'CV',
      file: 'cv/Nicolas_Izquierdo_CV.pdf',
      note: 'Education, experience, projects and skills on one page.',
    },
  ],
} as const;

/** Main navigation, in the order shown in the header. */
export const NAV = [
  { href: '/', label: 'Welcome' },
  { href: '/projects', label: 'Projects' },
  { href: '/engineering-course', label: 'Engineering course' },
  { href: '/career', label: 'Career' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;
