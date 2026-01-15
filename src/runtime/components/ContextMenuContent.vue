<script lang="ts">
import type { ContextMenuContentEmits as RekaContextMenuContentEmits, ContextMenuContentProps as RekaContextMenuContentProps } from 'reka-ui'
import type theme from '#build/ui/context-menu'
import type { AvatarProps, ComponentBaseProps, ComponentStyler, ComponentUIProps, ContextMenuItem, ContextMenuSlots, IconProps, KbdProps, RuntimeAppConfig } from '../types'
import type { ArrayOrNested, ExtractItem, GetItemKeys } from '../types/utils'

interface ContextMenuContentProps<T extends ArrayOrNested<ContextMenuItem>> extends ComponentBaseProps, Omit<RekaContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
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

interface ContextMenuContentEmits extends RekaContextMenuContentEmits {}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<ContextMenuItem>">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core'
import { useForwardPropsEmits } from 'reka-ui'
import { ContextMenu } from 'reka-ui/namespaced'
import { computed, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { get, isArrayOfArray, omit } from '../utils'
import { pickLinkProps } from '../utils/link'
import Avatar from './Avatar.vue'
import ContextMenuContent from './ContextMenuContent.vue'
import Icon from './Icon.vue'
import Kbd from './Kbd.vue'
import Link from './Link.vue'
import LinkBase from './LinkBase.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<ContextMenuContentProps<T>>()
const emit = defineEmits<ContextMenuContentEmits>()
const slots = defineSlots<ContextMenuSlots<T>>()

const { dir } = useLocale()
const appConfig = useAppConfig() as RuntimeAppConfig

const portalProps = usePortal(toRef(() => props.portal))
const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'descriptionKey', 'checkedIcon', 'loadingIcon', 'externalIcon', 'class', 'ui', 'uiOverride'), emit)
const getProxySlots = () => omit(slots, ['default'])

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: ContextMenuItem, active?: boolean, index: number }>()

const childrenIcon = computed(() => dir.value === 'rtl' ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight)
const groups = computed<ContextMenuItem[][]>(
  () => props.items?.length
    ? isArrayOfArray(props.items) ? props.items : [props.items]
    : [],
)
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof ContextMenuSlots<T>)" :item="item" :index="index" :ui="ui">
      <slot :name="(`${item.slot || 'item'}-leading` as keyof ContextMenuSlots<T>)" :item="item" :active="active" :index="index" :ui="ui">
        <Icon
          v-if="item.loading"
          :name="props.loadingIcon || appConfig.ui.icons.loading"
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
          :size="((item.ui?.itemLeadingAvatarSize || props.uiOverride?.itemLeadingAvatarSize || props.ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
          :class="props.ui.itemLeadingAvatar({ class: [props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })"
          data-part="itemLeadingAvatar"
        />
      </slot>

      <span
        v-if="(get(item, props.labelKey as string) || !!slots[`${item.slot || 'item'}-label` as keyof ContextMenuSlots<T>]) || (get(item, props.descriptionKey as string) || !!slots[`${item.slot || 'item'}-description` as keyof ContextMenuSlots<T>])"
        :class="props.ui.itemWrapper({ class: [props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })"
        data-part="itemWrapper"
      >
        <span
          v-if="get(item, props.labelKey as string) || !!slots[`${item.slot || 'item'}-label` as keyof ContextMenuSlots<T>]"
          :class="props.ui.itemLabel({ class: [props.uiOverride?.itemLabel, item.ui?.itemLabel], active })"
          data-part="itemLabel"
        >
          <slot :name="((`${item.slot || 'item'}-label`) as keyof ContextMenuSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index">
            {{ get(item, props.labelKey as string) }}
          </slot>

          <Icon
            v-if="item.target === '_blank' && props.externalIcon !== false"
            :name="typeof props.externalIcon === 'string' ? props.externalIcon : appConfig.ui.icons.external"
            :class="props.ui.itemLabelExternalIcon({ class: [props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item.color, active })"
            data-part="itemLabelExternalIcon"
          />
        </span>

        <span v-if="get(item, props.descriptionKey as string) || !!slots[`${item.slot || 'item'}-description` as keyof ContextMenuSlots<T>]" :class="props.ui.itemDescription({ class: [props.uiOverride?.itemDescription, item.ui?.itemDescription] })" data-part="itemDescription">
          <slot :name="((`${item.slot || 'item'}-description`) as keyof ContextMenuSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index">
            {{ get(item, props.descriptionKey as string) }}
          </slot>
        </span>
      </span>

      <span :class="props.ui.itemTrailing({ class: [props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })" data-part="itemTrailing">
        <slot :name="(`${item.slot || 'item'}-trailing` as keyof ContextMenuSlots<T>)" :item="(item as ExtractItem<T>)" :active="active" :index="index" :ui="ui">
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

        <ContextMenu.ItemIndicator as-child>
          <Icon :name="props.checkedIcon || appConfig.ui.icons.check" :class="props.ui.itemTrailingIcon({ class: [props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item.color })" data-part="itemTrailingIcon" />
        </ContextMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <ContextMenu.Portal v-bind="portalProps">
    <component :is="(props.sub ? ContextMenu.SubContent : ContextMenu.Content)" :class="props.ui.content({ class: [props.uiOverride?.content, props.class] })" v-bind="contentProps">
      <slot name="content-top" :sub="props.sub ?? false"></slot>

      <div role="presentation" :class="props.ui.viewport({ class: props.uiOverride?.viewport })" data-part="viewport">
        <ContextMenu.Group v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="props.ui.group({ class: props.uiOverride?.group })" data-part="group">
          <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
            <ContextMenu.Label v-if="item.type === 'label'" :class="props.ui.label({ class: [props.uiOverride?.label, item.ui?.label, item.class] })" data-part="label">
              <ReuseItemTemplate :item="item" :index="index" />
            </ContextMenu.Label>
            <ContextMenu.Separator v-else-if="item.type === 'separator'" :class="props.ui.separator({ class: [props.uiOverride?.separator, item.ui?.separator, item.class] })" data-part="separator" />
            <ContextMenu.Sub v-else-if="item?.children?.length" :open="item.open" :default-open="item.defaultOpen">
              <ContextMenu.SubTrigger
                as="button"
                type="button"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey as string)"
                :class="props.ui.item({ class: [props.uiOverride?.item, item.ui?.item, item.class], color: item.color })"
                data-part="item"
              >
                <ReuseItemTemplate :item="item" :index="index" />
              </ContextMenu.SubTrigger>

              <ContextMenuContent
                sub
                :class="item.ui?.content"
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
                  <slot :name="(name as keyof ContextMenuSlots<T>)" v-bind="slotProps"></slot>
                </template>
              </ContextMenuContent>
            </ContextMenu.Sub>
            <ContextMenu.CheckboxItem
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
            </ContextMenu.CheckboxItem>
            <Link v-else v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item as Omit<ContextMenuItem, 'type'>)" custom>
              <ContextMenu.Item
                as-child
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey as string)"
                @select="item.onSelect"
              >
                <LinkBase v-bind="slotProps" :class="props.ui.item({ class: [props.uiOverride?.item, item.ui?.item, item.class], color: item.color, active })" data-part="item">
                  <ReuseItemTemplate :item="item" :active="active" :index="index" />
                </LinkBase>
              </ContextMenu.Item>
            </Link>
          </template>
        </ContextMenu.Group>
      </div>

      <slot></slot>

      <slot name="content-bottom" :sub="props.sub ?? false"></slot>
    </component>
  </ContextMenu.Portal>
</template>
