// @vitest-environment jsdom
/** WallpaperRow behavior: a swatch per built-in wallpaper, selection follows
 * the persisted setting, clicks drive setWallpaper. */
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { createSnapshotStore, type SessionListState, type WorkspaceListState } from '@deepseek-ai/dsh-client-runtime/client'
import { bindSnapshotSelector } from '@deepseek-ai/dsh-client-web-react'
import { WallpaperRow } from '../src/client/WallpaperRow.tsx'
import type { WallpaperRowComponentProps } from '../src/client/WallpaperRow.tsx'
import { createAppearanceRowStore } from '../src/client/settings-store.ts'
import type { ThemePreference, WallpaperId } from '../src/client/index.ts'

afterEach(cleanup)

const COPY: Record<string, string> = {
  'wallpaper.title': 'Wallpaper',
  'wallpaper.none': 'None',
  'wallpaper.aurora': 'Aurora',
  'wallpaper.ocean': 'Ocean',
  'wallpaper.dusk': 'Dusk',
  'wallpaper.anime': 'Anime',
}

/** Empty global standard-kit hooks (the row reads neither). */
function emptySessions() {
  const store = createSnapshotStore<SessionListState>(
    { ids: [], byId: {}, current: undefined, phase: 'ready', subagentsByParent: {}, jobsBySession: {}, currentAddress: undefined })
  return bindSnapshotSelector(store)
}
function emptyWorkspaces() {
  const store = createSnapshotStore<WorkspaceListState>({
    items: [], archivedSessionIds: [], state: 'idle', phase: 'ready', error: null,
    baselinesReady: true, recentWorkspaceId: undefined,
  })
  return bindSnapshotSelector(store)
}

function mount(preference: ThemePreference = 'system', wallpaper: WallpaperId = 'none') {
  // Real store instance — the sanctioned zero-machinery path for tests.
  const store = createAppearanceRowStore().create()
  store.actions.sync(preference, wallpaper, 0)
  const setWallpaper = vi.fn()
  const props: WallpaperRowComponentProps = {
    useSessions: emptySessions(),
    useWorkspaces: emptyWorkspaces(),
    useStore: bindSnapshotSelector(store),
    actions: store.actions,
    t: (key: string) => COPY[key] ?? key,
    setWallpaper,
  }
  render(<WallpaperRow {...props} />)
  return { store, setWallpaper }
}

const pressed = (name: RegExp): string | null =>
  screen.getByRole('button', { name }).getAttribute('aria-pressed')

describe('WallpaperRow', () => {
  it('renders the title and one swatch per built-in wallpaper', () => {
    mount('system', 'ocean')
    expect(screen.getByText('Wallpaper')).toBeDefined()
    for (const id of ['None', 'Aurora', 'Ocean', 'Dusk', 'Anime'] as const) {
      expect(screen.getByRole('button', { name: id })).toBeDefined()
    }
    expect(pressed(/Ocean/)).toBe('true')
    expect(pressed(/Aurora/)).toBe('false')
  })

  it('click drives setWallpaper; selection follows the store mirror, not the click echo', () => {
    const b = mount('system', 'none')
    fireEvent.click(screen.getByRole('button', { name: /Aurora/ }))
    expect(b.setWallpaper).toHaveBeenCalledWith('aurora')
    // No store write yet: selection is unchanged.
    expect(pressed(/None/)).toBe('true')
    act(() => { b.store.actions.sync('system', 'aurora', 1) })
    expect(pressed(/Aurora/)).toBe('true')
    expect(pressed(/None/)).toBe('false')
  })
})
