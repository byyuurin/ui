<script lang="ts" setup>
import type { AppProps } from '@byyuurin/ui'
import type { ThemeConfig } from './ThemeSelector.vue'
import { setTheme, themeOptions } from './ThemeSelector.vue'

const showDrawer = ref(false)
const uiColor = ref('')
const uiTheme = ref<typeof themeOptions[number]['name']>('wireframe')
const uiConfig = ref<ThemeConfig | null>(null)

const toasterAttrs = ref<Pick<Required<AppProps['toaster'] & object>, 'duration' | 'position' | 'expand'>>({
  duration: 10000,
  position: 'bottom-right',
  expand: true,
})

onMounted(() => {
  const theme = themeOptions.find((i) => i.name === uiTheme.value)

  if (theme) {
    setTheme(theme)
    uiConfig.value = theme
  }
})
</script>

<template>
  <UApp :toaster="toasterAttrs">
    <div>
      <ExampleAccordion :class="uiColor" />
      <ExampleAlert :class="uiColor" />
      <ExampleCarousel :class="uiColor" />
      <ExampleTabs :class="uiColor" />
      <ExampleScrollArea :class="uiColor" />
      <ExamplePagination :class="uiColor" />
      <ExampleInput :class="uiColor" />
      <ExamplePinInput :class="uiColor" />
      <ExampleTextarea :class="uiColor" />
      <ExampleSelect :class="uiColor" />
      <ExampleChip :class="uiColor" />
      <ExampleButton :class="uiColor" />
      <ExampleButtonGroup :class="uiColor" />
      <ExampleSlider :class="uiColor" />
      <ExampleSwitch :class="uiColor" />
      <ExampleCheckbox :class="uiColor" />
      <ExampleRadioGroup :class="uiColor" />
      <ExampleCard :class="uiColor" />
      <ExampleDrawer :class="uiColor" />
      <ExampleModal :class="uiColor" />
      <ExampleToast
        v-model:duration="toasterAttrs.duration"
        v-model:position="toasterAttrs.position"
        v-model:expand="toasterAttrs.expand"
        :class="uiColor"
        :color="uiColor"
      />
      <ExampleBadge :class="uiColor" />
      <ExamplePopover :class="uiColor" />
      <ExampleTooltip :class="uiColor" />
      <ExampleLink :class="uiColor" />
      <ExampleNative :class="uiColor" />

      <div class="py-6">
        <UDrawer
          v-model:open="showDrawer"
          title="Change Theme or Color"
          direction="right"
          :handle="false"
          :overlay="false"
          :ui="{
            header: 'sticky z-1 top-0 bg-ui-cx',
            title: 'text-2xl',
            content: 'overflow-x-hidden ring-ui-cb/10 ring-8 ring-offset-ui-cb ring-offset-2',
            footer: 'sticky bottom-0 bg-ui-cx',
          }"
        >
          <UButton class="fixed bottom-4 left-1/2 -translate-x-1/2" label="Theme" variant="solid" size="xl" icon="i-mdi-palette-outline" round />
          <template #body>
            <ThemeSelector v-model="uiTheme" v-model:config="uiConfig" v-model:color="uiColor" class="w-screen max-w-full sm:max-w-screen-sm" />
          </template>
          <template #footer>
            <div class="pt-4">
              <UButton class="w-full justify-center" label="Close" variant="solid" icon="i-mdi-close-thick" round @click="showDrawer = false" />
            </div>
          </template>
        </UDrawer>
      </div>
    </div>
  </UApp>
</template>
