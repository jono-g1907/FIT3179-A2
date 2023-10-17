let currentDataset = 'prices';
let currentYear = 1980;

// Function to switch dataset
function switchDataset(dataset) {
    currentDataset = dataset;
    const yearSliderDiv = document.getElementById('yearSliderDiv');
    
    if (currentDataset === 'usage') {
      yearSliderDiv.style.display = 'block';
    } else {
      yearSliderDiv.style.display = 'none';
    }
    
    renderMap();
  }
    
// Function to update year
function updateYear(year) {
  currentYear = year;
  renderMap();
}

// Function to render the map
function renderMap() {
  let vegaLiteSpecFile = "";

  if (currentDataset === 'prices') {
    vegaLiteSpecFile = "prices_map.json";
  } else {
    vegaLiteSpecFile = "usage_map.json";
  }

  fetch(vegaLiteSpecFile)
    .then(response => response.json())
    .then(spec => {
      if (currentDataset === 'usage') {
        spec.transform = [{ "filter": `datum.Year === ${currentYear}` }];
      }

      vegaEmbed('#map', spec);
    });
}

// Initialize the map
renderMap();