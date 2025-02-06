<script setup lang="ts">
import { injectModalState, useModal } from '../composables/useModal'

const modalState = injectModalState()
const { isOpen } = useModal()
</script>

<template>
  <component :is="modalState.component" v-if="modalState" v-bind="modalState.props" v-model:open="isOpen" />
</template>
