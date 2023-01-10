RETROSPECTIVE (Team 1)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- __7__ of stories committed vs. __4__ done (_+1 started but not finished_) 
- Total of __26__ points committed vs. __19__ points done 
- Total of __70h 50m__ planned  vs. __????__ spent (as a team)

**Notes**: we also solve some horizontal tasks related to issues from the previous demo, bugs that we found and TD. 

 Definition of Done: 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

<br/>

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _0 - Horizontal tasks_| _??_ | _*_ | _71h 20m_ | _??_ |
| _17 - Start hike_     | _5_ | _8_ | _1d 4h 30m_ | _??_ |
| _18 - Terminate hike_ | _3_ | _5_ | _5h 30m_ | _??_ |
| _34 - Completed hikes_| _4_ | _3_ | _1d 1h_ | _??_ |
| _33 - Start hike_     | _6_ | _3_ | _1d 1h 25m_ | _??_ |
| _19 - Record Point_   | _6_ | _3_ | _1d 1h_ | _??_ |

<br/>

### Tasks statistics

#### 17 - Start hike
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _17-1 HikeTracker Page [CLIENT]_| _2h_ | _3h 30m_ |
| _17-2 Manage client and server side to know if someone can start an hike_| _3h_ | _3h_ |
| _17-3 API to start hike [SERVER]_| _2h 30m_ | _2h 40m_ |
| _17-4 Save positions [SERVER]_| _3h_ | _3h 25m_ |
| _17-5 Testing_| _2h_ | _55m_ |

#### 18 - Terminate hike
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _18-1 Layout to end hike [CLIENT]_| _1h 30m_ | _???_ |
| _18-2 API to end hike tracking [SERVER]_| _2h_ | _???_ |
| _18-3 Testing_| _2h_ | _???_ |

#### 34 - Completed hikes
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _34-1 Layout_| _3h_ | _???_ |
| _34-2 API to get completed and saved hikes [SERVER]_| _2h_ | _???_ |
| _34-3 API to show completed hikes [CLIENT]_| _2h_ | _???_ |
| _34-4 Testing_| _2h_ | _???_ |

#### 33 - Start hike
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _33-1 API to add a Reference Point [SERVER]_| _1h_ | _???_ |
| _33-2 Map to insert a Reference Point [CLIENT]_| _2h_ | _???_ |
| _33-3 API to add info related to Reference Point [SERVER]_| _1h 40m_ | _???_ |
| _33-4 Page to add info related to Reference Point_| _2h_ | _???_ |
| _33-5 Testing_| _2h_ | _???_ |
| _33-6 Api to delete a Reference Point_| _45m_ | _???_ |

#### 19 - Record Point
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _19-1 Record point API[CLIENT SIDE]_| _2h_ | _???_ |
| _19-2 Record point API[SERVER SIDE]_| _1h 30m_ | _???_ |
| _19-3 DB modify_| _2h_ | _???_ |
| _19-4 Layout_| _1h 30m_ | _???_ |
| _19-5DB testing_| _1h_ | _???_ |
| _19-6 E2E testing_| _1h_ | _???_ |

<br/>

#### Horizonal tasks
| Task | Hours est. | Hours actual |
|------|------------|--------------|
| _Update README.MD_  |  _45m_  |  __  |
| _Notification's timeout_  |  _10m_  |  __  |
| _Filtering E2E testing_  |  _30m_  |  __  |
| _Show Reference Points in Hike Details_  |  _30m_  |  __  |
| _insert new hike in hikes list_  |  _1h 30m_  |  __  |
| _Fix filtering_  |  _1h_  |  __  |
| _Add map filter_  |  _50m_  |  __  |
| _Cover Photo for AddHike [CLIENT+SERVER]_  |  _4h_  |  __  |
| _resolve hikedetails bug_  |  _30m_  |  __  |
| _Map Bounds_  |  _1h_  |  __  |
| _Cover Photo for AddHut [CLIENT+SERVER]_  |  _4h_  |  __  |
| _Fix SonarCloud Bugs (TD)_  |  _40m_  |  __  |
| _Fix SonarCloud Security Hotspots (TD)_  |  _40m_  |  __  |
| _Show Reference Point in hike's path_  |  _2h_  |  __  |
| _Add markers to hike's paths_  |  _2h_  |  __  |
| _Verification Page New Layout_  |  _1h_  |  __  |
| __  |  __  |  __  |
| __  |  __  |  __  |
| __  |  __  |  __  |

