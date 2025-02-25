import type { Theme } from '@unocss/preset-mini'
import { cssVarsPrefix } from './constants'

export const theme: Theme = {
  colors: {
    [cssVarsPrefix]: {
      cb: cssColor(cssVar('cb')),
      cp: cssColor(cssVar('cp', cssVar('cb'))),
      cx: cssColor(cssVar('cx')),
      fill: cssColor(cssVar('fill', cssVar('cb'))),
      content: cssColor(cssVar('content', cssVar('cb'))),
    },
  },
  backgroundColor: {
    [cssVarsPrefix]: {
      base: cssColor(cssVar('fill', cssVar('cx'))),
    },
  },
  textColor: {
    [cssVarsPrefix]: {
      base: cssColor(cssVar('content', cssVar('cb'))),
    },
  },
  borderColor: {
    [cssVarsPrefix]: {
      base: cssColor(cssVar('fill', cssVar('cb'))),
    },
  },
  borderRadius: {
    ...Object.fromEntries(['base', 'box', 'button', 'checkbox', 'radio', 'switch', 'tabs']
      .map((name) => [`${cssVarsPrefix}-${name}`, name === 'base'
        ? cssVar('radius')
        : cssVar(`radius-${name}`, cssVar('radius'))])),
  },
  ringWidth: {
    DEFAULT: '1px',
  },
  shadowColor: {
    [cssVarsPrefix]: {
      base: cssColor(cssVar('fill', cssVar('cb'))),
    },
  },
  animation: {
    keyframes: {
      'fade-in': '{from {opacity: 0;}to {opacity: 1;}}',
      'fade-out': '{from {opacity: 1;}to {opacity: 0;}}',
      'scale-in': '{from {opacity: 0;scale: 0.95;}to {opacity: 1;scale: 1;}}',
      'scale-out': '{from {opacity: 1;scale: 1;}to {opacity: 0;scale: 0.95;}}',
      'slide-in-from-top': '{from {transform: translateY(-100%);}to {transform: translateY(0);}}',
      'slide-out-to-top': '{from {transform: translateY(0);}to {transform: translateY(-100%);}}',
      'slide-in-from-right': '{from {transform: translateX(100%);}to {transform: translateX(0);}}',
      'slide-out-to-right': '{from {transform: translateX(0);}to {transform: translateX(100%);}}',
      'slide-in-from-bottom': '{from {transform: translateY(100%);}to {transform: translateY(0);}}',
      'slide-out-to-bottom': '{from {transform: translateY(0);}to {transform: translateY(100%);}}',
      'slide-in-from-left': '{from {transform: translateX(-100%);}to {transform: translateX(0);}}',
      'slide-out-to-left': '{from {transform: translateX(0);}to {transform: translateX(-100%);}}',
      'slide-in-from-top-and-fade': '{from {opacity: 0;transform: translateY(-4px);}to {opacity: 1;transform: translateY(0);}}',
      'slide-out-to-top-and-fade': '{from {opacity: 1;transform: translateY(0);}to {opacity: 0;transform: translateY(-4px);}}',
      'slide-in-from-right-and-fade': '{from {opacity: 0;transform: translateX(4px);}to {opacity: 1;transform: translateX(0);}}',
      'slide-out-to-right-and-fade': '{from {opacity: 1;transform: translateX(0);}to {opacity: 0;transform: translateX(4px);}}',
      'slide-in-from-bottom-and-fade': '{from {opacity: 0;transform: translateY(4px);}to {opacity: 1;transform: translateY(0);}}',
      'slide-out-to-bottom-and-fade': '{from {opacity: 1;transform: translateY(0);}to {opacity: 0;transform: translateY(4px);}}',
      'slide-in-from-left-and-fade': '{from {opacity: 0;transform: translateX(-4px);}to {opacity: 1;transform: translateX(0);}}',
      'slide-out-to-left-and-fade': '{from {opacity: 1;transform: translateX(0);}to {opacity: 0;transform: translateX(-4px);}}',
    },
  },
}

export function cssVar(name: string, ...defaultValue: string[]) {
  return `var(${[`--${cssVarsPrefix}-${name}`, ...defaultValue].join(',')})`
}

export function cssColor(...rgb: (string | number)[]) {
  return `rgb(${rgb.join(' ')})`
}

export default theme
