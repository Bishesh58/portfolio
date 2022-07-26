import React from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
function Particle() {
  const particlesInit = async (main) => {
    // console.log(main)

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main)
  }

  const particlesLoaded = (container) => {
    // console.log(container)
  }
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      className="absolute inset-0 z-0"
      options={{
        background: {
          color: {
            value: '',
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#FFFFFF',
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'bottom',
            enable: true,
            outModes: {
              default: 'destroy',
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 6000,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'square',
          },
          size: {
            value: { min: 1, max: 9 },
          },
        },
        fullScreen: {
          enable: false,
          zIndex: 0,
        },
        detectRetina: true,
      }}
    />
  )
}

export default Particle
