<script setup lang="ts">
import type { FormProps, FormSubmitEvent, SelectOption } from '@byyuurin/ui'
import * as z from 'zod'
import type { ControlItems } from './ExampleView.vue'

const formRef = useTemplateRef('formRef')

const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
]

const schema = z.object({
  input: z.string().min(10),
  inputNumber: z.number().min(10),
  textarea: z.string().min(10),
  select: z.string().refine((value) => value === 'option-2', {
    message: 'Select Option 2',
  }),
  selectMultiple: z.any().refine((values) => !!values?.find((option: SelectOption) => option.value === 'option-2'), {
    message: 'Include Option 2',
  }),
  switch: z.boolean().refine((value) => value === true, {
    message: 'Toggle me',
  }),
  slider: z.number().max(20, { message: 'Must be less than 20' }),
  checkbox: z.boolean().refine((value) => value === true, {
    message: 'Check me',
  }),
  radioGroup: z.string().refine((value) => value === 'option-2', {
    message: 'Select Option 2',
  }),
  pin: z.string().regex(/^\d$/, 'Only numbers').array().length(5),
})

const state = reactive<Partial<z.input<typeof schema>>>({})

const controls: ControlItems<FormProps<typeof state>> = [
  {
    prop: 'validateOn',
    value: ['input', 'change', 'blur'],
    type: 'multiple',
    options: [['input', 'change', 'blur', 'focus']],
    description: 'The list of input events that trigger the form validation.',
  },
  { prop: 'transform', value: true, description: 'If true, schema transformations will be applied to the state on submit.' },
  { prop: 'disabled', value: false },
]

function onSubmit(event: FormSubmitEvent<typeof state>) {
  return new Promise<void>((resolve) => {
    // eslint-disable-next-line no-console
    console.log(event.data)

    setTimeout(resolve, 500)
  })
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Form"
    description="A form component with built-in validation and submission handling."
    :controls="controls"
  >
    <div class="w-full">
      <UForm
        ref="formRef"
        class="grid grid-cols-3 gap-4"
        v-bind="attrs"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormItem label="Input" name="input">
          <UInput v-model="state.input" class="w-full" />
        </UFormItem>

        <UFormItem label="Switch" name="switch">
          <USwitch v-model="state.switch" label="Switch me" class="ui-base" />
        </UFormItem>

        <UFormItem label="Checkbox" name="checkbox">
          <UCheckbox v-model="state.checkbox" label="Check me" class="ui-base" />
        </UFormItem>

        <UFormItem label="Slider" name="slider">
          <USlider v-model="state.slider" class="ui-base" />
        </UFormItem>

        <UFormItem label="Select" name="select">
          <USelect v-model="state.select" class="w-full" :options="items" />
        </UFormItem>

        <UFormItem label="Select (Multiple)" name="selectMultiple">
          <USelect v-model="state.selectMultiple" class="w-full" :options="items" multiple />
        </UFormItem>

        <UFormItem label="Input Number" name="inputNumber">
          <UInputNumber v-model="state.inputNumber" class="w-full" />
        </UFormItem>

        <UFormItem label="Textarea" name="textarea">
          <UTextarea v-model="state.textarea" class="w-full" />
        </UFormItem>

        <UFormItem label="Radio Group" name="radioGroup">
          <URadioGroup v-model="state.radioGroup" :options="items" class="ui-base" />
        </UFormItem>

        <UFormItem label="Pin Input" name="pin" :error-pattern="/(pin)\..*/">
          <UPinInput v-model="state.pin" />
        </UFormItem>

        <div class="grid-col-span-3 flex gap-2 items-start">
          <UButton type="submit" label="Submit" />
          <UButton variant="outline" label="Clear" @click="formRef?.clear()" />
        </div>
      </UForm>
    </div>
  </ExampleView>
</template>
