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
    <div class="absolute inset-0 overflow-hidden h-full flex flex-col text-default bg-default">
      <div class="p-2 px-5 flex justify-between items-end gap-1 bg-default border-b border-default">
        <h1 class="text-2xl font-semibold">
          @byyuurin/<span class="text-primary">ui</span>
        </h1>

        <UFieldGroup>
          <USelect v-model="lang" variant="none" :items="Object.entries(locales).map(([value, { name }]) => ({ label: name, value }))" />
          <ThemePicker />
        </UFieldGroup>
      </div>
      <div class="flex-1 overflow-auto">
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
    </div>
  </UApp>
</template>
