import { quantile } from 'd3-array'
import Plotly from 'plotly.js-cartesian-dist'
import createPlotlyComponent from 'react-plotly.js/factory'

import {
  indicatorColnames,
  indicatorColnamesKeys,
} from '../../../utils/dataUtils'

// Using a smaller precompiled version of plotly.js
// https://github.com/plotly/react-plotly.js/issues/98#issuecomment-689075526
const Plot = createPlotlyComponent(Plotly)

const config = {
  displayModeBar: false,
}

const layout = {
  plot_bgcolor: 'transparent',
  paper_bgcolor: 'transparent',
  showlegend: true,
  hovermode: false,
  margin: {
    l: 15,
    r: 0,
    t: 0,
    b: 100,
  },
  yaxis: {
    // title: 'Val',
    zeroline: false,
    range: [-5, 5],
  },
  xaxis: {
    title: 'Indicator',
    // tickangle: -90,
    showticklabels: true,
    tickfont: {
      size: 11,
    },
  },
  boxgap: 0.1,
  width: 600,
  height: 400,
}

function getSignificanceFactorColor(significanceFactor) {
  return significanceFactor > 0 ? '#00aacc' : '#ff5500'
}

const selectedCellMarker = {
  size: 7,
  symbol: 'diamond',
  color: '#ffaaff',
  line: { color: '#cc00ff', width: 1 },
}

function filterSignificantData({
  quantileValue,
  gridItems,
  columns = indicatorColnamesKeys,
}) {
  const residuals = gridItems.map((item) => item.residuals)
  /*
  R code
  dat_signif <- dtemp %>%
    group_by(Indicator, Cluster) %>%
    summarize(upr = quantile(Val, 0.5 + (input$quant/2), 
                            na.rm = TRUE),
              lwr = quantile(Val, 0.5 - input$quant/2, 
                            na.rm = TRUE)) %>%
    mutate(
          signif = (sign(lwr) == sign(upr))*sign(upr)
          
    )

    left_join(dtemp, dat_signif) %>%
      filter(signif !=0)
    
  })
*/
  const indicatorColumnSignificance = (colName) => {
    const accessor = (item) => item[colName]
    const upper = quantile(residuals, 0.5 + quantileValue / 2, accessor)
    const lower = quantile(residuals, 0.5 - quantileValue / 2, accessor)

    // TODO: check this significance test
    const significanceFactor =
      Math.sign(lower) === Math.sign(upper) ? Math.sign(upper) : 0

    return significanceFactor
  }

  const columnSignificance = columns.map(indicatorColumnSignificance)

  const significantIndicatorColumns = columns
    .map((colName, index) => ({
      colName,
      significanceFactor: columnSignificance[index],
    }))
    .filter(({ significanceFactor }) => significanceFactor !== 0)

  return { significantIndicatorColumns }
}

export function TypologyBoxPlot({ gridItems, gridItem, quantileValue = 0.8 }) {
  const { significantIndicatorColumns } = filterSignificantData({
    quantileValue,
    gridItems,
  })

  const boxplots = significantIndicatorColumns.map(
    ({ colName, significanceFactor }) => {
      const color = getSignificanceFactorColor(significanceFactor)
      // Accessing residuals data
      const y = gridItems.map((item) => item.residuals[colName])
      const displayName = indicatorColnames[colName]
      const boxplot = {
        type: 'box',
        y,
        name: displayName,
        showlegend: false,
        // whiskerwidth: 0.2,
        // boxpoints: 'all',
        marker: { color, size: 3 },
        line: {
          width: 1,
        },
      }
      return boxplot
    }
  )

  const currentGridItemMarkers = significantIndicatorColumns.map(
    ({ colName }) => {
      const displayName = indicatorColnames[colName]
      const name = `Cell ${displayName}`
      const x = [displayName]
      const y = [gridItem.residuals[colName]]
      const marker = {
        x,
        y,
        name,
        // text: 'Some really interesting hover info',
        showlegend: false,
        marker: selectedCellMarker,
      }
      return marker
    }
  )

  const currentGridItemLegendTrace = {
    // Dummy trace to create legend item
    x: [null],
    y: [null],
    name: 'Selected Cell',
    marker: selectedCellMarker,
  }

  const factorTraces = [1, -1].map((significanceFactor) => ({
    // Dummy trace to create legend item
    x: [null],
    y: [null],
    name: `${significanceFactor > 0 ? 'Positive' : 'Negative'} Factor`,
    marker: {
      size: 7,
      symbol: 'square',
      color: getSignificanceFactorColor(significanceFactor),
      // line: { color: '#cc00ff', width: 1 },
    },
  }))

  const data = [
    ...boxplots,
    ...currentGridItemMarkers,
    // Dummy traces to create legend
    ...factorTraces,
    currentGridItemLegendTrace,
  ]

  return (
    <div
      style={{
        minHeight: layout.height,
        minWidth: layout.width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!significantIndicatorColumns.length && (
        <div className="notification is-warning is-light">
          No indicators of significance
        </div>
      )}
      {!!significantIndicatorColumns.length && (
        <Plot data={data} layout={layout} config={config} />
      )}
    </div>
  )
}
