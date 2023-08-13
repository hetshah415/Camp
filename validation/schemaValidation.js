module.exports.schemaValidation = schema.validate({
    location,
    title,
    image,
    price,
    description,
  });
  if (result.error) {
    const { error } = result;
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }