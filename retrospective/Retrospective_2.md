RETROSPECTIVE (Team 1)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- 6 of stories committed vs. 4 done 
- Total of 17 points committed vs. 11 points done 
- Total of 75h 25m planned  vs. 82h 45m spent (as a team)

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


### Tasks statistics
#### 6 - Describe Parking
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _6-1-add a parking lot [CLIENT side]_  |  _2h_  |  _3h 20m_  |
| _6-2-save reference point [SERVER side]_  |  _1h_  |  _2h 30m_  |


### Tasks statistics
#### 7 - Search Hut_ 
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _7-1-searching huts [CLIENT side]_  |  _3h_  |  _2h 30m_  |
| _7-2-API get huts searched[SERVER side]_  |  _2h_  |  _2h_  |
| _7-3-DB huts_  |  _2h_  |  _4h 50m_  |


### Tasks statistics
#### 8 - Link Start/Arrival
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _8-1-modify start/arrival points [CLIENT side]_  |  _1h_  |  _5h_  |
| _8-2-API save start/arrival points [SERVER side]_  |  _2h 30m_  |  _4h 15m_  |


### Tasks statistics
#### 9 - Link hut
| Task | Hours est. | Hours actual |
| _9-1-link hut to hike [CLIENT side]_| _3h_ | _0h_ |
| _9-2-API save the link [SERVER side]_| _2h_ | _0h_ |
| _9-3-Testing API_ | _2h_ | _0h_ |
| _9-4-Testing DB_ | _2h_ | _0h_ |
| _9-5-Manual testing_ | _30m_ | _0h_ |

### Tasks statistics
#### 33 - Define Reference Points
| Task | Hours est. | Hours actual |
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
| _Error Handling_  |  _3h_  |  _1h 30m_  |
| _DB Restructure_  |  _2h_  |  _50m_  |
| _DB Restructure_  |  _2h_  |  _50m_  |
| _Database redesign_  |  _1h 30_  |  _1h_  |
| _layout for sprint2_  |  _12h_  |  _18h_  |



- Hours per task average: 
  - (estimate) *2.5* 
  - (actual) *3.9* -> less stories done than planned one and problems encountered
- standard deviation:
  - (actual) *3.42*
##### Table for actual standard deviation
| Group | Frequency |
|------|------------|
| _1h_ |  _3_ |
| _2h_ | _4_ |
| _3h_ | _6_ |
| _4h_ | _3_ |
| _5h_ | _2_ |
| _18h_  | _1_ |
  - (estimate) *1.92*
##### Table for estimate standard deviation
| Group | Frequency |
|------|------------|
| _1h_ |  _5_ |
| _2h_ | _13_ |
| _3h_ | _7_ |
| _4h-5h_ | _2_ |
| _12h_ | _1_ |
- Total task estimation error ratio: 
  -  $75\divides82 - 1 = -0.08$
  > - sum of total hours estimation / sum of total hours spent - 1

  
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
  - Creating the collection of 50 hikes took longer than expected, searching and inserting consistent data for all of them required a bigger effort than the estimated. The same thing can be said about the creation of the collection of hikes with all the related information.  
Also solve the issues and the bugs we discovered, was more time-demanding than what we estimated.
Some stories have a large time spent since we worked together and this caused a double increase of them.

- What lessons did you learn (both positive and negative) in this sprint?
 
- Which improvement goals set in the previous retrospective were you able to achieve? 
  
- Which ones you were not able to achieve? Why?  

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

> Propose one or two

- One thing you are proud of as a Team!!
