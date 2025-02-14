import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Input.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Input',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    type: 'text',
    size: 'md',
    variant: 'outline',
    placeholder: '',
  },
}

export default meta

export const Example: Story = {}
