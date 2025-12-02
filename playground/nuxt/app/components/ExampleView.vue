<script lang="ts">
import type { SelectItem } from '@byyuurin/ui'
import { createReusableTemplate } from '@vueuse/core'
import { upperFirst } from 'scule'

export type ControlItem<T> = {
  [Prop in keyof T]?: {
    type?: 'string' | 'number' | 'boolean' | 'select' | 'multiple'
    prop: Prop
    description?: string
    warning?: string
    value: T[Prop] | T[Prop][] | null
    label?: string
    options?: Array<Required<T>[Prop] | (SelectItem & { label: string, value: Required<T>[Prop] | null })>
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

const { define: DefineControlForm, reuse: ReuseControlForm } = createReusableTemplate()

const openControls = shallowRef(false)
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
    <DefineControlForm>
      <div
        v-if="props.controls.length > 0"
        class="grid grid-cols-[auto_1fr] items-center gap-2 gap-x-4 rounded"
      >
        <template v-for="(item, y) in props.controls" :key="item?.prop || y">
          <div class="inline-flex justify-between items-center gap-2 opacity-80">
            <span class="mr-auto">{{ upperFirst((item?.label ?? item?.prop) as string) }}</span>
            <UPopover v-if="item?.description" mode="click" arrow>
              <UButton color="neutral" variant="link" size="xs" icon="i-lucide:circle-question-mark" :ui="{ base: 'p-0' }" />
              <template #content>
                <p class="text-sm p-2 px-3 max-w-[calc(100vw-30px)] whitespace-pre-wrap">
                  {{ item?.description }}
                </p>
              </template>
            </UPopover>
            <UPopover v-if="item?.warning" mode="click" arrow>
              <UButton color="warning" variant="link" size="xs" icon="i-lucide:circle-alert" :ui="{ base: 'p-0' }" />
              <template #content>
                <p class="text-sm p-2 px-3 max-w-md">
                  {{ item?.warning }}
                </p>
              </template>
            </UPopover>
          </div>

          <USelect
            v-if="item?.type === 'select' || item?.options"
            v-model="attrs[item!.prop]"
            :items="((item.options ?? []) as SelectItem[])"
            :placeholder="item.placeholder"
            :multiple="item.type === 'multiple'"
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
    </DefineControlForm>
    <div class="p-4 grid grid-cols-1 md:grid-cols-2 items-start xl:grid-cols-3 gap-4">
      <UCard
        :title="props.title"
        :description="props.description"
        class="top-4 bg-neutral/2 backdrop-blur max-md:hidden md:sticky"
      >
        <ReuseControlForm />
      </UCard>
      <UCard
        :title="props.title"
        :description="props.description"
        :ui="{
          header: 'md:hidden',
        }"
        class="relative h-full bg-neutral/2 transition xl:grid-col-span-2"
      >
        <div v-if="props.controls.length > 0" class="absolute top-4 right-4">
          <UDrawer v-model:open="openControls" :title="`${props.title} props`" inset :overlay="false" :ui="{ content: 'ring-6 ring-default ring-offset-2 ring-offset-primary/80' }">
            <UButton class="md:hidden" color="neutral" variant="ghost" icon="i-lucide:settings-2" />
            <template #body>
              <ReuseControlForm />
            </template>
          </UDrawer>
        </div>
        <slot v-bind="attrs"></slot>
      </UCard>
    </div>
  </div>
</template>
