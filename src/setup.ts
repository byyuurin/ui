import { defu } from 'defu'
import type * as ui from '#build/ui'
import type { Color, NeutralColor, VariantsColor, VariantsSize } from './defaults'
import type { UIConfig as ComponentStyle } from './runtime/types/style'
import type { icons } from './theme/app'
import type { PresetOptions } from './unocss'
import { createUnoPreset } from './unocss'
import type { UIOptions as ViteUIOptions } from './vite'
import vite from './vite'

export type AppConfigIcons = Record<keyof typeof icons | (string & {}), string>

export type AppConfigUI<Colors extends string = VariantsColor> = {
  colors?: { [C in Colors extends '' | never ? VariantsColor : Colors]?: Color }
    & {
      primary?: Color
      neutral?: NeutralColor | (string & {})
    }
  icons?: Partial<AppConfigIcons>
} & {
  // FIXME: lose ui types
  components?: ComponentStyle<typeof ui>
}

interface UIConfig<Color extends string = VariantsColor> extends Omit<ViteUIOptions, 'theme' | 'ui'> {
  theme?: {
    /**
     * Define the color aliases available for components
     * @default ["primary", "secondary", "success", "info", "warning", "error"]
     */
    colors?: Color[]

    /**
     * Enable or disable transitions on components
     * @default true
     */
    transitions?: boolean

    defaultVariants?: {
      /**
       * The default color variant to use for components
       * @default "primary"
       */
      color?: Color

      /**
       * The default size variant to use for components
       * @default "md"
       */
      size?: VariantsSize | (string & {})
    }
  }
  ui?: AppConfigUI<Color>
}

export function setup<Color extends string = VariantsColor>(defaults: UIConfig<Color> = {}) {
  return {
    uno: (options?: PresetOptions) => createUnoPreset(options ?? defaults.theme),
    vite: (options?: UIConfig<Color>) => vite((defu(options, defaults)) as ViteUIOptions),
  }
}
