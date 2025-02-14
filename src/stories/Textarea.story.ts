import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Textarea.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Textarea',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    size: 'md',
    variant: 'outline',
    rows: 3,
    maxRows: 0,
  },
}

export default meta

export const Example: Story = {}
