module.exports = {
  content: [
    './components/**/*.tsx',
    './pages/**/*.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
            },
          },
        },
      }),
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      fontFamily: {
        sans: [
          'custom-font',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['Source Code Pro', 'Menlo', 'monospace'],
      },
      keyframes: {
        'flash-code': {
          '0%': { backgroundColor: 'rgba(63, 207, 142, 0.1)' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        'flash-code': 'flash-code 1s forwards',
        'flash-code-slow': 'flash-code 2s forwards',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
