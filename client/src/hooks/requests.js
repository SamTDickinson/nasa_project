const API_URL = 'http://localhost:8000'

// Load planets and return as JSON.
async function httpGetPlanets() {
    const response = await fetch(`${API_URL}/planets`);
    return await response.json()
}

async function httpGetLaunches() {
    const response = await fetch(`${API_URL}/launches`);
    const fetchedLaunches = await response.json()
    return await fetchedLaunches.sort((a, b) => {
        return a.flightNumber - b.flightNumber
    })
}

async function httpSubmitLaunch(launch) {
    // Submit given launch data to launch system.
    try {
        return await fetch(`${API_URL}/launches`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(launch)
        });
    } catch (e) {
        return {
            ok: false,
        }
    }

}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
    try {
        return await fetch(`${API_URL}/launches/${id}`, {
            method: "delete",
            headers: {
                "Context-Type": "application/json"
            }
        })

    } catch (e) {
        return {
            ok: false,
        }
    }
}

export {
    httpGetPlanets,
    httpGetLaunches,
    httpSubmitLaunch,
    httpAbortLaunch,
};
