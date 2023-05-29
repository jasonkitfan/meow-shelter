/**
 * Calculates the age of a cat based on its date of birth.
 * @param {string} dob - The date of birth of the cat in the format "YYYY-MM-DD".
 * @returns {string} The age of the cat in years, rounded to one decimal place.
 */
export const calculateAge = (dob: string) => {
  const dobDate = new Date(dob);
  const diff = Date.now() - dobDate.getTime();
  const age = (diff / 1000 / 60 / 60 / 24 / 365).toFixed(1);
  return age;
};
