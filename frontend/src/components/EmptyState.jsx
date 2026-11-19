import Icon from './Icon.jsx'
import Kairo from './Kairo.jsx'
import { SeasonDeco } from './Seasonal.jsx'

// An empty list's place: the sentence and the first action together with Kairo companion guide
export default function EmptyState({ icon, title, text, children, className = '', tour, showMascot = true }) {
  return <div className={'empty empty-state' + (className ? ' ' + className : '')} data-tour={tour}>
    {showMascot ? (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <Kairo pose={icon === 'history' ? 'rest' : 'empty'} size="md" />
      </div>
    ) : icon ? (
      <div className="ico"><Icon name={icon} /></div>
    ) : null}
    {title && <div className="empty-t">{title}</div>}
    {text && <div className="empty-x">{text}</div>}
    {children && <div className="empty-acts">{children}</div>}
    {/* in season, a little company for an empty list (components/Seasonal.jsx) */}
    <SeasonDeco spot="empty" />
  </div>
}
