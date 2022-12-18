
![testing workflow](https://github.com/Werocky/se2022-01-HikeTracker/actions/workflows/testing.yml/badge.svg)

---

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)


[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Werocky_se2022-01-HikeTracker&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Werocky_se2022-01-HikeTracker)

---

<b>This project has been developed by group-01, of the <i><u>Software engineerig II course </i>(2022/2023)</u></b>

## Table of Contents

1. [Docker Documentation](#docker-documentation)
2. [Technical Dept Strategy](#technical-dept-strategy)
3. [Technologies](#technologies)
    - [Frontend](#frontend)
    - [Backend](#backend)
4. [Database](#database)
      - [Database tables](#database-tables)
         - [Users](#user)
            - [Static Users](#static-users)
         - [Hikes](#hike)
         - [Reference Points](#referencepoints)
         - [Points of Hike](#pointsofhike)
         - [Huts](#huts)
         - [Parking Lots](#parking-lots)
         - [Picture](#pictures)
         - [Active Hike points](#activehikepoints)
5. [API calls](#API-calls)
    - [Hikes](#Hikeapi)
    - [Hike Points](#hike-points-api)
    - [Active Hike](#activepointsapi)
    - [Huts](#huts-api)
    - [ParkingLots](#parkinglots-api)
    - [User](#user-api)
    - [Files](#gpx-file-api)
6. [Testing](#testing)
	  - [Testing Frontend](#testing-frontend)
	  - [Testing Backend](#testing-backend)



## Docker Documentation

To correctly use the app using docker you must clone the entire repository, once cloned you must navigate into the root directory of the project and run the following commands into the terminal:  

      docker-compose build && docker-compose up 

It will automatically build the docker images and containers from the project, expose the ports and start the containers.

## Technical Dept Strategy

It was planned touse `Sonarcloud`, to make an assesment of our code.


## Technologies

### Frontend

The language used is `Javascript` with the framework: `ReactJS`.

Here's the list of the installed dependencies:

```json
 "dependencies": {
    "@headlessui/react": "^1.7.5",
    "@material-tailwind/react": "^1.2.4",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.1.3",
    "bcrypt": "^5.1.0",
    "bcryptjs": "^2.4.3",
    "bootstrap": "^5.2.2",
    "bootstrap-icons": "^1.10.2",
    "crypto": "^1.0.1",
    "feather-icons": "^4.29.0",
    "framer-motion": "^7.6.12",
    "fs": "^0.0.1-security",
    "gpxparser": "^3.0.8",
    "leaflet": "^1.9.2",
    "nodemon": "^2.0.20",
    "react": "^18.2.0",
    "react-bootstrap": "^2.6.0",
    "react-bootstrap-icons": "^1.10.2",
    "react-dom": "^18.2.0",
    "react-leaflet": "^4.1.0",
    "react-modal": "^3.16.1",
    "react-phone-number-input": "^3.2.13",
    "react-router-dom": "^6.4.3",
    "react-scripts": "5.0.1",
    "react-slick": "^0.29.0",
    "slick-carousel": "^1.8.1",
    "styled-components": "^5.3.6",
    "tailwindcss": "^3.2.4",
    "twin.macro": "^3.0.1",
    "web-vitals": "^2.1.4"
  }
```

### Backend

The language used is `Javascript` with the framework: `ExpressJS`.

Here's the list of the installed dependencies:

```json
"dependencies": {
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "express": "^4.18.2",
    "express-fileupload": "^1.4.0",
    "express-session": "^1.17.3",
    "express-validator": "^6.14.2",
    "gpxparser": "^3.0.8",
    "morgan": "^1.10.0",
    "nodejs-nodemailer-outlook": "^1.2.4",
    "nodemailer": "^6.8.0",
    "nodemailer-smtp-transport": "^2.7.4",
    "nodemon": "^2.0.20",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "sqlite3": "^5.1.2"
  },
  "devDependencies": {
    "chai": "^4.3.7",
    "chai-http": "^4.3.0",
    "jest": "^29.3.1",
    "mocha": "^10.1.0"
  }
```

## Database

We deiced to work with a relational database, with `SQLite3` as DBMS.

## Database scripts

* from `\server` we created the following scripts for ease of testing and  change.

 <b>To create the db in case of file corruption or other eventualities</b>
```
npm run createTables
```
 <b>To drop the tables of the db in case of wanting to do changes to the db structure</b>
```
npm run dropTables
```
 <b>To automatically load the static entries into the db</b>
```
npm run populate
```
## <u>Database Tables</u>

### `User`

User information.

```
userId(email)
salt
Hash
Role
code
verified
Name
Surname
Phone
```

#### Static Users:

|Username: |password|type|
|-|-|-|
| `a@polito.it`| `password`|`Hut Manager` |
| `b@polito.it`| `password`|`Hiker` |
| `c@polito.it`| `password`|`Hiker`|
| `d@polito.it`| `password`|`Local Guide`|



### `Hike`

Hike Descriptor information.

```
hikeId
title
Description
Ascent
Difficulty
ExpectedTime
Country
Region
Province
City
GpxFile
Start(description)
End(description)
AssociatedGuideID
Length
Picture
```
### `Huts`

Hut descriptor Information.
```
ReferencePointID
Name
HutManagerID
Website
Phone
AvgPrice
WhenOpen
Elevation
Beds
Country
Province
Region
City
Description
Picture
```
### `Parking Lots`

ParkingLot descriptor information.
```
ReferencePointID
AssociatedGuide
NumAuto
Free
```
### `ReferencePoints`

Information about the reference points

```
RefPointID
description
Lat
Lng
type
```
### `Pictures`
Info about the picture files
```
NameFile
associatedPoint
HikeID
```
### `PointsOfHike`
Info about the reference points of a hike.
```
HikeID
RefPointID
IsStart
IsEnd
```
### `ActiveHikePoints`
Info of the active hike points
```
id
HikeID
HikerID
PointID
```
## API calls

### HikeAPI
#### POST
**/getPointsHike**
**/getHikeByID**
**/getFilteredHikes**
**/addHike**

#### GET
**/getHikes**
**/getHikesLocations**
#### PUT
**/setDescription**


### Hike Points API
#### POST
**/HikeInfo**
**/HikeRefPoints**
**/getNearHikes**
#### GET
**/HutsAndParks**
#### PUT
**/setStartEndPoints**


### ParkingLots API
#### POST
**/ParkingLots**
**/ParkingLots**
**/ParkingLots**
#### PUT 
**/ParkingLots**
#### GET
**/ParkingLots**


### Huts API
#### POST
**/hutsFilters**
**/api/LinktoHike?/:RefPointID/Hike/:HikeID**
**/getHut**
**/getHutCoords**
**/hutCreate**
#### PUT
**/setHutDescription**
#### GET
**/hutsLocations**
#### User API
#### POST
**/sessions**
**/sessions/new**
- **Creates a new user account**.
- **Request body**: Hash, Salt, Id: user id/e-mail, role: user type, *Name: first name of user, *Surname: user surname, *Phone: contact phone of user
*non mandatory fields

  example request body
```
{
  "Hash":"dhjyqguygfiaghiufh",
  "Salt":23456787123,
  "Id": "a@polito.it"
  "Role": "LG"
}
```
- **Response**: `200`

- **Permissions allowed**:  Manager
- **Error responses**: `400 user registered yet`(required parameter missing or wrongly formated),`500 Internal Server Error` (generic error).
#### GET
**/sessions/current**
- **check if user is currently logged in**.
- **Request body**: empty.
- **Response**: `200`(if user is authenticated and logged in)
- **Error responses**:  `401 Unauthorized` (not logged in or wrong permissions)

**/verify**
- **retrive user verification status**.
- **Request body**: empty.
- **Request query**: code(verification code set by manager), ID (user to be verified ID)
- **Response**: `201 : Correctly verified`

- **Permissions allowed**:  Manager
- **Error responses**:  `401 Unauthorized` (not logged in or wrong permissions), `422 cannot process reques` wrong code or ID,`503 Internal Server Error` (generic error).
#### DELETE 
**/sessions/current**
- **Logout**.
- **Request body**: empty.
- **Response**: none
- **Error responses**:  none

### GPX file API
#### POST
**/saveFile**
- **Save a new gpx file**.
- **Request body**: empty.
- **Request file**: gpx file.
- **Response**: (success); path: relative path where the file was saved

    ```
    [{
      "status": "success",
      "path": "./gpxFile/FileName.gpx"
    }]

    ```


- **Permissions allowed**:  Local Guide
- **Error responses**:  `401 Unauthorized` (not logged in or wrong permissions), `400 No files were uploaded` missing or wrogly formated file ,`503 Internal Server Error` (generic error).

### ActivePointsAPI
#### POST

**/api/activePoint/PassPoint**

- <b> Register a the time a HikePoint was reached </b>
- **Request header**: empty.
- **Request body**: a JSON object containing HikeID, PointID and HikerID.

Example of request body:
```json
{
  "HikeID": 1,
  "HikerID": "a@polito.it",
  "PointID": 1
}
```
- **Response header**: `200 ActivePoint Saved.`
- **Response body**: none.
- **Permissions allowed**: Hiker
- **Error responses**: `402 Hike not found` HikeID doesnt belong to a Hike in the DB, `403 error':'ReferencePoint not registered to Hike: '+ req.body.HikeID` the PointID doesnt belong to the HikeID or the reference point was not found. `503` generic error.

## Testing

### Testing Frontend

### Testing Backend 

The libraries used for testing are `Jest` for unit testing

To run the unit tests
```
npm test
```
To have a coverage report of 
```
npm run cover
```