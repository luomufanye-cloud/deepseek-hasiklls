/** Theme preferences stored in the Host user-settings document. */

import z from '@deepseek-ai/schemastery'

/** Built-in preferences accepted at the registry and settings boundaries. */
export const THEME_PREFERENCES = ['light', 'dark', 'system'] as const

/** Settings namespace owned by the theme plugin. */
export const THEME_SETTINGS_NAMESPACE = 'ui-theme'

/** Field carrying the selected built-in theme preference. */
export const THEME_PREFERENCE_FIELD = 'preference'

/** Theme preference persisted by the product Appearance row. */
export type ThemePreference = typeof THEME_PREFERENCES[number]

/** Default preference when the user-settings document has no override. */
export const DEFAULT_PREFERENCE: ThemePreference = 'system'

/**
 * Built-in wallpaper ids accepted at the settings boundary. `none` disables
 * the wallpaper and restores the opaque application surfaces; every other id
 * paints a generated background behind the translucent work columns. The art
 * itself lives client-side (wallpaper-catalog.ts) — this list is shared so
 * the Host schema and the browser scope validate the same vocabulary.
 */
export const WALLPAPERS = ['none', 'aurora', 'ocean', 'dusk', 'anime'] as const

/** Field carrying the selected built-in wallpaper. */
export const WALLPAPER_FIELD = 'wallpaper'

/** Wallpaper persisted by the product Wallpaper row. */
export type WallpaperId = typeof WALLPAPERS[number]

/** Default wallpaper when the user-settings document has no override. */
export const DEFAULT_WALLPAPER: WallpaperId = 'anime'

/** Durable theme section shared by the Host schema and the browser scope. */
export interface ThemeSettings {
  /** Selected built-in preference. */
  preference: ThemePreference
  /** Selected built-in wallpaper; `none` disables it. */
  wallpaper: WallpaperId
}

/** Durable theme schema; also the wire envelope the browser scope validates against. */
export const ThemeSettingsSchema: z<ThemeSettings> = z.object({
  [THEME_PREFERENCE_FIELD]: z.union([...THEME_PREFERENCES]).default(DEFAULT_PREFERENCE),
  [WALLPAPER_FIELD]: z.union([...WALLPAPERS]).default(DEFAULT_WALLPAPER),
})

/**
 * Narrow one wire or registry value to a persistable preference.
 * @param value - value crossing the settings or registry boundary.
 * @returns whether the value is a built-in preference.
 */
export function isThemePreference(value: unknown): value is ThemePreference {
  return THEME_PREFERENCES.some(preference => preference === value)
}

/**
 * Narrow one wire or registry value to a persistable wallpaper id.
 * @param value - value crossing the settings or registry boundary.
 * @returns whether the value is a built-in wallpaper id.
 */
export function isWallpaperId(value: unknown): value is WallpaperId {
  return WALLPAPERS.some(wallpaper => wallpaper === value)
}
