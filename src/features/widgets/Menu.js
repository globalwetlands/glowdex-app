import './Menu.css'

import { Fragment, useState } from 'react'

import { IconButton } from '../../common/IconButton'
import { Popup } from '../../common/Popup'
import fig1 from '../../images/fig1.png'

const MenuPopupContent = () => (
  <div className="content">
    <p>
      <a href="#about">About</a> | <a href="#instructions">Instructions</a> |{' '}
      <a href="#terminology">Terminology</a> | <a href="#license">License</a>
    </p>

    <h3 id="about">About</h3>
    <h4 id="global-typologies-of-coastal-wetland-status-to-inform-conservation-and-management-">
      Global status of coastal wetlands to inform conservation and management.
    </h4>
    <p>
      Researchers from all around the world have been recording a wide range of
      data on the world’s coastal wetlands for decades. For the first time we
      have brought these global data sets together. We have analysed this data
      and can now see how our coastal wetlands are faring and where they may be
      in trouble.
    </p>
    <p>
      We have created a Global Coastal Wetlands Index that you can access using
      this web app. Our index uses 34 indicators, to provide a full picture of
      the health of our coastal wetlands. We have quantified the relationships
      among these indicators to be able to better understand the health of our
      coastal wetlands.
    </p>
    <p>
      When we look around the world, we start to find similarities in coastal
      wetlands located in different regions. Coastal wetland sites that share
      these similar characteristics have been grouped together into what we call
      a ‘typology’. This web app is designed to help you explore outputs at two
      scales: either using 5 or 18 typologies to characterise the world’s
      coastal wetlands.
    </p>
    <p>
      You can use the web app to see which typology your areas of interest fall
      into and identify the defining characteristics of that typology. For
      instance, your typology might have typically high climate-based pressures
      and high rates of seagrass loss. Sites within the same typology facing
      similar issues could benefit from knowledge exchange. This Index can
      inform globally and regionally coordinated conservation and management.
    </p>

    <figure style={{ width: '100%', maxWidth: 550 }}>
      <img src={fig1} alt="Figure 1" width={1488} height={1334} />
      <figcaption>
        Figure 1: Flow diagram of the nine key methodological steps used to map
        and diagnose spatially explicit typologies of coastal wetlands ecosystem
        conditionstatus applicable at a global scale.
      </figcaption>
    </figure>

    <p>This web app uses data from the following publications:</p>
    <ul>
      <li>Sievers et al. (in review)</li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.mdpi.com/2072-4292/10/10/1669"
        >
          Bunting et al. 2018
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://onlinelibrary.wiley.com/doi/full/10.1111/geb.12449"
        >
          Hamilton and Casey 2016
        </a>{' '}
        and{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/HKGBGS"
        >
          Hamilton 2015
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.nature.com/articles/s41561-018-0279-1"
        >
          Simard et al. 2019
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://iopscience.iop.org/article/10.1088/1748-9326/aabe1c/meta"
        >
          Sanderman et al. 2018
        </a>{' '}
        and{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/OCYUIT"
        >
          Sanderman 2017
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0179302"
        >
          Thomas et al. 2017
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://data.unep-wcmc.org/datasets/7"
        >
          UNEP-WCMC and Short 2021
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://onlinelibrary.wiley.com/doi/full/10.1111/gcb.15684?casa_token=44d-RcVj8IoAAAAA%3AxQebYugTpkjy5083crKa8kbHW_AwllkUwS4a1t1Pl1ooesL9J7o8LkTbVntJ3aR51-rLxNs-bqBGirB5pw"
        >
          Dunic et al. 2021
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.pnas.org/content/106/30/12377.short"
        >
          Waycott et al. 2009
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5515097/"
        >
          Mcowen et al. 2017
        </a>
      </li>
      <li>
        <a target="_blank" rel="noreferrer" href="https://www.iucnredlist.org/">
          The IUCN Red List of Threatened Species. Version 2020-04
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.nature.com/articles/s41598-019-47201-9"
        >
          Halpern et al. 2019
        </a>{' '}
        and{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://knb.ecoinformatics.org/view/doi:10.5063/F12B8WBS"
        >
          Frazier
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels-monthly-means"
        >
          Hersbach et al. 2019
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://journals.ametsoc.org/view/journals/clim/30/20/jcli-d-16-0836.1.xml"
        >
          Huang et al. 2017
        </a>{' '}
        and{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://journals.ametsoc.org/view/journals/clim/32/9/jcli-d-18-0368.1.xml?tab_body=pdf"
        >
          Huang et al. 2018
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://rmgsc.cr.usgs.gov/ecosystems/datadownload.shtml"
        >
          US Geological Survey 2019
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://oceancolor.gsfc.nasa.gov/products/"
        >
          OceanColour
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.frontiersin.org/articles/10.3389/fmars.2018.00164/full"
        >
          Vestbo et al. 2018
        </a>{' '}
        and{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://snd.gu.se/en/catalogue/study/ecds0243"
        >
          Obst 2017
        </a>
      </li>
    </ul>
    <p>
      <strong>
        Please cite Sievers et al. <em>(in review) Ecological Indicators</em> if
        you use outputs from this web app.
      </strong>{' '}
      See the individual publications above for details or data on specific
      indicators.
    </p>

    <h3 id="instructions">Instructions</h3>
    <p>
      Select the <strong>number of typologies</strong> you would like to view (5
      or 18). Click on a grid cell (100 x 100 km grid cell) to view information
      about the typology that cell belongs to. The <strong>violin plot</strong>{' '}
      shows the spread of values for the range of the grid cells within that
      typology, displaying indicators that best diagnose and differentiate that
      typology. The diamond highlights the specific grid cell you’ve clicked on
      position within the range.
    </p>
    <p>
      You can alter the <strong>quantile</strong> between 0 and 0.99 to change
      the threshold for inclusion of an indicator in the violin plot. The higher
      the quantile is set, the fewer indicators are shown. The more important
      the indicator in diagnosing the typology, the longer it will remain
      visible as you increase the quantile.
    </p>
    <p>
      Occasionally, there will be no indicators shown for higher thresholds (or
      quantiles). This is because there are no clear defining characteristic for
      this typology.
    </p>
    <p>
      You can select the type of coastal wetland habitat/s you would like to
      view -mangrove, saltmarsh, and seagrass. You can select one, two or all
      three habitats. The world map will only show grid cells where the
      habitat/s you selected are located.
    </p>

    <h3 id="terminology">Terminology</h3>
    <p>
      <strong>Indicator</strong> – A measure or metric based on verifiable data
      that conveys information about more than itself; 34 indicators are used in
      this Index.
    </p>
    <p>
      <strong>Habitat</strong> – The three coastal wetland ecosystem types in
      our Index: mangroves, saltmarsh and seagrass.
    </p>
    <p>
      <strong>Typology</strong> – A group of coastal wetland sites that share
      similar indicator values (that fall under three categories 'habitat extent
      change', 'ecological structure and function', or 'cumulative impacts').
    </p>
    <p>
      <strong>Quantile</strong> – The threshold for inclusion of indicators in
      the diagnosis of typologies; drag the quantile higher to show only the
      most important indicators.
    </p>
    <p>
      <strong>Violin plot</strong> – Violin plots show the distribution of data;
      all indicator values within the selected typology are shown, where thicker
      sections of the violin indicate more grid cells with that indicator value.
    </p>
    <p>
      <strong>ID</strong> – The grid cell ID number; each of the 2,845 grid
      cells are given a unique number.
    </p>

    <h3 id="license">MIT License</h3>
    <p>Copyright (c) 2021 The Global Wetlands Project</p>
    <p>
      Permission is hereby granted, free of charge, to any person obtaining a
      copy of this software and associated documentation files (the "Software"),
      to deal in the Software without restriction, including without limitation
      the rights to use, copy, modify, merge, publish, distribute, sublicense,
      and/or sell copies of the Software, and to permit persons to whom the
      Software is furnished to do so, subject to the following conditions:
    </p>
    <p>
      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.
    </p>
    <p>
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
      THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
      DEALINGS IN THE SOFTWARE.
    </p>
  </div>
)

const MenuIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="11.5"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  )
}

export function Menu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const showMenuHelpText = true

  const menuPopupTitle = 'Global Coastal Wetlands Index App'

  const openMenu = () => {
    setMenuIsOpen(true)
  }

  const closeMenu = () => {
    // Remove # from URL
    window.history.replaceState(null, null, '/')
    setMenuIsOpen(false)
  }

  return (
    <Fragment>
      <div className="Menu--MenuButtonWrap" data-hashelptext={showMenuHelpText}>
        <IconButton
          Icon={MenuIcon}
          onClick={openMenu}
          className="Menu--MenuButton"
          title="Open Menu"
          tabIndex={1}
        />
        <div className="Menu--HelpText">
          Click on a grid cell to get started
        </div>
      </div>
      <Popup
        title={menuPopupTitle}
        modalIsOpen={menuIsOpen}
        closeModal={closeMenu}
      >
        <MenuPopupContent />
      </Popup>
    </Fragment>
  )
}
