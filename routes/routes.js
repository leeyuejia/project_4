const express = require('express');
const router = express.Router();
const parentControllers = require('../controllers/parentControllers');
const kidControllers = require('../controllers/kidControllers');
const gameControllers = require('../controllers/gameControllers');

router.get('/', parentControllers.getAllParents);
router.get('/parents', parentControllers.getAllParents);

router.get('/parents/:idx', parentControllers.getParentByID);
router.post('/parents', parentControllers.createOneParent);
router.put('/parents/:idx', parentControllers.updateOneParent);
router.put('/parents/change/:idx', parentControllers.changePwdOneParent);
router.put('/parents/add/:idx', parentControllers.addKidtoParent);
router.put('/parents/del/:idx/:kidx', parentControllers.deleteKidfromParent);

router.get('/kids/:idx', kidControllers.getKidByID);
router.post('/kids', kidControllers.createOneKid);
router.put('/kids/:idx', kidControllers.updateOneKid);
router.put('/kids/start/:idx/:gidx', kidControllers.kidStartGame);
router.put('/kids/stop/:idx/:gidx', kidControllers.kidStopGame);
// router.delete('/kids/:idx', gameControllers.deleteOneKid);

router.get('/games/:idx', gameControllers.getGameByID);
router.post('/games', gameControllers.createOneGame);
router.put('/games/:idx', gameControllers.updateOneGame);
router.delete('/games/:idx', gameControllers.deleteOneGame);

router.get('/success', (req,res) => {res.send(`success with`, req.user)});
router.get('/unsuccess', (req,res) => {res.send(`unsuccess with${messages.error}`)});
router.post('/login', parentControllers.login); // logging in with user input with username and password

module.exports = router;
