import { defaultPaginator } from '../constants/paginatorDefault';

const defaultvalues = { ...defaultPaginator };
const filterBy = {
  reportStatus: (array, filters) => array.filter(report => report.report_status === filters.reportStatus),
  reportType: (array, filters) => array.filter(report => report.report_type === filters.reportType),
  search: (array, filters, searchFiled) => array.filter(obj => obj[searchFiled].includes(filters.search)),
  building: (array, filters) => array.filter(obj => obj.name === filters.building),
  rating: (array, filters) => array.filter(obj => obj.rating === filters.rating),
};

function applyFiltersToArray(initialArray, appliedFilters, searchFiled) {
  let currentArray = [...initialArray];
  for (const filter in appliedFilters) {
    if (appliedFilters[filter]) {
      if (filter === 'search')
        currentArray = filterBy[filter](currentArray, appliedFilters, searchFiled);
      else currentArray = filterBy[filter](currentArray, appliedFilters);
    }
  }
  return currentArray;
};

function getQueryset(array, paginator) {
  const startIndex = (paginator.currentPage - 1) * paginator.rowsPerPage;
  const endIndex = startIndex + paginator.rowsPerPage;
  return array.slice(startIndex, endIndex);
};
function calculateTotalPages(array, paginator) {
  const totalPages = Math.ceil(array.length / paginator.rowsPerPage);
  if (totalPages === 0)
    return 1;
  return totalPages;
};

function clearFilters(applied, pagination) {
  for (const filter in applied) {
    if (typeof applied[filter] === 'number')
      applied[filter] = 0;
    else applied[filter] = '';
  }

  pagination.rowsPerPage = defaultvalues.rowsPerPage;
  pagination.currentPage = defaultvalues.currentPage;
}

export {
  clearFilters,
  applyFiltersToArray,
  getQueryset,
  calculateTotalPages,
};
