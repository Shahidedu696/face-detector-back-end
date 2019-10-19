const handleRegister = (req, res, bcrypt, db) => {
  const { email, password, name } = req.body;
  //   if (!email || !password || !name) {
  //     return res.status(400).json("incorrect form sumbition");
  //   }
  const hash = bcrypt.hashSync(password, 10);
  db.transaction(trx => {
    trx
      .insert({
        email: email,
        hash: hash
      })
      .into("login")
      .returning("email")
      .then(retruningEmail => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: retruningEmail[0],
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("unable to register..!"));
};

module.exports = { handleRegister: handleRegister };
