<script lang="ts" setup>
import type { LinkProps } from '@byyuurin/ui'
import { Input, Link } from '@byyuurin/ui'

const label = ref('')

const attrs = reactive<Pick<LinkProps, 'active' | 'disabled'>>({
  active: false,
  disabled: false,
})
</script>

<template>
  <DemoBlock title="Link">
    <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 py-4 gap-x-4 children:max-w-35">
      <label class="opacity-80">label:</label>
      <Input v-model="label" variant="soft" placeholder="label" />
      <label class="opacity-80">active:</label>
      <input v-model="attrs.active" type="checkbox" class="size-5 accent-ui-cb" />
      <label class="opacity-80">disabled:</label>
      <input v-model="attrs.disabled" type="checkbox" class="size-5 accent-ui-cb" />
    </div>
    <div class="flex items-start gap-4">
      <Link v-bind="attrs">
        {{ label || 'label' }}
      </Link>
    </div>
  </DemoBlock>
</template>
