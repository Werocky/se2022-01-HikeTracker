# se2022-01-HikeTracker  
## Docker Instructions
To correctly use the app using docker you must clone the entire repository, once cloned you must navigate into the root directory of the project and run the following commands into the terminal:  
```docker-compose build && docker-compose up```  
It will automatically build the docker images and containers from the project, expose the ports and start the containers.

## DB structure
### Users
    CREATE TABLE IF NOT EXISTS `Users`(
        `Id` TEXT PRIMARY KEY,
        `Hash` TEXT NOT NULL,
        `Salt` TEXT NOT NULL,
        `Role` VARCHAR(255) NOT NULL,
        `code` INTEGER NOT NULL,
        `verified` TINYINT(1) NOT NULL,
        `Name` TEXT NOT NULL,
        `Surname` TEXT NOT NULL,
        `Phone` INTEGER NULL
    );


-       CREATE TABLE IF NOT EXISTS `LocalGuides`(
            `id` INTEGER PRIMARY KEY
        );

-        CREATE TABLE IF NOT EXISTS `HutWorkers`(
            `id` INTEGER NOT NULL PRIMARY KEY
        );
-       CREATE TABLE IF NOT EXISTS `Hiker`(
            `id` INTEGER PRIMARY KEY NOT NULL
        );

### Hikes
    CREATE TABLE IF NOT EXISTS `Hikes`(
        `HikeID` INTEGER PRIMARY KEY,
        `Title` TEXT,
        `Description` TEXT,
        `Ascent` INTEGER,
        `Difficulty` TEXT,
        `ExpectedTime` TIME,
        `Country` TEXT,
        `Region` TEXT,
        `City` TEXT,
        `GpxFile` TEXT UNIQUE,
        `Start` INTEGER,
        `End` INTEGER,
        `AssociatedGuide` INTEGER,
        `Length` FLOAT,
        `Picture` VARCHAR(255),
        FOREIGN KEY(`AssociatedGuide`) REFERENCES `LocalGuides`(`id`)
    );
-       CREATE TABLE IF NOT EXISTS `PointsOfHike`(
            `HikeID` INTEGER NOT NULL,
            `PointID` INTEGER NOT NULL,
            `IsStart` TINYINT(1),
            `IsEnd` TINYINT(1),
            PRIMARY KEY(`HikeID`,`PointID`),
            FOREIGN KEY(`PointID`) REFERENCES `ReferencePoints`(`RefPointID`),
            FOREIGN KEY(`HikeID`) REFERENCES `Hikes`(`HikeID`)
        )

### ReferencePoints
    CREATE TABLE IF NOT EXISTS `ReferencePoints`(
        `RefPointID` INTEGER PRIMARY KEY,
        `description` TEXT,
        `Lat` NUMERIC,
        `Lng` NUMERIC,
        `Type` TEXT
    );
### Huts
    CREATE TABLE IF NOT EXISTS `Huts`(
        `RefPointID` INTEGER NOT NULL PRIMARY KEY,
        `Name` TEXT,
        `HutManagerID` INTEGER,
        `Website` TEXT NULL,
        `Phone` INTEGER NULL,
        `AvgPrice` DOUBLE(8, 2) NULL,
        `WhenOpen` TEXT NULL,
        `Elevation` DOUBLE(8, 2) NULL,
        `Beds` INTEGER NULL,
        `Province` TEXT NULL,
        `Country` TEXT NULL,
        `Region` TEXT NULL,
        `City` TEXT NULL,
        `Description` TEXT,
        FOREIGN KEY(`HutManagerID`) REFERENCES `HutWorkers`(`id`)
    );
### ParkingLots
    CREATE TABLE IF NOT EXISTS `ParkingLots`(
        `ParkingID` INTEGER NOT NULL PRIMARY KEY,
        `AssociatedGuide` INTEGER,
        `Fee` DOUBLE(8, 2) NULL,
        FOREIGN KEY(`AssociatedGuide`) REFERENCES `LocalGuides`(`id`)
    );
### Pictures/Images
    CREATE TABLE IF NOT EXISTS `pictures`(
        `NameFile` TEXT PRIMARY KEY NOT NULL,
        `associatedPoint` INTEGER NULL,
        `HikeID` INTEGER NULL,
        FOREIGN KEY(`associatedPoint`) REFERENCES `ReferencePoints`(`id`),
        FOREIGN KEY(`associatedPoint`) REFERENCES `Huts`(`id`)
    );


