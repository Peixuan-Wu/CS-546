//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require('express');  
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemonData;
const helper = require('../helpers');



router
  .route('/pokemon')
  .get(async (req, res) => {
    try {
      const pokemonList = await pokemonData.pokemon();
      res.json(pokemonList);
    } catch(e) {
      res.status(500).send(e);
    }
  })
//Request Method

router
  .route('/pokemon/:id')
  .get(async(req, res) => {
    try {
      req.params.id = helper.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({error: "Invalid URL Parameter"});
    }
    try {
      const pokemon = await pokemonData.pokemonById(req.params.id);
      res.json(pokemon);
    } catch(e) {
      res.status(404).json({error: "Pokémon Not Found!"})
    }

  })
//Request Method

module.exports = router;