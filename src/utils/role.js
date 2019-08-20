const _role = 'role';

export function getRole() {
  return sessionStorage.getItem(_role);
}

export function setRole(data) {
  return sessionStorage.setItem(_role, data);
}

export function removeRole() {
  return sessionStorage.removeItem(_role);
}
