<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'
import type { pinInput } from '../theme'
import type { ComponentAttrs } from '../types'

type PinInputType = 'text' | 'number'

export type PinInputEmits<T extends PinInputType = 'text' | 'number'> = PinInputRootEmits<T> & {
  change: [payload: Event]
  blur: [payload: Event]
}

type PinInputVariants = VariantProps<typeof pinInput>

export interface PinInputProps<T extends PinInputType = 'text' | 'number'> extends ComponentAttrs<typeof pinInput>, Pick<PinInputRootProps<T>, 'as' | 'defaultValue' | 'disabled' | 'id' | 'mask' | 'modelValue' | 'name' | 'otp' | 'placeholder' | 'required' | 'type'> {
  variant?: PinInputVariants['variant']
  size?: PinInputVariants['size']
  length?: number | string
  underline?: boolean
  highlight?: boolean
}
</script>

<script setup lang="ts" generic="T extends PinInputType = 'text' | 'number'">
import { reactivePick } from '@vueuse/core'
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { useFormItem } from '../composables/useFormItem'
import { useTheme } from '../composables/useTheme'
import { looseToNumber } from '../utils'

const props = withDefaults(defineProps<PinInputProps<T>>(), {
  variant: 'outline',
  length: 5,
  type: 'text' as never,
})

const emit = defineEmits<PinInputEmits<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultValue', 'disabled', 'id', 'mask', 'modelValue', 'name', 'otp', 'required', 'type'), emit)

const completed = ref(false)

const { id, name, size, highlight, disabled, ariaAttrs, emitFormInput, emitFormChange, emitFormFocus, emitFormBlur } = useFormItem<PinInputProps>(props)
const { generateStyle } = useTheme()
const style = computed(() => generateStyle('pinInput', {
  ...props,
  size: size.value,
  highlight: highlight.value,
}))

function onComplete(value: string[] | number[]) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
  emitFormChange()
}

function onBlur(event: FocusEvent) {
  if (!event.relatedTarget || completed.value) {
    emit('blur', event)
    emitFormBlur()
  }
}
</script>

<template>
  <PinInputRoot
    v-bind="{ ...rootProps, ...ariaAttrs, id, name }"
    :placeholder="props.placeholder"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    data-part="root"
    @update:model-value="emitFormInput"
    @complete="onComplete"
  >
    <span
      v-for="(ids, index) in looseToNumber(props.length)"
      :key="ids"
      :aria-disabled="disabled ? true : undefined"
      :class="style.container({ class: props.ui?.container })"
      data-part="container"
    >
      <PinInputInput
        v-bind="$attrs"
        :index="index"
        :disabled="disabled"
        :class="style.base({ class: props.ui?.base })"
        data-part="base"
        @blur="onBlur"
        @focus="emitFormFocus"
      />
    </span>
  </PinInputRoot>
</template>
