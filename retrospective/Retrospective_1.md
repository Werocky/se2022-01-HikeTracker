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
| _DB Guide_  |  _2h_  |  _??????????_  |
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


- Hours per task average, standard deviation (estimate and actual)
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated
  - Total hours spent
  - Nr of automated unit test cases 
  - Coverage (if available)
- E2E testing:
  - Total hours estimated
  - Total hours spent
- Code review 
  - Total hours estimated 
  - Total hours spent
  


## ASSESSMENT

- What caused your errors in estimation (if any)?  
We had to read documentation about some new libraries (for example the ones related to the parsing of gpx file and integration of maps). Creating automated testing took longer than exprected. We had some problem managing the databases. On the contrary, we took less time than expected to implement map features after reading the docs.


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