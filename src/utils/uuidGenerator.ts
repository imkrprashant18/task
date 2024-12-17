// utils/uuid.ts

/**
 * Generate a unique identifier (UUID) version 4.
 * @returns {string} A unique UUID string
 */
export const generateUUID = (): string => {
  // Using the crypto API to generate random values
  const crypto = window.crypto || globalThis.crypto; // For both client-side and Node.js
  const randomValues = new Uint8Array(16);

  crypto.getRandomValues(randomValues);

  // Set the version (4) and variant bits according to the UUID specification
  randomValues[6] = (randomValues[6] & 0x0f) | 0x40; // Set version 4
  randomValues[8] = (randomValues[8] & 0x3f) | 0x80; // Set variant bits

  // Convert to UUID format (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
  const uuid = `${randomValues[0].toString(16)}${randomValues[1].toString(16)}${randomValues[2].toString(16)}${randomValues[3].toString(16)}-${randomValues[4].toString(16)}${randomValues[5].toString(16)}-${randomValues[6].toString(16)}${randomValues[7].toString(16)}-${randomValues[8].toString(16)}${randomValues[9].toString(16)}-${randomValues[10].toString(16)}${randomValues[11].toString(16)}${randomValues[12].toString(16)}${randomValues[13].toString(16)}${randomValues[14].toString(16)}${randomValues[15].toString(16)}`;

  return uuid;
};
