<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DropdownMenuContentEmits as RekaDropdownMenuContentEmits, DropdownMenuContentProps as RekaDropdownMenuContentProps } from 'reka-ui'
import type { dropdownMenu } from '../theme'
import type { ArrayOrNested, ComponentAttrs, DropdownMenuItem, DropdownMenuSlots, NestedItem } from '../types'

type ExtractItem<T extends ArrayOrNested<any>> = Extract<NestedItem<T>, { slot: string }>

export type DropdownMenuContentSlots<T extends ArrayOrNested<DropdownMenuItem>> = Omit<DropdownMenuSlots<T>, 'default'> & {
  default?: any
}

export interface DropdownMenuContentEmits extends RekaDropdownMenuContentEmits {}

type DropdownMenuVariants = VariantProps<typeof dropdownMenu>

export interface DropdownMenuContentProps<T extends ArrayOrNested<DropdownMenuItem>> extends ComponentAttrs<typeof dropdownMenu>, Omit<RekaDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  size?: DropdownMenuVariants['size']
  items?: T
  portal?: boolean
  sub?: boolean
  labelKey: keyof NestedItem<T>
  checkedIcon?: string
  loadingIcon?: string
  externalIcon?: boolean | string
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<DropdownMenuItem>">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { DropdownMenu } from 'reka-ui/namespaced'
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { get, isArrayOfArray, omit } from '../utils'
import { pickLinkProps } from '../utils/link'
import Avatar from './Avatar.vue'
// eslint-disable-next-line import/no-self-import
import DropdownMenuContent from './DropdownMenuContent.vue'
import Kbd from './Kbd.vue'
import Link from './Link.vue'
import LinkBase from './LinkBase.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<DropdownMenuContentProps<T>>()
const emit = defineEmits<DropdownMenuContentEmits>()
const slots = defineSlots<DropdownMenuContentSlots<T>>()

const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'checkedIcon', 'loadingIcon', 'externalIcon', 'class', 'ui'), emit)
// @ts-expect-error pass check
const proxySlots = omit(slots, ['default']) as Record<string, DropdownMenuContentSlots<T>[string]>

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: DropdownMenuItem, active?: boolean, index: number }>()

const groups = computed(
  () => props.items?.length
    ? isArrayOfArray(props.items) ? props.items : [props.items]
    : [],
)

