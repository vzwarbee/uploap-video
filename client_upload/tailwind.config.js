import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#465fff',
          light: '#465fff',
          dark: '#465fff',
        },
        success: '#12b76a',
        warning: '#f79009',
        danger: '#f04438',
        info: '#0ba5ec',
      },
    },
  },
  plugins: [],
});
