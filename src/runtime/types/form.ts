import type { StandardSchemaV1 } from '@standard-schema/spec'
import type { FormExpose } from '.'

export type FormSchema<_T> = StandardSchemaV1

export interface FormError<P extends string = string> {
  name?: P
  message: string
}

export interface FormErrorWithId extends FormError {
  id?: string
}

export type FormInputEvents = 'input' | 'blur' | 'change' | 'focus'

export type FormEventType = FormInputEvents

export type FormSubmitEvent<T> = SubmitEvent & { data: T }

export interface FormChildAttachEvent {
  type: 'attach'
  formId: string | number
  validate: FormExpose<any>['validate']
}

export interface FormChildDetachEvent {
  type: 'detach'
  formId: string | number
}

export interface FormInputEvent<T extends object> {
  type: FormEventType
  name: keyof T
  eager?: boolean
}

export type FormEvent<T extends object> =
  | FormInputEvent<T>
  | FormChildAttachEvent
  | FormChildDetachEvent

export interface FormValidationError {
  errors: FormErrorWithId[]
  children?: FormValidationError[]
}

export type FormErrorEvent = SubmitEvent & FormValidationError

export interface ValidateReturnSchema<T> {
  result: T
  errors: FormError[] | null
}

export interface FormValidateOptions<T extends object> {
  name?: keyof T | (keyof T)[]
  silent?: boolean
  nested?: boolean
  transform?: boolean
}
