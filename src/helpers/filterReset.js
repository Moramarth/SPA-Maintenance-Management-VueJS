const filterElementId = {
  pagination: '#item-per-page-choice',
  search: '#search-box',
  reportType: '#report-type-selector',
  reportStatus: '#report-status-selector',
  rating: '#rating',
  building: '#buildings-filter',
};

function paginationReset() {
  document.querySelector(filterElementId.pagination).selectedIndex = 0;
}

function searchReset() {
  document.querySelector(filterElementId.search).value = '';
}

function reportTypeSelectorReset() {
  document.querySelector(filterElementId.reportType).selectedIndex = 0;
}
function reportStatusSelectorReset() {
  document.querySelector(filterElementId.reportStatus).selectedIndex = 0;
}

function ratingReset() {
  document.querySelector(filterElementId.rating).selectedIndex = 0;
}

function buildingFilterReset() {
  document.querySelector(filterElementId.building).selectedIndex = 0;
}

export {
  paginationReset,
  searchReset,
  reportTypeSelectorReset,
  reportStatusSelectorReset,
  ratingReset,
  buildingFilterReset,
  filterElementId,
};
