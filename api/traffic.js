// Vercel Serverless Function to proxy Google Maps Distance Matrix API
// This avoids CORS issues by making the API call server-side

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { origin, destination, departure_time, api_key } = req.query;

    // Validate required parameters
    if (!origin || !destination || !departure_time || !api_key) {
      return res.status(400).json({
        error: 'Missing required parameters',
        required: ['origin', 'destination', 'departure_time', 'api_key']
      });
    }

    // Build Google Maps API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&departure_time=${departure_time}&traffic_model=best_guess&key=${api_key}`;

    // Make the request to Google Maps API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the API returned an error
    if (data.status !== 'OK') {
      return res.status(400).json({
        error: 'Google Maps API error',
        status: data.status,
        message: data.error_message || 'Unknown error'
      });
    }

    // Check if the route was found
    const element = data.rows[0]?.elements[0];
    if (!element || element.status !== 'OK') {
      return res.status(400).json({
        error: 'Route not found',
        status: element?.status || 'UNKNOWN',
        message: 'Could not find a route between the specified locations'
      });
    }

    // Return the successful response
    return res.status(200).json({
      status: 'OK',
      origin_address: data.origin_addresses[0],
      destination_address: data.destination_addresses[0],
      duration: element.duration,
      duration_in_traffic: element.duration_in_traffic,
      distance: element.distance
    });

  } catch (error) {
    console.error('Error fetching traffic data:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
