export class Extracts {
    constructor(
        public eventId: string, 
        public privateKey: string
    ) {}
  }

export const extractDataFromUrl = (url: String) => {
    const regex = /\/([^/?]+)\?pk=g-([^/?]+)/;
    const matches = url.match(regex);
    
    if (matches && matches.length === 3) {
      return new Extracts(matches[1], matches[2]);
    } else {
      return null;
    }
  }
  
//   const url: string = 'https://lu.ma/pccqorn6?pk=g-b3RuLAdPQ3jS1HS';
//   const data = extractDataFromUrl(url);
  
//   if (data) {
//     console.log(`Event ID: ${data.eventId}`);
//     console.log(`Private key: TOKEN2: ${data.privateKey}`);
//   } else {
//     console.log('No data found.');
//   }
  