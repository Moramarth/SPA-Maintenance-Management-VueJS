# SPA-Maintenance-Management-VueJS


SPA for Ticketing system focused on office buildings maintenance.
The application is based on my [Maintenance-Management](https://github.com/Moramarth/Maintenance-Management) project.
It currently  supports the features for Client Group Users.
# Quick navigation

- [Public part](#available-to-the-public)
- [Private part](#available-after-login)
- [Data fetching](#fetching-the-data)
- [Data Validation](#validation)
- [State management](#state-management)
- [Styles](#styles)


## Available to the public
- Home page
- Login page
- Page with information about the registration process. Registration is only available after invitation( not implemented in this project at the moment)
- Overview pages for Building and Partners Companies
- Details page for Buildings with Google Maps API for their address and exact pinned location
- Details page for Companies with partial availability
- Overview and details pages for Client Feedback
- Some filters and pagination implemented


## Available after login
- Profile Details page 
    * You can browse profiles for contacts info
    * Editing profile is available only if you are the owner
    * Additional brief information about the company you are employee at and the address of the Building you are current resident/tenant

- Company Details page
    * Editing available only for company employees
    * More info for the company is presented
    * You can see all company employees and shortcut to their profile

- Service report (ticket) pages
    * Can create reports
    * Can edit reports if they are still not processed by the Engineering/Supervisor
    * Can delete reports rules for edit apply here too
    * Can list all posted reports at the moment, filter by Status or Report type, search for title partial match(case sensitive), pagination also available
    * Can see report details page, shortcuts to images and related personel available
    * Once your Service Report is fully processed and with "DONE" status you can add your review (not required)

- Reviews page
    Create or Edit review can be access after login.
    You can only edit posts that you made.

[back to start](#SPA-Maintenance-Management-VueJS)

## Fetching the data

Axios used for the requests.
Data comes from the REST part of Maintenance-Management server. You can check the API code [here](https://github.com/Moramarth/Maintenance-Management/tree/main/maintenance_management/api)

## Validation

Vuelidate used for most of the form validations.
Some custom validation with DOM manipulation implemented.
Auth with JWT, some per route guards with verification calls to the backend.

## State management

Used Pinia for some of the more complex DB relationships. Rest of the data flow with props/emits usually between direct parent/child nodes.


## Styles

Bootstrap 5, Fontawesome, global and scoped custom css.


[back to start](#SPA-Maintenance-Management-VueJS)