import type { Preset } from '@unocss/core'
import { colors as twColors } from '@unocss/preset-wind4/colors'
import type { Theme } from '@unocss/preset-wind4/theme'
import { resolveColors } from './defaults'
import type { ModuleOptions } from './module'

export type PresetOptions = Pick<(ModuleOptions['theme'] & {}), 'colors'>

const keyframes = {
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
  'enter-from-right': '{from{opacity:0;transform:translateX(200px);}to{opacity:1;transform:translateX(0);}}',
  'enter-from-left': '{from{opacity:0;transform:translateX(-200px);}to{opacity:1;transform:translateX(0);}}',
  'exit-to-right': '{from{opacity:1;transform:translateX(0);}to{opacity:0;transform:translateX(200px);}}',
  'exit-to-left': '{from{opacity:1;transform:translateX(0);}to{opacity:0;transform:translateX(-200px);}}',
}

export function createUnoPreset(options: PresetOptions = {}) {
  const themeShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const colors = Object.fromEntries((resolveColors(options?.colors)).map((color) => {
    const colorValues = Object.fromEntries(themeShades.map((shade) => [shade, `var(--ui-color-${color}-${shade})`]))
    return [color, { ...colorValues, DEFAULT: `var(--ui-${color})` }]
  }))

  return {
    name: 'unocss-preset-ui',
    theme: {
      colors: {
        // theme colors
        'tw-neutral': twColors.neutral,
        ...colors,
      },
      radius: {
        'DEFAULT': 'var(--ui-radius)',
        'xs': 'calc(var(--ui-radius) * 0.5)',
        'sm': 'var(--ui-radius)',
        'md': 'calc(var(--ui-radius) * 1.5)',
        'lg': 'calc(var(--ui-radius) * 2)',
        'xl': 'calc(var(--ui-radius) * 3)',
        '2xl': 'calc(var(--ui-radius) * 4)',
        '3xl': 'calc(var(--ui-radius) * 6)',
        '4xl': 'calc(var(--ui-radius) * 8)',
      },
      animation: {
        keyframes,
      },
    },
    shortcuts: {
      // text color
      'text-default': 'text-[--ui-text]',
      'text-dimmed': 'text-[--ui-text-dimmed]',
      'text-muted': 'text-[--ui-text-muted]',
      'text-toned': 'text-[--ui-text-toned]',
      'text-highlighted': 'text-[--ui-text-highlighted]',
      'text-inverted': 'text-[--ui-text-inverted]',

      // background color
      'bg-default': 'bg-[--ui-bg]',
      'bg-muted': 'bg-[--ui-bg-muted]',
      'bg-elevated': 'bg-[--ui-bg-elevated]',
      'bg-accented': 'bg-[--ui-bg-accented]',
      'bg-inverted': 'bg-[--ui-bg-inverted]',
      'bg-border': 'bg-[--ui-border]',

      // border color
      'border-default': 'border-[--ui-border]',
      'border-muted': 'border-[--ui-border-muted]',
      'border-accented': 'border-[--ui-border-accented]',
      'border-inverted': 'border-[--ui-border-inverted]',
      'border-bg': 'border-[--ui-bg]',

      // ring color
      'ring-default': 'ring-[--ui-border]',
      'ring-muted': 'ring-[--ui-border-muted]',
      'ring-accented': 'ring-[--ui-border-accented]',
      'ring-inverted': 'ring-[--ui-border-inverted]',
      'ring-bg': 'ring-[--ui-bg]',

      // ring offset color
      'ring-offset-default': 'ring-offset[--ui-border]',
      'ring-offset-muted': 'ring-offset[--ui-border-muted]',
      'ring-offset-accented': 'ring-offset[--ui-border-accented]',
      'ring-offset-inverted': 'ring-offset[--ui-border-inverted]',
      'ring-offset-bg': 'ring-offset[--ui-bg]',

      // divide color
      'divide-default': 'divide-[--ui-border]',
      'divide-muted': 'divide-[--ui-border-muted]',
      'divide-accented': 'divide-[--ui-border-accented]',
      'divide-inverted': 'divide-[--ui-border-inverted]',
      'divide-bg': 'divide-[--ui-bg]',

      // outline color
      'outline-default': 'outline-[--ui-border]',
      'outline-inverted': 'outline-[--ui-border-inverted]',

      // stroke color
      'stroke-default': 'stroke-[--ui-border]',
      'stroke-inverted': 'stroke-[--ui-border-inverted]',

      // fill color
      'fill-default': 'fill-[--ui-border]',
      'fill-inverted': 'fill-[--ui-border-inverted]',
    },
    safelist: Object.keys(keyframes).map((s) => `keyframes-${s}`),
    preflights: [
      {
        getCSS() {
          return `:root, .light {
  --ui-text: var(--ui-color-neutral-700);
  --ui-text-dimmed: var(--ui-color-neutral-400);
  --ui-text-muted: var(--ui-color-neutral-500);
  --ui-text-toned: var(--ui-color-neutral-600);
  --ui-text-highlighted: var(--ui-color-neutral-900);
  --ui-text-inverted: #fff;

  --ui-bg: #fff;
  --ui-bg-muted: var(--ui-color-neutral-50);
  --ui-bg-elevated: var(--ui-color-neutral-100);
  --ui-bg-accented: var(--ui-color-neutral-200);
  --ui-bg-inverted: var(--ui-color-neutral-900);

  --ui-border: var(--ui-color-neutral-200);
  --ui-border-muted: var(--ui-color-neutral-200);
  --ui-border-accented: var(--ui-color-neutral-300);
  --ui-border-inverted: var(--ui-color-neutral-900);

  --ui-radius: 0.25rem;
}

.dark {
  --ui-text-dimmed: var(--ui-color-neutral-500);
  --ui-text-muted: var(--ui-color-neutral-400);
  --ui-text-toned: var(--ui-color-neutral-300);
  --ui-text: var(--ui-color-neutral-200);
  --ui-text-highlighted: #fff;
  --ui-text-inverted: var(--ui-color-neutral-900);

  --ui-bg: var(--ui-color-neutral-900);
  --ui-bg-muted: var(--ui-color-neutral-800);
  --ui-bg-elevated: var(--ui-color-neutral-800);
  --ui-bg-accented: var(--ui-color-neutral-700);
  --ui-bg-inverted: #fff;

  --ui-border: var(--ui-color-neutral-800);
  --ui-border-muted: var(--ui-color-neutral-700);
  --ui-border-accented: var(--ui-color-neutral-700);
  --ui-border-inverted: #fff;
}`
        },
      },
    ],
  } satisfies Preset<Theme>
}
