const {
  buildClientSchema,
  printSchema,
  getIntrospectionQuery,
} = require('graphql');
const fetch = require('node-fetch');
const fs = require('fs');

async function start() {
  const response = await fetch('https://graphql.datocms.com', {
    method: 'POST',
    body: JSON.stringify({
      query: getIntrospectionQuery(),
    }),
    headers: {
      authorization:
        'Bearer faeb9172e232a75339242faafb9e56de8c8f13b735f7090964',
    },
  });

  const { data: introspectionSchemaResult } = await response.json();
  const graphqlSchemaObj = buildClientSchema(introspectionSchemaResult);
  const sdlString = printSchema(graphqlSchemaObj);

  console.log(sdlString);
}

start();
