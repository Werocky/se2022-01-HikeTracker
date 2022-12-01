RETROSPECTIVE (Team 1)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 6 of stories committed vs. 3 done 
- Total of 17 points committed vs. 11 points done 
- Total of 73h 05m planned  vs. 80h 25m spent (as a team)

**Notes**: the total time estimated includes the 6 stories and also _horizontal tasks_ we have create to solve bugs and issue emerged from the Demo 1. Some of them took longer than expected such as create the collection of 50 hikes.

 Definition of Done: 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _5 - Describe Hut_            | _3_ | _3_ | _6h_ | _1d 1h 15m_ |
| _6 - Describe Parking_        | _2_ | _3_ | _3h_ | _5h 50m_ |
| _7 - Search Hut_              | _3_  | _2_ |_7h_ | _1d 1h 20m_ |
| _8 - Link Start/Arrival_      | _2_ | _3_ | _3h 30m_ | _1d 1h 15m_ |
| _9 - Link hut_                | _5_ | _3_ | _1d 1h 30m_ | _0h_ |
| _33 - Define Reference Points_| _3_ | _8_ | _6h 40m_ | _0h_ |


### Tasks statistics
#### 5 - Describe Hut
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _5-1-add a hut description [CLIENT side]_  |  _2h_  |  _3h 45m_  |
| _5-2- save hut description [SERVER side]_  |  _1h_  |  _2h 45m_  |
| _5-3- DB Reference Points_  |  _3h_  |  _2h 45m_  |


#### 6 - Describe Parking
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _6-1-add a parking lot [CLIENT side]_  |  _2h_  |  _3h 20m_  |
| _6-2-save reference point [SERVER side]_  |  _1h_  |  _2h 30m_  |

#### 7 - Search Hut_ 
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _7-1-searching huts [CLIENT side]_  |  _3h_  |  _2h 30m_  |
| _7-2-API get huts searched[SERVER side]_  |  _2h_  |  _2h_  |
| _7-3-DB huts_  |  _2h_  |  _4h 50m_  |

#### 8 - Link Start/Arrival
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _8-1-modify start/arrival points [CLIENT side]_  |  _1h_  |  _5h_  |
| _8-2-API save start/arrival points [SERVER side]_  |  _2h 30m_  |  _4h 15m_  |

#### 9 - Link hut
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _9-1-link hut to hike [CLIENT side]_| _3h_ | _0h_ |
| _9-2-API save the link [SERVER side]_| _2h_ | _0h_ |
| _9-3-Testing API_ | _2h_ | _0h_ |
| _9-4-Testing DB_ | _2h_ | _0h_ |
| _9-5-Manual testing_ | _30m_ | _0h_ |

#### 33 - Define Reference Points
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _33-1-API to add a REference Point [SERVER side]_ | _1h_ | _0h_ |
| _33-2-Form to insert a Reference Point [CLIENT side]_ | _2h_ | _0h_ |
| _33-3-API to add info related to Reference Point [SERVER side]_ | _1h 40m_ | _0h_ |
| _33-4-Form to add info related to Reference Point_ | _2h_ | _0h_ |

#### Horizonal tasks
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _fix bug of demo1_  |  _5h_  |  _9h_  |
| _collect DATA (¬50 Hike tracks)_  |  _5h_  |  _7h 35m_  |
| _Geographical Filter_  |  _2h 30m_  |  _2h 30m_  |
| _Fix bug of story #2_  |  _2h_  |  _2h_  |
| _Mail Registration functionality_  |  _4h_  |  _4h_  |
| _Error Handling_  |  _3h_  |  _1h 30m_  |
| _DB Restructure_  |  _2h_  |  _50m_  |
| _Database redesign_  |  _1h 30_  |  _1h_  |
| _layout for sprint2_  |  _12h_  |  _18h_  |



- Hours per task average: 
  - (estimate) *2.6* 
  - (actual) *4.2* -> less stories done than planned one and problems encountered
- standard deviation:
  - (actual) *3.42*
  - (estimate) *1.92*
