<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { AcceptableInputValue, TagsInputRootEmits, TagsInputRootProps } from 'reka-ui'
import theme from '#build/ui/input-tags'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, RuntimeAppConfig } from '../types'
import type { InputHTMLAttributes } from '../types/html'
import type { MaybeNull, StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export type InputTagsItem = AcceptableInputValue
export interface InputTagsProps<T extends InputTagsItem = InputTagsItem> extends ComponentBaseProps, Pick<TagsInputRootProps<T>, 'modelValue' | 'defaultValue' | 'addOnPaste' | 'addOnTab' | 'addOnBlur' | 'duplicate' | 'disabled' | 'delimiter' | 'max' | 'id' | 'convertValue' | 'displayValue' | 'name' | 'required'>, UseComponentIconsProps, /** @vue-ignore */ Omit<InputHTMLAttributes, 'disabled' | 'max' | 'required' | 'name' | 'placeholder'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: TagsInputRootProps<T>['as']
  /** The placeholder text when the input is empty. */
  placeholder?: string
  /** The maximum number of character allowed. */
  maxLength?: number
  /** @default "primary" */
  color?: ThemeVariants['color']
  /** @default "outline" */
  variant?: ThemeVariants['variant']
  /** @default "md" */
  size?: ThemeVariants['size']
  autofocus?: boolean
  autofocusDelay?: number
  /**
   * The icon displayed to delete a tag.
   * @default app.icons.close
   */
  deleteIcon?: IconProps['name']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export interface InputTagsEmits<T extends InputTagsItem> extends TagsInputRootEmits<T> {
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}

export interface InputTagsSlots<T extends InputTagsItem = InputTagsItem> {
  'leading': StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  'default': StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  'trailing': StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  'item-text': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
  'item-delete': StaticSlot<{ item: T, index: number, ui: ComponentStyler<typeof theme> }>
}
</script>

<script setup lang="ts" generic="T extends InputTagsItem">
import { reactivePick } from '@vueuse/core'
import { TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, onMounted, shallowRef, toRaw, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useComponentIcons } from '../composables/useComponentIcons'
import { useFieldGroup } from '../composables/useFieldGroup'
import { useFormField } from '../composables/useFormField'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputTagsProps>(), {
  type: 'text',
  autofocusDelay: 0,
})

const emit = defineEmits<InputTagsEmits<T>>()
const slots = defineSlots<InputTagsSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'addOnPaste', 'addOnTab', 'addOnBlur', 'duplicate', 'delimiter', 'max', 'convertValue', 'displayValue', 'required'), emit)

const { id, name, size: formFieldSize, color, highlight, disabled, ariaAttrs, emitFormBlur, emitFormInput, emitFormChange, emitFormFocus } = useFormField<InputTagsProps>(props)
const { orientation, size: fieldGroupSize } = useFieldGroup(props)
const { isLeading, leadingIconName, isTrailing, trailingIconName } = useComponentIcons(props)

const appConfig = useAppConfig() as RuntimeAppConfig

const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.inputTags))

  return styler({
    ...pick(props, ['variant', 'loading']),
    color: color.value,
    size: fieldGroupSize.value || formFieldSize.value,
    highlight: highlight.value,
    leading: isLeading.value || !!props.avatar || !!slots.leading,
    trailing: isTrailing.value || !!slots.trailing,
    fieldGroup: orientation.value,
  })
})

const inputRef = shallowRef<MaybeNull<InstanceType<typeof TagsInputInput>>>(null)

function onUpdate(value: AcceptableInputValue[]) {
  if (toRaw(props.modelValue) === value)
    return

  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } })

  emit('change', event)
  emitFormChange()
  emitFormInput()
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
  emitFormBlur()
}

function onFocus(event: FocusEvent) {
  emit('focus', event)
  emitFormFocus()
}

function autoFocus() {
  if (props.autofocus)
    inputRef.value?.$el?.focus()
}

onMounted(() => {
  setTimeout(() => autoFocus(), props.autofocusDelay)
})

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
})
</script>

<template>
  <TagsInputRoot
    v-slot="{ modelValue: tags }"
    v-bind="{ ...rootProps, id, name, disabled }"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    data-part="root"
    :class="ui.root({ class: [ui.base({ class: props.ui?.base }), props.ui?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <TagsInputItem
      v-for="(item, index) in tags"
      :key="index"
      :value="item"
      data-part="item"
      :class="ui.item({ class: props.ui?.item })"
    >
      <TagsInputItemText data-part="itemText" :class="ui.itemText({ class: props.ui?.itemText })">
        <slot name="item-text" :item="(item as T)" :index="index" :ui="ui"></slot>
      </TagsInputItemText>

      <TagsInputItemDelete :disabled="disabled" data-part="itemDelete" :class="ui.itemDelete({ class: props.ui?.itemDelete })">
        <slot name="item-delete" :item="(item as T)" :index="index" :ui="ui">
          <Icon :name="props.deleteIcon || appConfig.ui.icons.close" data-part="itemDeleteIcon" :class="ui.itemDeleteIcon({ class: props.ui?.itemDeleteIcon })" />
        </slot>
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      ref="inputRef"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      :placeholder="props.placeholder"
      :max-length="props.maxLength"
      data-part="input"
      :class="ui.input({ class: props.ui?.input })"
      @blur="onBlur"
      @focus="onFocus"
    />

    <span v-if="isLeading || props.avatar || !!slots.leading" data-part="leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading" :ui="ui">
        <Icon v-if="isLeading && leadingIconName" :name="leadingIconName" data-part="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
        <Avatar v-else-if="props.avatar" :size="((props.ui?.leadingAvatarSize || ui.leadingAvatarSize()) as AvatarProps['size'])" v-bind="props.avatar" data-part="leadingAvatar" :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })" />
      </slot>
    </span>

    <slot :ui="ui"></slot>

    <span v-if="isTrailing || !!slots.trailing" data-part="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
      <slot name="trailing" :ui="ui">
        <Icon v-if="trailingIconName" :name="trailingIconName" data-part="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
      </slot>
    </span>
  </TagsInputRoot>
</template>