<br/>

__--- FROM HERE IT'S A COPY OF THE OLD ONE ---__

<br/>

### Average, Standard Deviation and Estimation Error Ratio
- Hours per task average: 
  - (estimated) *total hours (81h 30m ~ 82h), numbers of tasks (38)* 
    - *average =* $\frac{82}{38}$ *= 2.157 ~ 2.16 hours/task*
  - (actual) *total hours (80h 35m ~ 81h), numbers of tasks (38)* 
    - *average =* $\frac{81}{38}$ *= 2.131 ~ 2.13 hours/task*
- standard deviation:
  - (estimated) *Estimated Avg = 2.16, number of observations = 38 (the number of tasks)*
    - *Mean deviation:* $\sum_{n=1}^{38}(f_i - Avg_{est})^2$ *= 31.693*
    - *Variance = Mean deviation / number of observations = 0.83*
    - *Standard deviation =* $\sqrt{Variance}$ *= 0.91*
  - (actual) *Actual Avg = 2.13, number of observations = 38 (the number of tasks)*
    - *Mean deviation:* $\sum_{n=1}^{38}(f_i - Avg_{act})^2$ *= 61.3022*
    - *Variance = Mean deviation / number of observations = 1.61*
    - *Standard deviation =* $\sqrt{Variance}$ *= 1.27*
##### Table for estimated standard deviation
| Group | Frequency |
|------|------------|
| _1h_ |  _10_ |
| _2h_ | _18_ |
| _3h_ | _6_ |
| _4h_ | _4_ |

##### Table for actual standard deviation
| Group | Frequency |
|------|------------|
| _1h_ |  _13_ |
| _2h_ | _11_ |
| _3h_ | _9_ |
| _4h_ | _4_ |
| _6h-7h_ | _1_ |
  
- Total task estimation error ratio: 
  - *sum of total hours estimation (82h)/ sum of total hours spent (81h)- 1*
    -  $\frac{82}{81} - 1 = 0.01$

  
## QUALITY MEASURES 

- <b>Unit Testing & code review: </b>
  - <u>Total hours estimated</u> 
      - $14h15m$ total
  - <u>Total hours spent </u>
      - $10h40m$ total

  - <u>Nr of automated unit test cases:</u>
 
      - $110$ total cases $- 86$ existing old cases $=$
      
       $24$ new test cases

| Task | Hours est. | Hours actual | 
|------|------------|--------------|
|_33-1 API to add a Reference Point [SERVER]_| _30m_ |_30m_|
|_17-3 API to start hike [SERVER]_|             _45m_ | _50m_ |
|_17-4 save positions [SERVER]_|                _1h_ | _1h55m_|
|	_18-2 API to end hike tracking [SERVER]_    |_30m_ |_20m_ |
|_19-5 DB testing_ |                          _1h_ |_30m_|
|_19-6 E2E testing_ |                         _1h_ |_10m_|
|_17-5 Testing_ |                             _2h_ |_55m_|
|_18-3 Testing_ |                             _2h_ |_2h50m_|
|_34-4 Testing_                            |_2h_ |_30m_|
|_33-5 Testingg_ |                            _2h_ |_1h10m_|
|_Filtering E2E testing_ |                   _30m_ |_30m_|
|_19-5 DB testing_ |                          _1h_ |_30m_|


