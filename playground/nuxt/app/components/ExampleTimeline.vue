<script setup lang="ts">
import type { TimelineItem, TimelineProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const controls: ControlItems<TimelineProps> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral'] },
  { prop: 'size', value: 'md', options: ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
  { prop: 'orientation', value: 'vertical', options: ['horizontal', 'vertical'] },
  { prop: 'defaultValue', value: null, type: 'number' },
  { prop: 'modelValue', value: null, type: 'number' },
  { prop: 'reverse', value: false },
]

const items = [
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description: 'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: 'i-lucide-rocket',
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description: 'User research and design workshops. Created wireframes and prototypes for user testing.',
    icon: 'i-lucide-palette',
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description: 'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: 'i-lucide-code',
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: 'i-lucide-check-circle',
  },
  {
    slot: 'custom' as const,
    date: 'date',
    title: 'title',
    description: 'description',
  },
] satisfies TimelineItem[]
</script>

<template>
  <ExampleView v-slot="attrs" title="Timeline" description="A component that displays a sequence of events with dates, titles, icons or avatars." :controls="controls">
    <UTimeline v-bind="attrs" :items="items">
      <template #custom-date>
        <Placeholder label="#date" label-position="left" />
      </template>
      <template #custom-title>
        <Placeholder label="#title" label-position="left" />
      </template>
      <template #custom-description>
        <Placeholder label="#description" label-position="left" />
      </template>
      <template #custom-indicator>
        <UTooltip text="#indicator">
          <Placeholder label="#" label-position="left" />
        </UTooltip>
      </template>
    </UTimeline>
  </ExampleView>
</template>
