<script setup lang="ts">
import type { ProgressProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<ProgressProps> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'modelValue', value: 0, min: 0 },
  { prop: 'max', value: 100, min: 0 },
  { prop: 'status', value: false },
  { prop: 'inverted', value: false },
]

const TEXT_STATUS = ['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']

function demo2Attrs(attrs: ProgressProps) {
  const value = Math.floor((attrs.modelValue ?? 0) * TEXT_STATUS.length / (attrs.max as number ?? 100)) - 1

  return {
    ...attrs,
    modelValue: attrs.modelValue === null ? null : value < 0 ? 0 : value,
    max: TEXT_STATUS,
  }
}
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Progress"
    description="An indicator showing the progress of a task."
    :controls="controls"
  >
    <div class="py-4 flex justify-center gap-10 items-center h-100" :class="{ 'flex-col': attrs.orientation === 'horizontal' }">
      <UProgress v-bind="attrs" />
      <UProgress v-bind="attrs">
        <template #status="{ percent }">
          <Placeholder :label="`#status (${percent}%)`" />
        </template>
      </UProgress>
      <UProgress v-bind="demo2Attrs(attrs)" />
      <UProgress v-bind="demo2Attrs(attrs)">
        <template v-for="(_, i) in TEXT_STATUS" :key="i" #[`step-${i}`]>
          <Placeholder :label="`#step-${i}`" />
        </template>
      </UProgress>
    </div>
  </ExampleView>
</template>
