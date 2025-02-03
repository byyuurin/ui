import { cr } from '@byyuurin/ui-kit'
import { describe, expect, it } from 'vitest'
import { createMergeRules } from '../src/unocss-merge'

const mergeRules = createMergeRules()

describe('check style merge', () => {
  const merge = cr(mergeRules, { debug: true })

  it('should...', () => {
    const result = merge('grid gap-10 grid-cols-10 scale-1 translate-y-full')

    expect(result).toMatchInlineSnapshot(`"grid gap grid-cols-10 scale translate-y"`)
  })
})
