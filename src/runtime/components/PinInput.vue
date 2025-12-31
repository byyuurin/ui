<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'
import theme from '#build/ui/pin-input'
import type { ComponentBaseProps, ComponentUIProps, RuntimeAppConfig } from '../types'

type PinInputType = 'text' | 'number'
type PinInputValue<Type extends PinInputType> = [Type] extends ['number'] ? number[] : string[]

type ThemeVariants = VariantProps<typeof theme>

export interface PinInputProps<T extends PinInputType = 'text'> extends ComponentBaseProps, Pick<PinInputRootProps<T>, 'defaultValue' | 'disabled' | 'id' | 'mask' | 'modelValue' | 'name' | 'otp' | 'placeholder' | 'required' | 'type'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PinInputRootProps<T>['as']
  /** @default "solid" */
  variant?: ThemeVariants['variant']
  /** @default "md" */
  size?: ThemeVariants['size']
  /** @default "primary" */
  color?: ThemeVariants['color']
  /**
   * The number of input fields.
   * @default 5
   */
  length?: number | string
  autofocus?: boolean
  autofocusDelay?: number
  highlight?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export type PinInputEmits<T extends PinInputType = 'text'> = PinInputRootEmits<T> & {
  change: [event: Event]
  blur: [event: Event]
}
</script>

<script setup lang="ts" generic="T extends PinInputType = 'text' | 'number'">
import { reactivePick } from '@vueuse/core'
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'reka-ui'
import type { ComponentPublicInstance } from 'vue'
import { computed, onMounted, ref } from 'vue'
import { useAppConfig } from '#imports'
import { useFormField } from '../composables/useFormField'
import { looseToNumber } from '../utils'
import { cv, merge } from '../utils/style'

const props = withDefaults(defineProps<PinInputProps<T>>(), {
  type: 'text' as never,
  length: 5,
  autofocusDelay: 0,
})

const emit = defineEmits<PinInputEmits<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'disabled', 'id', 'mask', 'name', 'otp', 'required', 'type'), emit)

const { id, name, size, color, highlight, disabled, ariaAttrs, emitFormInput, emitFormChange, emitFormFocus, emitFormBlur } = useFormField<PinInputProps>(props)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.pinInput))
  return styler({
    ...props,
    size: size.value,
    color: color.value,
    highlight: highlight.value,
  })
})

const inputsRef = ref<ComponentPublicInstance[]>([])
const completed = ref(false)

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

function autoFocus() {
  if (props.autofocus)
    inputsRef.value[0]?.$el?.focus()
}

onMounted(() => {
  setTimeout(() => autoFocus(), props.autofocusDelay)
})

defineExpose({
  inputsRef,
})
</script>

<template>
  <PinInputRoot
    v-bind="{ ...rootProps, ...ariaAttrs, id, name }"
    :placeholder="props.placeholder"
    :model-value="(modelValue as PinInputValue<T>)"
    :default-value="(props.defaultValue as PinInputValue<T>)"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    data-part="root"
    @update:model-value="emitFormInput"
    @complete="onComplete"
  >
    <PinInputInput
      v-for="(ids, index) in looseToNumber(props.length)"
      :key="ids"
      :ref="el => (inputsRef[index as number] = el as ComponentPublicInstance)"
      :index="(index as number)"
      :disabled="disabled"
      :class="ui.base({ class: props.ui?.base })"
      data-part="base"
      @blur="onBlur"
      @focus="emitFormFocus"
    />
  </PinInputRoot>
</template>
