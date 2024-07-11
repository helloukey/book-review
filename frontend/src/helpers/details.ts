type Details = {
  location?: string;
  age?: number;
  work?: string;
  dob?: Date | string;
  description?: string;
};

const detailsOptions = (
  location: string,
  age: number,
  work: string,
  dob: Date | string,
  description: string
) => {
  let details: Details = {};
  if (location) details.location = location;
  if (age) details.age = age;
  if (work) details.work = work;
  if (dob) details.dob = dob;
  if (description) details.description = description;
  return details;
};

export { detailsOptions };
