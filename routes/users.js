var express = require('express');
var router = express.Router();

const userdb = require('../data/userdb');

/* GET users listing. */
router.get('/', async (req, res) =>{
  try{
    const {rows} = await userdb.getUsers();
    res.send(rows);
  } catch(err){
    res.status(500).send(err.message);
  }
  
});

/* GET home page. */
router.put('/', async (req, res)=> {
  try{
    const {rowCount} = await userdb.createUsers();
    res.send(`Number of users added : ${rowCount}`);
  } catch(err){
    res.status(500).send(err.message);
  }
});

module.exports = router;
