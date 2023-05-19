/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false, // 与antd基础样式冲突
  },
  theme: {
    extend: {},
  },
  plugins: [],
};
