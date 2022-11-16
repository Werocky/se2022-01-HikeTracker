RETROSPECTIVE (Team 1)
=====================================


- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 4 of stories committed vs. 4 done 
- Total of 24 points committed vs. 24 points done 
-  72 hours planned (12h per person) vs. 50 spent (as a team)

Definition of Done: 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _1 - Browse Hikes_ | _3_ | _8_ | _1d 7h_ | _2d 50m_ |
| _2 - Describe Hikes_ | _6_ | _8_ | _1d 3h_ | _1d 5h 20m_ |
| _3 - Register_ | _3_ | _3_ | _4h_ | _4h_ |
| _4 - See hikes' details_ | _2_ | _5_ | _6h_ | _2h 10m_ |
   
### Tasks statistics
#### 1 - Browse Hikes
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _DB Hike_  |  _4h_  |  _5h 50m_  |
| _basic layout [client]_  |  _4h_  |  _4h_  |
| _API with filters_  |  _7h_  |  _7h_  |

#### 2 - Describe Hikes
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _login_  |  _1h_  |  _3h_  |
| _Add description [client]_  |  _1h 30m_  |  _5h_  |
| _API save description [server]_  |  _1h 30m_  |  _30m_  |
| _DB gpx_  |  _3h_  |  _1h 10m_  |
| _DB Guide_  |  _2h_  |  _1h 30m_  |
| _map integration for hikes [client]_  |  _2h_  |  _3h 10m_  |

> We did the DB guide together with the DB hiker

#### 3 - Register
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _DB hiker_  |  _2h_  |  _30m_  |
| _API add user [server]_  |  _1h_  |  _30m_  |
| _Sign-up form [client]_  |  _1h_  |  _3h_  |

#### 4 - See hikes' details
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _GPX data into tracks [client]_  |  _3h_  |  _40m_  |
| _API get gpx file [server]_  |  _3h_  |  _1h 30m_  |


- Hours per task average: (estimated) 2.57 (actual) 2.64

- ##### Table for estimate standard deviation
| Group | Frequency |
|------|------------|
| _1h_ |  _3_ |
| _2h_ | _5_ |
| _3h_ | _3_ |
| _4h_ | _2_ |
| _5h_-_7h_  | _1_ |

standard deviation: (estimated) 1.55

- ##### Table for actual standard deviation
| Group | Frequency |
|------|------------|
| _1h_ |  _5_ |
| _2h_ | _2_ |
| _3h_ | _3_ |
| _4h_ | _1_ |
| _5h_-_7h_  | _3_ |

standard deviation: (actual) 1.93

- Total task estimation error ratio: ($4\times2$ + 7 + $1\times3$ + $2\times5$ + $3\times3$) / (6 + 4 + + 7 + $3\times3$ + 5 + $1\times5$ + $2\times2$) - 1 = 0.03
  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated:
    - 1h30m
  - Total hours spent: 
    - 1h30m
  - Nr of automated unit test cases: 
    - 19

#### 1 - Browse Hikes
| Task | Hours est. | Hours actual | Nr tests |
|------|------------|--------------|---|
| _DB Hike_  |  _20m_  |  _15m_  | _3_ |
| _DB Hike Location_  |  _-not previewed-_  |  _15m_  | _3_ |

#### 2 - Describe Hikes
| Task | Hours est. | Hours actual |Nr tests |
|------|------------|--------------|---|
| _DB Guide_  |  _30m_  |  _50m_  | _13_ |

> We did the DB guide together with the DB hiker

#### 3 - Register
| Task | Hours est. | Hours actual | Nr tests |
|------|------------|--------------|---|
| _DB hiker_  |  _1h_  |  _10m_  | _3_ |

#### 4 - See hikes' details
| Task | Hours est. | Hours actual | Nr tests |
|------|------------|--------------|--|



  - Coverage (if available)

File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s        
------------------|---------|----------|---------|---------|--------------------------
All files         |   80.45 |    60.65 |   90.76 |   81.59 | 
 DB.js            |   84.61 |       50 |     100 |    87.5 | 26,39,52
 HikeLocations.js |   87.17 |       50 |     100 |   86.48 | 12,26,39,51,63
 Hikes.js         |      75 |    68.57 |      76 |   76.71 | 20,30-39,45-51,61,72,130
 Users.js         |   82.75 |       50 |     100 |   82.75 | 11-12,25,38,49

- E2E testing:
  - Total hours estimated
  - Total hours spent

- Code review 
  - Total hours estimated:
    - 3h
  - Total hours spent:
    - 3h20m 
  


## ASSESSMENT

- What caused your errors in estimation (if any)?  
We had to read documentation about some new libraries (for example the ones related to the parsing of gpx file and integration of maps). Creating automated testing took longer than exprected. We had some problem managing the databases. On the contrary, we took less time than expected to implement map features after reading the docs.
The implementation of automatic testing on github and the docker took unexpected resources out of the project implementation.


- What lessons did you learn (both positive and negative) in this sprint?  
We learnt how to manage Leaflet library and GpxParser library and also we understood how to create Docker containers. On the other hand we had some limitations using the SQLite database but we managed to achieve the exprected results with some workarounds.

- Which improvement goals set in the previous retrospective were you able to achieve?  
We improved the subdivsion of tasks and the definition of them. Also we were able to comunicate between each of us to solve different problems arising during development.
  
- Which ones you were not able to achieve? Why?  
We weren't able to improve the time managment related to testing because we started working on setting up automatic tests and since this was the beginning of the project, the effort required was higher than other time.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)  
Improve time management, related to testing with more teamwork in order to speed up the process.  
Improve meetings quality and frequency to alert other team members about project problems/issues and overall progress.


- One thing you are proud of as a Team!!  
We were able to commit all the stories we started working on without exceed to much on the time budget.
