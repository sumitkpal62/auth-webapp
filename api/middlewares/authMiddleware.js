const errorCheck = async (err, req, res, next) => {
  return res.status(err.statuscode).json({
    status: err.statuscode,
    message: err.message,
  });
};

export { errorCheck };
