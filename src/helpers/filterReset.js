function paginationReset() {
  document.querySelector('#item-per-page-choice').selectedIndex = 0;
}

function searchReset() {
  document.querySelector('#search-box').value = '';
}

function reportTypeSelectorReset() {
  document.querySelector('#report-type-selector').selectedIndex = 0;
}
function reportStatusSelectorReset() {
  document.querySelector('#report-status-selector').selectedIndex = 0;
}

function ratingReset() {
  document.querySelector('#rating').selectedIndex = 0;
}

function buildingFilterReset() {
  document.querySelector('#buildings-filter').selectedIndex = 0;
}

export { paginationReset, searchReset, reportTypeSelectorReset, reportStatusSelectorReset, ratingReset, buildingFilterReset };
