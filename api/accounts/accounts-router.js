const router = require('express').Router();
const {checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware');
const Accounts = require('./accounts-model');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(data => {
      // throw new Error('Hello jeffery'),
      res.json(data);
    })
    .catch(() => {
      res.status(500).json({message: 'could not get accounts'});
      next();
    });
})

router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  Accounts.getById(id)
    .then(account => {
      res.json(account[0]);
    })
    .catch(() => {
      res.status(500).json({message: 'could not get account'});
      next();
    })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.account)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(() => {
      res.status(500).json({message: 'could not create account'});
      next();
    })
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  const { id } = req.params;
  Accounts.updateById(id, req.account)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(() => {
      res.status(500).json({message: 'could not create account'});
      next();
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  Accounts.deleteById(id)
    .then(account => {
      res.json(account);
    })
    .catch(() => {
      res.status(500).json({message: 'could not delete account'});
      next();
    })
})

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    custom: 'Error occurred in the accounts-router',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;