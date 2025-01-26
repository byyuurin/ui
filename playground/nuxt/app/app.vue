<script lang="ts" setup>
import type { AppProps } from '@byyuurin/ui'
import ThemeSelector from '../../_components/ThemeSelector.vue'

const toggleTheme = ref(true)

const uiColor = ref('')

const toasterAttrs = ref<Pick<Required<AppProps['toaster'] & object>, 'duration' | 'position' | 'expand'>>({
  duration: 10000,
  position: 'bottom-right',
  expand: true,
})
</script>

<template>
  <UApp :toaster="toasterAttrs" :ui="{ toast: { slots: { icon: 'animate-head-shake animate-count-infinite' } } }">
    <div class="h-screen overflow-auto">
      <ExampleNative :class="uiColor" />
      <ExampleButton :class="uiColor" />
      <ExampleLink :class="uiColor" />
      <ExampleCard :class="uiColor" />
      <ExampleInput :class="uiColor" />
      <ExampleAccordion :class="uiColor" />
      <ExampleTabs :class="uiColor" />
      <ExampleModal :class="uiColor" />
      <ExampleDrawer :class="uiColor" />
      <ExampleToast
        v-model:duration="toasterAttrs.duration"
        v-model:position="toasterAttrs.position"
        v-model:expand="toasterAttrs.expand"
        :class="uiColor"
        :color="uiColor"
      />
      <ExamplePopover :class="uiColor" />
      <ExampleTooltip :class="uiColor" />
      <div
        class="sticky bottom-0 bg-ui-c1 border-t border-ui-cb/25 transition"
        :class="{ 'translate-y-[calc(100%-2.5rem)]': toggleTheme }"
      >
        <a
          class="font-600 text-xl leading-loose bg-ui-cb/10 px-4 flex items-center justify-between gap-4 bg-ui-cb/5 active:bg-ui-cb/10"
          href="#"
          @click.prevent="toggleTheme = !toggleTheme"
        >
          Theme
        </a>
        <div class="p-8 px-4 flex flex-col gap-4">
          <ThemeSelector @color="uiColor = $event" />
        </div>
      </div>
    </div>
  </UApp>
</template>

<style>
html,
body,
#app {
  height: 100%;
  min-height: 100%;
  overflow: hidden;
}
</style>
