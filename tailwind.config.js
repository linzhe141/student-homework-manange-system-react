/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false, // 与antd基础样式冲突
  },
  theme: {
    // 如果在这里定义配置，那么tailwind的默认配置都会失效，只有如下配置了
    // ! 不推荐这样使用
    // spacing: {
    //   96: '24rem',
    // },
    // extend 配置就不会覆盖，只会扩展
    extend: {
      colors: {
        'vuejs-100': '#2edf96',
        'vuejs-200': '#42b983',
        'vuejs-300': '#259466',
      },
    },
  },
  plugins: [],
};
