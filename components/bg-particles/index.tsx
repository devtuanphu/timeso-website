import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { useWindowSize } from 'usehooks-ts';

const BgParticles = () => {
  const { width, height } = useWindowSize();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {}, []);
  return (
    <Particles
      id='tsparticles'
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        detectRetina: false,
        fpsLimit: 60,
        fullScreen: false,
        interactivity: {
          detectsOn: 'canvas',
        },

        particles: {
          color: {
            value: '#ffffff',
          },
          lineLinked: {
            blink: false,
            color: '#ffffff',
            consent: false,
            distance: width < 768 ? 20 : 90,
            enable: true,
            opacity: 0.3,
            width: 2,
          },
          move: {
            attract: {
              enable: false,
              rotate: {
                x: 600,
                y: 1200,
              },
            },
            bounce: false,
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: true,
            speed: 0.5,
            straight: false,
          },
          number: {
            density: {
              enable: false,
              area: 2000,
            },
            limit: 0,
            value: 200,
          },
          opacity: {
            animation: {
              enable: true,
              minimumValue: 0.05,
              speed: 2,
              sync: false,
            },
            random: true,
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            animation: {
              enable: false,
              minimumValue: 1,
              speed: 40,
              sync: false,
            },
            random: true,
            value: 5,
          },
        },
      }}
    />
  );
};

export { BgParticles };
