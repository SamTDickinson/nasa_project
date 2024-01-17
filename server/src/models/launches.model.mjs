const launches = new Map();

let latestFilghtNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'ZTM'],
    upcoming: true,
    success: true
}

launches.set(launch.flightNumber, launch);


function existLauchWithId(flightNumber){
    return launches.has(flightNumber);
}

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestFilghtNumber++;
    launches.set(latestFilghtNumber,
        Object.assign(launch,
            {
                flightNumber: latestFilghtNumber,
                customers: ['NASA', 'ZTM'],
                upcoming: true,
                success: true
            }
        ));

    return launches.get(latestFilghtNumber);
}


function abortLaunchById(flightNumber){
    const abortedLaunch = launches.get(Number(flightNumber));
    abortedLaunch.upcoming = false;
    abortedLaunch.success = false;

    return abortedLaunch;
}

export {
    existLauchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}
