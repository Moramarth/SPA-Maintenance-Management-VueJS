import { dataObjectMapping } from '../dataProviders/dataLoadMapping';

async function loadSingleObject(id, objectType) {
  const obj = await dataObjectMapping[objectType](id);
  return obj;
}

function singleObjectIsValid(obj) {
  return Object.keys(obj).length !== 0;
}

export { loadSingleObject, singleObjectIsValid };
