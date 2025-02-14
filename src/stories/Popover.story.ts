import type { Meta, StoryObj } from '@storybook/vue3'
import UButton from '../runtime/components/Button.vue'
import component from '../runtime/components/Popover.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Popover',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    mode: 'hover',
    arrow: true,
    dismissible: true,
  },
  render: (attrs) => ({
    components: {
      UPopover: component,
      UButton,
    },
    setup() {
      return { attrs }
    },
    template: `
    <UPopover v-bind="attrs" :content="{ side: attrs.side }">
      <UButton label="Trigger" />

      <template #content>
        #content
      </template>
    </UPopover>
    `,
  }),
}

export default meta

export const Example: Story = {}
