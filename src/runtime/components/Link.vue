<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { ButtonHTMLAttributes } from 'vue'
import type { RouteLocationRaw, RouterLinkProps } from 'vue-router'
import type { link } from '../theme'
import type { ComponentAttrs } from '../types'

interface NuxtLinkProps extends Omit<RouterLinkProps, 'to'> {
  /**
   * Route Location the link should navigate to when clicked on.
   */
  to?: RouteLocationRaw // need to manually type to avoid breaking typedPages
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
}

export interface LinkProps extends Omit<ComponentAttrs<typeof link>, 'ui'>, NuxtLinkProps {
  /**
   * The element or component this component should render as when not a link.
   * @default 'button'
   */
  as?: PrimitiveProps['as']
  /**
   * The type of the button when not a link.
   * @default 'button'
   */
  type?: ButtonHTMLAttributes['type']
  label?: string
  disabled?: boolean
  /** Force the link to be active independent of the current route. */
  active?: boolean
  /** Will only be active if the current route is an exact match. */
  exact?: boolean
  /** Will only be active if the current route query is an exact match. */
  exactQuery?: boolean | 'partial'
  /** Will only be active if the current route hash is an exact match. */
  exactHash?: boolean
  /** The class to apply when the link is inactive. */
  inactiveClass?: string
  /** The class to apply when the link is disabled. */
  disableClass?: string
  custom?: boolean
  underline?: boolean
  /** When `true`, only styles from `class`, `ui.active`, and `ui.inactive` will be applied. */
  raw?: boolean
}

export interface LinkSlots {
  default?: (props: { active: boolean }) => any
}
</script>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { diff, isEqual } from 'ohash/utils'
import { useForwardProps } from 'reka-ui'
import { hasProtocol } from 'ufo'
import { computed, getCurrentInstance, resolveComponent } from 'vue'
import { useNuxtApp, useRoute } from '#imports'
import { useTheme } from '../composables/useTheme'
import LinkBase from './LinkBase.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'button',
  type: 'button',
})
defineSlots<LinkSlots>()

// Check if vue-router is available by checking for the injection key
const hasRouter = computed(() => {
  const app = getCurrentInstance()?.appContext.app
  return !!(app?.config?.globalProperties?.$router)
})

const nuxtApp = useNuxtApp()
const hasNuxtLink = !!nuxtApp.$router

const linkComponent = computed(() => ({
  NuxtLink: nuxtApp.$router ? resolveComponent('NuxtLink') : null,
  RouterLink: hasRouter.value ? resolveComponent('RouterLink') : null,
}))

// Only try to get route if router exists
const route = computed(() => {
  if (!hasRouter.value)
    return null

  try {
    return useRoute()
  }
  catch {
    return null
  }
})

const linkProps = useForwardProps(reactiveOmit(
  props,
  'as',
  'type',
  'disabled',
  'active',
  'exact',
  'exactQuery',
  'exactHash',
  'activeClass',
  'inactiveClass',
  'raw',
  'class',
  ...(hasNuxtLink ? [] : ['to'] as const),
))

function isPartiallyEqual(item1: any, item2: any) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === 'added')
      filtered.add(q.key)

    return filtered
  }, new Set<string>())

  const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)))
  const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)))

  return isEqual(item1Filtered, item2Filtered)
}

const isExternalLink = computed(() => {
  if (!props.to)
    return false

  return typeof props.to === 'string' && hasProtocol(props.to, { acceptRelative: true })
})

function isLinkActive({ route: linkRoute, isActive, isExactActive }: any) {
  if (props.active !== undefined)
    return props.active

  if (props.exactQuery === 'partial') {
    if (!isPartiallyEqual(linkRoute?.query, route.value?.query))
      return false
  }
  else if (props.exactQuery === true && !isEqual(linkRoute?.query, route.value?.query)) {
    return false
  }

  if (props.exactHash && linkRoute?.hash !== route.value?.hash)
    return false

  if (props.exact && isExactActive)
    return true

  if (!props.exact && isActive)
    return true

  return false
}

const { theme, createStyler } = useTheme()

function resolveLinkClass({ route, isActive, isExactActive }: any = {}) {
  const { link } = theme.value
  const active = isLinkActive({ route, isActive, isExactActive })

  if (props.raw)
    return [props.class, active ? props.activeClass : props.inactiveClass]

  const styler = createStyler({
    ...link,
    variants: {
      ...link.variants,
      active: {
        true: [link.variants.active.true, props.activeClass],
        false: [link.variants.active.false, props.inactiveClass],
      },
      disabled: {
        true: [link.variants.disabled.true, props.disableClass],
      },
    },
  })

  return styler({ ...props, active })
}
</script>

<template>
  <template v-if="hasRouter">
    <component
      :is="linkComponent.NuxtLink"
      v-if="hasNuxtLink"
      v-slot="{ href, navigate, route: linkRoute, rel, target, isExternal, isActive, isExactActive }"
      v-bind="linkProps"
      :href="to ? undefined : href"
      custom
    >
      <template v-if="custom">
        <slot
          v-bind="{
            ...$attrs,
            as,
            type,
            disabled,
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
          as,
          type,
          disabled,
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
    </component>
    <component
      :is="linkComponent.RouterLink"
      v-else
      v-slot="{ href, navigate, route: linkRoute, isActive, isExactActive }"
      v-bind="linkProps"
      :to="to || '#'"
      custom
    >
      <template v-if="custom">
        <slot
          v-bind="{
            ...$attrs,
            as,
            type,
            disabled,
            href: to ? href : undefined,
            navigate,
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
          as,
          type,
          disabled,
          href: to ? href : undefined,
          navigate,
        }"
        :class="resolveLinkClass({ route: linkRoute, isActive, isExactActive })"
      >
        <slot :active="isLinkActive({ route: linkRoute, isActive, isExactActive })">
          {{ props.label }}
        </slot>
      </LinkBase>
    </component>
  </template>
  <template v-else>
    <template v-if="props.custom">
      <slot
        v-bind="{
          ...$attrs,
          as,
          type,
          disabled,
          href: to,
          target: isExternalLink ? '_blank' : undefined,
          active: false,
        }"
      >
        {{ props.label }}
      </slot>
    </template>
    <LinkBase
      v-else
      v-bind="{
        ...$attrs,
        as,
        type,
        disabled,
        href: (to as string),
        target: isExternalLink ? '_blank' : undefined,
      }"
      :is-external="isExternalLink"
      :class="resolveLinkClass()"
    >
      <slot :active="false">
        {{ props.label }}
      </slot>
    </LinkBase>
  </template>
</template>
