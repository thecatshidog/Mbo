export const a = {};

a.a = 1

setTimeout(() => {
  a.b = {}
  console.log(a);
}, 2000);

export default {}