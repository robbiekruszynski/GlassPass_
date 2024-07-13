import axios from 'axios';

export const extractDataFromUrl = (url: String): string[] | null => {
    const regex = /\/([^/?]+)\?pk=g-([^/?]+)/;
    const matches = url.match(regex);
    
    if (matches && matches.length === 3) {
      return [matches[1], matches[2]];
    } else {
      return null;
    }
  }

// USAGE
//   const url: string = 'https://lu.ma/pccqorn6?pk=g-b3RuLAdPQ3jS1HS';
//   const data = extractDataFromUrl(url);
  
//   if (data) {
//     console.log(`Event ID: ${data[0]}`);
//     console.log(`Private key: ${data[1]}`);
//   } else {
//     console.log('No data found.');
//   }

const extractGeoAddressInfo = async (url: string): Promise<BigInt[] | null> => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      
      const geoAddressInfoKey = '"geo_address_info"';
      const startIndex = data.indexOf(geoAddressInfoKey);
  
      if (startIndex === -1) {
        return null;
      }
  
      const startBraceIndex = data.indexOf('{', startIndex);
  
      if (startBraceIndex === -1) {
        return null;
      }
  
      let braceCount = 1;
      let endBraceIndex = startBraceIndex + 1;
  
      while (braceCount > 0 && endBraceIndex < data.length) {
        if (data[endBraceIndex] === '{') {
          braceCount++;
        } else if (data[endBraceIndex] === '}') {
          braceCount--;
        }
        endBraceIndex++;
      }
  
      if (braceCount !== 0) {
        return null;
      }
  
      const geoAddressInfo = data.substring(startBraceIndex, endBraceIndex);
      const geoAddressJson = JSON.parse(geoAddressInfo);
      const latitude = BigInt(geoAddressJson.latitude * 1e6);
      const longitude = BigInt(geoAddressJson.longitude * 1e6);
      return [latitude, longitude];
    } catch (error) {
      console.error('Error fetching or parsing data:', error);
      return null;
    }
  };
  
  // Example usage
//   const url = 'https://example.com/api';
//   extractGeoAddressInfo(url).then((result) => {
//     if (result) {
//       console.log('Latitude:', result[0]);
//       console.log('Longitude:', result[1]);
//     } else {
//       console.log('Geo Address Info not found.');
//     }
//   });
  