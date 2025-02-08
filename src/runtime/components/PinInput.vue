<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PinInputRootProps } from 'reka-ui'
import type { pinInput } from '../theme'
import type { ComponentAttrs } from '../types'

type PinInputVariants = VariantProps<typeof pinInput>

export interface PinInputProps extends ComponentAttrs<typeof pinInput>, Pick<PinInputRootProps, 'as' | 'defaultValue' | 'disabled' | 'id' | 'mask' | 'modelValue' | 'name' | 'otp' | 'placeholder' | 'required' | 'type'> {
  variant?: PinInputVariants['variant']
  size?: PinInputVariants['size']
  length?: number | string
  underline?: boolean
  highlight?: boolean
}

export interface PinInputEmits {
  (event: 'update:modelValue', value: string[]): void
  (event: 'complete', value: string[]): void
  (event: 'change', payload: Event): void
  (event: 'blur', payload: Event): void
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core'
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { looseToNumber } from '../utils'

const props = withDefaults(defineProps<PinInputProps>(), {
  variant: 'outline',
  size: 'md',
  length: 5,
  type: 'text',
})

const emit = defineEmits<PinInputEmits>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultValue', 'disabled', 'id', 'mask', 'modelValue', 'name', 'otp', 'placeholder', 'required', 'type'), emit)

const completed = ref(false)

const { theme, createStyler } = useTheme()
const style = computed(() => {
  const styler = createStyler(theme.value.pinInput)
  return styler(props)
})

function onComplete(value: string[]) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })
  emit('change', event)
}

function onBlur(event: FocusEvent) {
  if (!event.relatedTarget || completed.value)
    emit('blur', event)
}
</script>

<template>
  <PinInputRoot
    v-bind="rootProps"
    :id="props.id"
    :name="props.name"
    :class="style.root({ class: [props.class, props.ui?.root] })"
    @complete="onComplete"
  >
    <span
      v-for="(ids, index) in looseToNumber(props.length)"
      :key="ids"
      :class="style.container({ class: props.ui?.container })"
      :aria-disabled="props.disabled ? true : undefined"
    >
      <PinInputInput
        :index="index"
        :class="style.base({ class: props.ui?.base })"
        v-bind="$attrs"
        :disabled="props.disabled"
        @blur="onBlur"
      />
    </span>
  </PinInputRoot>
</template>
