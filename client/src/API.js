const APIURL = 'http://localhost:3001'

/* LOADING DATA FROM SERVER */
async function getHikes() {
  const response = await fetch(APIURL + '/getHikes');
  const hikes = await response.json();
  if (response.ok) {
    return hikes.map((r) => ({ HikeID: r.HikeID, Start: r.Start, End: r.End, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, Description: r.Description }))
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
      return hike;
    } else {
      throw hike; //which will contain an error if it is the case
    }
  } catch (ex) {
    throw ex;
  }
}

async function getFilteredHikes(minExpectedTime, maxExpectedTime, minAscent, maxAscent, Province, City, minLength, maxLength, Difficulty) {
  try {
    const response = await fetch(APIURL + '/getFilteredHikes', {
      method: 'POST',
      body: JSON.stringify({
        "Length": [minLength, maxLength],
        "ExpectedTime": [minExpectedTime, maxExpectedTime],
        "Ascent": [minAscent, maxAscent],
        "Province": Province,
        "City": City,
        "Difficulty": Difficulty
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const hikes = await response.json();
    console.log(hikes);
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
async function getNearHikes(radius, coord) {
  try {
    const response = await fetch(APIURL + 'getNear/Hikes', {
      method: 'POST',
      body: JSON.stringify({
        "radius": radius,
        "lat": coord.lat,
        "lng": coord.lng,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const hikes = await response.json();
    if(response.ok) {
      return hikes
    } else {
      throw hikes; //which will contain an error if it is the case
    }

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
  const response = await fetch((APIURL + '/sessions/new'), {
    method: 'POST',
    body: JSON.stringify({
      'Hash': credentials.Hash,
      'Salt': credentials.Salt,
      'Id': credentials.email,
      'Role': credentials.Role
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.ok ? true : false;
}

const API = { getHikes, logIn, logOut, getUserInfo, getFilteredHikes, register, setDescription, getHike, getPointsHike, getNearHikes };
export default API;