File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------------|---------|----------|---------|---------|------------------------------------------------------------------------
All files           |   94.05 |    65.88 |   98.43 |   95.01 | 
 ActiveHike.js      |   81.25 |    55.88 |     100 |   98.11 | 13
 DB.js              |   99.48 |    55.55 |   94.11 |   99.58 | 23-27
 FileNames.js       |   89.18 |       60 |     100 |   89.18 | 20,36,67,78
 HikeLocations.js   |   93.65 |    79.41 |     100 |   93.44 | 12,26,89,101
 HikeRefPoints.js   |    87.5 |     62.5 |   97.14 |      88 | 13,27,40,54,70,90,101,113,125
 Hikes.js           |    85.8 |    63.33 |     100 |   86.89 | 55,66,80,84,95,109,124,138,152,165,176,188,240,254,268,282,296,312,322
 Huts.js            |   88.07 |    78.33 |      94 |   87.67 | 49,59,70,149,161,179,197,211,225,239,253,261-267,281                   
 ParkingLot.js      |   83.82 |    59.09 |     100 |   85.07 | 23,38,50,73,85,97,108,120,123,137
 ReferencePoints.js |   87.05 |       50 |     100 |   87.65 | 11,24,47,58,70,84,99,114,126,150
 Users.js           |   91.02 |    68.18 |     100 |    92.1 | 45,63,109,121,136,148


- <b>E2E testing:</b>
*The chaotic situation brought upon us by the holidays, made the separation of test types less of a priority, therefor the E2E testing was mixed with the tasks of unit and integration testing. For this report it seemed apropriate to just leave the E2E testing with unit testing, since its separation would be guess work of how much time was assigned to each*




- Technical Debt management:
  - Total hours estimated:
    - *1h20m*.
  - Total hours spent:
    - *1h20m* 
  - Hours estimated for remediation by SonarQube:
    - At the beginning of the sprint: *9d*
    ![Alt text](./Retrospective_4_images/TD_estimated_by_SC_Beginning.png?raw=true "Estimated TD at the Beginning of the sprint")
    - At the end of the sprint: *6d 6h*
    ![Alt text](./Retrospective_4_images/TD_estimated_by_SC_End.png?raw=true "Estimated TD at the End of the sprint")
    - Issues reported by SonarQube at the beginning of the sprint:
    ![Alt text](./Retrospective_4_images/Issues_18_Dec.png?raw=true "Issues in date 18/12")
    - Issues reported by SonarQube at the end of the sprint: 
    ![Alt text](./Retrospective_4_images/Issues_End_sprint.png?raw=true "Issues at the end of the sprint")
  - Hours estimated for remediation by SonarQube only for the selected and planned issues
    - The selected issue was *Bugs*, since *Maintainability* and *Security* had a better rating (both at the first and last analysis)
    - Remediation effort at the end of the layout restructure and at the end of the sprint
    ![Alt text](./Retrospective_4_images/Remained_effort_18_Dec.png?raw=true "Remained effort in date 18/12")
    ![Alt text](./Retrospective_4_images/Remained_effort_End_Sprint.png?raw=true "Remained effort at the End of the sprint")
  - Hours spent on remediation
    - *40m*, that is the remediation effort required to reduce the number of *Bugs* from *6* to *0*. Besides that, *40m* have been spent on reducing the number of the *Security Hotspots* from *10* to *3*. The remained ones are false positives.
    ![Alt text](./Retrospective_4_images/Security_Hotspot_Bugs_Beginning.png?raw=true "Security Hotspot and Bugs at the Beginning of the sprint")
    ![Alt text](./Retrospective_4_images/Security_Hotspot_Bugs_End.png?raw=true "Security Hotspot and Bugs at the End of the sprint")
  - debt ratio (as reported by SonarQube under "Measures-Maintainability")
    - *0.9%*
  - rating for each quality characteristic reported in SonarQube under "Measures" (namely reliability, security, maintainability )
    - Reliability: `A`
    - Security: `A`
    - Maintainability: `A`

## ASSESSMENT

- What caused your errors in estimation (if any)?  
  
- What lessons did you learn (both positive and negative) in this sprint?
  
- Which improvement goals set in the previous retrospective were you able to achieve? 
  
- Which ones you were not able to achieve? Why?
  
- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
  
- One thing you are proud of as a Team!!

