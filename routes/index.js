var express = require('express');
var router = express.Router();
var validation = require('../validation/validation.js');
var controllerLogin = require('../controllers/login.js');
var controllerHero = require('../controllers/hero.js');
var controllerPower = require('../controllers/power.js');
var controllerUser = require('../controllers/user.js');

router.post('/login', validation.login, controllerLogin.index);

router.post('/super-hero', validation.superHero, controllerHero.create);
router.patch('/super-hero/:id', validation.superHeroUpdate, controllerHero.update);
router.get('/super-hero', controllerHero.list);
router.get('/super-hero/:id', controllerHero.getId);
router.delete('/super-hero/:id', validation.superHeroDelete, controllerHero.delete);

router.post('/super-power', validation.superPower, controllerPower.create);
router.patch('/super-power/:id', validation.superPowerUpdate, controllerPower.update);
router.get('/super-power', controllerPower.list);
router.get('/super-power/:id', controllerPower.getId);
router.delete('/super-power/:id', validation.superPowerDelete, controllerPower.delete);

router.post('/user', validation.user, controllerUser.create);
router.patch('/user/:id', validation.userUpdate, controllerUser.update);
router.get('/user', controllerUser.list);
router.get('/user/:id', controllerUser.getId);
router.delete('/user/:id', validation.userDelete, controllerUser.delete);

module.exports = router;
