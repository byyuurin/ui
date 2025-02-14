import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Modal.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Modal',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    title: 'Title',
    description: 'Description',
    size: 'sm',
    dismissible: true,
    overlay: true,
    transition: true,
  },
}

export default meta

export const Example: Story = {}
