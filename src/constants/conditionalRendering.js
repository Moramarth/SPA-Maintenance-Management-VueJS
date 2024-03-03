const conditionalArrayRendering = {
  typeOfList: {
    assignments: 'assignments',
    buildings: 'buildings',
    companies: 'companies',
    reviews: 'reviews',
    serviceReports: 'serviceReports',
    meetings: 'meetings',
    offers: 'offers',
  },
  objectsListedAs: {
    table: false,
    cards: false,
    testimonials: false,
  },
  desiredFilters: {
    byBuilding: false,
    byRating: false,
    byReportStatus: false,
    byReportType: false,
    bySearch: false,
  },
};

const conditionalObjectRendering = {
// ToDO: Edit object structure
  assignment: 'assignment',
  building: 'building',
  company: 'company',
  review: 'review',
  serviceReport: 'serviceReport',
  meeting: 'meeting',
  offer: 'offer',
  representedAs: {
    table: false,
  },
};

export { conditionalObjectRendering, conditionalArrayRendering };
