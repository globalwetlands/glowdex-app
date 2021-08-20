# Global Coastal Wetlands Index App

![GitHub License](https://img.shields.io/github/license/globalwetlands/glowdex-app)

View the web app: **[glowdex.wetlands.app](https://glowdex.wetlands.app)**

[About](#about) | [Instructions](#instructions) | [Development](#development) | [License](LICENSE)

## About

### Global status of coastal wetlands to inform conservation and management.

Researchers from all around the world have been recording a wide range of data on the world’s coastal wetlands for decades. For the first time we have brought these global data sets together. We have analysed this data and can now see how our coastal wetlands are faring and where they may be in trouble.

We have created a Global Coastal Wetlands Index that you can access using this web app. Our index uses 34 indicators, to provide a full picture of the health of our coastal wetlands. We have quantified the relationships among these indicators to be able to better understand the health of our coastal wetlands.

When we look around the world, we start to find similarities in coastal wetlands located in different regions. Coastal wetland sites that share these similar characteristics have been grouped together into what we call a ‘typology’. This web app is designed to help you explore outputs at two scales: either using 5 or 18 typologies to characterise the world’s coastal wetlands.

You can use the web app to see which typology your areas of interest fall into and identify the defining characteristics of that typology. For instance, your typology might have typically high climate-based pressures and high rates of seagrass loss. Sites within the same typology facing similar issues could benefit from knowledge exchange. This Index can inform globally and regionally coordinated conservation and management.

This web app uses data from the following publications:

- Sievers et al. (in review)
- [Bunting et al. 2018](https://www.mdpi.com/2072-4292/10/10/1669)
- [Hamilton and Casey 2016](https://onlinelibrary.wiley.com/doi/full/10.1111/geb.12449) and [Hamilton 2015](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/HKGBGS)
- [Simard et al. 2019](https://www.nature.com/articles/s41561-018-0279-1)
- [Sanderman et al. 2018](https://iopscience.iop.org/article/10.1088/1748-9326/aabe1c/meta) and [Sanderman 2017](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/OCYUIT)
- [Thomas et al. 2017](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0179302)
- [UNEP-WCMC and Short 2021](https://data.unep-wcmc.org/datasets/7)
- [Dunic et al. 2021](https://onlinelibrary.wiley.com/doi/full/10.1111/gcb.15684?casa_token=44d-RcVj8IoAAAAA%3AxQebYugTpkjy5083crKa8kbHW_AwllkUwS4a1t1Pl1ooesL9J7o8LkTbVntJ3aR51-rLxNs-bqBGirB5pw)
- [Waycott et al. 2009](https://www.pnas.org/content/106/30/12377.short)
- [Mcowen et al. 2017](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5515097/)
- [The IUCN Red List of Threatened Species. Version 2020-04](https://www.iucnredlist.org/)
- [Halpern et al. 2019](https://www.nature.com/articles/s41598-019-47201-9) and [Frazier](https://knb.ecoinformatics.org/view/doi:10.5063/F12B8WBS)
- [Hersbach et al. 2019](https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels-monthly-means)
- [Huang et al. 2017](https://journals.ametsoc.org/view/journals/clim/30/20/jcli-d-16-0836.1.xml) and [Huang et al. 2018](https://journals.ametsoc.org/view/journals/clim/32/9/jcli-d-18-0368.1.xml?tab_body=pdf)
- [US Geological Survey 2019](https://rmgsc.cr.usgs.gov/ecosystems/datadownload.shtml)
- [OceanColour](https://oceancolor.gsfc.nasa.gov/products/)
- [Vestbo et al. 2018](https://www.frontiersin.org/articles/10.3389/fmars.2018.00164/full) and [Obst 2017](https://snd.gu.se/en/catalogue/study/ecds0243)

**Please cite Sievers et al. _(in review) Ecological Indicators_ if you use outputs from this web app.** See the individual publications above for details or data on specific indicators.

## Instructions

Select the **number of typologies** you would like to view (5 or 18). Click on a grid cell (100 x 100 km grid cell) to view information about the typology that cell belongs to. The **violin plot** shows the spread of values for the range of the grid cells within that typology, displaying indicators that best diagnose and differentiate that typology. The diamond highlights the specific grid cell you’ve clicked on position within the range.

You can alter the **quantile** between 0 and 0.99 to change the threshold for inclusion of an indicator in the violin plot. The higher the quantile is set, the fewer indicators are shown. The more important the indicator in diagnosing the typology, the longer it will remain visible as you increase the quantile.

Occasionally, there will be no indicators shown for higher thresholds (or quantiles). This is because there are no clear defining characteristic for this typology.

You can select the type of coastal wetland habitat/s you would like to view -mangrove, saltmarsh, and seagrass. You can select one, two or all three habitats. The world map will only show grid cells where the habitat/s you selected are located.

## Development

### Prequisites

- [node.js 16+](https://nodejs.org/en/)
  - Run `npm install` in your terminal to install node dependencies before running the commands below.

In the project directory, you can then run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

#### Deployment: `npm run deploy`

Build the app and push the built app to the `gh-pages` branch. Will be deployed via GitHub pages to https://glowdex.wetlands.app/

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
