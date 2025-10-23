<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { LinkProps } from '../types'

export interface LinkBaseProps {
  /**
   * The element or component this component should render as.
   * @default "button"
   */
  as?: PrimitiveProps['as']
  /** @default "button" */
  type?: string
  disabled?: boolean
  onClick?: ((e: MouseEvent) => void | Promise<void>) | Array<((e: MouseEvent) => void | Promise<void>)>
  href?: string
  navigate?: (e: MouseEvent) => void
  target?: LinkProps['target'] | null
  rel?: LinkProps['rel'] | null
  active?: boolean
  isExternal?: boolean
}
</script>

<script setup lang="ts">
import { Primitive } from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(defineProps<LinkBaseProps>(), {
  as: 'button',
  type: 'button',
})

const linkProps = computed(() => {
  const { as, type, href, rel, target, disabled } = props

  if (href) {
    return disabled
      ? { as: 'a', ariaDisabled: 'true', role: 'link', tabindex: -1, rel, target }
      : { as: 'a', href, rel, target }
  }

  if (as === 'button')
    return { as, type, disabled, rel, target }

  return { as, rel, target }
})

function onClickWrapper(e: MouseEvent) {
  if (props.disabled) {
    e.stopPropagation()
    e.preventDefault()
    return
  }

  if (props.onClick) {
    for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick])
      onClick(e)
  }

  if (props.href && props.navigate && !props.isExternal)
    props.navigate(e)
}
</script>

<template>
  <Primitive v-bind="linkProps" @click="onClickWrapper">
    <slot></slot>
  </Primitive>
</template>
