/**
 * Built-in wallpaper art catalog. Each non-`none` wallpaper is a generated
 * CSS `background` value (layered gradients, no binary assets) painted by
 * ui-layout behind the work columns. Art is deliberately soft and muted so
 * the translucent scrim keeps reading surfaces legible in both palettes; the
 * catalog is a pure data module — no DOM, no React, so it stays safe for the
 * client bundle and trivial to snapshot-test.
 */

import type { WallpaperId } from '../theme-settings.ts'

/** A selectable built-in wallpaper. */
export interface WallpaperPreset {
  /** Stable id persisted in the ui-theme settings namespace. */
  id: WallpaperId
  /** The CSS `background` shorthand layer value applied behind the UI. */
  background: string
}

const NONE: WallpaperPreset = {
  id: 'none',
  background: 'none',
}

const AURORA: WallpaperPreset = {
  id: 'aurora',
  background: `
    radial-gradient(120% 90% at 18% 8%, rgba(86, 134, 254, 0.42) 0%, rgba(86, 134, 254, 0) 52%),
    radial-gradient(120% 100% at 88% 22%, rgba(94, 201, 176, 0.4) 0%, rgba(94, 201, 176, 0) 48%),
    radial-gradient(130% 120% at 50% 118%, rgba(147, 112, 219, 0.36) 0%, rgba(147, 112, 219, 0) 55%),
    linear-gradient(150deg, #0d1b2e 0%, #1b2a4a 46%, #3b2f63 100%)
  `,
}

const OCEAN: WallpaperPreset = {
  id: 'ocean',
  background: `
    radial-gradient(90% 70% at 22% 12%, rgba(45, 112, 180, 0.5) 0%, rgba(45, 112, 180, 0) 50%),
    radial-gradient(100% 80% at 80% 28%, rgba(44, 162, 168, 0.4) 0%, rgba(44, 162, 168, 0) 52%),
    radial-gradient(120% 110% at 50% 118%, rgba(20, 42, 90, 0.55) 0%, rgba(20, 42, 90, 0) 60%),
    linear-gradient(165deg, #0a2a3f 0%, #0e3e52 45%, #1c5a6b 100%)
  `,
}

const DUSK: WallpaperPreset = {
  id: 'dusk',
  background: `
    radial-gradient(100% 80% at 28% 10%, rgba(244, 162, 97, 0.42) 0%, rgba(244, 162, 97, 0) 50%),
    radial-gradient(110% 90% at 78% 24%, rgba(214, 89, 130, 0.4) 0%, rgba(214, 89, 130, 0) 52%),
    radial-gradient(130% 120% at 50% 120%, rgba(120, 74, 150, 0.42) 0%, rgba(120, 74, 150, 0) 58%),
    linear-gradient(160deg, #2b1e2f 0%, #4a2440 46%, #6b3147 100%)
  `,
}

const ANIME: WallpaperPreset = {
  id: 'anime',
  background: `
    linear-gradient(color-mix(in srgb, #1b2a4a 42%, transparent), color-mix(in srgb, #1b2a4a 42%, transparent)),
    url('/wallpapers/programmer-girl.jpg') center / cover no-repeat,
    linear-gradient(160deg, #2b1e2f 0%, #4a2440 46%, #6b3147 100%)
  `,
}

/** Every selectable wallpaper, in settings-display order (`none` first). */
export const WALLPAPER_PRESETS: readonly WallpaperPreset[] = [NONE, AURORA, OCEAN, DUSK, ANIME]

/** Resolve a persisted id to its preset; unknown ids fall back to `none`. */
export function wallpaperPresetOf(id: WallpaperId): WallpaperPreset {
  return WALLPAPER_PRESETS.find(preset => preset.id === id) ?? NONE
}

/** CSS `background` value for one id (falls back to `none`). */
export function wallpaperBackground(id: WallpaperId): string {
  return wallpaperPresetOf(id).background
}
