# Performance Comparator

This is an experimental React based frontend using Vite, Typescript, Tailwind CSS and the [Element Framework](https://ui.refinitiv.com/) from LSEG.

The problem it tries to solve is comparing performance runs from test environments on software packages, and quickly comparing the outputs.

Taking data from datadog, the core of the app is the JSON files that represent an export of the data from DD. Any metric or unit can be present, with context of whether lower is better (latency, CPU usage), or whether higher is better (message consumption rates.)

## Setup guide

- Clone the repository
- `cd` into the folder
- `yarn` to install dependencies (npm should work too)
- `yarn run dev` will start the vite build tool. You can simply press `o` to open the browser window.

## Testing

Inside `src/data-examples` are sample JSON files that you can import for dev use. Simple go into the import runs sidebar item and use the multiple file picker to add them into localstorage.

Given the nature of this experiment - no automated tests have been created.