import type { Translator } from '@byyuurin/ui-kit'
import { createSharedComposable } from '@vueuse/core'
import { computed, toValue } from 'vue'
import localeDefault from '../locale/en'
import { createTranslator } from '../utils'
import { injectLocaleContext } from './injections'

export const useLocale = createSharedComposable(() => {
  const _locale = injectLocaleContext()
  const locale = computed(() => toValue(_locale) ?? localeDefault)
  const lang = computed(() => locale.value.name)
  const code = computed(() => locale.value.code)
  const dir = computed(() => locale.value.dir ?? 'ltr')

  const t: Translator<typeof locale.value.messages> = (path, options) => {
    return createTranslator(toValue(locale))(path, options)
  }

  return {
    locale,
    lang,
    code,
    dir,
    t,
  }
})
