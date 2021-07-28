export function WidgetBox({ children, onClose, ...props }) {
  return (
    <div className="Widgets--Box" {...props}>
      {children}
    </div>
  )
}
