const ErrorMessage = (status, message, res) => {
  res.json({
    status,
    message,
  });
};

const successMessage = (result, res) => {
  res.json({
    status: 200,
    ...result,
  });
};

module.exports = { ErrorMessage, successMessage };
