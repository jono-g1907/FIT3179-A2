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
    vegaLiteSpecFile = "https://raw.githubusercontent.com/jono-g1907/FIT3179-A2/main/js/prices_map.json";
  } else {
    vegaLiteSpecFile = "https://raw.githubusercontent.com/jono-g1907/FIT3179-A2/main/js/usage_map.json";
  }

  fetch(vegaLiteSpecFile)
    .then(response => response.json())
    .then(spec => {
      if (currentDataset === 'usage') {
        const usageLayer = spec.layer.find(layer => layer.data.url === "https://raw.githubusercontent.com/jono-g1907/FIT3179-A2/main/data/internet%20usage.csv");
        const filterTransform = { "filter": `datum.Year === ${currentYear}` };
        
        if (usageLayer.transform) {
          usageLayer.transform.push(filterTransform);
        } else {
          usageLayer.transform = [filterTransform];
        }
      }

      // Get the dimensions of the container
      const container = document.getElementById('map');
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      console.log("Final spec: ", spec);
      // Embed the visualization, setting its size to match the container
      vegaEmbed('#map', spec, { "width": width, "height": height });
    });
}

// Initialize the map
renderMap();
