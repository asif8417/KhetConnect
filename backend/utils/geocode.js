const geocodeAddress = async (address) => {
    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=in&limit=1`;

        //encodeURIComponent(address) safely converts the address for a URL.
        //fetch() sends the address to OpenStreetMap.
        const response = await fetch(url, {
            headers: {
                "User-Agent": "KhetConnect/1.0 (student project)"
            }
        });
        if (!response.ok) {
            throw new Error("Geocoding service unavailable");
        }
        const data = await response.json();

        if (data.length === 0) {
            return null;
        }

        return {
            latitude: Number(data[0].lat),  //data[0].lat gives us latitude.
            longitude: Number(data[0].lon)  //data[0].lon gives us longitude.
        };
    } catch (error) {
        console.error("Geocoding Error:", error.message);
        return null;
    }

}
module.exports = geocodeAddress;