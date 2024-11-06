// transitionPage.ts
import gsap from 'gsap';

export const enter = (node: HTMLElement, { fromPath }: { fromPath: string | null | undefined }) => {
  // Vérifier la valeur de fromPath
  console.log('enter transition - fromPath:', fromPath);

  const timeline = gsap.timeline();

  if (fromPath === '/') {
    // Animation spécifique si on vient de '/'
    timeline.from(node, {
      opacity: 0,
      x: '-100%',
      ease: 'power2.out',
    });
  } else {
    // Animation par défaut
    timeline.from(node, {
      opacity: 0,
      y: '100%',
      ease: 'power2.out',
    });
  }

  return {
    duration: timeline.duration() * 1000,
  };
};

export const exit = (node: HTMLElement, { toPath }: { toPath: string | null | undefined }) => {
  // Vérifier la valeur de toPath
  console.log('exit transition - toPath:', toPath);

  const timeline = gsap.timeline();

  if (toPath === '/') {
    // Animation spécifique si on va vers '/'
    timeline.to(node, {
      opacity: 0,
      x: '100%',
      ease: 'power2.in',
    });
  } else {
    // Animation par défaut
    timeline.to(node, {
      opacity: 0,
      y: '-100%',
      ease: 'power2.in',
    });
  }

  return {
    duration: timeline.duration() * 1000,
  };
};
