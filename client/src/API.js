const APIURL = 'http://localhost:3001'

async function getHikes() {
    const response = await fetch(APIURL+'/getHikes');
    const hikes = await response.json();
    if (response.ok) {
      return hikes.map((r) => ({ HikeId: r.HikeId, MapId: r.MapId, start: r.start, end: r.end, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, ReferencePoints: r.ReferencePoints, Description: r.Description}) )
    } else {
      throw hikes; //which will contain an error if it is the case
    }
}

async function getFilteredHikes(ExpectedTime, Ascent, MapId, Length, Difficulty) {
    try
        {const response = await fetch(APIURL+'/getFilteredHikes', {
            method: 'GET',
            body: JSON.stringify({ 
                "ExpectedTime": ExpectedTime,
                "Ascent": Ascent,
                "MapId": MapId,
                "Length": Length,
                "Difficulty": Difficulty,
            }),
            headers: {
            'Content-Type': 'application/json',
        },
    });
        const hikes = await response.json();
        if (response.ok) {
        return hikes.map((r) => ({ HikeId: r.HikeId, MapId: r.MapId, start: r.start, end: r.end, Title: r.Title, Length: r.Length, ExpectedTime: r.ExpectedTime, Ascent: r.Ascent, Difficulty: r.Difficulty, ReferencePoints: r.ReferencePoints, Description: r.Description}) )
        } else {
        throw hikes; //which will contain an error if it is the case
    }} catch (ex) {
        throw ex;
    }
}

const API = {getHikes, getFilteredHikes};
export default API;