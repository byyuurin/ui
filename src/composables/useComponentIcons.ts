import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useTheme } from './useTheme'

export interface UseComponentIconsProps {
  /** Display an icon based on the `prefix` and `suffix` props. */
  icon?: string
  /** When `true`, the icon will be displayed on the left side. */
  prefix?: boolean
  /** Display an icon on the left side. */
  prefixIcon?: string
  /** When `true`, the icon will be displayed on the right side. */
  suffix?: boolean
  /** Display an icon on the right side. */
  suffixIcon?: string
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
  /**
   * The icon when the `loading` prop is `true`.
   * @default global.icons.loading
   */
  loadingIcon?: string
}

export function useComponentIcons(componentProps: MaybeRefOrGetter<UseComponentIconsProps>) {
  const { theme } = useTheme()

  const props = computed(() => toValue(componentProps))

  const isPrefix = computed(() => (props.value.icon && props.value.prefix) || (props.value.icon && !props.value.suffix) || (props.value.loading && !props.value.suffix) || !!props.value.prefixIcon)
  const isSuffix = computed(() => (props.value.icon && props.value.suffix) || (props.value.loading && props.value.suffix) || !!props.value.suffixIcon)

  const prefixIconName = computed(() => {
    if (props.value.loading)
      return props.value.loadingIcon || theme.value.global.icons.loading

    return props.value.prefixIcon || props.value.icon
  })
  const suffixIconName = computed(() => {
    if (props.value.loading && !isPrefix.value)
      return props.value.loadingIcon || theme.value.global.icons.loading

    return props.value.suffixIcon || props.value.icon
  })

  return {
    isPrefix,
    isSuffix,
    prefixIconName,
    suffixIconName,
  }
}
