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
  typeOfObject: {
    assignment: 'assignment',
    building: 'building',
    company: 'company',
    review: 'review',
    serviceReport: 'serviceReport',
    meeting: 'meeting',
    offer: 'offer',
    profile: 'profile',
  },
  representedAs: {
    table: false,
    tabList: false,
    customPage: false,
  },
};

export { conditionalObjectRendering, conditionalArrayRendering };
