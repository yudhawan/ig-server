const express = require("express");
const router = express.Router();
const getRandomUsers = require("./getRandomusers");
const login = require("./login");
const authServices = require("./authServices");
const addFeed = require("./addFeed");
const updateUser = require("./updateUser");
const getFeeds = require("./getFeeds");
const getRandomusers = require("./getRandomusers");



router.get('/getUsers',getRandomUsers)
router.post('/login',login)
router.get('/authservices',authServices)
router.post('/addFeed',addFeed)
router.get('/getFeeds',getFeeds)
router.get('/getRandomUsers',getRandomusers)
router.post('/updateUser',updateUser)





module.exports=router