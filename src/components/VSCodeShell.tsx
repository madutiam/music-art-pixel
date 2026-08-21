import type { FeedItem, MemoryItem, Phase } from '../engine/useTimeline'
import Explorer from './Explorer'
import EditorPane from './EditorPane'
import Terminal from './Terminal'
import StatusBar from './StatusBar'
import MemoryLayer from './MemoryLayer'

const ACTIVITY = [
  { icon: '⧉', active: true },
  { icon: '⌕', active: false },
  { icon: '⑂', active: false, badge: '1' },
  { icon: '▷', active: false },
  { icon: '▤', active: false },
]

export default function VSCodeShell({
  feed,
  memories,
  phase,
  currentVideo,
  getTime,
}: {
  feed: FeedItem[]
  memories: MemoryItem[]
  phase: Phase
  currentVideo: string | null
  getTime: () => number
}) {
  return (
    <div className={`shell${phase !== 'idle' ? ' booted' : ''}`}>
      <div className="titlebar">
        <div className="titlebar-menus">
          <span className="vscode-logo">⧉</span>
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(m => (
            <span key={m} className="menu-item">{m}</span>
          ))}
        </div>
        <div className="titlebar-title">timeline.ts — music-art-pixel — Visual Studio Code</div>
        <div className="titlebar-controls">
          <span>─</span>
          <span>▢</span>
          <span>✕</span>
        </div>
      </div>

      <div className="shell-body">
        <div className="activitybar">
          <div className="activity-group">
            {ACTIVITY.map((a, i) => (
              <div key={i} className={`activity-icon${a.active ? ' active' : ''}`}>
                {a.icon}
                {a.badge && <span className="activity-badge">{a.badge}</span>}
              </div>
            ))}
          </div>
          <div className="activity-icon">⚙</div>
        </div>

        <Explorer currentVideo={currentVideo} />

        <div className="main-col">
          <EditorPane phase={phase} />
          <Terminal feed={feed} />
        </div>

        <MemoryLayer memories={memories} />
      </div>

      <StatusBar phase={phase} getTime={getTime} />
    </div>
  )
}
