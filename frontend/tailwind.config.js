/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
      vrySmall:{'max':'300px'},
      smallM:{'max':'500px'},
      mobile:{'max':'780px'},
      tablet: '781px',
      laptop: '930px',
      desktop: '1090px'
    },
    extend: {
      keyframes:{
        hoverWidth:{
          '0%':{width:'0%'},
          '100%':{width:'100%'}
        },
        flash:{
          '25%,40%':{opacity:'0.6'},
          '50%':{opacity:'1'},
          '75%':{opacity:'0.6'},
          '100%':{opacity:'1'}    
        },
        spin:{
          'to':{transform: 'rotate(1turn)'}
        },

      }
    },
  },
  plugins: [
    function({addUtilities}){
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar':{
          display:'none'
        }
      }
      addUtilities(newUtilities)
    }
  ]
}


