<script lang="ts">
import type { VariantProps } from '@byyuurin/ui-kit'
import type { DropdownMenuContentEmits as RekaDropdownMenuContentEmits, DropdownMenuContentProps as RekaDropdownMenuContentProps } from 'reka-ui'
import type theme from '#build/ui/dropdown-menu'
import type { ComponentBaseProps, ComponentStyler, ComponentUIProps, DropdownMenuItem, DropdownMenuSlots, IconProps, KbdProps, RuntimeAppConfig } from '../types'
import type { ArrayOrNested, DynamicSlots, ExtractItem, GetItemKeys, MergeTypes, NestedItem, StaticSlot } from '../types/utils'

type ThemeVariants = VariantProps<typeof theme>

export interface DropdownMenuContentProps<T extends ArrayOrNested<DropdownMenuItem>> extends ComponentBaseProps, Omit<RekaDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  size?: ThemeVariants['size']
  items?: T
  portal?: boolean | string | HTMLElement
  sub?: boolean
  labelKey: GetItemKeys<T>
  descriptionKey: GetItemKeys<T>
  checkedIcon?: IconProps['name']
  loadingIcon?: IconProps['name']
  externalIcon?: boolean | IconProps['name']
  ui: ComponentStyler<typeof theme>
  uiOverride?: ComponentUIProps<typeof theme>
}

export interface DropdownMenuContentEmits extends RekaDropdownMenuContentEmits {}

export type DropdownMenuContentSlots<
  A extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>,
> = Pick<DropdownMenuSlots<A>, 'item' | 'item-leading' | 'item-label' | 'item-description' | 'item-trailing' | 'content-top' | 'content-bottom'> & {
  default: StaticSlot
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active: boolean, index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active: boolean, index: number, ui: ComponentStyler<typeof theme> }>

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<DropdownMenuItem>">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { DropdownMenu } from 'reka-ui/namespaced'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { get, isArrayOfArray, omit } from '../utils'
import { pickLinkProps } from '../utils/link'
import Avatar from './Avatar.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import Icon from './Icon.vue'
import Kbd from './Kbd.vue'
import Link from './Link.vue'
import LinkBase from './LinkBase.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<DropdownMenuContentProps<T>>()
const emit = defineEmits<DropdownMenuContentEmits>()
const slots = defineSlots<DropdownMenuContentSlots<T>>()

const portalProps = usePortal(toRef(() => props.portal))
const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'descriptionKey', 'checkedIcon', 'loadingIcon', 'externalIcon', 'class', 'ui', 'uiOverride'), emit)
const getProxySlots = () => omit(slots, ['default'])

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: DropdownMenuItem, active?: boolean, index: number }>()

const { dir } = useLocale()
const appConfig = useAppConfig() as RuntimeAppConfig
const childrenIcon = computed(() => dir.value === 'rtl' ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight)

