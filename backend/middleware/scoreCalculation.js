import csv from 'csv-parser';
import fs from 'fs';
import Prospect from '../models/prospects.js';

const score = async () => {

   const documentCount = await Prospect.countDocuments({});
   if (documentCount !== 0) {
       console.log( "Number of prospects:", documentCount );
       return;
   }

    const csvFilePath = '../prospects.csv';
    const prospects = [];
    const maxExperience = 15;
    const totalIndustry = 9;

     // Ponderation
     const ponderationExperience = 0.3;
     const ponderationCompanySize = 0.2;
     const ponderationIndutry = 0.2;
     const ponderationJob = 0.3;

    fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      // Index Score Calculation
      const normalizationExperience = row.yearsOfExperience / maxExperience;

      const compSize = parseInt(row.companySize);
      let normalizationCompanySize = 3;
        if ( compSize <= 500) {
            normalizationCompanySize = 1;
        }
        if ( compSize > 500 && compSize < 1000) {
            normalizationCompanySize = 2;
        }

        const indust = row.industry;
        let valueIndustry;
        switch(indust) {
            case 'Information Technology':
              valueIndustry = 9;
              break;
            case 'Finance':
              valueIndustry = 8;
              break;
            case 'Publishing':
              valueIndustry = 7;
              break;
            case 'Marketing':
              valueIndustry = 6;
              break;
            case 'Telecommunications':
              valueIndustry = 5;
              break;
            case 'Healthcare':
              valueIndustry = 4;
              break;
            case 'Retail':
              valueIndustry = 3;
              break;
            case 'Manufacturing':
              valueIndustry = 2;
              break;
            default:
              valueIndustry = 1;
          }
          const normalizationIndustry = valueIndustry / totalIndustry;

          const job = row.jobTitle;
          let normalizationJob = 1;
          if (job === 'CEO' || job === 'CTO' || job === 'IT Director') {
            normalizationJob = 3;
          }
          if (job.includes('Manager') || job.includes('Engineer') || job.includes('Coordinator') || job.includes('Administrator') || job.includes('Architect')) {
            normalizationJob = 2;
          }

          const scoreValue = normalizationExperience * ponderationExperience + normalizationCompanySize * ponderationCompanySize + normalizationIndustry * ponderationIndutry + normalizationJob * ponderationJob;

      // Create user objects for each row in the CSV
      const prospect = {
        name: row.name,
        email: row.email,
        country: row.country,
        jobTitle: row.jobTitle,
        yearsOfExperience: row.yearsOfExperience,
        industry: row.industry,
        companySize: row.companySize,
        score: (scoreValue * 100).toFixed(0)
      };
      prospects.push(prospect);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      
      // Insert the prospects into the database CSV
      Prospect.insertMany(prospects)
        .then(() => {
          console.log('Prospects imported successfully');
        })
        .catch((err) => {
          console.error('Error importing prospects', err);
        });
    });
    
}

export default score;
