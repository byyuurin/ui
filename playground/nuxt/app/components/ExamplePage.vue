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
      <ExampleAccordion />
      <ExampleAlert />
      <ExampleAvatar />
      <ExampleAvatarGroup />
      <ExampleBadge />
      <ExampleBreadcrumb />
      <ExampleButton />
      <ExampleCalendar />
      <ExampleCard />
      <ExampleCarousel />
      <ExampleCheckbox />
      <ExampleChip />
      <ExampleCollapsible />
      <ExampleDrawer />
      <ExampleDropdownMenu />
      <ExampleFieldGroup />
      <ExampleForm />
      <ExampleFormField />
      <ExampleInput />
      <ExampleInputNumber />
      <ExampleKbd />
      <ExampleLink />
      <ExampleModal />
      <ExampleNavigationMenu />
      <ExamplePagination />
      <ExamplePinInput />
      <ExamplePopover />
      <ExampleProgress />
      <ExampleRadioGroup />
      <ExampleScrollArea />
      <ExampleSelect />
      <ExampleSeparator />
      <ExampleSkeleton />
      <ExampleSlider />
      <ExampleSwitch />
      <ExampleTable />
      <ExampleTabs />
      <ExampleTextarea />
      <ExampleToast
        v-model:duration="toasterAttrs.duration"
        v-model:position="toasterAttrs.position"
        v-model:expand="toasterAttrs.expand"
      />
      <ExampleTooltip />
      <ExampleNative />

      <div class="py-6">
        <UDrawer
          v-model:open="showDrawer"
          title="Change Theme or Color"
          direction="right"
          :overlay="false"
          :ui="{
            title: 'text-2xl',
            content: 'divide-y-0 ring-default ring-8 ring-offset-inverted/50 ring-offset-2',
            body: 'sm:py-0',
          }"
          :close="{ color: 'neutral' }"
          inset
        >
          <UButton class="fixed bottom-4 left-1/2 -translate-x-1/2" label="Theme" variant="solid" size="xl" icon="i-mdi-palette-outline" round />
          <template #body>
            <ThemeSelector v-model="uiTheme" v-model:config="uiConfig" v-model:color="uiColor" class="w-screen max-w-full sm:max-w-screen-sm" />
          </template>
          <template #footer>
            <div class="w-full flex flex-col gap-4">
              <USelect v-model="lang" :options="Object.entries(locales).map(([value, { name }]) => ({ label: name, value }))" />
              <UButton class="justify-center" label="Close" variant="solid" icon="i-mdi-close-thick" round @click="showDrawer = false" />
            </div>
          </template>
        </UDrawer>
      </div>
    </div>
  </UApp>
</template>
