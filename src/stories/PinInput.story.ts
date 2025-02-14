import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/PinInput.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/PinInput',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    size: 'md',
    variant: 'outline',
    length: 5,
    placeholder: '?',
  },
}

export default meta

export const Example: Story = {}
