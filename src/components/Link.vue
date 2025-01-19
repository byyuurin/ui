<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps } from 'reka-ui'
import { createStyler } from '../internal'
import { link } from '../theme'
import type { ComponentAttrs } from '../types'

export type LinkVariants = VariantProps<typeof link>

export interface LinkProps extends Omit<ComponentAttrs<typeof link>, 'ui'>, Pick<PrimitiveProps, 'as'> {
  type?: string
  onClick?: ((e: MouseEvent) => void | Promise<void>) | Array<((e: MouseEvent) => void | Promise<void>)>
  href?: string
  navigate?: (e: MouseEvent) => void
  rel?: string
  target?: string
  isExternal?: boolean
  active?: boolean
  disabled?: boolean
  raw?: boolean
  ui?: {
    active?: string
    inactive?: string
    disabled?: string
  }
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
    return { ...base, type, disabled }

  return base
})

const style = computed(() => {
  if (props.raw) {
    return [
      props.class,
      props.active
        ? props.ui?.active
        : props.ui?.inactive,
      props.disabled
        ? props.ui?.disabled
        : undefined,
    ]
  }

  const styler = createStyler({
    ...link,
    variants: {
      ...link.variants,
      active: {
        true: props.ui?.active ?? link.variants.active.true,
        false: props.ui?.inactive ?? link.variants.active.false,
      },
      disabled: {
        true: props.ui?.disabled ?? link.variants.disabled.true,
      },
    },
  })
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
