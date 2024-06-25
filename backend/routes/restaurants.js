const express = require('express');
const router = express.Router();
const axios = require('axios');
const geocoder = require('geocoder'); // Ensure you're using the appropriate geocoder package

require('dotenv').config();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyCepOTImCkenia3m67OoD3FxroNwgQJ_lw';

router.get('/restaurants', async (req, res) => {
  try {
    const { keyword, maxPrice, openNow, radius } = req.query;

    // Get current location
    const g = geocoder.ip('me'); // Replace with the appropriate method to get current location
    const currLocCoords = `${g.latlng[0]},${g.latlng[1]}`;

    // Build the Places API URL with halal keyword
    let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currLocCoords}&keyword=halal`;

    if (keyword) {
      placesUrl += `+${keyword}`;
    } else {
      placesUrl += `+food`;
    }

    if (maxPrice) {
      placesUrl += `&maxprice=${maxPrice}`;
    }

    if (openNow === 'true' || openNow === 'false') {
      placesUrl += `&opennow=${openNow}`;
    }

    if (radius) {
      const radiusInMeters = Math.round(parseFloat(radius) * 1609.34);
      placesUrl += `&radius=${radiusInMeters}`;
    } else {
      placesUrl += `&radius=3200`;
    }

    placesUrl += `&key=${GOOGLE_API_KEY}`;

    const placesResponse = await axios.get(placesUrl);
    const results = placesResponse.data.results;

    // Extract place coordinates
    const destinations = results.map(place => `${place.geometry.location.lat},${place.geometry.location.lng}`).join('|');

    // Build the Distance Matrix API URL
    const distanceUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currLocCoords}&destinations=${destinations}&key=${GOOGLE_API_KEY}`;

    const distanceResponse = await axios.get(distanceUrl);
    const distances = distanceResponse.data.rows[0].elements;

    // Combine place and distance data
    const restaurants = results.map((place, index) => {
      return {
        name: place.name,
        vicinity: place.vicinity,
        rating: place.rating,
        distance: (distances[index].distance.value / 1609.34).toFixed(2), // Convert meters to miles
        openNow: place.opening_hours ? place.opening_hours.open_now : null,
        priceLevel: place.price_level
      };
    });

    res.json({ results: restaurants });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

