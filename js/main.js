// Variable to hold current dataset
let currentDataset = 'prices';

// Function to switch dataset and re-render the map
function switchDataset(dataset) {
  currentDataset = dataset;
  renderMap();
  updateDescription();  // Add this line to update the description
}

// Function to update the paragraph description based on the current dataset
function updateDescription() {
  // Hide all descriptions
  document.getElementById('prices-description').style.display = 'none';
  document.getElementById('usage-description').style.display = 'none';
  document.getElementById('history-description').style.display = 'none';  // New Line

  
  // Show the description corresponding to the current dataset
  document.getElementById(currentDataset + '-description').style.display = 'block';
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
      container.style.width = '600px';
      container.style.height = '400px'
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      vegaEmbed('#map', spec, { "width": width, "height": height });
    })
    .catch(error => console.error('Error fetching the spec:', error));
}

// Function to load the bar chart
function loadNewChart() {
  const vegaLiteSpecFile = "https://raw.githubusercontent.com/jono-g1907/FIT3179-A2/main/js/average_internet_prices_vega_lite_spec_csv.json";

  fetch(vegaLiteSpecFile)
    .then(response => response.json())
    .then(spec => {
      vegaEmbed('#barChart', spec)
        .catch(error => console.error('Error embedding the new chart:', error));
    });
}

// Initialize the map and description
renderMap();
updateDescription();  // Initialize the description as well
loadNewChart();
