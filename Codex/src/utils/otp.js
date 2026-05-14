export function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function otpExpiresAt(minutes) {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + minutes);
  return expiresAt;
}
