<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PrimitiveProps, SwitchRootProps } from 'reka-ui'
import type { switch as _switch } from '../theme'
import type { ComponentAttrs } from '../types'

type SwitchVariants = VariantProps<typeof _switch>

export interface SwitchProps extends ComponentAttrs<typeof _switch>, Pick<SwitchRootProps, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue'> {
  as?: PrimitiveProps['as']
  size?: SwitchVariants['size']
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
  /**
   * The icon when the `loading` prop is `true`.
   * @default app.icons.loading
   */
  loadingIcon?: string
  /** Display an icon when the switch is checked. */
  checkedIcon?: string
  /** Display an icon when the switch is unchecked. */
  uncheckedIcon?: string
  label?: string
  description?: string
}

export interface SwitchEmits {
  (event: 'change', payload: Event): void
}

export interface SwitchSlots {
  label?: (props: { label?: string }) => any
  description?: (props: { description?: string }) => any
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { Label, Primitive, SwitchRoot, SwitchThumb, useForwardProps } from 'reka-ui'
import { computed, useId } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'md',
})
const emit = defineEmits<SwitchEmits>()
const slots = defineSlots<SwitchSlots>()
const modelValue = defineModel<boolean>({ default: undefined })

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))
const id = useId()

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.switch)
  return styler({ ...props, checked: false, unchecked: false })
})

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
}
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <div :class="style.container({ class: props.ui?.container })">
      <SwitchRoot
        :id="id"
        v-bind="rootProps"
        v-model="modelValue"
        :name="props.name"
        :disabled="props.disabled || props.loading"
        :class="style.base({ class: props.ui?.base })"
        @update:model-value="onUpdate"
      >
        <SwitchThumb :class="style.thumb({ class: props.ui?.thumb })">
          <i v-if="props.loading" :class="style.icon({ class: [theme.app.icons.loading, props.ui?.icon], checked: true, unchecked: true })"></i>
          <template v-else>
            <i v-if="props.checkedIcon" :class="style.icon({ class: [props.checkedIcon, props.ui?.icon], checked: true })"></i>
            <i v-if="props.uncheckedIcon" :class="style.icon({ class: [props.uncheckedIcon, props.ui?.icon], unchecked: true })"></i>
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="props.label || slots.label || props.description || slots.description" :class="style.wrapper({ class: props.ui?.wrapper })">
      <Label v-if="props.label || slots.label" :for="id" :class="style.label({ class: props.ui?.label })">
        <slot name="label" :label="props.label">{{ props.label }}</slot>
      </Label>
      <p v-if="props.description || slots.description" :class="style.description({ class: props.ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
