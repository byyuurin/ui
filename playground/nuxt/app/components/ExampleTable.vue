<script setup lang="ts">
import type { TableColumn, TableProps } from '@byyuurin/ui'
import Badge from '@byyuurin/ui/components/Badge.vue'
import Button from '@byyuurin/ui/components/Button.vue'
import type { ControlItems } from './ExampleView.vue'

const isEmpty = shallowRef(false)

const data = ref([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594,
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276,
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315,
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529,
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639,
  },
])

const columns: TableColumn<typeof data.value[number]>[] = [
  {
    id: 'expand',
    header: '',
    cell: ({ row }) => h(Button, { size: 'xs', variant: 'ghost', icon: row.getIsExpanded() ? 'i-mdi-minus' : 'i-mdi-plus', onClick: () => row.toggleExpanded() }),
  },
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'status', header: 'Status', cell: ({ row }) => {
    const colors: Record<string, string> = {
      paid: 'success',
      failed: 'error',
      refunded: 'neutral',
    }
    return h(Badge, { label: row.original.status, variant: 'subtle', color: colors[row.original.status] })
  } },
]

const controls: ControlItems<TableProps<typeof data.value[number]>> = [
  { prop: 'empty', value: '' },
  { prop: 'sticky', value: false },
  { prop: 'loading', value: false },
]
</script>

<template>
  <ExampleView
    v-slot="attrs"
    title="Table"
    description="A responsive table element to display data in rows and columns."
    :controls="controls"
  >
    <div class="flex flex-col gap-4">
      <div>
        <USwitch v-model="isEmpty" label="No Data" />
      </div>
      <UCard>
        <UTable class="max-h-100" v-bind="attrs" :columns="columns" :column-pinning="{ right: ['status'] }" :data="isEmpty ? [] : data">
          <template #expanded="{ row }">
            <pre>{{ row.original }}</pre>
          </template>
          <template #loading>
            <Placeholder class="h-40" label="#loading" />
          </template>
        </UTable>
      </UCard>
    </div>
  </ExampleView>
</template>
