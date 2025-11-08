/* @unocss-include */
import { ct } from '@byyuurin/ui-kit'
import { defu } from 'defu'
import type { ModuleOptions } from '../module'
import inputTheme from './input'

export default (options: Required<ModuleOptions>) => {
  const input = inputTheme(options)

  return ct(defu({
    parts: {
      leading: 'absolute start-0 flex items-start',
      trailing: 'absolute end-0 flex items-start',
    },
    variants: {
      autoresize: {
        true: {
          base: 'resize-none',
        },
      },
      size: {
        xs: {
          leading: 'ps-2 inset-y-1',
          trailing: 'pe-2 inset-y-1',
        },
        sm: {
          leading: 'ps-2.5 inset-y-1.5',
          trailing: 'pe-2.5 inset-y-1.5',
        },
        md: {
          leading: 'ps-2.5 inset-y-1.5',
          trailing: 'pe-2.5 inset-y-1.5',
        },
        lg: {
          leading: 'ps-3 inset-y-2',
          trailing: 'pe-3 inset-y-2',
        },
        xl: {
          leading: 'ps-3 inset-y-2',
          trailing: 'pe-3 inset-y-2',
        },
      },
    },
  }, input))
}
