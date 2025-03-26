import type { StandardSchemaV1 } from '@standard-schema/spec'
import type { FormSchema, ValidateReturnSchema } from '../types/form'

export function isStandardSchema(schema: any): schema is StandardSchemaV1 {
  return '~standard' in schema
}

export async function validateStandardSchema(
  state: any,
  schema: StandardSchemaV1,
): Promise<ValidateReturnSchema<typeof state>> {
  const result = await schema['~standard'].validate(state)

  if (result.issues) {
    return {
      errors: result.issues?.map((issue) => ({
        name: issue.path?.map((item) => typeof item === 'object' ? item.key : item).join('.') || '',
        message: issue.message,
      })) || [],
      result: null,
    }
  }

  return {
    errors: null,
    result: result.value,
  }
}

export function validateSchema<T extends object>(state: T, schema: FormSchema<T>): Promise<ValidateReturnSchema<typeof state>> {
  if (isStandardSchema(schema))
    return validateStandardSchema(state, schema)

  throw new Error('Form validation failed: Unsupported form schema')
}
