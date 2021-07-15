import { quantile } from 'd3-array'
import Plotly from 'plotly.js-cartesian-dist'
import createPlotlyComponent from 'react-plotly.js/factory'

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
  hovermode: false,
  margin: {
    l: 15,
    r: 0,
    t: 0,
    b: 50,
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
  },
  boxgap: 0.1,
  width: 600,
  height: 300,
}

function filterSignificantData({
  quantileValue,
  gridItems,
  columns = [
    'mang_fish_dens',
    'mang_invert_dens',
    'mang_spec_score',
    'salt_spec_score',
    'seag_spec_score',
    'mang_frag_area_mn_rate',
    'mang_frag_area_mn',
    'mang_mean_age',
    'mang_mean_agb_mg_ha',
    'mang_mean_SOC',
    'mang_mean_height_m',
    'pressure_seagrass_climate_current',
    'pressure_seagrass_land_current',
    'pressure_seagrass_marine_current',
    'pressure_seagrass_climate_rate',
    'pressure_seagrass_land_rate',
    'pressure_seagrass_marine_rate',
    'pressure_mangrove_climate_current',
    'pressure_mangrove_land_current',
    'pressure_mangrove_marine_current',
    'pressure_mangrove_climate_rate',
    'pressure_mangrove_land_rate',
    'pressure_mangrove_marine_rate',
    'pressure_saltmarsh_climate_current',
    'pressure_saltmarsh_land_current',
    'pressure_saltmarsh_marine_current',
    'pressure_saltmarsh_climate_rate',
    'pressure_saltmarsh_land_rate',
    'pressure_saltmarsh_marine_rate',
    'mang_spec_prop',
    'salt_spec_prop',
    'seag_spec_prop',
    'mang_loss_rate',
    'seag_change_rate',
  ],
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

  if (!significantIndicatorColumns.length) {
    return (
      <div className="notification is-warning is-light">
        No indicators of significance
      </div>
    )
  }

  const boxplots = significantIndicatorColumns.map(
    ({ colName, significanceFactor }) => {
      const color = significanceFactor > 0 ? '#00aacc' : '#ff5500'
      // Accessing residuals data
      const y = gridItems.map((item) => item.residuals[colName])
      const boxplot = {
        type: 'box',
        y,
        name: colName,
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
      const name = `Current ${colName}`
      const x = [colName]
      const y = [gridItem.residuals[colName]]

      const marker = {
        x,
        y,
        name,
        // text: 'Some really interesting hover info',
        marker: {
          size: 7,
          symbol: 'diamond',
          color: '#ffaaff',
          line: { color: '#cc00ff', width: 1 },
        },
      }
      return marker
    }
  )

  const data = [...boxplots, ...currentGridItemMarkers]

  return <Plot data={data} layout={layout} config={config} />
}
