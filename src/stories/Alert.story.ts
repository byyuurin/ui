import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Alert.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Alert',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    orientation: 'vertical',
    variant: 'solid',
    title: 'Title',
    description: 'Description',
  },
}

export default meta

export const Example: Story = {}
