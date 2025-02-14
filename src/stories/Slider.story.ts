import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Slider.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Slider',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    orientation: 'horizontal',
    size: 'md',
    min: 0,
    max: 100,
    step: 1,
    minStepsBetweenThumbs: 0,
  },
}

export default meta

export const Example: Story = {}
