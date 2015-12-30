# F Interagency Network Databank

To support increased efficiencies and effectiveness in how USG agencies incorporate country performance data into foreign policy decision making regarding policy, strategies, and programs, the Office of U.S. Foreign Assistance Resources (F) is assembling a database of country-level performance indicators.  F’s database will primarily contain aggregated information from publicly available sources, and is to be communicated in data form as well as visually through charts and maps.  This system was tentatively called the Databank and is now referred to as the F Interagency Network Databank (FIND).

This site is developed by the Office of eDiplomacy. For questions or concerns, please contact steppdn@state.gov


## Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Usage

### Structure

We have a seperation of concerns here. The API (`/api/*`) and the UI (`/src/*`). Both are separate node services. The api is Express and extended with Kraken. The UI is React/Redux and rendered on the server for Universal JavaScript.

### React/Redux

EXAMPLES:

#### Map

Redux will handle all of the map state/data in a tree structure. **Actions** are the only thing that can change, and produce a new state for the map. **Reducers** produce the new state using the actions, without mutating the previous state. This is [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming). Every possible action that can be acted on must be accounted for: ['ACTION_NAME, ACTION2_NAME']. After a new state is established React will notice, and then change the UI that corresponds on the changed state. In the case of the Map, a component designed with Leaflet will be the underlying UI that is changed. 

TODO: Link to code examples in the project, define actual actions

```json
map {
	baseGeography: {'GEOJSON_OF_MAP'},
	selectedGeography: [
		{
			name: 'Example_CountryName',
			unit: 'Data_Associated_With_Country'
		}
	]
}
```