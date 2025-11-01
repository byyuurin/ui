<script lang="ts">
import theme from '#build/ui/form'
import type { ComponentBaseProps, Form, FormData, FormError, FormErrorEvent, FormErrorWithId, FormEvent, FormInputEvents, FormSchema, FormSubmitEvent, InferInput, InferOutput, RuntimeAppConfig } from '../types'
import type { MaybeNull, StaticSlot } from '../types/utils'

export interface FormProps<S extends FormSchema, T extends boolean = true, N extends boolean = false> extends ComponentBaseProps {
  id?: string | number
  /** Schema to validate the form state. Supports Standard Schema objects, Yup, Joi, and Superstructs. */
  schema?: S
  /** An object representing the current state of the form. */
  state: N extends false ? Partial<InferInput<S>> : never

  /**
   * Custom validation function to validate the form state.
   * @param state - The current state of the form.
   * @returns A promise that resolves to an array of FormError objects, or an array of FormError objects directly.
   */
  validate?: (state: Partial<InferInput<S>>) => Promise<FormError[]> | FormError[]

  /**
   * The list of input events that trigger the form validation.
   * @remarks The form always validates on submit.
   * @default ["blur", "change", "input"]
   */
  validateOn?: FormInputEvents[]

  /** Disable all inputs inside the form. */
  disabled?: boolean

  /**
   * Path of the form's state within it's parent form.
   * Used for nesting forms. Only available if `nested` is true.
   */
  name?: N extends true ? string : never

  /**
   * Delay in milliseconds before validating the form on input events.
   * @default 300
   */
  validateOnInputDelay?: number
  /**
   * If true, schema transformations will be applied to the state on submit.
   * @default true
   */
  transform?: T

  /**
   * If true, this form will attach to its parent Form and validate at the same time.
   * @default false
   */
  nested?: N

  /**
   * When `true`, all form elements will be disabled on `@submit` event.
   *
   * This will cause any focused input elements to lose their focus state.
   * @default true
   */
  loadingAuto?: boolean

  onSubmit?: ((event: FormSubmitEvent<T>) => void | Promise<void>) | (() => void | Promise<void>)
}

export interface FormEmits<S extends FormSchema, T extends boolean = true> {
  submit: [event: FormSubmitEvent<FormData<S, T>>]
  error: [event: FormErrorEvent]
}

export interface FormSlots {
  default: StaticSlot<{ errors: FormError[], loading: boolean }>
}
</script>

<script setup lang="ts" generic="S extends FormSchema, T extends boolean = true, N extends boolean = false">
import { useEventBus } from '@vueuse/core'
import { computed, nextTick, onMounted, onUnmounted, reactive, readonly, ref, shallowRef, useId } from 'vue'
import { useAppConfig } from '#imports'
import { injectFormBus, injectFormState, provideFormBus, provideFormErrors, provideFormInputs, provideFormLoading, provideFormOptions, provideFormState } from '../composables/injections'
import { FormValidationException } from '../types/form'
import { getAtPath, setAtPath, validateSchema } from '../utils/form'
import { cv, merge } from '../utils/style'

type I = InferInput<S>
type O = InferOutput<S>

const props = withDefaults(defineProps<FormProps<S, T, N>>(), {
  validateOn: () => ['input', 'blur', 'change'],
  validateOnInputDelay: 300,
  transform: () => true as T,
  loadingAuto: true,
})

const emit = defineEmits<FormEmits<S, T>>()
defineSlots<FormSlots>()

const formId = props.id ?? useId()

const bus = useEventBus<FormEvent<I>>(`form-${formId}`)

// The comparison with '' is needed because vue is not casting boolean correctly without
// explicitly setting the prop to true (`:nested="true" works, but `nested` returns '')
const isNested = props.nested?.toString() === '' || props.nested === true
const parentBus = isNested && injectFormBus()

const parentState = isNested ? injectFormState() : undefined
const state = computed(() => {
  if (parentState?.value)
    return props.name ? getAtPath(parentState.value, props.name) : parentState.value

  return props.state
})

provideFormBus(bus)
provideFormState(state)

const nestedForms = ref<Map<string | number, { validate: typeof validateFn, name?: string, api: Form<any> }>>(new Map())

onMounted(async () => {
  if (parentBus) {
    await nextTick()
    parentBus.emit({ type: 'attach', validate: validateFn as any, formId, name: props.name, api: api as any }) // FIXME: type issue
  }
})

onUnmounted(() => {
  bus.reset()

  if (parentBus)
    parentBus.emit({ type: 'detach', formId })
})

