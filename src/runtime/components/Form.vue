<script lang="ts">
import type { ComputedRef, DeepReadonly, Ref } from 'vue'
import type { form } from '../theme'
import type { ComponentAttrs, FormError, FormErrorEvent, FormErrorWithId, FormEvent, FormInputEvents, FormSchema, FormSubmitEvent, FormValidateOptions } from '../types'

export interface FormEmits<T extends object> {
  submit: [payload: FormSubmitEvent<T>]
  error: [payload: FormErrorEvent]
}

export interface FormSlots {
  default?: (props?: { errors: FormError[] }) => any
}

export interface FormExpose<T extends object> {
  validate: (options?: FormValidateOptions<T>) => Promise<T | false>
  clear: (path?: string) => void
  errors: Ref<FormError[]>
  setErrors: (errors: FormError[], name?: keyof T) => void
  getErrors: (name?: keyof T) => FormError[]
  submit: () => Promise<void>
  disabled: ComputedRef<boolean>
  dirty: ComputedRef<boolean>
  dirtyFields: DeepReadonly<Set<keyof T>>
  touchedFields: DeepReadonly<Set<keyof T>>
  blurredFields: DeepReadonly<Set<keyof T>>
}

export interface FormProps<T extends object> extends Omit<ComponentAttrs<typeof form>, 'ui'> {
  id?: string | number
  /**  Schema to validate the form state. */
  schema?: FormSchema<T>
  /** An object representing the current state of the form. */
  state: Partial<T>
  /**
   * Custom validation function to validate the form state.
   * @param state - The current state of the form.
   * @returns A promise that resolves to an array of FormError objects, or an array of FormError objects directly.
   */
  validate?: (state: Partial<T>) => Promise<FormError[]> | FormError[]
  /**
   * The list of input events that trigger the form validation.
   * @default ["blur", "change", "input"]
   */
  validateOn?: FormInputEvents[]
  /** Disable all inputs inside the form. */
  disabled?: boolean
  /**
   * Delay in milliseconds before validating the form on input events.
   * @default 300
   */
  validateOnInputDelay?: number
  /**
   * If true, schema transformations will be applied to the state on submit.
   * @default true
   */
  transform?: boolean
  onSubmit?: ((event: FormSubmitEvent<T>) => void | Promise<void>) | (() => void | Promise<void>)
}

export class FormValidationExceptionError extends Error {
  formId: string | number
  errors: FormErrorWithId[]
  children?: FormValidationExceptionError[]

  constructor(formId: string | number, errors: FormErrorWithId[], childErrors?: FormValidationExceptionError[]) {
    super('Form validation exception')
    this.name = 'FormValidationExceptionError'
    this.formId = formId
    this.errors = errors
    this.children = childErrors
    Object.setPrototypeOf(this, FormValidationExceptionError.prototype)
  }
}
</script>

<script setup lang="ts" generic="T extends object">
import { useEventBus } from '@vueuse/core'
import { computed, nextTick, onMounted, onUnmounted, readonly, ref, useId } from 'vue'
import { injectFormBus, provideFormBus, provideFormErrors, provideFormInputs, provideFormLoading, provideFormOptions } from '../app/injections'
import { useTheme } from '../composables/useTheme'
import { validateSchema } from '../utils'

const props = withDefaults(defineProps<FormProps<T>>(), {
  validateOn: () => ['input', 'blur', 'change'],
  validateOnInputDelay: 300,
  transform: true,
})

const emit = defineEmits<FormEmits<T>>()
defineSlots<FormSlots>()

const formId = props.id ?? useId()

const bus = useEventBus<FormEvent<T>>(`form-${formId}`)
const parentBus = injectFormBus()

provideFormBus(bus)

const nestedForms = ref<Map<string | number, { validate: typeof validateFn }>>(new Map())

onMounted(() => {
  bus.on(async (event) => {
    if (event.type === 'attach') {
      nestedForms.value.set(event.formId, { validate: event.validate })
    }
    else if (event.type === 'detach') {
      nestedForms.value.delete(event.formId)
    }
    else if (props.validateOn?.includes(event.type) && !loading.value) {
      if (event.type !== 'input')
        await validateFn({ name: event.name, silent: true, nested: false })
      else if (event.eager || blurredFields.has(event.name))
        await validateFn({ name: event.name, silent: true, nested: false })
    }

    if (event.type === 'blur')
      blurredFields.add(event.name)

    if (event.type === 'change' || event.type === 'input' || event.type === 'blur' || event.type === 'focus')
      touchedFields.add(event.name)

    if (event.type === 'change' || event.type === 'input')
      dirtyFields.add(event.name)
  })
})

onUnmounted(() => {
  bus.reset()
})

onMounted(async () => {
  if (parentBus) {
    await nextTick()
    parentBus.emit({ type: 'attach', validate: validateFn as FormExpose<T>['validate'], formId })
  }
})

