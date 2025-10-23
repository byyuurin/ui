import { defu } from 'defu'
import type { DefineLocaleOptions, Direction, Locale, Messages } from '../types/locale'
import type { DeepPartial } from '../types/utils'

export { createTranslator } from '@byyuurin/ui-kit'

/* @__NO_SIDE_EFFECTS__ */
export function defineLocale<M extends Messages = Messages>(locale: DefineLocaleOptions<M>): Locale<M> {
  return defu<DefineLocaleOptions<M>, [{ dir: Direction }]>(locale, { dir: 'ltr' })
}

/* @__NO_SIDE_EFFECTS__ */
export function extendLocale<M extends Messages = Messages>(locale: Locale<M>, options: Partial<DefineLocaleOptions<DeepPartial<M>>>): Locale<M> {
  return defu<Locale<M>, [DefineLocaleOptions<M>]>(options, locale)
}
