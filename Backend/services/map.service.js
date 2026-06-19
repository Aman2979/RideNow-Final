
 
import axios from 'axios'
import captainModel from '../models/caption.models.js';

async function getAddressCoordinates(address) {
    const apiKey = process.env.GOOGLE_MAP_API; 
    if (!apiKey) {
        throw new Error('Missing Google Maps API key in environment variables.');
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;

            return {
                lat: location.lat,   // ✅ FIXED (was ltd)
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function getDistanceTime(origin, destination) {
    if (!origin || !destination) {
        throw new Error("Origin or destination not found");
    }

    const apiKey = process.env.GOOGLE_MAP_API;
    if (!apiKey) {
        throw new Error("Missing Google Maps API key in environment variables.");
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === "OK") {
            const result = response.data.rows[0].elements[0];

            if (result.status === "ZERO_RESULTS" || result.status === "NOT_FOUND") {
                throw new Error("No routes found between origin and destination.");
            }

            return {
                distance: result.distance?.text || "Distance not available",
                duration: result.duration?.text || "Duration not available"
            };
        } else {
            throw new Error(`Google API Error: ${response.data.status}`);
        }
    } catch (err) {
        console.error("Error fetching distance and time:", err.message);
        throw err;
    }
}


async function getAutoCompleteSuggestions(input) {
    if (!input) {
        throw new Error('query is required');
    }

    // ✅ FIXED (same env variable everywhere)
    const apiKey = process.env.GOOGLE_MAP_API;

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            return response.data.predictions
                .map(prediction => prediction.description)
                .filter(Boolean);
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}


function getDistanceInKm(lat1, lng1, lat2, lng2) {
    const toRadians = (value) => (value * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

async function captaindetails(lat, lng, radius) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
        throw new Error("Latitude and longitude are required");
    }

    const captains = await captainModel.find({
        socketId: { $exists: true, $nin: [null, ''] }
    });

    const captainsWithDistance = captains
        .map((captain) => {
            const captainLat = captain.location?.ltd;
            const captainLng = captain.location?.lng;

            if (typeof captainLat !== 'number' || typeof captainLng !== 'number') {
                return null;
            }

            return {
                captain,
                distance: getDistanceInKm(lat, lng, captainLat, captainLng)
            };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);

    const nearbyCaptains = captainsWithDistance
        .filter(({ distance }) => distance <= radius)
        .map(({ captain }) => captain);

    if (nearbyCaptains.length > 0) {
        console.log("Captains connected:", captains.length);
        console.log("Captains with valid location:", captainsWithDistance.length);
        console.log("Captains in radius:", nearbyCaptains.length);
        return nearbyCaptains;
    }

    const fallbackCaptains = captainsWithDistance
        .slice(0, 5)
        .map(({ captain }) => captain);

    console.log("Captains connected:", captains.length);
    console.log("Captains with valid location:", captainsWithDistance.length);
    console.log("Captains in radius:", nearbyCaptains.length);

    if (fallbackCaptains.length > 0) {
        console.log("Using fallback captains:", fallbackCaptains.length);
        return fallbackCaptains;
    }

    const onlineCaptainsWithoutLocation = captains
        .filter((captain) => {
            const captainLat = captain.location?.ltd;
            const captainLng = captain.location?.lng;

            return typeof captainLat !== 'number' || typeof captainLng !== 'number';
        })
        .slice(0, 5);

    console.log("Using online captains without location:", onlineCaptainsWithoutLocation.length);

    return onlineCaptainsWithoutLocation;
}

async function getOnlineCaptains(limit = 5) {
    return captainModel
        .find({
            socketId: { $exists: true, $nin: [null, ''] }
        })
        .limit(limit);
}

export {
    getAddressCoordinates,
    captaindetails,
    getOnlineCaptains,
    getAutoCompleteSuggestions,
    getDistanceTime
};
