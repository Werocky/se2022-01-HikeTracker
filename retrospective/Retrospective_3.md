RETROSPECTIVE (Team 1)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 1 of stories committed vs. 1 done 
- Total of 3 points committed vs. 3 points done 
- Total of 81h 30m planned  vs. 80h 35m spent (as a team)

**Notes**: we decided to focus on technical debt, so most of the task done on this sprint are horizontal or focus on fixing existing issues 

 Definition of Done: 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _9 - Link hut_        | _5_ | _3_ | _10h 10m_ | _8h 35m_ |
| _0 - Ficticious Story_| _3_ | _*_ | _71h 20m_ | _72h_ |


### Tasks statistics

#### 9 - Link hut
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _9-1-link hut to hike [CLIENT side]_| _3h_ | _2h 40m_ |
| _9-2-API save the link [SERVER side]_| _2h_ | _1h_ |
| _9-3-Testing API_ | _2h_ | _30m_ |
| _9-4-Testing DB_ | _2h_ | _3h_ |
| _9-5-Manual testing_ | _30m_ | _30m_ |
|_9-6-Link Hut to Hike DB_ | _40m_ | _55m_|


#### Horizonal tasks
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _Refactor Layout structure_  |  _4h_  |  _4h_  |
| _API Reorganization_  |  _4h_  |  _3h 30m_  |
| _Database redesign_  |  _1h 30m_  |  _1h_  |
| _DB Restructure_  |  _2h_  |  _6h 40m_  |
| _New Layout for hike filters_  |  _2h 30m_  |  _3h_  |
| _layout for story 5- addHut_  |  _2h_  |  _2h 55m_  |
| _layout for story 6- addParkingLot_  |  _1h_  |  _55m_  |
| _Layout hut's filters_  |  _2h_  |  _3h 30m_  |
| _Fix story #5_  |  _2h_  |  _2h_  |
| _Fix story #8_  |  _4h_  |  _3h_  |
| _Connect functions to new login/register_  |  _2h_  |  _2h_  |
| _Add reference point with hike_  |  _2h 30m_  |  _1h 20m_  |
| _Hut list page_  |  _1h 30m_  |  _1h 15m_  |
| _modify client and server AddHut_  |  _2h_  |  _1h 25m_  |
| _Create an option box to filter the cards_  |  _2h_  |  _1h 45m_  |
| _Message handling_  |  _3h_  |  _2h 50m_  |
| _Fix Register function server side_  |  _1h_  |  _35m_  |
| _ADD images server & client_  |  _4h_  |  _3h 5m_  |
| _insert images in the db and in a folder_  |  _2h_  |  _2h 5m_  |
| _AddParkingLot check Reference Point_  |  _45m_  |  _45m_  |
| _Fix gpx file reading/parsing_  |  _2h 30m_  |  _2h 30m_  |
| _Modify Add Hike, client Form_  |  _2h 30m_  |  _2h 55m_  |
| _AddHut check Reference Point_  |  _45m_  |  _45m_  |
| _AddHike check Reference Points_  |  _1h 30m_  |  _1h 10m_  |
| _Modify Add Hike, server API_  |  _2h_  |  _2h_  |
| _hut details page_  |  _2h_  |  _2h_  |
| _modify addParkingLot_  |  _2h_  |  _1h 15m_  |
| _Hike details page_  |  _1h 30m_  |  _1h 20m_  |
| _create ParkingLot Server Side manual testing_  |  _30m_  |  _40m_  |
| _addHut Server Side manual testing_  |  _30m_  |  _30m_  |
| _createParkingLot e2e testing_  |  _30m_  |  _30m_  |
| _addHut e2e testing_  |  _30m_  |  _25m_  |


--------------------------------------------------


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

- <b>Unit Testing & code review: </b>
  - <u>Total hours estimated</u> 
      - $8h$(_testing_) + $8h30m$(_code review_)
      - $16h30m$ total
  - <u>Total hours spent </u>
      - $7h25m$(_testing_) + $9h20m$(_code review_)
      - $16h45m$ total
  - <u>Nr of automated unit test cases:</u>
 
      - $86$ total cases $- 67$ existing old cases $=$
      
       $19$ new test cases


*<u>Note:</u> the 1st two task were divided 50/50 between code review and testing, else assumed purely code review or testing according to name(for simplicity of the report).
*some tasks were thought to do code review/testing together. for the report puposes we are counting them in one of the categories instead of both, except for the 2 largest tasks.

| Task | Hours est. | Hours actual | 
|------|------------|--------------|
| _API Reorganization_  |  _4h_  |  _3h30_  | 
| _DB Restructure_  |  _2h_  |  _5h_  | 
| _Fix Register function server side_  |  _1h_  |  _35m_  |
| _Modify Add Hike, server API_  |  _2h_  |  _2h_  |
| _Fix gpx file reading/parsing_  |  _2h30m_  |  _2h30m_  |
| _addHut Server Side manual testing_  |  _30m_  |  _30m_  |
| _create ParkingLot Server Side manual testing_  |  _30m_  |  _40m_  |
| _9-3 Testing API_  |  _2h_  |  _30m_  | 
| _9-4 Testing DB_  |  _2h_  |  _3h_  |

File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|----------------------------------------------------
All files           |   95.06 |    68.27 |   99.22 |   95.47 | 
 DB.js              |   99.48 |    55.55 |   94.11 |   99.58 | 23-28
 FileNames.js       |   89.18 |       60 |     100 |   89.18 | 20,36,67,78
 HikeLocations.js   |   93.65 |    79.41 |     100 |   93.44 | 12,26,86,98
 HikeRefPoints.js   |      80 |    43.75 |   95.83 |   81.25 | 10-13,27,41,60,71,83,95
 Hikes.js           |   86.82 |    69.64 |     100 |   88.23 | 55,69,73,84,99,112,123,135,191,205,219,233,247,263
 Huts.js            |   91.72 |    81.03 |     100 |   91.42 | 49,59,70,149,161,179,197,211,225,239,253,268      
 ParkingLot.js      |   83.82 |    59.09 |     100 |   85.07 | 23,38,50,73,85,97,108,120,123,137
 ReferencePoints.js |   87.17 |       50 |     100 |   87.83 | 11,24,47,58,70,84,99,114,126
 Users.js           |   91.02 |    68.18 |     100 |    92.1 | 45,63,109,121,136,148

- <b>E2E testing:</b>
  - Total hours estimated 
    - 1h30
  - Total hours spent
    - 1h25m

| Task | Hours est. | Hours actual |
|------|------------|--------------|    
| _addHut e2e testing_  |  _30m_  |  _25m_  |
| _createParkingLot e2e testing_  |  _30m_  |  _30m_  |
| _9-5 E2E Manual Testing_  |  _30m_  |  _30m_  |

*Note: some e2e testing was done while doing code review for the APIs

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

