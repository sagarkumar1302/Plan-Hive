export function isTokenExpired(token) {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT
  const expiry = payload.exp * 1000;
  const now = Date.now();

  return now > expiry;
}
