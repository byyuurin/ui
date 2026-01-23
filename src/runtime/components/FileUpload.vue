<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { UseFileDialogReturn } from '@vueuse/core'
import type { PrimitiveProps } from 'reka-ui'
import theme from '#build/ui/file-upload'
import type { ButtonProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, IconProps, LinkPropsKeys, RuntimeAppConfig } from '../types'
import type { InputHTMLAttributes } from '../types/html'
import type { MaybeNull, StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface FileUploadProps<M extends boolean = false> extends ComponentBaseProps, /** @vue-ignore */ Pick<InputHTMLAttributes, 'form' | 'formaction' | 'formenctype' | 'formmethod' | 'formnovalidate' | 'formtarget'> {
  /**
   * The element or component this component should render as.
   * @default "div"
   */
  as?: PrimitiveProps['as']
  id?: string
  name?: string
  modelValue?: MaybeNull<M extends true ? File[] : File>
  /**
   * The icon to display.
   * @default app.icons.upload
   */
  icon?: IconProps['name']
  label?: string
  description?: string
  /** @default "primary" */
  color?: ThemeVariants['color']
  /**
   * The `button` variant is only available when `multiple` is `false`.
   * @default "area"
   */
  variant?: ThemeVariants['variant']
  /** @default "md" */
  size?: ThemeVariants['size']
  /**
   * The layout of how files are displayed.
   * Only works when `variant` is `area`.
   * @default "list"
   */
  layout?: ThemeVariants['layout']
  /**
   * The position of the files.
   * Only works when `variant` is `area` and when `layout` is `list`.
   * @default "outside"
   */
  position?: ThemeVariants['position']
  /** Highlight the ring color like a focus state. */
  highlight?: boolean
  /**
   * Specifies the allowed file types for the input. Provide a comma-separated list of MIME types or file extensions (e.g., "image/png,application/pdf,.jpg").
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
   * @default "*"
   */
  accept?: string
  multiple?: M & boolean
  /**
   * Reset the file input when the dialog is opened.
   * @default false
   */
  reset?: boolean
  /**
   * Create a zone that allows the user to drop files onto it.
   * @default true
   */
  dropzone?: boolean
  /**
   * Make the dropzone interactive when the user is clicking on it.
   * @default true
   */
  interactive?: boolean
  required?: boolean
  disabled?: boolean
  /**
   * The icon to display for the file.
   * @default app.icons.file
   */
  fileIcon?: IconProps['name']
  /**
   * Configure the delete button for the file.
   *
   * When `layout` is `grid`, the default is `{ color: 'neutral', variant: 'solid', size: 'xs' }`
   *
   * When `layout` is `list`, the default is `{ color: 'neutral', variant: 'link' }`
   */
  fileDelete?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * The icon displayed to delete a file.
   * @default app.icons.close
   */
  fileDeleteIcon?: IconProps['name']
  /**
   * Show the file preview/list after upload.
   * @default true
   */
  preview?: boolean
  ui?: ComponentUIProps<typeof theme>
}

export interface FileUploadEmits {
  change: [event: Event]
}

type FileUploadFiles<M> = (M extends true ? File[] : File) | null

export interface FileUploadSlots<M extends boolean = false> {
  'default': StaticSlot<{
    open: UseFileDialogReturn['open']
    removeFile: (index?: number) => void
    ui: ComponentStyler<typeof theme>
  }>
  'leading': StaticSlot<{ ui: ComponentStyler<typeof theme> }>
  'label': StaticSlot
  'description': StaticSlot
  'actions': StaticSlot<{
    files: FileUploadFiles<M>
    open: UseFileDialogReturn['open']
    removeFile: (index?: number) => void
  }>
  'files': StaticSlot<{ files: FileUploadFiles<M> }>
  'files-top': StaticSlot<{
    files: FileUploadFiles<M>
    open: UseFileDialogReturn['open']
    removeFile: (index?: number) => void
  }>
  'files-bottom': StaticSlot<{
    files: FileUploadFiles<M>
    open: UseFileDialogReturn['open']
    removeFile: (index?: number) => void
  }>
  'file': StaticSlot<{ file: File, index: number }>
  'file-leading': StaticSlot<{ file: File, index: number, ui: ComponentStyler<typeof theme> }>
  'file-name': StaticSlot<{ file: File, index: number }>
  'file-size': StaticSlot<{ file: File, index: number }>
  'file-trailing': StaticSlot<{ file: File, index: number, ui: ComponentStyler<typeof theme> }>
}
</script>

<script setup lang="ts" generic="M extends boolean = false">
import { createReusableTemplate } from '@vueuse/core'
import { Primitive, VisuallyHidden } from 'reka-ui'
import { computed, toRef, watch } from 'vue'
import { useAppConfig } from '#imports'
import { useFileUpload } from '../composables/useFileUpload'
import { useFormField } from '../composables/useFormField'
import { useLocale } from '../composables/useLocale'
import { pick } from '../utils'
import { cv, merge } from '../utils/style'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import Icon from './Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FileUploadProps<M>>(), {
  accept: '*',
  multiple: false as never,
  reset: false,
  dropzone: true,
  interactive: true,
  fileDelete: true,
  layout: 'grid',
  position: 'outside',
  preview: true,
})
const emit = defineEmits<FileUploadEmits>()
const slots = defineSlots<FileUploadSlots<M>>()

