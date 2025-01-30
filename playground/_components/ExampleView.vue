<script lang="ts">
import type { SelectOption } from '@byyuurin/ui'
import { Card, Checkbox, Input, Select } from '@byyuurin/ui'

export type ControlItem<T> = {
  [Prop in keyof T]?: {
    prop: Prop
    value: T[Prop]
    label?: string
    options?: Array<T[Prop] | { label: string, value: T[Prop] }>
    placeholder?: string
  }
}[keyof T]

export type ControlItems<T> = ControlItem<T>[]

export interface ExampleViewEmits<T> {
  (event: 'change', attrs: T): void
}
</script>

<script lang="ts" generic="T" setup>
const props = withDefaults(defineProps<{
  title: string
  description?: string
  controls?: ControlItems<T>
}>(), {
  controls: () => [],
})

const emit = defineEmits<ExampleViewEmits<T>>()

defineSlots<{
  default?: (props: T) => any
}>()

const attrs = ref<any>({})

watch(() => props.controls, (configs) => {
  attrs.value = Object.fromEntries(configs.map((i) => [i!.prop, i!.value]))
}, {
  immediate: true,
})

onMounted(() => {
  watch(attrs, (value) => {
    emit('change', value)
  }, {
    immediate: true,
    deep: true,
  })
})

function typedSelectOptions(item: ControlItem<T>) {
  return (item?.options ?? []) as unknown as SelectOption[]
}
</script>

<template>
  <div>
    <div class="p-4 grid md:grid-cols-2 items-start xl:grid-cols-3 gap-4">
      <Card
        :title="props.title"
        :description="props.description"
        class="top-4 bg-ui-cb/2 backdrop-blur md:sticky"
      >
        <div v-if="props.controls.length > 0" class="grid grid-cols-[auto_1fr] items-center gap-2 gap-x-4 rounded-ui-box">
          <template v-for="(item, y) in props.controls" :key="item?.prop || y">
            <label class="opacity-80">{{ item?.label ?? item?.prop }}:</label>

            <Select v-if="item?.options" v-model="attrs[item!.prop]" :options="typedSelectOptions(item)" />
            <Checkbox
              v-else-if="typeof item?.value === 'boolean'"
              v-model="attrs[item.prop]"
            />
            <Input
              v-else
              v-model="attrs[item!.prop]"
              :type="typeof item?.value === 'number' ? 'number' : 'text'"
              :placeholder="item?.placeholder"
            />
          </template>
        </div>
      </Card>
      <Card class="h-full bg-ui-cb/2 xl:grid-col-span-2">
        <slot v-bind="attrs"></slot>
      </Card>
    </div>
  </div>
</template>
