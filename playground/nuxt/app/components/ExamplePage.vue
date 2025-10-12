<script lang="ts" setup>
import type { AppProps } from '@byyuurin/ui'
import * as locales from '@byyuurin/ui/locale'

const lang = shallowRef<keyof typeof locales>('en')
const locale = computed(() => lang.value ? (locales as any)[lang.value] : undefined)

const toasterAttrs = ref<Pick<Required<AppProps['toaster'] & object>, 'duration' | 'position' | 'expand'>>({
  duration: 10000,
  position: 'bottom-right',
  expand: true,
})
</script>

<template>
  <UApp :locale="locale" :toaster="toasterAttrs">
    <div class="relative">
      <div class="sticky top-0 z-1 p-2 px-5 flex justify-between items-center gap-1 bg-default shadow">
        <h1 class="text-2xl text-default font-semibold">
          @byyuurin/<span class="text-primary">ui</span>
        </h1>
        <ThemePicker />
      </div>

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
    </div>
  </UApp>
</template>
