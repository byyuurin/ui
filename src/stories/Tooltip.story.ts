import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Tooltip.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Tooltip',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    text: 'Text',
    arrow: true,
  },
}

export default meta

export const Example: Story = {}
