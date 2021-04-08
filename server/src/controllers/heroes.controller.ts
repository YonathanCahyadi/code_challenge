import * as Express from "express";
import Hero from "../models/hero";
import HeroList from "../data/heroes.json";

// Return list of all characters from data crawled from website
const findAll = async (req: Express.Request, res: Express.Response) => {
  return res.json(HeroList);
};

// Return 1 character (based on id) from data crawled from website
const findById = async (req: Express.Request, res: Express.Response) => {
  const id = req.params.id;

  const hero = HeroList.filter((hero: Hero) => hero.id === id);

  if (hero.length === 0) {
    return res.status(400).json({
      error: "Hero not found."
    });
  }

  return res.json({
    hero: hero[0]
  });
};

export default {
  findAll,
  findById
};
