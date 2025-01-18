<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  options: string[]
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <DemoBlock title="Theme">
    <div class="flex gap-4 flex-wrap">
      <div
        v-for="theme in props.options"
        :key="theme"
        :data-theme="theme"
        class="self-start border-ui-cb/20 hover:border-ui-cb/40 overflow-hidden rounded-lg border outline outline-2 outline-offset-2 outline-transparent select-none"
        :class="{ 'cursor-pointer': theme !== props.modelValue }"
        @click="emit('update:modelValue', theme)"
      >
        <div class="bg-ui-c1 text-ui-cb w-full font-sans">
          <div class="grid grid-cols-5 grid-rows-3">
            <div class="bg-ui-c2 col-start-1 row-span-2 row-start-1"></div>
            <div class="bg-ui-c3 col-start-1 row-start-3"></div>
            <div class="bg-ui-c1 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
              <div class="font-bold">
                {{ theme }}
              </div>
              <div class="flex flex-wrap gap-1">
                <div class="ui-red-600 ui-content-light bg-ui-fill/80 flex aspect-square w-5 items-center justify-center rounded-ui-base lg:w-6">
                  <div class="text-ui-content text-sm font-bold">
                    A
                  </div>
                </div>
                <div class="ui-green-600 ui-content-light bg-ui-fill/80 flex aspect-square w-5 items-center justify-center rounded-ui-base lg:w-6">
                  <div class="text-ui-content text-sm font-bold">
                    A
                  </div>
                </div>
                <div class="ui-blue-600 ui-content-light bg-ui-fill/80 flex aspect-square w-5 items-center justify-center rounded-ui-base lg:w-6">
                  <div class="text-ui-content text-sm font-bold">
                    A
                  </div>
                </div>
                <div class="ui-gray-600 ui-content-light bg-ui-fill/80 flex aspect-square w-5 items-center justify-center rounded-ui-base lg:w-6">
                  <div class="text-ui-content text-sm font-bold">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DemoBlock>
</template>
