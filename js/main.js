// Variable to hold current dataset
let currentDataset = 'prices';

// Function to switch dataset and re-render the map
function switchDataset(dataset) {
  currentDataset = dataset;
  renderMap();
}

// Function to render the map based on current dataset
function renderMap() {
  let vegaLiteSpecFile = "";

  // Determine which spec file to use based on current dataset
  if (currentDataset === 'prices') {
    vegaLiteSpecFile = "https://raw.githubusercontent.com/jono-g1907/FIT3179-A2/main/js/prices_map.json";
  } else {
    vegaLiteSpecFile = "https://raw.githubusercontent.com/jono-g1907/FIT3179-A2/main/js/usage_map.json";
  }

  // Fetch and render the map
  fetch(vegaLiteSpecFile)
    .then(response => response.json())
    .then(spec => {
      const container = document.getElementById('map');
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      vegaEmbed('#map', spec, { "width": width, "height": height });
    })
    .catch(error => console.error('Error fetching the spec:', error));
}

// Initialize the map
renderMap();
