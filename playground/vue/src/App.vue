<script lang="ts" setup>
const theme = ref('light')

onMounted(() => {
  watchEffect(() => {
    const html = document.querySelector('html')!
    html.dataset.theme = theme.value
  })
})
</script>

<template>
  <div class="h-screen overflow-auto">
    <DemoBlock title="Native">
      <div class="flex gap-4">
        <input class="size-5" type="checkbox" checked />
        <input class="size-5" type="radio" checked />
        <input type="range" />
      </div>
    </DemoBlock>
    <DemoTheme v-model="theme" :options="['light', 'dark', 'coffee']" />
    <DemoButton />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  min-height: 100%;
  overflow: hidden;
}

[data-theme] {
  --uno: "bg-ui-c1 transition";
}

[data-theme="light"] {
  color-scheme: light;
  --uno: "ui-c1-#ffffff ui-c2-#F2F2F2 ui-c3-#E5E6E6 ui-cb-#1f2937";
}
[data-theme="dark"] {
  color-scheme: dark;
  --uno: "ui-c1-#1d232a ui-c2-#191e24 ui-c3-#15191e ui-cb-#A6ADBB";
}
[data-theme="coffee"] {
  color-scheme: dark;
  --uno: "ui-c1-#20161f ui-c2-#1c131b ui-c3-#181017 ui-cb-#c59f60";
}
</style>
