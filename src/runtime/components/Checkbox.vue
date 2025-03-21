<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { CheckboxRootProps, PrimitiveProps } from 'reka-ui'
import type { checkbox } from '../theme'
import type { ComponentAttrs } from '../types'

export interface CheckboxEmits {
  (event: 'change', payload: Event): void
}

export interface CheckboxSlots {
  label?: (props: { label?: string }) => any
  description?: (props: { description?: string }) => any
}

type CheckboxVariants = VariantProps<typeof checkbox>

export interface CheckboxProps extends ComponentAttrs<typeof checkbox>, Pick<CheckboxRootProps, 'disabled' | 'required' | 'name' | 'value' | 'id' | 'defaultValue'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  label?: string
  description?: string
  size?: CheckboxVariants['size']
  /**
   * The icon displayed when checked.
   * @default app.icons.check
   */
  icon?: string
  /**
   * The icon displayed when the checkbox is indeterminate.
   * @default app.icons.indeterminate
   */
  indeterminateIcon?: string
}
</script>

<script lang="ts" setup>
import { reactivePick } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, Label, Primitive, useForwardProps } from 'reka-ui'
import { computed, useId } from 'vue'
import { useTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<CheckboxProps>(), {
  required: false,
  disabled: false,
})
const emit = defineEmits<CheckboxEmits>()
const slots = defineSlots<CheckboxSlots>()

const innerValue = defineModel<boolean | 'indeterminate'>({ default: undefined })
const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue'))

const id = props.id ?? useId()

const { theme, generateStyle } = useTheme()
const style = computed(() => generateStyle('checkbox', props))

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: value })
  emit('change', event)
}
</script>

<template>
  <Primitive :as="props.as" :class="style.root({ class: [props.class, props.ui?.root] })">
    <div :class="style.container({ class: props.ui?.container })">
      <CheckboxRoot
        :id="id"
        v-bind="rootProps"
        v-slot="{ modelValue }"
        v-model="innerValue"
        :name="props.name"
        :disabled="props.disabled"
        :class="style.base({ class: props.ui?.base })"
        @update:model-value="onUpdate"
      >
        <CheckboxIndicator as-child force-mount>
          <span
            v-if="modelValue === 'indeterminate'"
            :class="style.icon({ class: [props.indeterminateIcon || theme.app.icons.indeterminate, props.ui?.icon] })"
          ></span>
          <span v-else :class="style.icon({ class: [props.icon, theme.app.icons.check, props.ui?.icon] })"></span>
        </CheckboxIndicator>
      </CheckboxRoot>
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
