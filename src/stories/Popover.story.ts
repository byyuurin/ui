import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Popover.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Popover',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    mode: 'hover',
    arrow: true,
    dismissible: true,
  },
}

export default meta

export const Example: Story = {}
