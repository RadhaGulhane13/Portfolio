module.exports = {
  email: 'radhagulhane1300@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/RadhaGulhane13',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/radha-gulhane/',
    },
    {
      name: 'Leetcode',
      url: 'https://leetcode.com/Radha_Gulhane/',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/radha__gulhane',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/radha___gulhane',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Education',
      url: '/#educations',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
