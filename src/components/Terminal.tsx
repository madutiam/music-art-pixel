import type { FeedItem } from '../engine/useTimeline'
import LogLine from './LogLine'

export default function Terminal({ feed }: { feed: FeedItem[] }) {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-tabs">
          <span>PROBLEMS</span>
          <span>OUTPUT</span>
          <span>DEBUG CONSOLE</span>
          <span className="active">TERMINAL</span>
          <span>PORTS</span>
        </div>
        <div className="terminal-actions">node ∨ &nbsp;＋&nbsp; ⋮</div>
      </div>
      {/* column-reverse: linha nova entra embaixo e empurra as antigas pra cima */}
      <div className="terminal-feed">
        <div className="terminal-feed-inner">
          {feed.map(item => (
            <LogLine key={item.id} text={item.text} kind={item.kind} typed={item.typed} />
          ))}
        </div>
      </div>
    </div>
  )
}
