const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries);
    });
  // returning('*')
  //     return res.json(user.enteris);
};

module.exports = { handleImage };
