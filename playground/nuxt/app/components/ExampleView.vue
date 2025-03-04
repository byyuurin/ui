<script lang="ts">
import type { SelectOption } from '@byyuurin/ui'

export type ControlItem<T> = {
  [Prop in keyof T]?: {
    type?: 'string' | 'number' | 'boolean' | 'multiple'
    prop: Prop
    value: T[Prop]
    label?: string
    options?: Array<T[Prop] | { label: string, value: T[Prop] }>
    placeholder?: string
    min?: number
    max?: number
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
    <div class="p-4 grid grid-cols-1 md:grid-cols-2 items-start xl:grid-cols-3 gap-4">
      <UCard
        :title="props.title"
        :description="props.description"
        class="top-4 bg-ui-cb/2 backdrop-blur md:sticky"
      >
        <div v-if="props.controls.length > 0" class="grid grid-cols-[auto_1fr] items-center gap-2 gap-x-4 rounded-ui-box">
          <template v-for="(item, y) in props.controls" :key="item?.prop || y">
            <label class="opacity-80">{{ item?.label ?? item?.prop }}:</label>

            <USelect
              v-if="item?.type === 'multiple' || item?.options"
              v-model="attrs[item!.prop]"
              :options="typedSelectOptions(item)"
            />
            <USwitch
              v-else-if="item?.type === 'boolean' || typeof item?.value === 'boolean'"
              v-model="attrs[item.prop]"
            />
            <UInputNumber
              v-else-if="item?.type === 'number' || typeof item?.value === 'number'"
              v-model="attrs[item!.prop]"
              orientation="vertical"
              :placeholder="item?.placeholder"
              :min="item.min"
              :max="item.max"
            />
            <UInput
              v-else
              v-model="attrs[item!.prop]"
              :placeholder="item?.placeholder"
            />
          </template>
        </div>
      </UCard>
      <UCard class="h-full bg-ui-cb/2 xl:grid-col-span-2">
        <slot v-bind="attrs"></slot>
      </UCard>
    </div>
  </div>
</template>
