import './MapLegend.css'

export function MapLegend() {
  return (
    <div className="Map--Overlays--Box MapLegend">
      <h4 className="MapLegend--Title">
        Name
        <br />
        <span className="MapLegend--Unit">(unit)</span>
      </h4>
      <div className="MapLegend--Display"></div>
    </div>
  )
}
