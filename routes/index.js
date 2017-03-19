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


//https://github.com/davidwood/node-password-hash
/*
1. Paginated List of SuperHeroes - ok
2. Create SuperHero - ok
3. Update SuperHero - ok
4. Delete SuperHero - ok
5. View single SuperHero - ok
6. Paginated List of SuperPowers - ok
7. Create SuperPower - ok
8. Update SuperPower - ok
9. Delete SuperPower a. If the superpower is associated to any superhero, the action has to be blocked - ok
10. View single SuperPower - ok
11. Paginated List of Users
12. Create User - ok
13. Update User - ok
14. Delete User - ok
15. Authenticate to the api - ok
16. Subscribe to Audit (better detailed in the audit section)
17. [BONUS] Help Me endpoint: send a location (latitude and longitude) and find up to 8 closest superheroes (in a 10km radius)
*/
module.exports = router;
