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

## Explanation

We have a seperation of concerns here. The API (`/api/*`) and the UI (`/src/*`). Both are separate node services. The api is Express and extended with Kraken. The UI is React/Redux and rendered on the server for Universal JavaScript.