import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Link.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Link',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Github',
    href: 'https://github.com',
    target: '_blank',
  },
}

export default meta

export const Example: Story = {}
