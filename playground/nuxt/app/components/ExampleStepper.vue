<script setup lang="ts">
import type { StepperItem, StepperProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = [
  {
    title: 'Address',
    description: 'Add your address here',
    icon: 'i-lucide-house',
  },
  {
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: 'i-lucide-truck',
  },
  {
    title: 'Checkout',
    description: 'Confirm your order',
  },
] satisfies StepperItem[]

const controls: ControlItems<StepperProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'disabled', value: false },
]

const stepperValue = ref(0)
const stepper = useTemplateRef('stepper')
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Stepper"
    description="A set of steps that are used to indicate progress through a multi-step process."
    :controls="controls"
  >
    <div class="space-y-4">
      <UStepper ref="stepper" v-model="stepperValue" v-bind="attrs" :items="items">
        <template #content="{ item }">
          <Placeholder class="h-40" :label="`This is the ${item.title} step.`" />
        </template>
      </UStepper>

      <div class="flex gap-4 justify-between">
        <UButton icon="i-lucide:arrow-left" label="Prev" :disabled="!stepper?.hasPrev" @click="stepper?.prev()" />
        <UButton icon="i-lucide:arrow-right" label="Next" :disabled="!stepper?.hasNext" @click="stepper?.next()" />
      </div>
    </div>
  </ExampleView>
</template>
