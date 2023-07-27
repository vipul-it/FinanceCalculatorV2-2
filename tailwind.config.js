// tailwind.config.js
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    //  "/src/component/Common.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Thin: ['Roboto-Thin'],
        ExtraLight: ['Roboto-ExtraLight'],
        Light: ['Roboto-Light'],
        Normal: ['Roboto-Regular'],
        Medium: ['Roboto-Medium'],
        SemiBold: ['Roboto-SemiBold'],
        Bold: ['Roboto-Bold'],
        ExtraBold: ['Roboto-ExtraBold'],
        Black: ['Roboto-Black'],
      },
      colors: {
        primaryC: '#879DFF',
        primaryDark: '#1F3CFE',
        secondaryC: '#CBCBCB',
        whiteC: '#FFFFFF',
        inputBorderColor: '#DEE2FF',
        primaryHeading: '#3343AE',
        backgroundC: '#F5F5F5',
        grayC: '#BDBDBD',
        blackC: '#000000',
        Cgray50: '#BFBFBF',
        
        
      },
    },
  },
  plugins: [],
};