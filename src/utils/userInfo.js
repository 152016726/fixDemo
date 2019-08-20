const _useInfo = 'info';

export function getInfo() {
  return sessionStorage.getItem(_useInfo);
}

export function setInfo(data) {
  return sessionStorage.setItem(_useInfo, data)
}

export function removeInfo() {
  return sessionStorage.removeItem(_useInfo)
}
