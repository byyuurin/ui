<script setup lang="ts">
import type { DropdownMenuItem, DropdownMenuProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = [
  [
    {
      label: 'User Name',
      avatar: {
        src: 'https://i.pravatar.cc/100',
      },
      type: 'label',
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
      slot: 'profile' as const,
      to: '/',
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [','],
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor',
    },
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users',
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail',
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square',
          },
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus',
          },
        ],
      ],
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n'],
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      target: '_blank',
      to: 'https://github.com',
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com',
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com',
      disabled: true,
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      kbds: ['shift', 'meta', 'q'],
      to: '/other',
    },
  ],
] satisfies DropdownMenuItem[][]

const controls: ControlItems<DropdownMenuProps<typeof items>> = [
  { prop: 'size', value: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  { prop: 'arrow', value: false },
  { prop: 'disabled', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="DropdownMenu"
    description="A menu to display actions when clicking on an element."
    :controls="controls"
  >
    <div class="flex gap-4">
      <UDropdownMenu v-bind="attrs" :items="items">
        <UButton icon="i-lucide-menu" variant="outline" />
      </UDropdownMenu>

      <UDropdownMenu v-bind="attrs" :items="items.slice(1, 2)">
        <UButton variant="outline">
          <Placeholder label="#default" />
        </UButton>

        <template #item-leading>
          <Placeholder label="#item-leading" />
        </template>
        <template #item-label>
          <Placeholder label="#item-label" />
        </template>
        <template #item-trailing>
          <Placeholder label="#item-trailing" />
        </template>

        <template #profile-leading>
          <Placeholder label="[slot]-leading" />
        </template>
        <template #profile-label>
          <Placeholder label="[slot]-label" />
        </template>
        <template #profile-trailing>
          <Placeholder label="[slot]-trailing" />
        </template>
      </UDropdownMenu>
    </div>
  </ExampleView>
</template>
