import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Button.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Button',
  component,
  tags: ['autodocs'],
  // argTypes: {
  //   size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  //   variant: { control: 'select', options: ['solid', 'outline', 'soft', 'soft-outline', 'ghost', 'link'] },
  // },
  args: {
    size: 'md',
    variant: 'solid',
    label: 'Label',
    class: '',
  },
}

export default meta

export const Example: Story = {}
