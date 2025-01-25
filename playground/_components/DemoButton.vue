<script lang="ts" setup>
import type { ButtonProps } from '@byyuurin/ui'
import { Button, Input } from '@byyuurin/ui'

const label = ref('')

const attrs = reactive<Pick<ButtonProps, 'variant' | 'size' | 'active' | 'disabled' | 'round'>>({
  variant: 'solid',
  size: 'md',
  active: false,
  disabled: false,
  round: false,
})

const variantOptions: Array<ButtonProps['variant']> = ['solid', 'outline', 'soft', 'ghost', 'link']
const sizeOptions: Array<ButtonProps['size']> = ['xs', 'sm', 'md', 'lg', 'xl']
</script>

<template>
  <DemoBlock title="Button">
    <div class="grid sm:grid-cols-[auto_1fr] items-center gap-2 py-4 gap-x-4 children:max-w-35">
      <label class="opacity-80">label:</label>
      <Input v-model="label" variant="soft" placeholder="label" />
      <label class="opacity-80">variant:</label>
      <select v-model="attrs.variant" class="p-1 bg-ui-cb/5">
        <option v-for="option in variantOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <label class="opacity-80">size:</label>
      <select v-model="attrs.size" class="p-1 bg-ui-cb/5">
        <option v-for="option in sizeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <!-- <label class="opacity-80">active:</label>
      <input v-model="buttonProps.active" type="checkbox" class="size-5 accent-ui-cb" /> -->
      <label class="opacity-80">disabled:</label>
      <input v-model="attrs.disabled" type="checkbox" class="size-5 accent-ui-cb" />
      <label class="opacity-80">round:</label>
      <input v-model="attrs.round" type="checkbox" class="size-5 accent-ui-cb" />
    </div>
    <div class="flex flex-wrap gap-4">
      <Button v-bind="attrs" icon="i-carbon-asleep-filled" />
      <Button v-bind="attrs" :label="label || 'label'" />
      <Button v-bind="attrs" :label="label || 'label'" icon="i-carbon-asleep-filled" />
    </div>
  </DemoBlock>
</template>
