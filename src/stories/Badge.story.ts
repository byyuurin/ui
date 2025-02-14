// @unocss-include
import type { Meta, StoryObj } from '@storybook/vue3'
import component from '../runtime/components/Badge.vue'
import UButton from '../runtime/components/Button.vue'

type Story = StoryObj<typeof meta>

const meta: Meta<typeof component> = {
  title: 'Example/Badge',
  component,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    text: 1,
    size: 'md',
    position: 'top-right',
    inset: false,
    show: true,
  },
  render: (attrs) => ({
    components: {
      UBadge: component,
      UButton,
    },
    setup() {
      return { attrs }
    },
    template: `
    <div>
      <UBadge v-bind="attrs">
        <UButton icon="i-lucide-mail" :ui="{ base: 'ui-base' }" />
      </UBadge>
    </div>
    `,
  }),
}

export default meta

export const Example: Story = {}
