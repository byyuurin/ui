<script lang="ts" setup>
import type { AppProps } from '@byyuurin/ui'
import { setTheme, themeOptions } from './ThemeSelector.vue'

const uiColor = ref('')
const uiTheme = ref<typeof themeOptions[number]['name']>('wireframe')

const toasterAttrs = ref<Pick<Required<AppProps['toaster'] & object>, 'duration' | 'position' | 'expand'>>({
  duration: 10000,
  position: 'bottom-right',
  expand: true,
})

onMounted(() => {
  const theme = themeOptions.find((i) => i.name === uiTheme.value)

  if (theme)
    setTheme(theme)
})
</script>

<template>
  <UApp :toaster="toasterAttrs" :ui="{ toast: { slots: { icon: 'animate-head-shake animate-count-infinite' } } }">
    <div>
      <ExampleButton :class="uiColor" />
      <ExampleLink :class="uiColor" />
      <ExampleInput :class="uiColor" />
      <ExampleAccordion :class="uiColor" />
      <ExampleTabs :class="uiColor" />
      <ExampleCard :class="uiColor" />
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
      <ExampleNative :class="uiColor" />

      <div class="text-center sticky bottom-0 p-4">
        <UDrawer title="Change Theme or Color" direction="right" :handle="false" :overlay="false" :ui="{ content: 'ring-ui-cb/10 ring-8 ring-offset-ui-cb ring-offset-2' }">
          <UButton label="Theme" variant="solid" size="xl" icon="i-carbon-color-palette" round />
          <template #body>
            <ThemeSelector v-model="uiTheme" v-model:color="uiColor" class="max-w-screen-sm" />
          </template>
        </UDrawer>
      </div>
    </div>
  </UApp>
</template>
