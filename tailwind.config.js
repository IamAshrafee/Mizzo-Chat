// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      translate: {
        'z-6': '6px',
      },
      perspective: {
        '500': '500px',
      },
      rotate: {
        'y-6': '6deg',
        'x-2': '2deg',
      },
    }
  }
}