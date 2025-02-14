import type { Meta, StoryObj } from '@storybook/vue3'
import UButton from '../runtime/components/Button.vue'
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
  render: (attrs) => ({
    components: {
      UDrawer: component,
      UButton,
    },
    setup() {
      return { attrs }
    },
    template: `
    <div>
      <UDrawer v-bind="attrs">
        <UButton label="Open Drawer">
      </UDrawer>
    </div>
    `,
  }),
}

export default meta

export const Example: Story = {}
