/** `settings.theme` namespace dictionaries (the Appearance row's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'appearance.title': '外观',
  'appearance.light': '浅色',
  'appearance.dark': '深色',
  'appearance.system': '跟随系统',
  'wallpaper.title': '壁纸',
  'wallpaper.none': '无',
  'wallpaper.aurora': '极光',
  'wallpaper.ocean': '深海',
  'wallpaper.dusk': '暮色',
  'wallpaper.anime': '少女',
} satisfies Record<string, string>

/** The settings.theme namespace key union. */
export type ThemeKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'appearance.title': 'Appearance',
  'appearance.light': 'Light',
  'appearance.dark': 'Dark',
  'appearance.system': 'System',
  'wallpaper.title': 'Wallpaper',
  'wallpaper.none': 'None',
  'wallpaper.aurora': 'Aurora',
  'wallpaper.ocean': 'Ocean',
  'wallpaper.dusk': 'Dusk',
  'wallpaper.anime': 'Anime',
} satisfies Record<ThemeKey, string>
