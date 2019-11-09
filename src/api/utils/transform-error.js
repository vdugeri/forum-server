const formatDBErrors = error => {
  if (!error.name || error.name !== "validationError") return error;
  return error.errors;
};

export default formatDBErrors;
