import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Chip.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Chip',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    label: 'Text',
    variant: 'solid',
    size: 'md',
  },
}

export default meta

export const Example: Story = {}
