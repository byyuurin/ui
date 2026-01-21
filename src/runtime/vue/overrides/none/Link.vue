<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ComponentBaseProps, RuntimeAppConfig } from '../../../types'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from '../../../types/html'
import type { StaticSlot } from '../../../types/utils'

interface BaseLinkProps {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: string
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: string
  /**
   * Forces the link to be considered as external (true) or internal (false). This is helpful to handle edge-cases
   */
  external?: boolean
  /**
   * Where to display the linked URL, as the name for a browsing context.
   */
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null
  /**
   * A rel attribute value to apply on the link. Defaults to "noopener noreferrer" for external links.
   */
  rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null
  /**
   * If set to true, no rel attribute will be added to the link
   */
  noRel?: boolean
}

export interface LinkProps extends ComponentBaseProps, BaseLinkProps, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled'>, /** @vue-ignore */ Omit<AnchorHTMLAttributes, 'href' | 'target' | 'rel' | 'type'> {
  /**
   * The element or component this component should render as when not a link.
   * @default "button"
   */
  as?: PrimitiveProps['as']
  /**
   * The type of the button when not a link.
   * @default "button"
   */
  type?: ButtonHTMLAttributes['type']
  label?: string
  disabled?: boolean
  /** Force the link to be active independent of the current route. */
  active?: boolean
  /** Will only be active if the current route is an exact match. */
  exact?: boolean
  /** Allows controlling how the current route query sets the link as active. */
  exactQuery?: boolean | 'partial'
  /** Will only be active if the current route hash is an exact match. */
  exactHash?: boolean
  /** The class to apply when the link is inactive. */
  inactiveClass?: string
  /** The class to apply when the link is active. */
  activeClass?: string
  /** The value of the `aria-current` attribute when the link is active. */
  ariaCurrentValue?: string
  custom?: boolean
  /** When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied. */
  raw?: boolean
}

export interface LinkSlots {
  default: StaticSlot<{ active: boolean }>
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { useForwardProps } from 'reka-ui'
import { hasProtocol } from 'ufo'
import { computed } from 'vue'
import theme from '#build/ui/link'
import { useAppConfig } from '#imports'
import LinkBase from '../../../components/LinkBase.vue'
import { cv, merge } from '../../../utils/style'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'button',
  type: 'button',
  ariaCurrentValue: 'page',
  active: undefined,
})
defineSlots<LinkSlots>()

const inheritProps = useForwardProps(reactivePick(props, 'as', 'type', 'disabled'))

const to = computed(() => props.to ?? props.href)

const isExternal = computed(() => {
  if (props.target === '_blank')
    return true

  if (props.external)
    return true

  if (!to.value)
    return false

  return typeof to.value === 'string' && hasProtocol(to.value, { acceptRelative: true })
})

const isLinkActive = computed(() => {
  if (props.active !== undefined)
    return props.active

  return false
})

const appConfig = useAppConfig() as RuntimeAppConfig

const ui = computed(() => {
  const link = merge(theme, {
    ...appConfig.ui.link,
    variants: {
      ...appConfig.ui.link?.variants,
      active: {
        true: [appConfig.ui.link?.variants?.active?.true, props.activeClass].filter(Boolean).join(' '),
        false: [appConfig.ui.link?.variants?.active?.false, props.inactiveClass].filter(Boolean).join(' '),
      },
    },
  })

  return cv(link)()
})

const linkClass = computed(() => {
  const active = isLinkActive.value

  if (props.raw)
    return [props.class, active ? props.activeClass : props.inactiveClass]

  return ui.value.base({ ...props, active })
})

const linkRel = computed(() => {
  if (props.noRel)
    return null

  if (props.rel)
    return props.rel

  if (isExternal.value)
    return 'noopener noreferrer'

  return null
})
</script>

<template>
  <template v-if="props.custom">
    <slot
      v-bind="{
        ...$attrs,
        ...inheritProps,
        href: to,
        navigate: undefined,
        rel: linkRel,
        target: props.target || (isExternal ? '_blank' : undefined),
        active: isLinkActive ?? false,
        isExternal,
      }"
    >
      {{ props.label }}
    </slot>
  </template>
  <LinkBase
    v-else
    v-bind="{
      ...$attrs,
      ...inheritProps,
      href: to,
      navigate: undefined,
      rel: linkRel,
      target: props.target || (isExternal ? '_blank' : undefined),
      isExternal,
    }"
    :class="linkClass"
  >
    <slot :active="isLinkActive">
      {{ props.label }}
    </slot>
  </LinkBase>
</template>
