<script setup lang="ts">
import type { SeparatorProps } from '@byyuurin/ui'
import appTheme from '../../../../src/runtime/theme/app'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<SeparatorProps> = [
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'align', value: 'center', options: ['start', 'center', 'end'] },
  {
    prop: 'icon',
    value: null,
    type: 'multiple',
    options: [null, ...Object.values(appTheme.icons)].map((icon) => ({ label: icon || '(No icon)', value: icon || null })),
    warning: 'Note that this option will be ignored if the `label` option is not empty.',
  },
  { prop: 'label', value: 'Label' },
  { prop: 'decorative', value: false, description: 'Whether or not the component is purely decorative. When `true`, accessibility-related attributes are updated so that that the rendered element is removed from the accessibility tree.' },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Separator"
    description="Separates content horizontally or vertically."
    :controls="controls"
  >
    <div class="flex gap-4 justify-evenly h-70" :class="{ 'flex-col': attrs.orientation === 'horizontal' }">
      <div class="flex items-center justify-center">
        <USeparator v-bind="attrs" />
      </div>
      <div class="flex items-center justify-center">
        <USeparator v-bind="attrs">
          <Placeholder label="#default" />
        </USeparator>
      </div>
    </div>
  </ExampleView>
</template>
