function decodeJwtPayload(token: string) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const json = atob(base64);
  return JSON.parse(json);
}

export { decodeJwtPayload };
