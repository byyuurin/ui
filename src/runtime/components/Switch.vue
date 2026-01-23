<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { SwitchRootProps } from 'reka-ui'
import theme from '#build/ui/switch'
import type { ComponentBaseProps, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { ButtonHTMLAttributes } from '../types/html'
import type { StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface SwitchProps extends ComponentBaseProps, Pick<SwitchRootProps, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'value' | 'name'> {
  /**
   * The element or component this component should render as.
   *  @default "div"
   */
  as?: SwitchRootProps['as']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
  /**
   * The icon when the `loading` prop is `true`.
   * @default app.icons.loading
   */
  loadingIcon?: IconProps['name']
  /** Display an icon when the switch is checked. */
  checkedIcon?: IconProps['name']
  /** Display an icon when the switch is unchecked. */
  uncheckedIcon?: IconProps['name']
  modelValue?: boolean
  label?: string
  description?: string
  ui?: ComponentUIProps<typeof theme>
}

export interface SwitchEmits {
  'change': [event: Event]
  'update:modelValue': [value: boolean]
}

export interface SwitchSlots {
  label: StaticSlot<{ label?: string }>
  description: StaticSlot<{ description?: string }>
}
</script>

<script lang="ts" setup>
import { reactivePick, useVModel } from '@vueuse/core'
import { Label, Primitive, SwitchRoot, SwitchThumb, useForwardProps } from 'reka-ui'
import { computed, useId } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), {})
const emit = defineEmits<SwitchEmits>()
const slots = defineSlots<SwitchSlots>()

const modelValue = useVModel(props, 'modelValue', emit)

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const { id: _id, name, size, color, disabled, ariaAttrs, emitFormChange, emitFormInput } = useFormField<SwitchProps>(props)
const id = _id.value ?? useId()

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.switch))

  return styler({
    ...pick(props, ['required', 'loading']),
    size: size.value,
    color: color.value,
    disabled: disabled.value || props.loading,
  })
})

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })

  emit('change', event)
  emitFormChange()
  emitFormInput()
}
</script>

<template>
  <Primitive :as="props.as" data-part="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-part="container" :class="ui.container({ class: props.ui?.container })">
      <SwitchRoot
        v-bind="{ id, ...rootProps, ...ariaAttrs, name }"
        v-model="modelValue"
        :disabled="disabled || props.loading"
        data-part="base"
        :class="ui.base({ class: props.ui?.base })"
        @update:model-value="onUpdate"
      >
        <SwitchThumb data-part="thumb" :class="ui.thumb({ class: props.ui?.thumb })">
          <Icon v-if="props.loading" :name="props.loadingIcon || appConfig.ui.icons.loading" data-part="icon" :class="ui.icon({ class: props.ui?.icon, checked: true, unchecked: true })" />
          <template v-else>
            <Icon v-if="props.checkedIcon" :name="props.checkedIcon" data-part="icon" :class="ui.icon({ class: props.ui?.icon, checked: true })" />
            <Icon v-if="props.uncheckedIcon" :name="props.uncheckedIcon" data-part="icon" :class="ui.icon({ class: props.ui?.icon, unchecked: true })" />
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="(props.label || !!slots.label) || (props.description || !!slots.description)" data-part="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <Label v-if="props.label || !!slots.label" :for="id" data-part="label" :class="ui.label({ class: props.ui?.label })">
        <slot name="label" :label="props.label">{{ props.label }}</slot>
      </Label>
      <p v-if="props.description || !!slots.description" data-part="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
