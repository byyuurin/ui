<script lang="ts" setup>
import type { AppProps } from '@byyuurin/ui'
import * as locales from '@byyuurin/ui/locale'
import type { ThemeConfig } from './ThemeSelector.vue'
import { setTheme, themeOptions } from './ThemeSelector.vue'

const lang = shallowRef<keyof typeof locales>('en')
const locale = computed(() => lang.value ? (locales as any)[lang.value] : undefined)

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
  <UApp :locale="locale" :toaster="toasterAttrs">
    <div>
      <ExampleAccordion :class="uiColor" />
      <ExampleAlert :class="uiColor" />
      <ExampleAvatar :class="uiColor" />
      <ExampleAvatarGroup :class="uiColor" />
      <ExampleBadge :class="uiColor" />
      <ExampleBreadcrumb :class="uiColor" />
      <ExampleButton :class="uiColor" />
      <ExampleButtonGroup :class="uiColor" />
      <ExampleCalendar :class="uiColor" />
      <ExampleCard :class="uiColor" />
      <ExampleCarousel :class="uiColor" />
      <ExampleCheckbox :class="uiColor" />
      <ExampleChip :class="uiColor" />
      <ExampleCollapsible :class="uiColor" />
      <ExampleDrawer :class="uiColor" />
      <ExampleInput :class="uiColor" />
      <ExampleInputNumber :class="uiColor" />
      <ExampleKbd :class="uiColor" />
      <ExampleLink :class="uiColor" />
      <ExampleModal :class="uiColor" />
      <ExamplePagination :class="uiColor" />
      <ExamplePinInput :class="uiColor" />
      <ExamplePopover :class="uiColor" />
      <ExampleProgress :class="uiColor" />
      <ExampleRadioGroup :class="uiColor" />
      <ExampleScrollArea :class="uiColor" />
      <ExampleSelect :class="uiColor" />
      <ExampleSeparator :class="uiColor" />
      <ExampleSkeleton :class="uiColor" />
      <ExampleSlider :class="uiColor" />
      <ExampleSwitch :class="uiColor" />
      <ExampleTable :class="uiColor" />
      <ExampleTabs :class="uiColor" />
      <ExampleTextarea :class="uiColor" />
      <ExampleToast
        v-model:duration="toasterAttrs.duration"
        v-model:position="toasterAttrs.position"
        v-model:expand="toasterAttrs.expand"
        :class="uiColor"
        :color="uiColor"
      />
      <ExampleTooltip :class="uiColor" />
      <ExampleNative :class="uiColor" />

      <div class="py-6">
        <UDrawer
          v-model:open="showDrawer"
          title="Change Theme or Color"
          direction="right"
          :overlay="false"
          :ui="{
            header: 'sticky z-1 top-0 bg-ui-base',
            title: 'text-2xl',
            content: 'z-1 overflow-x-hidden ring-ui-base/10 ring-8 ring-offset-ui-base ring-offset-2',
            footer: 'sticky bottom-0 bg-ui-base',
          }"
          inset
        >
          <UButton class="fixed bottom-4 left-1/2 -translate-x-1/2" label="Theme" variant="solid" size="xl" icon="i-mdi-palette-outline" round />
          <template #body>
            <ThemeSelector v-model="uiTheme" v-model:config="uiConfig" v-model:color="uiColor" class="w-screen max-w-full sm:max-w-screen-sm" />
          </template>
          <template #footer>
            <div class="flex flex-col gap-4 pt-4">
              <USelect v-model="lang" :options="Object.entries(locales).map(([value, { code, name }]) => ({ label: name, value }))" />
              <UButton class="justify-center" label="Close" variant="solid" icon="i-mdi-close-thick" round @click="showDrawer = false" />
            </div>
          </template>
        </UDrawer>
      </div>
    </div>
  </UApp>
</template>
