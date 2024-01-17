import {getAllLaunches, addNewLaunch, abortLaunchById, existLauchWithId} from '../../models/launches.model.mjs'

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}

function httpPostNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.target || !launch.mission || !launch.launchDate ||
        !launch.rocket) {
        return res.status(400).json({
            error: `Missing required launch property.`
        })
    } else {
        launch.launchDate = new Date(launch.launchDate)
        if (isNaN(launch.launchDate)) {
            return res.status(400).json({
                error: `Invalid launch date.`
            })
        } else {
            const latestLaunch = addNewLaunch(launch)
            return res.status(201).json(latestLaunch);
        }
    }
}

function httpDeleteLaunch(req, res) {
    const cancelledLaunch = Number(req.params.id);

    if(!existLauchWithId(cancelledLaunch)){
        return res.status(400).json(
            { error: "Launch does not exist with flight number"}
        )
    } else {
        return res.status(200).json(abortLaunchById(cancelledLaunch));
    }
}

export {
    httpGetAllLaunches,
    httpPostNewLaunch,
    httpDeleteLaunch
}
