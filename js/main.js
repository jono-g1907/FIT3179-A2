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
      console.log("Fetched spec:", spec);  // Debugging line to inspect the fetched spec
      
      if (currentDataset === 'usage') {
        const filterTransform = { "filter": `datum.Year === ${currentYear}` };
        
        if (spec.transform) {
          spec.transform.push(filterTransform);
        } else {
          spec.transform = [filterTransform];
        }
      }

      // Existing code
      const container = document.getElementById('map');
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      console.log("Final spec: ", spec);
      vegaEmbed('#map', spec, { "width": width, "height": height });
    })
    .catch(error => console.error('Error fetching the spec:', error));  // Catch any fetch errors
}

// Initialize the map
renderMap();
