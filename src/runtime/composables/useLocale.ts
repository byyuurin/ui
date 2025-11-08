import type { Translator } from '@byyuurin/ui-kit'
import { createSharedComposable } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import localeDefault from '../locale/en'
import type { Locale, Messages } from '../types'
import { defineInjection } from '../utils'
import { createTranslator } from '../utils/locale'

export const {
  InjectionKey: InjectionKeyLocaleContext,
  inject: injectLocaleContext,
  provide: provideLocaleContext,
} = defineInjection<MaybeRefOrGetter<Locale<Messages> | undefined>>('ui.locale-context')

function _useLocale() {
  const _locale = injectLocaleContext()
  const locale = computed(() => toValue(_locale) ?? localeDefault)
  const lang = computed(() => locale.value.name)
  const code = computed(() => locale.value.code)
  const dir = computed(() => locale.value.dir ?? 'ltr')

  const t: Translator<typeof locale.value.messages> = (path, options) => {
    return createTranslator(toValue(locale))(path, options)
  }

  return { locale, lang, code, dir, t }
}

export const useLocale = /* @__PURE__ */ import.meta.client ? createSharedComposable(_useLocale) : _useLocale
