import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Badge.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Badge',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    text: 1,
    size: 'md',
    position: 'top-right',
    inset: false,
    show: true,
  },
}

export default meta

export const Example: Story = {}
