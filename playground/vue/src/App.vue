<script lang="ts" setup>
import type { AppProps } from '@byyuurin/ui'

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
      <DemoTheme class="sticky top-0 z-1 bg-ui-base shadow-sm" @color="uiColor = $event" />
      <DemoNative :class="uiColor" />
      <DemoAccordion :class="uiColor" />
      <DemoButton :class="uiColor" />
      <DemoCard :class="uiColor" />
      <DemoDrawer :class="uiColor" />
      <DemoInput :class="uiColor" />
      <DemoLink :class="uiColor" />
      <DemoModal :class="uiColor" />
      <DemoPopover :class="uiColor" />
      <DemoTabs :class="uiColor" />
      <DemoToast
        v-model:duration="toasterAttrs.duration"
        v-model:position="toasterAttrs.position"
        v-model:expand="toasterAttrs.expand"
        :class="uiColor"
        :color="uiColor"
      />
      <DemoTooltip :class="uiColor" />
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