const { theme, generateStyle } = useTheme()
const style = computed(() => generateStyle('dropdownMenu', props))
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :index="index">
      <slot :name="(`${item.slot || 'item'}-leading` as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index">
        <span
          v-if="item.loading"
          :class="style.itemLeadingIcon({ class: [loadingIcon || theme.app.icons.loading, props.ui?.itemLeadingIcon], loading: true })"
          data-part="item-leading-icon"
        ></span>
        <span
          v-else-if="item.icon"
          :class="style.itemLeadingIcon({ class: [item.icon, props.ui?.itemLeadingIcon], active })"
          data-part="item-leading-icon"
        ></span>
        <Avatar
          v-else-if="item.avatar"
          v-bind="item.avatar"
          :size="item.avatar.size || props.size"
          :class="style.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar, active })"
          data-part="item-leading-avatar"
        />
      </slot>

      <span
        v-if="get(item, props.labelKey as string) || !!slots[(`${item.slot || 'item'}-label` as keyof DropdownMenuContentSlots<T>)]"
        :class="style.itemLabel({ class: props.ui?.itemLabel, active })"
        data-part="item-label"
      >
        <slot :name="(`${item.slot || 'item'}-label` as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index">
          {{ get(item, props.labelKey as string) }}
        </slot>

        <span
          v-if="item.target === '_blank' && externalIcon !== false"
          :class="style.itemLabelExternalIcon({ class: [typeof externalIcon === 'string' ? externalIcon : theme.app.icons.external, props.ui?.itemLabelExternalIcon], active })"
          data-part="item-label-external-icon"
        ></span>
      </span>

      <span :class="style.itemTrailing({ class: props.ui?.itemTrailing })" data-part="item-trailing">
        <slot :name="(`${item.slot || 'item'}-trailing` as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index">
          <span v-if="item.children?.length" :class="style.itemTrailingIcon({ class: [theme.app.icons.chevronRight, props.ui?.itemTrailingIcon], active })" data-part="item-trailing-icon"></span>
          <span v-else-if="item.kbds?.length" :class="style.itemTrailingKbds({ class: props.ui?.itemTrailingKbds })" data-part="item-trailing-kbds">
            <Kbd
              v-for="(kbd, kbdIndex) in item.kbds"
              :key="kbdIndex"
              v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
              :size="props.size"
            />
          </span>
        </slot>

        <DropdownMenu.ItemIndicator as-child>
          <span :class="style.itemTrailingIcon({ class: [checkedIcon || theme.app.icons.check, props.ui?.itemTrailingIcon] })" data-part="item-trailing-icon"></span>
        </DropdownMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <DropdownMenu.Portal :disabled="!portal">
    <component :is="sub ? DropdownMenu.SubContent : DropdownMenu.Content" :class="props.class" :data-part="$attrs['data-part']" v-bind="contentProps">
      <DropdownMenu.Group v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="style.group({ class: props.ui?.group })" data-part="group">
        <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
          <DropdownMenu.Label v-if="item.type === 'label'" :class="style.label({ class: props.ui?.label })" data-part="label">
            <ReuseItemTemplate :item="item" :index="index" />
          </DropdownMenu.Label>
          <DropdownMenu.Separator v-else-if="item.type === 'separator'" :class="style.separator({ class: props.ui?.separator })" data-part="separator" />
          <DropdownMenu.Sub v-else-if="item?.children?.length" :open="item.open" :default-open="item.defaultOpen">
            <DropdownMenu.SubTrigger
              as="button"
              type="button"
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              :class="style.item({ class: props.ui?.item })"
              data-part="item"
            >
              <ReuseItemTemplate :item="item" :index="index" />
            </DropdownMenu.SubTrigger>

            <DropdownMenuContent
              sub
              :class="props.class"
              :ui="props.ui"
              :portal="props.portal"
              :items="item.children"
              side="right"
              align="start"
              :align-offset="-4"
              :side-offset="3"
              :label-key="labelKey"
              :checked-icon="checkedIcon"
              :loading-icon="loadingIcon"
              :external-icon="externalIcon"
              v-bind="item.content"
            >
              <template v-for="(_, name) in proxySlots" #[name]="slotProps">
                <slot :name="(name as keyof DropdownMenuContentSlots<T>)" v-bind="slotProps"></slot>
              </template>
            </DropdownMenuContent>
          </DropdownMenu.Sub>
          <DropdownMenu.CheckboxItem
            v-else-if="item.type === 'checkbox'"
            :model-value="item.checked"
            :disabled="item.disabled"
            :text-value="get(item, props.labelKey as string)"
            :class="style.item({ class: [props.ui?.item, item.class] })"
            data-part="item"
            @update:model-value="item.onUpdateChecked"
            @select="item.onSelect"
          >
            <ReuseItemTemplate :item="item" :index="index" />
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.Item
            v-else
            as-child
            :disabled="item.disabled"
            :text-value="get(item, props.labelKey as string)"
            @select="item.onSelect"
          >
            <Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item as Omit<DropdownMenuItem, 'type'>)" custom>
              <LinkBase v-bind="slotProps" :class="style.item({ class: [props.ui?.item, item.class], active })" data-part="item">
                <ReuseItemTemplate :item="item" :active="active" :index="index" />
              </LinkBase>
            </Link>
          </DropdownMenu.Item>
        </template>
      </DropdownMenu.Group>

      <slot></slot>
    </component>
  </DropdownMenu.Portal>
</template>
