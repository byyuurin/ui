import { cr } from '@byyuurin/ui-kit'
import { presetMini } from '@unocss/preset-mini'
import { describe, expect, it } from 'vitest'
import { transformUnoRules } from './styler'

describe('check style merge', () => {
  const rules = transformUnoRules(presetMini())
  const merge = cr(rules, { debug: true })

  it('should...', () => {
    const result = merge('grid gap-10 grid-cols-10 scale-1 translate-y-full')

    expect(result).toMatchInlineSnapshot(`"[display] [gap] [grid-template-columns] [--un-scale-x,--un-scale-y,transform] [--un-translate-y,transform]"`)
  })
})
