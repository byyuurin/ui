<script lang="ts" setup>
import { Button, Modal } from '@byyuurin/ui'
</script>

<template>
  <DemoBlock title="Modal">
    <div class="flex gap-4">
      <Modal
        title="Title"
        description="Description"
        size="sm"
        :close="false"
      >
        <Button>
          Modal 1
        </Button>
      </Modal>
      <Modal :close="{ size: 'xl' }">
        <Button>
          Modal 2
        </Button>

        <template #close>
          <Button class="ui-orange" variant="link">
            #close
          </Button>
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
      </Modal>
    </div>
  </DemoBlock>
</template>
