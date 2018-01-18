import { Children, cloneElement } from 'react';

export function getChildMapping(children, props) {
  if (!children) {
    return children;
  }
  if (Children.count(children) === 1) {
    return cloneElement(children, props);
  }
  const result = [];
  Children.map(children, child => child)
    .forEach((child) => {
      result.push(cloneElement(child, props));
    });
  return result;
}


export default {
  getChildMapping,
}