##### Table for actual standard deviation
| Group | Frequency |
|------|------------|
| _1h_ |  _3_ |
| _2h_ | _4_ |
| _3h_ | _6_ |
| _4h_ | _3_ |
| _5h_ | _2_ |
| _18h_  | _1_ |
  
##### Table for estimate standard deviation
| Group | Frequency |
|------|------------|
| _1h_ |  _5_ |
| _2h_ | _13_ |
| _3h_ | _7_ |
| _4h-5h_ | _2_ |
| _12h_ | _1_ |
- Total task estimation error ratio: 
  -  $73/80 - 1 = -0.087$
  > - sum of total hours estimation / sum of total hours spent - 1

  
## QUALITY MEASURES 

- Unit Testing & code review:
  - Total hours estimated 
      - 10h30m
  - Total hours spent 
      - 10h40m
  - Nr of automated unit test cases:
 
      - $67$ total cases $- 19$ existing old cases $=$
      
       $48$ new test cases

      _*it was decided to start using smaller tests
       to close up on issues faster_ 

### Horizontal tasks
| Task | Hours est. | Hours actual | Nr tests |
|------|------------|--------------|---|
| _collect DATA (¬50 Hike tracks)_  |  _1h 30m_  |  _1h_  | _0_ |
| _DB_StartUpSystem_  |  _30m_  |  _1h_  | _0_ |
| _fix bugs demo 1_  |  _2h30m_  |  _3h_  | _0_ |


|  File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|--------------------------------------------
All files           |    94.2 |    64.28 |   96.05 |   94.61 |                  
 DB.js              |   98.97 |       50 |     100 |   99.08 | 35,48,61,75,88,101,114,126
 FileNames.js       |   90.24 |       60 |     100 |   90.24 | 18,33,64,75      
 HikeLocations.js   |   87.17 |       50 |     100 |   86.48 | 12,26,40,52,64   
 HikeRefPoints.js   |   71.73 |    41.66 |      80 |   72.72 | 10,19-26,37,50,62,74
 Hikes.js           |   86.81 |    72.72 |     100 |   88.88 | 19,35,41,52,67,79,90,102,161
 Huts.js            |   90.32 |    76.92 |     100 |   89.91 | 40,52,84,91,98,105,132,144,158,172,186,200
 ReferencePoints.js |   74.54 |    43.75 |   83.33 |      75 | 10,23,34,46,60,75,83-90
 Users.js           |   87.14 |       65 |     100 |   88.23 | 22-23,40-41,77,89,103,115

- E2E testing:
  - Total hours estimated 
    - 4h
  - Total hours spent
    - 4h10m


  
*Note: some function were implemented but not tested

## ASSESSMENT

- What caused your errors in estimation (if any)?  
  - Creating the collection of 50 hikes took longer than expected, searching and inserting consistent data for all of them required a bigger effort than the estimated. The same thing can be said about the creation of the collection of hikes with all the related information.  
  - Also solve the issues and the bugs we discovered, was more time-demanding than what we estimated.
  - Some stories have a large time spent since we worked together and this caused a double increase of them.

- What lessons did you learn (both positive and negative) in this sprint?
  - large or ambiguous tasks (like the horizontal ones we used), slug the pace and make progress hard to track and communication chaotic.
  - use of shortcuts on immediate implementation make for fast implementation but have severe repercusions on the whole project if not handled correctly.
  - subdividing and specializing although it gives us less flexibility, did allow team members to focus on specific fields and have a better flow of their own work
  
 
- Which improvement goals set in the previous retrospective were you able to achieve? 
 - we improved on speed communication about overall progress and problems that arise.*
  
  *overall although better we do believe it can still be improved

- Which ones you were not able to achieve? Why?
  - Subdivision of tasks, for the most part we would say that the biggest problem was the large tasks and the lack of technical detail on their descriptions.


- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  - Improve the subdivision of stories into smaller tasks more technically specific. To help organize and improve tracking of time.
  - Improve documentation to comunicate the set up of the project to the rest of the team.

> Propose one or two

- One thing you are proud of as a Team!!
  - we managed to fill our static database with relevant and varied data.
