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

    const result = extendTheme(ui, JSON.parse(JSON.stringify(raw)))

    expect(raw).toMatchInlineSnapshot(`
      {
        "base": "border-y border-t-transparent outline-none focus-visible:outline-ui-base/80",
        "variants": {
          "active": {
            "false": [
              "color-ui-base/80 hover:color-ui-base/60 transition-colors",
              "disabled:hover:color-ui-base aria-disabled:hover:color-ui-base",
            ],
            "true": [
              "color-ui-fill",
              "disabled:color-ui-fill aria-disabled:color-ui-fill",
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
        "base": "border-y border-t-transparent outline-none focus-visible:outline-ui-base/80 el-link",
        "variants": {
          "active": {
            "false": [
              "color-ui-base/80 hover:color-ui-base/60 transition-colors",
              "disabled:hover:color-ui-base aria-disabled:hover:color-ui-base",
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