const modelValue = defineModel<MaybeNull<(M extends true ? File[] : File)>>()

const { t } = useLocale()

const [DefineFilesTemplate, ReuseFilesTemplate] = createReusableTemplate()

const { isDragging, open, inputRef, dropzoneRef } = useFileUpload({
  accept: toRef(() => props.accept),
  reset: props.reset,
  multiple: toRef(() => props.multiple as boolean),
  dropzone: toRef(() => props.dropzone),
  onUpdate,
})

const { id, name, disabled, ariaAttrs, emitFormInput, emitFormChange } = useFormField<FileUploadProps>(props)

const variant = computed(() => props.multiple ? 'area' : props.variant)
const layout = computed(() => props.variant === 'button' && !props.multiple ? 'grid' : props.layout)
const position = computed(() => {
  if (layout.value === 'grid' && props.multiple)
    return 'inside'

  if (variant.value === 'button')
    return 'outside'

  return props.position
})

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.fileUpload))

  return styler({
    ...pick(props, ['dropzone', 'interactive', 'color', 'size', 'multiple', 'highlight']),
    variant: variant.value,
    layout: layout.value,
    position: position.value,
    disabled: disabled.value,
  })
})

function createObjectUrl(file: File) {
  return URL.createObjectURL(file)
}

function formatFileSize(bytes: number) {
  if (bytes === 0)
    return '0B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const size = bytes / k ** i
  const formattedSize = i === 0 ? size.toString() : size.toFixed(0)

  return `${formattedSize}${sizes[i]}`
}

function onUpdate(files: File[], reset = false) {
  if (props.multiple) {
    if (reset) {
      modelValue.value = files as MaybeNull<(M extends true ? File[] : File)>
    }
    else {
      const existingFiles = (modelValue.value as File[]) || []
      modelValue.value = [...existingFiles, ...(files || [])] as MaybeNull<(M extends true ? File[] : File)>
    }
  }
  else {
    modelValue.value = (files?.[0] ?? null) as MaybeNull<(M extends true ? File[] : File)>
  }

  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value: modelValue.value } })

  emit('change', event)
  emitFormChange()
  emitFormInput()
}

function removeFile(index?: number) {
  if (!modelValue.value)
    return

  if (!props.multiple || index === undefined) {
    onUpdate([], true)

    dropzoneRef.value?.focus()
    return
  }

  const files = [...modelValue.value as File[]]
  files.splice(index, 1)

  onUpdate(files, true)

  dropzoneRef.value?.focus()
}

watch(modelValue, (newValue) => {
  const hasModelReset = props.multiple ? !(newValue as File[])?.length : !newValue

  if (hasModelReset && inputRef.value?.$el)
    inputRef.value.$el.value = ''
})

defineExpose({
  inputRef: toRef(() => inputRef.value?.$el as HTMLInputElement),
  dropzoneRef,
})
</script>

