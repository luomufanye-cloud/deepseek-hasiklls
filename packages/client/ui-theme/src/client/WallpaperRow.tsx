/**
 * Wallpaper selection row registered into the General section item slot:
 * a label plus one swatch per built-in wallpaper, with an interactive "none"
 * card to switch the wallpaper off. Selection follows the persisted setting;
 * writes go through the theme plugin's injected face (which persists into the
 * ui-theme settings namespace).
 */
import clsx from 'clsx'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type { WallpaperId } from '../theme-settings.ts'
import { WALLPAPER_PRESETS } from './wallpaper-catalog.ts'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { createAppearanceRowStore } from './settings-store.ts'
import css from './WallpaperRow.module.css'

/** Injected business face: the wallpaper write (t rides the standard locale seat). */
export interface WallpaperRowInjected {
  /** Switch the built-in wallpaper (`none` disables it). */
  setWallpaper: (id: WallpaperId) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type WallpaperRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createAppearanceRowStore>>
  & PropsLocale<'settings.theme'> & WallpaperRowInjected

/**
 * Render the Wallpaper selection row.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export function WallpaperRow({ t, setWallpaper, useStore }: WallpaperRowComponentProps) {
  const wallpaper = useStore(s => s.wallpaper)
  return (
    <div className={css.group}>
      <div className={css.title}>{t('wallpaper.title')}</div>
      <div className={css.swatchRow}>
        {WALLPAPER_PRESETS.map(preset => (
          <button
            key={preset.id}
            type="button"
            className={clsx(css.swatch, wallpaper === preset.id && css.selected)}
            aria-pressed={wallpaper === preset.id}
            aria-label={t(`wallpaper.${preset.id}`)}
            onClick={() => { setWallpaper(preset.id) }}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return
              event.preventDefault()
              setWallpaper(preset.id)
            }}
          >
            <span
              className={clsx(css.preview, preset.id === 'none' && css.noneSwatch)}
              data-wallpaper={preset.id}
              style={preset.id === 'none' ? undefined : { background: preset.background }}
            />
            <span className={css.swatchLabel}>{t(`wallpaper.${preset.id}`)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
