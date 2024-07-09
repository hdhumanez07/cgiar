export function isJWT(token: string): boolean {
  if (typeof token !== "string") {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const encodedPayload = parts[1];
  try {
    const decodedPayload = atob(encodedPayload);
    const payloadObject = JSON.parse(decodedPayload);

    if (typeof payloadObject === "object" && payloadObject !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
