function decodeJwtPayload(token: string | undefined) {
  if (!token) return "";

  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const json = atob(base64);
  return JSON.parse(json);
}

export { decodeJwtPayload };
