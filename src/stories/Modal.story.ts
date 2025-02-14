import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '../runtime/components/Button.vue'
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
  render: (attrs) => ({
    components: {
      UModal: component,
      UButton: Button,
    },
    setup() {
      return { attrs }
    },
    template: `
    <div>
      <UModal v-bind="attrs">
        <UButton label="Open Modal">
      </UModal>
    </div>
    `,
  }),
}

export default meta

export const Example: Story = {}
