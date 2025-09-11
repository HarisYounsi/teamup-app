const getCoordinatesFromAddress = async (lieu, ville) => {
  try {
    const address = `${lieu}, ${ville}, France`;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      console.error('GOOGLE_MAPS_API_KEY non définie dans les variables d\'environnement');
      return null;
    }
    
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    console.log(`🔍 Géocodage de: ${address}`);
    
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      const result = {
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: data.results[0].formatted_address
      };
      
      console.log(`✅ Coordonnées trouvées: ${result.latitude}, ${result.longitude}`);
      return result;
    } else {
      console.error(`❌ Geocoding failed for "${address}":`, data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Erreur lors du géocodage:', error);
    return null;
  }
};

module.exports = { getCoordinatesFromAddress };