onMounted(() => {
  bus.on(async (event) => {
    if (event.type === 'attach') {
      nestedForms.value.set(event.formId, { validate: event.validate, name: event.name, api: event.api as any })
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

const errors = ref<FormErrorWithId[]>([])
provideFormErrors(errors)

const inputs = ref<{ [P in keyof T]?: { id?: string, pattern?: RegExp } }>({})
provideFormInputs(inputs as any)

const dirtyFields: Set<keyof I> = reactive(new Set<keyof I>())
const touchedFields: Set<keyof I> = reactive(new Set<keyof I>())
const blurredFields: Set<keyof I> = reactive(new Set<keyof I>())

function resolveErrorIds(errs: FormError[]): FormErrorWithId[] {
  return errs.map((err) => ({
    ...err,
    id: err?.name ? inputs.value[err.name]?.id : undefined,
  }))
}

const transformedState = ref<MaybeNull<O>>(null)

async function getErrors(): Promise<FormErrorWithId[]> {
  let errs = props.validate ? (await props.validate(props.state)) ?? [] : []

  if (props.schema) {
    const { errors, result } = await validateSchema(props.state, props.schema)

    if (errors)
      errs = errs.concat(errors)
    else
      transformedState.value = result
  }

  return resolveErrorIds(errs)
}

interface ValidateOpts<Silent extends boolean, Transform extends boolean> {
  name?: keyof I | (keyof I)[]
  silent?: Silent
  nested?: boolean
  transform?: Transform
}
async function validateFn<T extends boolean>(opts: ValidateOpts<false, T>): Promise<FormData<S, T>>
async function validateFn<T extends boolean>(opts: ValidateOpts<true, T>): Promise<FormData<S, T> | false>
async function validateFn<T extends boolean>(opts: ValidateOpts<boolean, boolean> = { silent: false, nested: false, transform: false }): Promise<FormData<S, T> | false> {
  const names = opts.name && !Array.isArray(opts.name) ? [opts.name] : opts.name as (keyof O)[]

  // Validate nested forms if needed
  let nestedResults: any[] = []
  let nestedErrors: FormError[] = []

  if (!names && opts.nested) {
    const validations = Array.from(nestedForms.value.values()).map((form) =>
      validateNestedForm(form, opts))
    const results = await Promise.all(validations)

    nestedErrors = results
      .filter((r) => r.error)
      .flatMap((r) => r.error!.errors.map((e) => addFormPath(e, r.name)))

    nestedResults = results.filter((r) => r.output !== undefined)
  }

  // Get all errors
  const currentErrors = await getErrors()
  const allErrors = [...currentErrors, ...nestedErrors]

  // Filter by field names if specified
  errors.value = names ? filterErrorsByNames(allErrors, names) : allErrors

  // Handle validation failure
  if (errors.value?.length) {
    if (opts.silent)
      return false
    throw new FormValidationException(formId, errors.value)
  }

  // Apply transformations
  if (opts.transform) {
    nestedResults.forEach((result) => {
      if (result.name)
        setAtPath(transformedState.value, result.name, result.output)
      else
        Object.assign(transformedState.value, result.output)
    })
    return transformedState.value ?? state.value
  }

  return state.value as FormData<S, T>
}

const loading = shallowRef(false)
provideFormLoading(readonly(loading))

async function onSubmitWrapper(payload: Event) {
  loading.value = props.loadingAuto && true

  const event = payload as FormSubmitEvent<FormData<S, T>>

  try {
    event.data = await validateFn({ nested: true, transform: props.transform })
    await props.onSubmit?.(event)
    dirtyFields.clear()
  }
  catch (error) {
    if (!(error instanceof FormValidationException))
      throw error

    const errorEvent: FormErrorEvent = {
      ...event,
      errors: error.errors,
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

// Simple helper functions for nested forms
async function validateNestedForm(form: { validate: typeof validateFn, name?: string }, opts: ValidateOpts<boolean, boolean>) {
  try {
    const result = await form.validate({ ...opts, silent: false })
    return { name: form.name, output: result }
  }
  catch (error: unknown) {
    if (!(error instanceof FormValidationException))
      throw error

    return { name: form.name, error }
  }
}

function addFormPath(error: FormError, formPath?: string): FormError {
  if (!formPath || !error.name)
    return error

  return { ...error, name: `${formPath}.${error.name}` }
}

function stripFormPath(error: FormError, formPath: string): FormError {
  const prefix = `${formPath}.`
  const name = error?.name?.startsWith(prefix)
    ? error.name.slice(prefix.length)
    : error.name
  return { ...error, name }
}

function filterFormErrors(errors: FormError[], formPath?: string): FormError[] {
  if (!formPath)
    return errors

  return errors
    .filter((e) => e?.name?.startsWith(`${formPath}.`))
    .map((e) => stripFormPath(e, formPath))
}

function getFormErrors(form: { name?: string, api: Form<any> }): FormErrorWithId[] {
  return form.api.getErrors().map((e) =>
    form.name ? { ...e, name: `${form.name}.${e.name}` } : e)
}

function matchesTarget(target: keyof I | string | RegExp | undefined, path?: string): boolean {
  if (!target || !path)
    return true

  if (target instanceof RegExp)
    return target.test(path)

  return path === target || (typeof target === 'string' && target.startsWith(`${path}.`))
}

function getNestedTarget(target: keyof I | string | RegExp | undefined, formPath: string): keyof I | string | RegExp | undefined {
  if (!target || target instanceof RegExp)
    return target

  if (formPath === target)
    return undefined

  if (typeof target === 'string' && target.startsWith(`${formPath}.`))
    return target.slice(Math.max(0, formPath.length + 1))

  return target
}

function filterErrorsByNames(allErrors: FormErrorWithId[], names: (keyof O)[]): FormErrorWithId[] {
  const nameSet = new Set(names)
  const patterns = names
    .map((name) => inputs.value?.[name]?.pattern)
    .filter(Boolean) as RegExp[]

  const matchesNames = (error: FormErrorWithId): boolean => {
    if (!error.name)
      return false

    if (nameSet.has(error.name))
      return true

    return patterns.some((pattern) => pattern.test(error.name!))
  }

  const keepErrors = errors.value.filter((error) => !matchesNames(error))
  const newErrors = allErrors.filter(matchesNames)

  return [...keepErrors, ...newErrors]
}

function filterErrorsByTarget(currentErrors: FormErrorWithId[], target: keyof I | string | RegExp): FormErrorWithId[] {
  return currentErrors.filter((err) =>
    target instanceof RegExp
      ? !(err.name && target.test(err.name))
      : !err.name || err.name !== target)
}

function isLocalError(error: FormError): boolean {
  return !error.name || !!inputs.value[error.name]
}

const api = {
  validate: validateFn as any, // FIXME: type issue
  errors,

  setErrors(errs: FormError[], name?: keyof I | string | RegExp) {
    // Handle local errors
    const localErrors = resolveErrorIds(errs.filter(isLocalError))

    // Handle nested form errors
    const nestedErrors: FormErrorWithId[] = []

    for (const form of nestedForms.value.values()) {
      if (matchesTarget(name, form.name)) {
        const formErrors = filterFormErrors(errs, form.name)
        form.api.setErrors(formErrors, getNestedTarget(name, form.name || ''))
        nestedErrors.push(...getFormErrors(form as any))
      }
    }

    if (name) {
      const keepErrors = filterErrorsByTarget(errors.value, name)
      errors.value = [...keepErrors, ...localErrors, ...nestedErrors]
    }
    else {
      errors.value = [...localErrors, ...nestedErrors]
    }
  },

  async submit() {
    await onSubmitWrapper(new Event('submit'))
  },

  getErrors(name?: keyof I | string | RegExp) {
    if (!name)
      return errors.value

    return errors.value.filter((err) =>
      name instanceof RegExp
        ? err.name && name.test(err.name)
        : err.name === name)
  },

  clear(name?: keyof I | string | RegExp) {
    // Keep local errors not matching the target
    const localErrors = name
      ? errors.value.filter((err) =>
          isLocalError(err)
          && (name instanceof RegExp
            ? !(err.name && name.test(err.name))
            : err.name !== name))
      : []

    // Clear from nested forms and collect remaining errors
    const nestedErrors: FormError[] = []

    for (const form of nestedForms.value.values()) {
      if (matchesTarget(name, form.name))
        form.api.clear()

      nestedErrors.push(...getFormErrors(form as any))
    }

    errors.value = [...localErrors, ...nestedErrors]
  },

  disabled,
  loading,
  dirty: computed(() => !!dirtyFields.size),
  dirtyFields: readonly(dirtyFields),
  blurredFields: readonly(blurredFields),
  touchedFields: readonly(touchedFields),
} satisfies Form<S>

defineExpose(api)

const appConfig = useAppConfig() as RuntimeAppConfig
const ui = computed(() => {
  const styler = cv(merge(theme, appConfig.ui.form))
  return styler(props)
})
</script>

<template>
  <component
    :is="parentBus ? 'div' : 'form'"
    :id="formId"
    :class="ui.base({ class: props.class })"
    data-part="base"
    @submit.prevent="onSubmitWrapper"
  >
    <slot :errors="errors" :loading="loading"></slot>
  </component>
</template>
