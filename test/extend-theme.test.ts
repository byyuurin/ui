import { describe, expect, it } from 'vitest'
import { extendTheme } from '../src/internal/extend-theme'
import { link } from '../src/theme'
import type { ThemeExtension } from '../src/types'

describe('check defu result', () => {
  it('should merge', () => {
    const ui: ThemeExtension['link'] = {
      base: 'el-link',
      variants: {
        active: {
          true: 'el-link--active',
          false: ' ',
        },
      },
    }

    const result = extendTheme(ui, link)

    expect(result).toMatchInlineSnapshot(`
      {
        "base": "focus-visible:outline-ui-fill el-link",
        "compoundVariants": undefined,
        "slots": undefined,
        "variants": {
          "active": {
            "false": "color-ui-fill hover:color-ui-fill/80 transition-colors",
            "true": "color-ui-fill/90 el-link--active",
          },
          "disabled": {
            "true": "cursor-not-allowed color-ui-fill opacity-50 hover:color-ui-fill",
          },
        },
      }
    `)
  })
})
