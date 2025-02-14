import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/ScrollArea.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/ScrollArea',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    type: 'hover',
    dir: 'ltr',
    scrollHideDelay: 600,
  },
}

export default meta

export const Example: Story = {}
