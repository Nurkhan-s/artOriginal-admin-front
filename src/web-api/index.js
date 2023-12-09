const axios = require('axios');
const fs = require('fs');
const path = require('path');
const swaggerTypescriptApi = require('swagger-typescript-api');
const dotenv = require('dotenv');
const mode = process.argv[2] ? process.argv[2].replace('--', '') : 'development';


dotenv.config({ path: path.resolve(`./.env.${mode}`) });

const jsonDirectoryPath = path.resolve(__dirname, './json/');
const jsonFilePath = path.resolve(jsonDirectoryPath, 'web-api.json');
const backendUrl = 'http://localhost:3000/api-json';
const swaggerApiPath = path.resolve(__dirname, './');

async function generateApi(url, json, fileName) {
  console.log('Getting Swagger API docs from ' + json);
  const { data } = await axios.get(url);
  console.log(data, 'data');
  if (!fs.existsSync(jsonDirectoryPath)) {
    fs.mkdirSync(jsonDirectoryPath, { recursive: true });
  }

  // if (mode === 'development') {
  //   data.host = '';
  // }
  fs.writeFileSync(json, JSON.stringify(data, null, 2));
  await swaggerTypescriptApi.generateApi({
    name: fileName,
    output: swaggerApiPath,
    input: json,
    httpClientType: 'axios',
  });
}


// api
generateApi(backendUrl, jsonFilePath, 'web-api.ts');
