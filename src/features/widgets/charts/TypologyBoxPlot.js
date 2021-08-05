import { quantile } from 'd3-array'
import _ from 'lodash'
import Plotly from 'plotly.js-cartesian-dist'
import { useMemo } from 'react'
import createPlotlyComponent from 'react-plotly.js/factory'
import { useMeasure } from 'react-use'

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
  showlegend: false,
  legend: {
    x: 0,
    y: 2,
  },
  hovermode: false,
  margin: {
    l: 200,
    r: 0,
    t: 15,
    b: 15,
  },
  xaxis: {
    // title: 'Val',
    showticklabels: 'true',
    zeroline: true,
    range: [-4, 4.1],
    mirror: 'ticks',
    tickmode: 'linear',
  },
  yaxis: {
    // title: 'Indicator',
    // tickangle: -90,
    showticklabels: true,
    tickfont: {
      size: 11,
    },
  },
  boxgap: 0.1,
}

function getColumnDisplayName(colName) {
  return `${indicatorColnames[colName]?.habitatLabel} ${indicatorColnames[
    colName
  ]?.label?.toLowerCase()}`
}

function getColumnColor(colName) {
  return indicatorColnames[colName]?.habitatColor
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

function groupColumnsByDimension(columns) {
  const groupedBy = _.groupBy(columns, ({ colName }) => {
    const col = indicatorColnames[colName]
    return col?.dimension
  })
  return groupedBy
}

function useTypologyPlotData({
  width,
  significantIndicatorColumns,
  gridItems,
  gridItem,
}) {
  const columnsByDimension = groupColumnsByDimension(
    significantIndicatorColumns
  )
  const groupedPlots = _.map(
    columnsByDimension,
    (indicatorColumns, dimension) => {
      const boxplots = indicatorColumns.reverse().map(({ colName }) => {
        const color = getColumnColor(colName)
        // Accessing residuals data
        const x = gridItems.map((item) => item.residuals[colName])
        const displayName = getColumnDisplayName(colName)
        const boxplot = {
          type: 'violin',
          x,
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
      })

      const currentGridItemMarkers = indicatorColumns.map(({ colName }) => {
        const displayName = getColumnDisplayName(colName)
        const name = `Cell ${displayName}`
        const y = [displayName]
        const x = [gridItem.residuals[colName]]
        const marker = {
          x,
          y,
          name,
          // text: 'Some really interesting hover info',
          showlegend: false,
          marker: selectedCellMarker,
        }
        return marker
      })

      const currentGridItemLegendTrace = {
        // Dummy trace to create legend item
        x: [null],
        y: [null],
        name: 'Selected Cell',
        marker: selectedCellMarker,
      }

      const rowHeight = 40
      const height = indicatorColumns.length * rowHeight

      const calculatedLayout = {
        ...layout,
        width,
        height,
      }

      return {
        data: [
          ...boxplots,
          ...currentGridItemMarkers,
          currentGridItemLegendTrace,
        ],
        layout: calculatedLayout,
      }
    }
  )

  return {
    groupedPlots,
  }
}

export function TypologyBoxPlot({ gridItems, gridItem, quantileValue = 0.8 }) {
  const [containerRef, { width }] = useMeasure()

  const { significantIndicatorColumns } = filterSignificantData({
    quantileValue,
    gridItems,
  })

  const { groupedPlots } = useTypologyPlotData({
    significantIndicatorColumns,
    width,
    gridItems,
    gridItem,
  })

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {!significantIndicatorColumns.length && (
        <div className="notification is-warning is-light">
          No indicators of significance
        </div>
      )}
      {!!significantIndicatorColumns.length &&
        groupedPlots.map(({ data, layout }, index) => (
          <Plot
            key={`groupedPlot${index}`}
            data={data}
            layout={layout}
            config={config}
          />
        ))}
    </div>
  )
}
