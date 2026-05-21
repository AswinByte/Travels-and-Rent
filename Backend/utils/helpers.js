import bcrypt from "bcryptjs";

// Generate 4 Digit OTP
export const generateOTP = () => {

  return Math.floor(
    1000 + Math.random() * 9000
  ).toString();

};

// Hash Password
export const hashPassword =
async (password) => {

  const salt =
    await bcrypt.genSalt(10);

  return await bcrypt.hash(
    password,
    salt
  );

};

// Compare Password
export const comparePassword =
async (
  enteredPassword,
  hashedPassword
) => {

  return await bcrypt.compare(
    enteredPassword,
    hashedPassword
  );

};

// Calculate Rental Days
export const calculateDays = (
  pickupDate,
  returnDate
) => {

  const pickup =
    new Date(pickupDate);

  const drop =
    new Date(returnDate);

  return Math.ceil(
    (drop - pickup)
    /
    (1000 * 60 * 60 * 24)
  );

};

// Calculate Rental Amount
export const calculateAmount = (
  totalDays,
  pricePerDay
) => {

  return totalDays
    * pricePerDay;

};