import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Card.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Card',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    title: 'Title',
    description: 'Description',
  },
}

export default meta

export const Example: Story = {}
