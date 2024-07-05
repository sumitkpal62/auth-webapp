export const errorHandler = (statuscode, success, message) => {
  const error = new Error();
  (error.statuscode = statuscode),
    (error.success = success),
    (error.message = message);
  return error;
};
