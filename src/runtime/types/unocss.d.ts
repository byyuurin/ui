declare module '#build/uno-merge.config' {
  import type { UserConfig } from '@unocss/core'

  const config: UserConfig
  export default config
}

declare module '#build/uno-preset' {
  import type { Preset } from '@unocss/core'

  const preset: Preset
  export default () => preset
}
