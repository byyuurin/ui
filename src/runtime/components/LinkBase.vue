<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'

export interface LinkBaseProps {
  /**
   * The element or component this component should render as.
   * @default 'button'
   */
  as?: PrimitiveProps['as']
  type?: string
  disabled?: boolean
  onClick?: ((e: MouseEvent) => void | Promise<void>) | Array<((e: MouseEvent) => void | Promise<void>)>
  href?: string
  navigate?: (e: MouseEvent) => void
  rel?: string
  target?: string
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

const wrapperProps = computed(() => {
  const { href, rel, target, disabled } = props

  const baseProps = {
    rel,
    target,
  }

  if (props.href) {
    return {
      ...baseProps,
      'as': 'a',
      'href': disabled ? undefined : href,
      'aria-disabled': disabled ? 'true' : undefined,
      'role': disabled ? 'link' : undefined,
      'tabindex': disabled ? -1 : undefined,
    }
  }

  if (props.as === 'button') {
    return {
      ...baseProps,
      as: props.as,
      type: props.type,
      disabled,
    }
  }

  return {
    ...baseProps,
    as: props.as,
  }
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
  <Primitive
    v-bind="wrapperProps"
    @click="onClickWrapper"
  >
    <slot></slot>
  </Primitive>
</template>