onUnmounted(() => {
  if (parentBus)
    parentBus.emit({ type: 'detach', formId })
})

const errors = ref<FormErrorWithId[]>([])
provideFormErrors(errors)

const inputs = ref<{ [P in keyof T]?: { id?: string, pattern?: RegExp } }>({})
provideFormInputs(inputs as any)

const dirtyFields = new Set<keyof T>()
const touchedFields = new Set<keyof T>()
const blurredFields = new Set<keyof T>()

function resolveErrorIds(errs: FormError[]): FormErrorWithId[] {
  return errs.map((err) => ({
    ...err,
    id: err?.name ? inputs.value[err.name]?.id : undefined,
  }))
}

const transformedState = ref<T | null>(null)

async function getErrors(): Promise<FormErrorWithId[]> {
  let errs = props.validate ? (await props.validate(props.state)) ?? [] : []

  if (props.schema) {
    const { errors, result } = await validateSchema(props.state, props.schema as FormSchema<typeof props.state>)

    if (errors)
      errs = errs.concat(errors)
    else
      transformedState.value = result
  }

  return resolveErrorIds(errs)
}

async function validateFn(options: FormValidateOptions<T>): Promise<T | false> {
  const _options: FormValidateOptions<T> = {
    silent: false,
    nested: true,
    transform: false,
    ...options,
  }

  const names = _options.name && !Array.isArray(_options.name) ? [_options.name] : _options.name as (keyof T)[]

  const nestedValidatePromises = !names && _options.nested
    ? Array.from(nestedForms.value.values()).map(
        ({ validate }) => validate(_options).then(() => {}).catch((error: Error) => {
          if (!(error instanceof FormValidationExceptionError))
            throw error

          return error
        }),
      )
    : []

  if (names) {
    const otherErrors = errors.value.filter((error) => !names.some((name) => {
      const pattern = inputs.value?.[name]?.pattern
      return name === error.name || (pattern && error.name?.match(pattern))
    }))

    // eslint-disable-next-line unicorn/no-await-expression-member
    const pathErrors = (await getErrors()).filter((error) => names.some((name) => {
      const pattern = inputs.value?.[name]?.pattern
      return name === error.name || (pattern && error.name?.match(pattern))
    }))

    errors.value = otherErrors.concat(pathErrors)
  }
  else {
    errors.value = await getErrors()
  }

  // eslint-disable-next-line unicorn/no-await-expression-member
  const childErrors = (await Promise.all(nestedValidatePromises)).filter((val) => val !== undefined)

  if (errors.value.length + childErrors.length > 0) {
    if (_options.silent)
      return false

    throw new FormValidationExceptionError(formId, errors.value, childErrors)
  }

  if (_options.transform)
    Object.assign(props.state, transformedState.value)

  return props.state as T
}

const loading = ref(false)
provideFormLoading(readonly(loading))

async function onSubmitWrapper(payload: Event) {
  loading.value = true

  const event = payload as FormSubmitEvent<any>

  try {
    event.data = await validateFn({ nested: true, transform: props.transform })
    await props.onSubmit?.(event)
    dirtyFields.clear()
  }
  catch (error) {
    if (!(error instanceof FormValidationExceptionError))
      throw error

    const errorEvent: FormErrorEvent = {
      ...event,
      errors: error.errors,
      children: error.children,
    }
    emit('error', errorEvent)
  }
  finally {
    loading.value = false
  }
}

const disabled = computed(() => props.disabled || loading.value)

provideFormOptions(computed(() => ({
  disabled: disabled.value,
  validateOnInputDelay: props.validateOnInputDelay,
})))

defineExpose<FormExpose<T>>({
  validate: validateFn as FormExpose<T>['validate'],
  errors,

  setErrors(errs: FormError[], name?: keyof T) {
    errors.value = name
      ? errors.value
          .filter((error) => error.name !== name)
          .concat(resolveErrorIds(errs))
      : resolveErrorIds(errs)
  },

  async submit() {
    await onSubmitWrapper(new Event('submit'))
  },

  getErrors(name?: keyof T) {
    if (name)
      return errors.value.filter((err) => err.name === name)

    return errors.value
  },

  clear(name?: string) {
    errors.value = name ? errors.value.filter((err) => err.name !== name) : []
  },

  disabled,
  dirty: computed(() => dirtyFields.size > 0),
  dirtyFields: readonly(dirtyFields) as DeepReadonly<Set<keyof T>>,
  blurredFields: readonly(blurredFields) as DeepReadonly<Set<keyof T>>,
  touchedFields: readonly(touchedFields) as DeepReadonly<Set<keyof T>>,
})

const { generateStyle } = useTheme()
const style = computed(() => generateStyle('form', props))
</script>

<template>
  <component :is="parentBus ? 'div' : 'form'" :id="formId" :class="style.base()" data-part="base" @submit.prevent="onSubmitWrapper">
    <slot :errors="errors"></slot>
  </component>
</template>