<template>
  <DefineFilesTemplate>
    <template v-if="props.preview && modelValue && (Array.isArray(modelValue) ? modelValue.length : true)">
      <slot name="files-top" :files="modelValue" :open="open" :remove-file="removeFile"></slot>

      <div data-part="files" :class="ui.files({ class: props.ui?.files })">
        <slot name="files" :files="modelValue">
          <div v-for="(file, index) in Array.isArray(modelValue) ? modelValue : [modelValue]" :key="index" data-part="file" :class="ui.file({ class: props.ui?.file })">
            <slot name="file" :file="file" :index="index">
              <slot name="file-leading" :file="file" :index="index" :ui="ui">
                <Avatar
                  :as="{ img: 'img' }"
                  :src="createObjectUrl(file)"
                  :icon="props.fileIcon || appConfig.ui.icons.file"
                  :size="props.size"
                  data-part="fileLeadingAvatar"
                  :class="ui.fileLeadingAvatar({ class: props.ui?.fileLeadingAvatar })"
                />
              </slot>

              <div data-part="fileWrapper" :class="ui.fileWrapper({ class: props.ui?.fileWrapper })">
                <span data-part="fileName" :class="ui.fileName({ class: props.ui?.fileName })">
                  <slot name="file-name" :file="file" :index="index">
                    {{ (file as File).name }}
                  </slot>
                </span>

                <span data-part="fileSize" :class="ui.fileSize({ class: props.ui?.fileSize })">
                  <slot name="file-size" :file="file" :index="index">
                    {{ formatFileSize((file as File).size) }}
                  </slot>
                </span>
              </div>

              <slot name="file-trailing" :file="file" :index="index" :ui="ui">
                <Button
                  v-if="props.fileDelete"
                  color="neutral"
                  v-bind="{
                    ...layout === 'grid'
                      ? { variant: 'solid', size: 'xs' }
                      : { variant: 'link', size: props.size },
                    ...typeof props.fileDelete === 'object'
                      ? props.fileDelete
                      : undefined,
                  }"
                  :aria-label="t('fileUpload.removeFile', { filename: (file as File).name })"
                  :trailing-icon="props.fileDeleteIcon || appConfig.ui.icons.close"
                  data-part="fileTrailingButton"
                  :class="ui.fileTrailingButton({ class: props.ui?.fileTrailingButton })"
                  @click.stop.prevent="removeFile(index)"
                />
              </slot>
            </slot>
          </div>
        </slot>
      </div>

      <slot name="files-bottom" :files="modelValue" :open="open" :remove-file="removeFile"></slot>
    </template>
  </DefineFilesTemplate>

  <Primitive :as="props.as" data-part="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot :open="open" :remove-file="removeFile" :ui="ui">
      <component
        :is="variant === 'button' ? 'button' : 'div'"
        ref="dropzoneRef"
        :type="variant === 'button' ? 'button' : undefined"
        :role="variant === 'button' ? undefined : 'button'"
        :tabindex="props.interactive && disabled ? 0 : -1"
        :data-dragging="isDragging"
        data-part="base"
        :class="ui.base({ class: props.ui?.base })"
        @click="props.interactive && !disabled && open()"
        @keydown.space.prevent
        @keyup.enter.space="props.interactive && !disabled && open()"
      >
        <ReuseFilesTemplate v-if="position === 'inside'" />

        <div
          v-if="props.preview && position === 'inside' ? (props.multiple ? !(modelValue as File[])?.length : !modelValue) : true"
          data-part="wrapper"
          :class="ui.wrapper({ class: props.ui?.wrapper })"
        >
          <slot name="leading" :ui="ui">
            <Icon
              v-if="variant === 'button'"
              :name="props.icon || appConfig.ui.icons.upload"
              data-part="icon"
              :class="ui.icon({ class: props.ui?.icon })"
            />
            <Avatar
              v-else
              :icon="props.icon || appConfig.ui.icons.upload"
              :size="props.size"
              :ui="{ icon: props.ui?.icon }"
              data-part="avatar"
              :class="ui.avatar({ class: props.ui?.avatar })"
            />
          </slot>

          <template v-if="variant !== 'button'">
            <div v-if="props.label || slots.label" data-part="label" :class="ui.label({ class: props.ui?.label })">
              <slot name="label">
                {{ props.label }}
              </slot>
            </div>

            <div v-if="props.description || slots.description" data-part="description" :class="ui.description({ class: props.ui?.description })">
              <slot name="description">
                {{ props.description }}
              </slot>
            </div>

            <div v-if="slots.actions">
              <slot name="actions" :files="modelValue || null" :open="open" :remove-file="removeFile"></slot>
            </div>
          </template>
        </div>
      </component>

      <ReuseFilesTemplate v-if="position === 'outside'" />
    </slot>

    <VisuallyHidden
      :id="id"
      ref="inputRef"
      as="input"
      type="file"
      feature="fully-hidden"
      :name="name"
      :accept="props.accept"
      :multiple="props.multiple"
      :required="props.required"
      :disabled="disabled"
      v-bind="{ ...$attrs, ...ariaAttrs }"
    />
  </Primitive>
</template>
