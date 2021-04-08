import * as Express from "express";
import Hero from "../models/hero";
import HeroList from "../data/heroes.json";

// Return list of all characters from data crawled from website
const findAll = async (req: Express.Request, res: Express.Response) => {
  return res.json({
    heroes: HeroList
  });
};

// Return 1 character (based on id) from data crawled from website
const findById = async (req: Express.Request, res: Express.Response) => {};

export default {
  findAll,
  findById
};
