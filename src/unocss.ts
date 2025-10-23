import type { Preset } from '@unocss/core'
import { colors as twColors } from '@unocss/preset-wind4/colors'
import type { Theme } from '@unocss/preset-wind4/theme'
import { parseColor } from '@unocss/preset-wind4/utils'
import { resolveColors } from './defaults'
import type { ModuleOptions } from './module'

export type PresetOptions = Pick<(ModuleOptions['theme'] & {}), 'colors'>

export function createUnoPreset(options: PresetOptions = {}) {
  const themeShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const colors = Object.fromEntries((resolveColors(options?.colors)).map((color) => {
    const colorValues = Object.fromEntries(themeShades.map((shade) => [shade, `var(--ui-color-${color}-${shade})`]))
    return [color, { ...colorValues, DEFAULT: `var(--ui-${color})` }]
  }))

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
    'carousel': '{0%,100% {width: 50%}0% {transform: translateX(-100%)}100% {transform: translateX(200%)}}',
    'carousel-rtl': '{0%,100% {width: 50%}0% {transform: translateX(100%)}100% {transform: translateX(-200%)}}',
    'carousel-vertical': '{0%,100% {height: 50%}0% {transform: translateY(-100%)}100% {transform: translateY(200%)}}',
    'carousel-inverse': '{0%,100% {width: 50%}0% {transform: translateX(200%)}100% {transform: translateX(-100%)}}',
    'carousel-inverse-rtl': '{0%,100% {width: 50%}0% {transform: translateX(-200%)}100% {transform: translateX(100%)}}',
    'carousel-inverse-vertical': '{0%,100% {height: 50%}0% {transform: translateY(200%)}100% {transform: translateY(-100%)}}',
    'swing': '{0%,100% {width: 50%}0%,100% {transform: translateX(-25%)}50% {transform: translateX(125%)}}',
    'swing-vertical': '{0%,100% {height: 50%}0%,100% {transform: translateY(-25%)}50% {transform: translateY(125%)}}',
    'elastic': '{0%,100% {width: 50%;margin-left: 25%;}50% {width: 90%;margin-left: 5%;}}',
    'elastic-vertical': '{0%,100% {height: 50%;margin-top: 25%;}50% {height: 90%;margin-top: 5%;}}',
  }

  const preset: Preset<Theme> = {
    name: '@byyuurin/ui/uno-preset',
    theme: {
      font: {
        sans: '"Public Sans",sans-serif',
      },
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
    shortcuts: [
      [
        /^(?:(text|bg|border|divide|outline|ring-offset|ring|stroke|fill)-)(.+)$/,
        ([, t = '', c = ''], { theme }) => {
          const parsed = parseColor(c, theme)

          if (!parsed || !/^(?:default|dimmed|muted|toned|highlighted|inverted|elevated|accented|border|bg)/.test(c))
            return

          const result = `${t}-[--ui-${t}-${parsed.name}]/${parsed.opacity ?? 100}`
            .replace('-default', '')
            .replace('/100', '')
            .replace(/ui-(?:border|divide|outline|ring-offset|ring|stroke|fill)/, 'ui-border')
            .replace(/(?:bg-(border)|border-(bg))/, '$1$2')

          return result
        },
      ],
    ],
    safelist: Object.keys(keyframes).map((s) => `keyframes-${s}`),
    preflights: [
      {
        layer: 'base',
        getCSS() {
          return `body {
  accent-color: var(--ui-text);
  background-color: var(--ui-bg);
  color: var(--ui-text);
  scrollbar-color: var(--ui-border-accented) transparent;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root, .light {
  --un-default-border-color: var(--ui-border);

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
  }

  return () => preset
}
