const SS = sessionStorage || window.sessionStorage;
/**
 * @desc 判断是否有这个值
 */
export function has(key) {
  if (typeof SS.getItem(key) === 'string') {
    return true;
  }
  return false;
}
/**
 * @desc 设置某个数据的值
 */
export function set(key, data) {
  const str = JSON.stringify(data);
  SS.setItem(key, str);
}
/**
 * @desc 获得某个数据
 */
export function get(key) {
  return JSON.parse(SS.getItem(key));
}

/**
 * @desc 删除当前域下的所有的数据
 */
export function clear() {
  SS.clear();
}
/**
 * @desc 删除某一项数据
 */
export function remove(key) {
  SS.removeItem(key);
}
/**
 * @desc 返回当前域下localstorage的key值长度
 */
export function size() {
  return SS.length;
}
/**
 * @desc 判断浏览器是否支持localstorage,不能使用window的方式来判断
 */
export function isSupportStorage() {
  let support = false;
  if (SS && SS.setItem) {
    support = true;
    const key = `${Math.round(Math.random() * 1e7)}`;
    try {
      SS.setItem(key, key);
      SS.removeItem(key);
    } catch (err) {
      support = false;
    }
  }
  return support;
}

/**
 * @desc 遍历数据
 */
export function map(fn) {
  const arr = [];
  for (let i = 0; i < SS.length; i++) {
    arr.push(fn(SS.key(i), i));
  }
}
