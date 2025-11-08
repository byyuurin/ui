<script setup lang="ts">
import type { NavigationMenuItem, NavigationMenuProps } from '@byyuurin/ui'
import type { ControlItems } from './ExampleView.vue'

const items = ref([
  [
    {
      label: 'Guide',
      icon: 'i-lucide-book-open',
      href: '/other',
      children: [
        {
          label: 'Introduction',
          description: 'Fully styled and customizable components for Nuxt.',
          icon: 'i-lucide-house',
        },
        {
          label: 'Installation',
          description: 'Learn how to install and configure Nuxt UI in your application.',
          icon: 'i-lucide-cloud-download',
        },
        {
          label: 'Icons',
          icon: 'i-lucide-smile',
          description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
        },
        {
          label: 'Colors',
          icon: 'i-lucide-swatch-book',
          description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
        },
        {
          label: 'Theme',
          icon: 'i-lucide-cog',
          description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
        },
      ],
    },
    {
      label: 'Composables',
      icon: 'i-lucide-database',
      href: '/other',
      slot: 'composables',
      children: [
        {
          label: 'useModal',
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          href: '/other',
        },
        {
          label: 'useToast',
          icon: 'i-lucide-file-text',
          description: 'Display a toast within your application.',
          href: '/other',
        },
      ],
    },
    {
      label: 'Components',
      icon: 'i-lucide-box',
      href: '/other',
      active: true,
      children: [
        {
          label: 'Link',
          icon: 'i-lucide-file-text',
          description: 'Use NuxtLink with superpowers.',
          href: '/other',
        },
        {
          label: 'Modal',
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          href: '/other',
          disabled: true,
        },
        {
          label: 'NavigationMenu',
          icon: 'i-lucide-file-text',
          description: 'Display a list of links.',
          href: '/other',
          active: true,
        },
        {
          label: 'Pagination',
          icon: 'i-lucide-file-text',
          description: 'Display a list of pages.',
          href: '/other',
        },
        {
          label: 'Popover',
          icon: 'i-lucide-file-text',
          description: 'Display a non-modal dialog that floats around a trigger element.',
          href: '/other',
        },
        {
          label: 'Progress',
          icon: 'i-lucide-file-text',
          description: 'Show a horizontal bar to indicate task progression.',
          href: '/other',
          children: [
            {
              label: 'Foo',
              icon: 'i-lucide-file-text',
            },
            {
              label: 'Bar',
              icon: 'i-lucide-file-text',
            },
          ],
        },
      ],
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true,
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-lucide:github',
      badge: '999',
      href: '/other',
      target: '_blank',
      tooltip: {
        text: 'Open in GitHub',
      },
    },
    {
      label: 'Avatar',
      avatar: {
        src: 'https://i.pravatar.cc/100?img=13',
      },
    },
  ],
] satisfies NavigationMenuItem[][])

const controls: ControlItems<NavigationMenuProps<typeof items.value>> = [
  { prop: 'color', value: 'primary', options: ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'neutral'] },
  { prop: 'orientation', value: 'horizontal', options: ['horizontal', 'vertical'] },
  { prop: 'contentOrientation', value: 'horizontal', options: ['horizontal', 'vertical'], description: 'The orientation of the content. Only works when `orientation` is `horizontal`' },
  { prop: 'variant', value: 'pill', options: ['pill', 'link'] },
  { prop: 'arrow', value: false },
  { prop: 'unmountOnHide', value: true },
  { prop: 'collapsed', value: false, description: 'Collapse the navigation menu to only show icons.', warning: 'Only works when `orientation` is `vertical`.' },
  { prop: 'tooltip', value: true, description: 'Display a tooltip on the items when the menu is collapsed with the label of the item.' },
  { prop: 'popover', value: true, description: 'Display a popover on the items when the menu is collapsed with the children list.' },
  { prop: 'highlight', value: false, description: 'Display a line next to the active item.' },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="NavigationMenu"
    description="A list of links that can be displayed horizontally or vertically."
    :controls="controls"
  >
    <div
      :class="{
        'h-100': attrs.orientation === 'horizontal',
        'inline-block max-w-60': attrs.orientation === 'vertical',
        'w-full': attrs.orientation === 'vertical' && !attrs.collapsed,
      }"
    >
      <UNavigationMenu :items="items" v-bind="attrs">
        <template #composables-content="{ item }">
          <div class="grid gap-2 p-4 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]" :class="attrs.contentOrientation === 'horizontal' ? 'lg:w-[500px]' : ''">
            <Placeholder class="size-full min-h-48" label="#[slot]-content" />
            <ul>
              <li v-for="child in item.children" :key="child.label">
                <ULink class="text-sm text-left rounded-md p-3 transition-colors hover:bg-soft-ui-fill/5">
                  <p class="font-medium text-default">
                    {{ child.label }}
                  </p>
                  <p class="text-default line-clamp-2">
                    {{ child.description }}
                  </p>
                </ULink>
              </li>
            </ul>
          </div>
        </template>
      </UNavigationMenu>
    </div>
  </ExampleView>
</template>
