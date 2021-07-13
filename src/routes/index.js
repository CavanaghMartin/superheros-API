const { Router } = require('express');


const router = Router();

router.use('/favorites', require('./favorites.js'));
router.use('/superheros', require('./superheros.js'));


module.exports = router;