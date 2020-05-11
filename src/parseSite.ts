import {readFile} from 'fs';

const parseSite = (sitePath: string): Promise<any> => new Promise((resolve, reject) => {
  readFile(sitePath, 'utf8', (error, data) => {
    if (error) {
      reject(error.message);
    }

    resolve(JSON.parse(data));
  });
});

export default parseSite;