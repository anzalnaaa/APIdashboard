# API Dashboard

Lab 8: JSON + jQuery + AJAX/Fetch. Web Technologies, University of Sindh.

## Features
- Request 1 (Fetch API): loads `data/sample.json` and renders the students table
- Request 2 (jQuery AJAX): loads `data/stats.json` and fills the KPI cards
- Loading, empty and error states (with a "Try again" button)
- Search by name or email, department filter, pagination (5 rows per page)
- Refresh button and last-updated timestamp
- Works offline with local JSON (Bootstrap and jQuery load from a CDN, so internet is needed for styles and jQuery)

## Run
Fetch cannot read local files when a page is opened by double-click, so serve it through localhost.
Copy the `api-dashboard` folder into XAMPP `htdocs`, start Apache and open http://localhost/api-dashboard/

## Structure
```
api-dashboard/
├── index.html
├── css/style.css
├── js/app.js
└── data/ sample.json, stats.json
```

## Fetch vs jQuery AJAX (used in this lab)
| | Fetch | jQuery AJAX |
|---|---|---|
| Style | Promises (`.then`) | `$.ajax` with `.done` / `.fail` |
| HTTP errors (404, 500) | Not an error by default; check `response.ok` | Goes to `.fail` automatically |
| JSON parsing | Call `response.json()` yourself | `dataType: "json"` parses it |
| Dependency | Built into the browser | Needs the jQuery library |

## Test cases (fill in Actual Result and Status after running in the browser)
| ID | Feature | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| TC-01 | Load | Open page | 5 rows, "Showing 12 of 12 students", KPI cards filled | | |
| TC-02 | Pagination | Click page 3 | Last 2 students shown | | |
| TC-03 | Search | Type "fatima" | 2 matching rows | | |
| TC-04 | Empty state | Type "zzz" | "No students match your search" message | | |
| TC-05 | Filter | Department = Data Science | 3 rows | | |
| TC-06 | Error state | Rename `data/sample.json`, click Refresh | Red error message with "Try again" | | |
| TC-07 | Network tab | Reload with DevTools open | `sample.json` (fetch) and `stats.json` (xhr) both return 200 | | |
