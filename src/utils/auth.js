const _token = 'auth-token';

export function getAuth() {
  return sessionStorage.getItem(_token);
}

export function setAuth(data) {
  return sessionStorage.setItem(_token, data);
}

export function removeAuth() {
  return sessionStorage.removeItem(_token);
}
