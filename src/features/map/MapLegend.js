import './MapLegend.css'

export function MapLegend({ clusters }) {
  return (
    <div className="Map--Overlays--Box MapLegend">
      <h4 className="MapLegend--Title">
        Typology
        <br />
      </h4>
      <div className="MapLegend--Display">
        {clusters.map((cluster) => {
          return (
            <div
              className="MapLegend--ColourStop"
              key={`ColourStop-${cluster.n}`}
            >
              <div
                className="MapLegend--ColourBox"
                style={{
                  borderColor: cluster.color,
                  backgroundColor: cluster.fillColor,
                }}
              />
              <span className="MapLegend--Value">{cluster.n}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
