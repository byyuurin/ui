<script lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { RouterLink as _RouterLink, RouterLinkProps } from 'vue-router'
import type { ComponentBaseProps, RuntimeAppConfig } from '../../types'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from '../../types/html'
import type { StaticSlot } from '../../types/utils'

export interface LinkSlots {
  default: StaticSlot<{ active: boolean }>
}

export interface LinkProps extends ComponentBaseProps, Partial<Omit<RouterLinkProps, 'custom'>>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled'>, /** @vue-ignore */ Omit<AnchorHTMLAttributes, 'href' | 'target' | 'rel' | 'type'> {
  /**
   * The element or component this component should render as when not a link.
   * @default "button"
   */
  as?: PrimitiveProps['as']
  /**
   * An alias for `to`. If used with `to`, `href` will be ignored
   */
  href?: LinkProps['to']
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
</script>

<script lang="ts" setup>
import { reactiveOmit, reactivePick } from '@vueuse/core'
import { isEqual } from 'ohash/utils'
import { useForwardProps } from 'reka-ui'
import { hasProtocol } from 'ufo'
import { computed, getCurrentInstance, resolveComponent } from 'vue'
import theme from '#build/ui/link'
import { useAppConfig, useRoute } from '#imports'
import LinkBase from '../../components/LinkBase.vue'
import { isPartiallyEqual } from '../../utils/link'
import { cv, merge } from '../../utils/style'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'button',
  type: 'button',
  ariaCurrentValue: 'page',
  active: undefined,
})
defineSlots<LinkSlots>()

// Check if vue-router is available by checking for the injection key
const hasRouter = computed(() => {
  const app = getCurrentInstance()?.appContext.app
  return !!(app?.config?.globalProperties?.$router)
})

const RouterLink = computed(() => hasRouter.value ? (resolveComponent('RouterLink') as unknown as typeof _RouterLink) : null)

// Only try to get route if router exists
const route = computed(() => {
  if (!hasRouter.value)
    return null

  return useRoute()
})

const inheritProps = useForwardProps(reactivePick(props, 'as', 'type', 'disabled'))
const routerLinkProps = useForwardProps(reactiveOmit(props, 'as', 'type', 'disabled', 'active', 'exact', 'exactQuery', 'exactHash', 'activeClass', 'inactiveClass', 'to', 'href', 'raw', 'custom', 'class'))

const to = computed(() => props.to ?? props.href)

const isExternal = computed(() => {
  if (props.external)
    return true

  if (!to.value)
    return false

  return typeof to.value === 'string' && hasProtocol(to.value, { acceptRelative: true })
})

function isLinkActive({ route: linkRoute, isActive, isExactActive }: any) {
  if (props.active !== undefined)
    return props.active

  if (props.exactQuery === 'partial') {
    if (!isPartiallyEqual(linkRoute.query, route.value?.query))
      return false
  }
  else if (props.exactQuery === true && !isEqual(linkRoute.query, route.value?.query)) {
    return false
  }

  if (props.exactHash && linkRoute.hash !== route.value?.hash)
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

function resolveLinkClass({ route, isActive, isExactActive }: any = {}) {
  const active = isLinkActive({ route, isActive, isExactActive })

  if (props.raw)
    return [props.class, active ? props.activeClass : props.inactiveClass]

  return ui.value.base({ ...props, active })
}
</script>

<template>
  <template v-if="RouterLink && !isExternal && !!to">
    <RouterLink v-slot="{ href, navigate, route: linkRoute, isActive, isExactActive }" v-bind="routerLinkProps" :to="to" custom>
      <template v-if="custom">
        <slot
          v-bind="{
            ...$attrs,
            ...(props.exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
            ...inheritProps,
            href,
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
          ...(props.exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
          ...inheritProps,
          href,
          navigate,
        }"
        :class="resolveLinkClass({ route: linkRoute, isActive, isExactActive })"
      >
        <slot :active="isLinkActive({ route: linkRoute, isActive, isExactActive })">
          {{ props.label }}
        </slot>
      </LinkBase>
    </RouterLink>
  </template>

  <template v-else>
    <template v-if="custom">
      <slot
        v-bind="{
          ...$attrs,
          ...inheritProps,
          href: to,
          target: isExternal ? '_blank' : undefined,
          active: active ?? false,
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
        href: (to as string),
        target: isExternal ? '_blank' : undefined,
        isExternal,
      }"
      :class="resolveLinkClass()"
    >
      <slot :active="active ?? false">
        {{ props.label }}
      </slot>
    </LinkBase>
  </template>
</template>
