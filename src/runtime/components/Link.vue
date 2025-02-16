<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { link } from '../theme'
import type { ComponentAttrs, HintString, MaybeArray } from '../types'

export interface LinkProps extends Omit<ComponentAttrs<typeof link>, 'ui'> {
  as?: PrimitiveProps['as']
  type?: string
  onClick?: MaybeArray<(e: MouseEvent) => void | Promise<void>>
  label?: string
  href?: string
  navigate?: (e: MouseEvent) => void
  /** A rel attribute value to apply on the link. */
  rel?: HintString<'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc'> | null
  noRel?: boolean
  /** Where to display the linked URL, as the name for a browsing context. */
  target?: HintString<'_blank' | '_parent' | '_self' | '_top'> | null
  isExternal?: boolean
  underline?: boolean
  active?: boolean
  disabled?: boolean
  /** When `true`, only styles from `class`, `ui.active`, and `ui.inactive` will be applied. */
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
import { useTheme } from '../composables/useTheme'

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

const { theme, createStyler } = useTheme()

const style = computed(() => {
  if (props.raw)
    return props.class

  const { link } = theme.value

  const styler = createStyler({
    ...link,
    variants: {
      ...link.variants,
      active: {
        true: [link.variants.active.true, props.ui?.active],
        false: [link.variants.active.false, props.ui?.inactive],
      },
      disabled: {
        true: [link.variants.disabled.true, props.ui?.disabled],
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
    <slot :active="props.active">
      {{ props.label }}
    </slot>
  </Primitive>
</template>
