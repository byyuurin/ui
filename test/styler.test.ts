import { cr } from '@byyuurin/ui-kit'
import { mergeConfigs, presetUno } from 'unocss'
import { describe, expect, it } from 'vitest'
import { preset, transformUnoRules } from '../src/unocss'

const baseUnoConfig = mergeConfigs([presetUno(), preset()])
const mergeRules = transformUnoRules(mergeConfigs([baseUnoConfig, { theme: { colors: { primary: '#febca0' } } }]))

describe('check style merge', () => {
  const merge = cr(mergeRules, { debug: true })

  it('should...', () => {
    const result = merge('rounded-full grid gap-10 grid-cols-10 scale-1 translate-y-full animate-fade-in bg-primary/50')

    expect(result).toMatchInlineSnapshot(`"border-radius display gap grid-template-columns --un-scale-x,--un-scale-y,transform --un-translate-y,transform animation background-color"`)
  })
})
