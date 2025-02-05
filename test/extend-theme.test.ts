import { describe, expect, it } from 'vitest'
import { link } from '../src/runtime/theme'
import type { ThemeExtension } from '../src/runtime/types'
import { extendTheme } from '../src/runtime/utils/extend-theme'

describe('check defu result', () => {
  it('should merge', () => {
    const raw = { ...link }
    const ui: ThemeExtension['link'] = {
      base: 'el-link',
      variants: {
        active: {
          true: 'el-link--active',
          false: ' ',
        },
      },
    }

    const result = extendTheme(ui, raw)

    expect(raw).toMatchInlineSnapshot(`
      {
        "base": "border-y border-t-transparent focus-visible:outline-ui-cb",
        "compoundVariants": undefined,
        "slots": undefined,
        "variants": {
          "active": {
            "false": [
              "color-ui-cb hover:color-ui-cb/80 transition-colors",
              "disabled:hover:color-ui-cb aria-disabled:hover:color-ui-cb",
              " ",
            ],
            "true": [
              "color-ui-fill",
              "disabled:color-ui-fill aria-disabled:color-ui-fill",
              "el-link--active",
            ],
          },
          "disabled": {
            "true": "cursor-not-allowed opacity-50",
          },
          "underline": {
            "false": "border-transparent",
            "true": "border-current",
          },
        },
      }
    `)

    expect(result).toMatchInlineSnapshot(`
      {
        "base": "border-y border-t-transparent focus-visible:outline-ui-cb el-link",
        "compoundVariants": undefined,
        "slots": undefined,
        "variants": {
          "active": {
            "false": [
              "color-ui-cb hover:color-ui-cb/80 transition-colors",
              "disabled:hover:color-ui-cb aria-disabled:hover:color-ui-cb",
              " ",
            ],
            "true": [
              "color-ui-fill",
              "disabled:color-ui-fill aria-disabled:color-ui-fill",
              "el-link--active",
            ],
          },
          "disabled": {
            "true": "cursor-not-allowed opacity-50",
          },
          "underline": {
            "false": "border-transparent",
            "true": "border-current",
          },
        },
      }
    `)
  })
})
