export default function sanitize(queryObj, properties) {
  const result = {};
  (properties || []).forEach((prop) => {
    if (queryObj[prop] || queryObj[prop] === false) {
      result[prop] = queryObj[prop];
    }
  });
  return result;
}
