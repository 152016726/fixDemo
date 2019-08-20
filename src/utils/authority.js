const _authority = 'authority';

export function getAuthority() {
  return sessionStorage.getItem(_authority);
}

export function setAuthority(data) {
  return sessionStorage.setItem(_authority, data);
}

export function removeAuthority() {
  return sessionStorage.removeItem(_authority);
}
