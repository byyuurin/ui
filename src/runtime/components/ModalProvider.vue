<script setup lang="ts">
import { injectModalState } from '../app/injections'
import { useModal } from '../composables/useModal'

const modalState = injectModalState()
const { isOpen } = useModal()
</script>

<template>
  <component :is="modalState.component" v-if="modalState" v-bind="modalState.props" v-model:open="isOpen" />
</template>
