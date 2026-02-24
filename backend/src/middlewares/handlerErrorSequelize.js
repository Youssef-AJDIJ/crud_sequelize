const formatSequelizeError = (error) => {
  return error.errors.map(err => ({
    field: err.path,
    message: err.message
  }))
}


module.exports = formatSequelizeError