const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where({ id: id });
}

const create = account => {
  return db('accounts').insert(account)
    .then(idArr => {
      return {
        id: idArr[0],
        name: account.name,
        budget: account.budget
      };
    })
    .catch(() => {
      return null;
    })
}

const updateById = (id, account) => {
  return db('accounts').where({ id: id }).update(account)
    .then(() => {
      return {
        id,
        name: account.name,
        budget: account.budget
      };
    })
    .catch(() => {
      return null;
    })
}

const deleteById = async(id) => {
  let account = await getById(id);
  await db('accounts').where({ id: id }).del();
  return account;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}