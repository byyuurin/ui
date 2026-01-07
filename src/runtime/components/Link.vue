<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { RouteLocationRaw, RouterLinkProps } from 'vue-router'
import type { ComponentBaseProps, RuntimeAppConfig } from '../types'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from '../types/html'
import type { StaticSlot } from '../types/utils'

interface NuxtLinkProps extends Omit<RouterLinkProps, 'to'> {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: RouteLocationRaw
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: NuxtLinkProps['to']
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
  /**
   * A class to apply to links that have been prefetched.
   */
  prefetchedClass?: string
  /**
   * When enabled will prefetch middleware, layouts and payloads of links in the viewport.
   */
  prefetch?: boolean
  /**
   * Allows controlling when to prefetch links. By default, prefetch is triggered only on visibility.
   */
  prefetchOn?: 'visibility' | 'interaction' | Partial<{
    visibility: boolean
    interaction: boolean
  }>
  /**
   * Escape hatch to disable `prefetch` attribute.
   */
  noPrefetch?: boolean
  /**
   * An option to either add or remove trailing slashes in the `href` for this specific link.
   * Overrides the global `trailingSlash` option if provided.
   */
  trailingSlash?: 'append' | 'remove'
}

export interface LinkProps extends ComponentBaseProps, Omit<NuxtLinkProps, 'custom'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled'>, /** @vue-ignore */ Omit<AnchorHTMLAttributes, 'href' | 'target' | 'rel' | 'type'> {
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
  custom?: boolean
  /** When `true`, only styles from `class`, `activeClass`, and `inactiveClass` will be applied. */
  raw?: boolean
}

/**
 * Link-related props that can be omitted from ButtonProps when link functionality is not needed.
 * Use this with `Omit<ButtonProps, LinkPropsKeys>` in components where buttons should not act as links.
 */
export type LinkPropsKeys = 'to' | 'href' | 'target' | 'rel' | 'noRel' | 'external' | 'prefetch' | 'prefetchOn' | 'prefetchedClass' | 'noPrefetch' | 'trailingSlash' | 'replace' | 'ariaCurrentValue' | 'active' | 'activeClass' | 'exact' | 'exactQuery' | 'exactHash' | 'inactiveClass' | 'download' | 'ping' | 'referrerpolicy' | 'hreflang' | 'media'

export interface LinkSlots {
  default: StaticSlot<{ active: boolean }>
}
</script>

<script setup lang="ts">
import { reactiveOmit, reactivePick } from '@vueuse/core'
import { isEqual } from 'ohash/utils'
import { useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import theme from '#build/ui/link'
import { useAppConfig, useRoute } from '#imports'
import { pick } from '../utils'
import { isPartiallyEqual } from '../utils/link'
import { cv, merge } from '../utils/style'
import LinkBase from './LinkBase.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'button',
  type: 'button',
  ariaCurrentValue: 'page',
  active: undefined,
})
defineSlots<LinkSlots>()

const route = useRoute()

const inheritProps = useForwardProps(reactivePick(props, 'as', 'type', 'disabled'))
const nuxtLinkProps = useForwardProps(reactiveOmit(props, 'as', 'type', 'disabled', 'active', 'exact', 'exactQuery', 'exactHash', 'activeClass', 'inactiveClass', 'to', 'href', 'raw', 'custom', 'class'))

const to = computed(() => props.to ?? props.href)

function isLinkActive({ route: linkRoute, isActive, isExactActive }: any) {
  if (props.active !== undefined)
    return props.active

  if (props.exactQuery === 'partial') {
    if (!isPartiallyEqual(linkRoute.query, route.query))
      return false
  }
  else if (props.exactQuery === true && !isEqual(linkRoute.query, route.query)) {
    return false
  }

  if (props.exactHash && linkRoute.hash !== route.hash)
    return false

  if (props.exact && isExactActive)
    return true

  if (!props.exact && isActive)
    return true

  return false
}

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

function resolveLinkClass({ route, isActive, isExactActive }: any) {
  const active = isLinkActive({ route, isActive, isExactActive })

  if (props.raw)
    return [props.class, active ? props.activeClass : props.inactiveClass]

  return ui.value.base({ ...pick(props, ['class', 'disabled']), active })
}
</script>

<template>
  <NuxtLink
    v-slot="{ href, navigate, route: linkRoute, rel, target, isExternal, isActive, isExactActive }"
    v-bind="nuxtLinkProps"
    :to="to"
    custom
  >
    <template v-if="custom">
      <slot
        v-bind="{
          ...$attrs,
          ...(props.exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
          ...inheritProps,
          href,
          navigate,
          rel,
          target,
          isExternal,
          active: isLinkActive({ route: linkRoute, isActive, isExactActive }),
        }"
      >
        {{ props.label }}
      </slot>
    </template>
    <LinkBase
      v-else
      v-bind="{
        ...$attrs,
        ...(props.exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
        ...inheritProps,
        href,
        navigate,
        rel,
        target,
        isExternal,
      }"
      :class="resolveLinkClass({ route: linkRoute, isActive, isExactActive })"
    >
      <slot :active="isLinkActive({ route: linkRoute, isActive, isExactActive })">
        {{ props.label }}
      </slot>
    </LinkBase>
  </NuxtLink>
</template>
