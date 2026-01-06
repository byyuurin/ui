import { useDropZone, useFileDialog } from '@vueuse/core'
import type { ComponentPublicInstance, MaybeRef } from 'vue'
import { computed, onMounted, reactive, shallowRef, unref, watch } from 'vue'
import type { MaybeNull } from '../types/utils'

export interface UseFileUploadOptions {
  /**
   * Specifies the allowed file types. Provide a comma-separated list of MIME types or file extensions.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
   * @default "*"
   */
  accept?: MaybeRef<string>
  reset?: boolean
  multiple?: MaybeRef<boolean>
  dropzone?: MaybeRef<boolean>
  onUpdate: (files: File[]) => void
}

function parseAcceptToDataTypes(accept: string): string[] | undefined {
  if (!accept || accept === '*')
    return undefined

  const types = accept
    .split(',')
    .map((type) => {
      const trimmedType = type.trim()

      if (trimmedType.includes('/') && trimmedType.endsWith('/*'))
        return trimmedType.split('/')[0] || trimmedType

      return trimmedType
    })
    .filter((type) => {
      return !type.startsWith('.')
    })

  return types.length > 0 ? types : undefined
}

export function useFileUpload(options: UseFileUploadOptions) {
  const {
    accept = '*',
    reset = false,
    multiple = false,
    dropzone = true,
    onUpdate,
  } = options

  const inputRef = shallowRef<ComponentPublicInstance>()
  const dropzoneRef = shallowRef<HTMLDivElement>()
  const dataTypes = computed(() => parseAcceptToDataTypes(unref(accept)))

  const onDrop = (files: MaybeNull<FileList | File[]>, fromDropzone = false) => {
    if (!files || files.length === 0)
      return

    if (files instanceof FileList)
      files = Array.from(files)

    if (files.length > 1 && !unref(multiple))
      files = [files[0]!]

    // Sync dropped files to the input element for proper native validation
    if (fromDropzone && inputRef.value?.$el) {
      try {
        const dt = new DataTransfer()
        files.forEach((file) => dt.items.add(file))
        inputRef.value.$el.files = dt.files
      }
      catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Could not sync files to input element:', e)
      }
    }

    onUpdate(files)
  }

  const isDragging = shallowRef(false)
  const fileDialog = reactive({
    open: () => {},
  })

  function open() {
    fileDialog.open()
  }

  onMounted(() => {
    const { isOverDropZone } = useDropZone(
      () => unref(dropzone) ? dropzoneRef.value : undefined,
      {
        dataTypes: dataTypes.value,
        onDrop: (files) => onDrop(files, true),
      },
    )

    watch(isOverDropZone, (value) => {
      isDragging.value = unref(dropzone) ? value : false
    })

    const { onChange, open } = useFileDialog({
      accept,
      multiple,
      input: unref(inputRef)?.$el,
      reset,
    })

    fileDialog.open = open

    onChange((fileList) => onDrop(fileList, false))
  })

  return {
    isDragging,
    open,
    inputRef,
    dropzoneRef,
  }
}
