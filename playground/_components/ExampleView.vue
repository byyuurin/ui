<script lang="ts">
import { Input } from '@byyuurin/ui'

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
</script>

<template>
  <div>
    <h2 class="font-600 text-xl leading-loose bg-ui-cb/10">
      <span class="px-4">{{ props.title }}</span>
    </h2>
    <div class="p-4 grid md:grid-cols-2 items-start xl:grid-cols-3 gap-4">
      <div class="xl:grid-col-span-2">
        <slot v-bind="attrs"></slot>
      </div>
      <div v-if="props.controls.length > 0" class="grid grid-cols-[auto_1fr] items-center gap-2 py-4 gap-x-4 children:max-w-35 bg-ui-cb/5 px-4 rounded-ui-box">
        <template v-for="(item, y) in props.controls" :key="item?.prop || y">
          <label class="opacity-80">{{ item?.label ?? item?.prop }}:</label>

          <select v-if="item?.options" v-model="attrs[item!.prop]" class="px-2.5 py-1.5 bg-ui-c1 rounded-ui-base ring-1 ring-inset ring-ui-cb focus:ring-2 focus-visible:outline-none">
            <option v-for="(option, x) in item.options" :key="x" class="color-ui-cb bg-ui-c1" :value="(option as any)?.value ?? option">
              {{ (option as any)?.label ?? option }}
            </option>
          </select>
          <input
            v-else-if="typeof item?.value === 'boolean'"
            v-model="attrs[item.prop]"
            type="checkbox"
            class="size-5 accent-ui-cb"
          />
          <Input
            v-else
            v-model="attrs[item!.prop]"
            :type="typeof item?.value === 'number' ? 'number' : 'text'"
            :placeholder="item?.placeholder"
          />
        </template>
      </div>
    </div>
  </div>
</template>
