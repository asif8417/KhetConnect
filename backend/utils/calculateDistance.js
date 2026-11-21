const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const toRadians = (degree) => degree * (Math.PI / 180);

    const R = 6371; // Earth's radius in kilometres

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

module.exports = calculateDistance;

/* lat1, lon1 = Buyer's coordinates.
lat2, lon2 = Farmer's coordinates.
R = 6371 = Earth's approximate radius in kilometres.
The function returns the distance between them in kilometres.*/