const groups = computed<DropdownMenuItem[][]>(
  () => props.items?.length
    ? isArrayOfArray(props.items) ? props.items : [props.items]
    : [],
)
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :index="index" :ui="ui">
      <slot :name="(`${item.slot || 'item'}-leading` as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index" :ui="ui">
        <Icon
          v-if="item.loading"
          :name="loadingIcon || appConfig.ui.icons.loading"
          :class="props.ui.itemLeadingIcon({ class: [props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item.color, loading: true })"
          data-part="itemLeadingIcon"
        />
        <Icon
          v-else-if="item.icon"
          :name="item.icon"
          :class="props.ui.itemLeadingIcon({ class: [props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item.color, active })"
          data-part="itemLeadingIcon"
        />
        <Avatar
          v-else-if="item.avatar"
          v-bind="item.avatar"
          :size="item.avatar.size || props.size"
          :class="props.ui.itemLeadingAvatar({ class: [props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })"
          data-part="itemLeadingAvatar"
        />
      </slot>

      <span
        v-if="(get(item, props.labelKey as string) || !!slots[`${item.slot || 'item'}-label` as keyof DropdownMenuSlots<T>]) || (get(item, props.descriptionKey as string) || !!slots[`${item.slot || 'item'}-description` as keyof DropdownMenuSlots<T>])"
        :class="props.ui.itemWrapper({ class: [props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })"
        data-part="itemWrapper"
      >
        <span
          v-if="get(item, props.labelKey as string) || !!slots[`${item.slot || 'item'}-label` as keyof DropdownMenuContentSlots<T>]"
          :class="props.ui.itemLabel({ class: [props.uiOverride?.itemLabel, item.ui?.itemLabel], active })"
          data-part="itemLabel"
        >
          <slot :name="((`${item.slot || 'item'}-label`) as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index">
            {{ get(item, props.labelKey as string) }}
          </slot>

          <Icon
            v-if="item.target === '_blank' && props.externalIcon !== false"
            :name="typeof props.externalIcon === 'string' ? props.externalIcon : appConfig.ui.icons.external"
            :class="props.ui.itemLabelExternalIcon({ class: [props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item.color, active })"
            data-part="itemLabelExternalIcon"
          />
        </span>

        <span v-if="get(item, props.descriptionKey as string)" :class="props.ui.itemDescription({ class: [props.uiOverride?.itemDescription, item.ui?.itemDescription] })" data-part="itemDescription">
          <slot :name="((`${item.slot || 'item'}-description`) as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index">
            {{ get(item, props.descriptionKey as string) }}
          </slot>
        </span>
      </span>

      <span :class="props.ui.itemTrailing({ class: [props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })" data-part="itemTrailing">
        <slot :name="(`${item.slot || 'item'}-trailing` as keyof DropdownMenuContentSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index" :ui="ui">
          <Icon v-if="item.children?.length" :name="childrenIcon" :class="props.ui.itemTrailingIcon({ class: [props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item.color, active })" data-part="itemTrailingIcon" />
          <span v-else-if="item.kbds?.length" :class="props.ui.itemTrailingKbds({ class: [props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })" data-part="itemTrailingKbds">
            <Kbd
              v-for="(kbd, kbdIndex) in item.kbds"
              :key="kbdIndex"
              :size="((item.ui?.itemTrailingKbdsSize || props.uiOverride?.itemTrailingKbdsSize || ui.itemTrailingKbdsSize()) as KbdProps['size'])"
              v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
            />
          </span>
        </slot>

        <DropdownMenu.ItemIndicator as-child>
          <Icon :name="props.checkedIcon || appConfig.ui.icons.check" :class="props.ui.itemTrailingIcon({ class: [props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item.color })" data-part="itemTrailingIcon" />
        </DropdownMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <DropdownMenu.Portal v-bind="portalProps">
    <component :is="(props.sub ? DropdownMenu.SubContent : DropdownMenu.Content)" v-bind="{ ...contentProps, ...$attrs }" :class="props.class">
      <slot name="content-top" :sub="props.sub ?? false"></slot>

      <div role="presentation" :class="props.ui.viewport({ class: props.uiOverride?.viewport })" data-part="viewport">
        <DropdownMenu.Group v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="props.ui.group({ class: props.uiOverride?.group })" data-part="group">
          <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
            <DropdownMenu.Label v-if="item.type === 'label'" :class="props.ui.label({ class: [props.uiOverride?.label, item.ui?.label, item.class] })" data-part="label">
              <ReuseItemTemplate :item="item" :index="index" />
            </DropdownMenu.Label>
            <DropdownMenu.Separator v-else-if="item.type === 'separator'" :class="props.ui.separator({ class: [props.uiOverride?.separator, item.ui?.separator, item.class] })" data-part="separator" />
            <DropdownMenu.Sub v-else-if="item?.children?.length" :open="item.open" :default-open="item.defaultOpen">
              <DropdownMenu.SubTrigger
                as="button"
                type="button"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey as string)"
                :class="props.ui.item({ class: [props.uiOverride?.item, item.ui?.item, item.class], color: item.color })"
                data-part="item"
              >
                <ReuseItemTemplate :item="item" :index="index" />
              </DropdownMenu.SubTrigger>

              <DropdownMenuContent
                sub
                :class="props.class"
                :ui="props.ui"
                :ui-override="props.uiOverride"
                :portal="props.portal"
                :items="(item.children as T)"
                side="right"
                align="start"
                :align-offset="-4"
                :side-offset="3"
                :label-key="props.labelKey"
                :description-key="props.descriptionKey"
                :checked-icon="props.checkedIcon"
                :loading-icon="props.loadingIcon"
                :external-icon="props.externalIcon"
                v-bind="item.content"
              >
                <template v-for="(_, name) in getProxySlots()" #[name]="slotProps">
                  <slot :name="(name as keyof DropdownMenuContentSlots<T>)" v-bind="slotProps"></slot>
                </template>
              </DropdownMenuContent>
            </DropdownMenu.Sub>
            <DropdownMenu.CheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              :class="props.ui.item({ class: [props.uiOverride?.item, item.ui?.item, item.class], color: item.color })"
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
                <LinkBase v-bind="slotProps" :class="props.ui.item({ class: [props.uiOverride?.item, item.ui?.item, item.class], color: item.color, active })" data-part="item">
                  <ReuseItemTemplate :item="item" :active="active" :index="index" />
                </LinkBase>
              </Link>
            </DropdownMenu.Item>
          </template>
        </DropdownMenu.Group>
      </div>

      <slot></slot>

      <slot name="content-bottom" :sub="props.sub ?? false"></slot>
    </component>
  </DropdownMenu.Portal>
</template>
