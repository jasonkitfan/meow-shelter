// Calculate the age of the cat
export const calculateAge = (dob: string) => {
  const dobDate = new Date(dob);
  const diff = Date.now() - dobDate.getTime();
  const age = (diff / 1000 / 60 / 60 / 24 / 365).toFixed(1);
  return age;
};
