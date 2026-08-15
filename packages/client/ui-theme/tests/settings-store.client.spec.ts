/** Appearance row store: snapshot-mirror action and the revision guard. */
import { describe, expect, it } from 'vitest'
import { createAppearanceRowStore } from '../src/client/settings-store.ts'

describe('createAppearanceRowStore', () => {
  it('init shape: system preference, no wallpaper, revision at -1', () => {
    const store = createAppearanceRowStore().create()
    expect(store.getSnapshot()).toEqual({ preference: 'system', wallpaper: 'none', revision: -1 })
  })

  it('sync mirrors the preference and wallpaper and advances the revision', () => {
    const store = createAppearanceRowStore().create()
    store.actions.sync('dark', 'ocean', 0)
    expect(store.getSnapshot()).toEqual({ preference: 'dark', wallpaper: 'ocean', revision: 0 })
    store.actions.sync('light', 'none', 2)
    expect(store.getSnapshot().preference).toBe('light')
    expect(store.getSnapshot().wallpaper).toBe('none')
    expect(store.getSnapshot().revision).toBe(2)
  })

  it('revision guard drops stale and duplicate writes', () => {
    const store = createAppearanceRowStore().create()
    store.actions.sync('dark', 'none', 3)
    store.actions.sync('system', 'dusk', 2)
    store.actions.sync('system', 'dusk', 3)
    expect(store.getSnapshot().preference).toBe('dark')
    expect(store.getSnapshot().wallpaper).toBe('none')
    expect(store.getSnapshot().revision).toBe(3)
  })
})
