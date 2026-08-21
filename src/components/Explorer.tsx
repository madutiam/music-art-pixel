type Row = {
  depth: number
  name: string
  icon?: 'folder-open' | 'ts' | 'tsx' | 'css' | 'json' | 'html' | 'mp4' | 'wav'
}

export const ANIMATIONS = [
  'chorachora.mp4',
  'choro-no-pc.mp4',
  'comecando.mp4',
  'comeco-do-desespero.mp4',
  'desespero.mp4',
  'direita.mp4',
  'esquerda.mp4',
  'ferrou-tudo.mp4',
  'imersa-no-desespero.mp4',
  'indo-embora.mp4',
  'perfil.mp4',
  'piscadinha.mp4',
  'recebe-a-msg.mp4',
]

const TOP: Row[] = [
  { depth: 0, name: 'public', icon: 'folder-open' },
  { depth: 1, name: 'animations', icon: 'folder-open' },
]

const BOTTOM: Row[] = [
  { depth: 1, name: 'audio', icon: 'folder-open' },
  { depth: 2, name: 'close-with-desires.wav', icon: 'wav' },
  { depth: 0, name: 'src', icon: 'folder-open' },
  { depth: 1, name: 'config', icon: 'folder-open' },
  { depth: 2, name: 'timeline.ts', icon: 'ts' },
  { depth: 2, name: 'lyrics.ts', icon: 'ts' },
  { depth: 1, name: 'App.tsx', icon: 'tsx' },
]

function FileRow({ row, selected }: { row: Row; selected?: boolean }) {
  const isFolder = row.icon === 'folder-open'
  return (
    <div className={`explorer-row${selected ? ' selected' : ''}`} style={{ paddingLeft: 14 + row.depth * 20 }}>
      {isFolder ? (
        <span className="chevron">▾</span>
      ) : (
        <span className={`file-icon ${row.icon ?? ''}`}>
          {row.icon === 'mp4' ? '▶' : row.icon === 'wav' ? '♫' : row.icon === 'css' ? '#' : row.icon === 'html' ? '<>' : row.icon === 'json' ? '{}' : 'TS'}
        </span>
      )}
      <span className="file-name">{row.name}</span>
    </div>
  )
}

export default function Explorer({ currentVideo }: { currentVideo: string | null }) {
  return (
    <div className="explorer">
      <div className="explorer-header">EXPLORER</div>
      <div className="explorer-project">
        <span className="chevron">▾</span> MUSIC-ART-PIXEL
      </div>
      <div className="explorer-tree">
        {TOP.map(r => <FileRow key={r.name} row={r} />)}
        {ANIMATIONS.map(v => (
          <FileRow
            key={v}
            row={{ depth: 2, name: v, icon: 'mp4' }}
            selected={currentVideo === v}
          />
        ))}
        {BOTTOM.map(r => <FileRow key={r.name} row={r} />)}
      </div>
    </div>
  )
}
