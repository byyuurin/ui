import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Checkbox.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Checkbox',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
}

export default meta

export const Example: Story = {}
