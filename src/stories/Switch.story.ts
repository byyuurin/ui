import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Switch.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Switch',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Label',
    description: 'Description',
    size: 'md',
  },
}

export default meta

export const Example: Story = {}
