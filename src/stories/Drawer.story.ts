import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Drawer.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Drawer',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    title: 'Title',
    description: 'Description',
    direction: 'bottom',
    dismissible: true,
    handle: true,
    blur: false,
    full: false,
  },
}

export default meta

export const Example: Story = {}
