/*import NodeGeocoder from 'node-geocoder';
import nodeFetch from 'node-fetch';

const geoCache = {};

const options = {
  provider: 'openstreetmap' as const,
  fetch: function fetch(url, options) {
    return nodeFetch(url, {
      ...options,
      headers: {
        'user-agent': '',
        'referrer': '',
      }
    })
  }
};

export const geocoder = NodeGeocoder(options);

export const getCoords = (region, country) => {
  if (!Object.hasOwn(geoCache, country)) {
    stats.locations[country] = {};
  }

  const currentCountry = geoCache[country];

  if (!Object.hasOwn(currentCountry, region)) {
    userCountry[region] = ;
  }
}*/
