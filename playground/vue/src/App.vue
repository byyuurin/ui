<script lang="ts" setup>
import type { AppProps } from '@byyuurin/ui'

const toasterAttrs = ref<Pick<Required<AppProps['toaster'] & object>, 'duration' | 'position' | 'expand'>>({
  duration: 10000,
  position: 'bottom-right',
  expand: true,
})
</script>

<template>
  <UApp :toaster="toasterAttrs" :ui="{ toast: { slots: { icon: 'animate-head-shake animate-count-infinite' } } }">
    <div class="h-screen overflow-auto">
      <DemoTheme />
      <DemoNative />
      <DemoAccordion />
      <DemoButton />
      <DemoCard />
      <DemoDrawer />
      <DemoInput />
      <DemoLink />
      <DemoModal />
      <DemoPopover />
      <DemoToast
        v-model:duration="toasterAttrs.duration"
        v-model:position="toasterAttrs.position"
        v-model:expand="toasterAttrs.expand"
      />
      <DemoTooltip />
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
