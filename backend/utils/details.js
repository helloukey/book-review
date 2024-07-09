const detailsOptions = (location, age, work, dob, description) => {
  let details = {};
  if (location) details.location = location;
  if (age) details.age = age;
  if (work) details.work = work;
  if (dob) details.dob = dob;
  if (description) details.description = description;
  return details;
};

module.exports = { detailsOptions };
