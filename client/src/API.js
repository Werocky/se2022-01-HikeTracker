import axios from "axios";

const APIURL = 'http://localhost:3001'

/* LOADING DATA FROM SERVER */
async function getHikes() {
  const response = await fetch(APIURL + '/getHikes');
  const hikes = await response.json();
  if (response.ok) {
    return hikes.map((r) => ({
      HikeID: r.HikeID,
      Start: r.Start,
      End: r.End,
      Title: r.Title,
      Length: r.Length,
      ExpectedTime: r.ExpectedTime,
      Ascent: r.Ascent,
      Difficulty: r.Difficulty,
      Description: r.Description,
      Country: r.Country,
      Province: r.Province,
      Region: r.Region,
      AssociatedGuide: r.AssociatedGuide,
      City: r.City,
      Picture:r.Picture
    }))
  } else {
    throw hikes; //which will contain an error if it is the case
  }
}

//get Hike, given its HikeID
async function getHike(HikeID) {
  try {
    const response = await fetch(APIURL + '/getHikeByID', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "HikeID": HikeID,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const hike = await response.json();
    if (response.ok) {
      //console.log(hike);
      return hike;
    } else {
      throw hike; //which will contain an error if it is the case
    }
  } catch (ex) {
    throw ex;
  }
}

async function getMyHikes() {
  const response = await fetch(APIURL + '/getMyHikes',
  {
    credentials: 'include',
   } );
  const hikes = await response.json();
  if (response.ok) {
    return hikes.map((r) => ({
      HikeID: r.HikeID,
      Start: r.Start,
      End: r.End,
      Title: r.Title,
      Length: r.Length,
      ExpectedTime: r.ExpectedTime,
      Ascent: r.Ascent,
      Difficulty: r.Difficulty,
      Description: r.Description,
      Country: r.Country,
      Province: r.Province,
      Region: r.Region,
      AssociatedGuide: r.AssociatedGuide,
      City: r.City,
      Picture:r.Picture
    }))
  } else {
    throw hikes; //which will contain an error if it is the case
  }
}

//GET HIKES LOCATIONS
async function getHikesLocations() {
  try {
    const response = await fetch(APIURL + '/hikesLocations', {
      method: 'GET',
    });
    const result = await response.json();
    if (response.ok)
      return result
    else
      throw result;
  } catch (err) {
    throw err;
  }
}

async function getHikeInfo(HikeID) {
  try {
    const response = await fetch(APIURL + '/HikeInfo', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "HikeID": HikeID,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const hikeInfo = await response.json();
    if (response.ok)
      return hikeInfo;
    else
      throw hikeInfo;
  } catch (err) {
    throw err;
  }
}

async function getHutsAndParks() {
  try {
    const response = await fetch(APIURL + '/HutsAndParks', {
      method: 'GET',
    });
    const info = await response.json();
    if (response.ok)
      return info;
    else
      throw info;
  } catch (err) {
    throw err;
  }
}

async function setStartEndPoints(HikeId, StartId, EndId, Start, End) {
  try {
    const response = await fetch(APIURL + '/setStartEndPoints', {
      method: 'POST',
      body: JSON.stringify({
        "Id": HikeId,
        "StartId": StartId,
        "EndId": EndId,
        "Start": Start,
        "End": End
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (!response.ok)
      throw response;
  } catch (err) {
    throw err;
  }
}

async function getFilteredHikes(minExpectedTime, maxExpectedTime, minAscent, maxAscent, filterType, filterValue, minLength, maxLength, Difficulty) {
  try {
    const response = await fetch(APIURL + '/getFilteredHikes', {
      method: 'POST',
      body: JSON.stringify({
        "Length": [minLength, maxLength],
        "ExpectedTime": [minExpectedTime, maxExpectedTime],
        "Ascent": [minAscent, maxAscent],
        "filterType": [filterType, filterValue],
        // "filterValue": filterValue,
        "Difficulty": Difficulty
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const hikes = await response.json();
    if (response.ok) {
      //console.log(hikes);
      return hikes;
    } else {
      throw hikes; //which will contain an error if it is the case
    }
  } catch (ex) {
    throw ex;
  }
}

function setDescription(Description, HikeID) {
  return new Promise((resolve, reject) => {
    fetch((APIURL + '/setDescription'), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Description: Description, HikeID: HikeID }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((obj) => { reject(obj); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
}

async function addHike(hike, file, points, guideId,picture) {
  try {

    const data = new FormData();
    data.append("file", file);
    
    const response1 = await axios({
      method: "post",
      url: "http://localhost:3001/saveFile",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response1.statusText==="OK") {
      const response2 = await fetch((APIURL + '/addHike'), {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          "hike": hike,
          "points": points,
          "guideId": guideId,
          
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const hikeId = await response2.json();
      if (response2.ok) {
        console.log(hikeId);
        const data = new FormData();
      data.append("hikeId", hikeId);
      data.append("file", picture);
     
      
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/saveHikePicture/"+hikeId.hikeId,
        data: data,
        //headers: { "Content-Type": "multipart/form-data" },
      });
      if(response.ok)
         return hikeId;
      } else {
        throw hikeId;
      }

    }
  } catch (err) {
    throw err;
  }
}


async function startHike(hikeId,PointId) {
  try {

      const response = await fetch((APIURL + '/api/activePoint/GenerateActiveHike'), {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          "HikeID": hikeId,
          "PointID": PointId,          
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
         return hikeId;
      } else {
        throw hikeId;
      }
  } catch (err) {
    throw err;
  }
}

//retrieve points of the hike's track, given HikeID
async function getPointsHike(HikeID) {
  try {
    const response = await fetch(APIURL + '/getPointsHike', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "HikeID": HikeID,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const points = await response.json();
    if (response.ok) {
      return points;
    } else {
      throw points; //which will contain an error if it is the case
    }
  } catch (ex) {
    throw ex;
  }
}

// retrieve list of near hikes, given radius and coordinates
async function getNearHikes(radius, lat, lng) {
  try {
    const response = await fetch(APIURL + '/getNearHikes', {
      method: 'POST',
      body: JSON.stringify({
        "radius": radius,
        "lat": lat,
        "lng": lng,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const hikes = await response.json();
    if (response.ok) {
      return hikes
    } else {
      throw hikes; //which will contain an error if it is the case
    }

  } catch (err) {
    throw err;
  }
}

/*** PARKING LOT FUNCTIONS ***/

async function createParkingLot(ParkingLot) {
  try {
    const response = await fetch((APIURL + '/ParkingLots'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "ParkingLot": ParkingLot
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const value = await response.json();
    if (response.ok) {
      return value;
    } else {
      throw value;
    }
  } catch (err) {
    throw err;
  }
}

async function updateParkingLot(description, parkingId, free, RefPointID, coord) {
  try {
    const response = await fetch(APIURL + '/ParkingLots', {
      method: 'PUT',
      body: JSON.stringify({
        "Description": description,
        "ParkingID": parkingId,
        "free": free,
        "RefPointID": RefPointID,
        "lat": coord.lat,
        "lng": coord.lng,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok ? true : false;
  } catch (err) {
    throw err;
  }
}

async function getParkingLots() {
  try {
    const response = await fetch(APIURL + '/ParkingLots', {
      method: 'GET',
    });
    const result = await response.json();
    if (response.ok)
      return result
    else
      throw result;
  } catch (err) {
    throw err;
  }
}

async function getParkingLot(id) {
  try {
    const response = await fetch(APIURL + '/ParkingLots', {
      method: 'GET',
      body: JSON.stringify({
        "ParkingID": id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (response.ok)
      return result
    else
      throw result;
  } catch (err) {
    throw err;
  }
}

async function deleteParkingLot(id) {
  try {
    const response = await fetch(APIURL + '/ParkingLots', {
      method: 'DELETE',
      body: JSON.stringify({
        "ParkingID": id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok ? true : false;
  } catch (err) {
    throw err;
  }
}

async function getHutsFilters(name, location, WhenOpen, beds, avgPrice) {
  try {
    const response = await fetch(APIURL + '/hutsFilters', {
      method: 'POST',
      body: JSON.stringify({
        "name": name ? name : null,
        "location": location ? location : null,
        "WhenOpen": WhenOpen ? WhenOpen : null,
        "beds": beds ? beds : null,
        "avgPrice": avgPrice ? avgPrice : null,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const huts = await response.json();
    if (response.ok) {
      return huts
    } else {
      throw huts; //which will contain an error if it is the case
    }
  } catch (err) {
    throw err;
  }
}

async function getHutsLocations() {
  try {
    const response = await fetch(APIURL + '/hutsLocations', {
      method: 'GET',
    });
    const result = await response.json();
    if (response.ok)
      return result
    else
      throw result;
  } catch (err) {
    throw err;
  }
}

/* LOGIN FUNCTIONS */
async function logIn(credentials) {
  let response = await fetch((APIURL + '/sessions'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  const response = await fetch((APIURL + '/sessions/current'), { method: 'DELETE', credentials: 'include' });
  return response.ok ? true : false;
}

async function getUserInfo() {
  const response = await fetch((APIURL + '/sessions/current'), { credentials: 'include' });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;
  }
}

async function register(credentials) {
  console.log(credentials);
  const response = await fetch((APIURL + '/sessions/new'), {
    method: 'POST',
    body: JSON.stringify({
      'Hash': credentials.Hash,
      'Salt': credentials.Salt,
      'Id': credentials.Id,
      'Role': credentials.Role,
      'Name': credentials.Name,
      'Surname': credentials.Surname,
      'Phone': credentials.Phone
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (response.ok) {
    const res = await response.json();
    return res;
  } else {
    const errDetail = { error: 'something went wrong with your registration!' };
    return errDetail;
  }

}

async function verify() {
  const currentLocation = window.location.href;
  const params = currentLocation.split('?')[1];
  try {
    const response = await fetch(APIURL + '/verify' + '?' + params, {
      method: 'GET',
    });
    const result = await response.json();
    if (response.ok)
      return result
    else
      throw result;
  } catch (err) {
    throw err;
  }
}

function setHutDescription(Description, RefPointID) {
  return new Promise((resolve, reject) => {
    fetch((APIURL + '/setHutDescription'), {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Description: Description, RefPointID: RefPointID }),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        response.json()
          .then((obj) => { reject(obj); })
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
}

async function addHut(Hut,picture) {
  try {
    const response = await fetch((APIURL + '/hutCreate'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "Hut": Hut
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const value = await response.json();
    console.log("questo è il value: "+value);
    const hutId=value.hut.RefPointID;
    console.log(hutId);
    if (response.ok) {
      const data = new FormData();
      data.append("hutId", hutId);
      data.append("file", picture);
     
      
      const response1 = await axios({
        method: "post",
        url: "http://localhost:3001/saveHutPicture/"+hutId,
        data: data,
        //headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("finito");
      return value;
    } else {
      throw value;
    }
  } catch (err) {
    throw err;
  }
}




async function getHut(Hut) {
  try {
    const response = await fetch((APIURL + '/getHut'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "Hut": Hut,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const value = await response.json();
    if (response.ok) {
      return value;
    } else {
      throw value;
    }
  } catch (err) {
    throw err;
  }
}

async function getHutCoords(Hut) {
  try {
    const response = await fetch((APIURL + '/getHutCoords'), {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "Hut": Hut
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const value = await response.json();
    if (response.ok) {
      return value;
    } else {
      throw value;
    }
  } catch (err) {
    throw err;
  }
}

async function linkHutToHike(RefPointID, HikeID) {
  try {
    console.log(RefPointID, HikeID);
    const response = await fetch((APIURL + `/api/LinktoHike/${RefPointID}/Hike/${HikeID}`), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const value = await response.json();
    if (response.ok) {
      return value;
    } else {
      throw value;
    }
  } catch (err) {
    throw err;
  }
}

//GET HIKES REF POINTS
async function getHikeRefPoints(hikeID) {
  try {
    const response = await fetch(APIURL + '/hikeRefPoints/'+hikeID, {
      method: 'GET',
    });
    const result = await response.json();
    if (response.ok)
      return result
    else
      throw result;
  } catch (err) {
    throw err;
  }
}

const API = {
  getHikes,
  logIn,
  logOut,
  getUserInfo,
  getFilteredHikes,
  register,
  setDescription,
  getHike,
  getPointsHike,
  getNearHikes,
  getParkingLot,
  getParkingLots,
  updateParkingLot,
  createParkingLot,
  deleteParkingLot,
  getHutsFilters,
  getHutsLocations,
  addHike,
  getHikeInfo,
  getHutsAndParks,
  setStartEndPoints,
  verify,
  setHutDescription,
  addHut,
  getHut,
  getHutCoords,
  getHikesLocations,
  linkHutToHike,
  getHikeRefPoints,
  getMyHikes,
  startHike
};
export default API;