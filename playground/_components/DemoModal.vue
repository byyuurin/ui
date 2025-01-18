<template>
  <DemoBlock title="Modal">
    <div class="flex gap-4">
      <UModal
        title="Title"
        description="Description"
        size="sm"
        :close="false"
      >
        <UButton>
          Modal 1
        </UButton>
      </UModal>
      <UModal :close="{ size: 'xl' }">
        <UButton>
          Modal 2
        </UButton>

        <template #close>
          <UButton class="ui-orange" variant="link">
            #close
          </UButton>
        </template>

        <template #title>
          #title
        </template>

        <template #description>
          #description
        </template>

        <template #body>
          #body
        </template>
        <template #footer>
          #footer
        </template>
      </UModal>
    </div>
  </DemoBlock>
</template>
