<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import { createStyler } from '../internal'
import { link } from '../theme'
import type { ComponentAttrs } from '../types'

export type LinkVariants = VariantProps<typeof link>

// TODO: type issue
type _ComponentAttrs = Omit<ComponentAttrs<typeof link>, 'ui'>

export interface LinkProps extends _ComponentAttrs, Pick<PrimitiveProps, 'as'> {
  type?: string
  onClick?: ((e: MouseEvent) => void | Promise<void>) | Array<((e: MouseEvent) => void | Promise<void>)>
  href?: string
  navigate?: (e: MouseEvent) => void
  rel?: string
  target?: string
  isExternal?: boolean
  active?: boolean
  disabled?: boolean
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'button',
  type: 'button',
})

const linkProps = computed(() => {
  const { as, type, disabled, href, rel, target } = props
  const base = { as, rel, target }

  if (href) {
    return {
      ...base,
      'as': 'a',
      'href': disabled ? undefined : href,
      'aria-disabled': disabled ? 'true' : undefined,
      'role': disabled ? 'link' : undefined,
      'tabindex': disabled ? -1 : undefined,
    }
  }

  if (as === 'button')
    return { ...base, as, type, disabled }

  return base
})

const style = computed(() => {
  const styler = createStyler(link)
  return styler(props)
})

function handleClick(e: MouseEvent) {
  if (props.disabled) {
    e.stopPropagation()
    e.preventDefault()
    return
  }

  if (props.onClick) {
    const handlers = Array.isArray(props.onClick) ? props.onClick : [props.onClick]
    for (const handler of handlers)
      handler(e)
  }

  if (props.href && props.navigate && !props.isExternal)
    props.navigate(e)
}
</script>

<template>
  <Primitive
    v-bind="linkProps"
    :rel="props.rel"
    :target="props.target"
    :class="style"
    @click="handleClick"
  >
    <slot></slot>
  </Primitive>
</template>
