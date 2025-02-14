import type { Meta, StoryObj } from '@storybook/vue3'
import UApp from '../runtime/components/App.vue'
import UButton from '../runtime/components/Button.vue'
import component from '../runtime/components/Tooltip.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Tooltip',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    text: 'Text',
    arrow: true,
  },
  render: (attrs) => ({
    components: {
      UTooltip: component,
      UApp,
      UButton,
    },
    setup() {
      return { attrs }
    },
    template: `
    <UApp>
      <div>
        <UTooltip v-bind="attrs">
          <UButton label="trigger" />
        </UTooltip>
      </div>
    </UApp>
    `,
  }),
}

export default meta

export const Example: Story = {}
