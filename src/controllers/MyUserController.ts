import { count } from "console";
import user from "../models/user";
import { Request, Response } from "express";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currUser = await user.findOne({ _id: req.userId });
    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(currUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  // check if the user exists
  // create the user if it doesn't exist
  // return the user object to the calling client

  try {
    const { auth0Id } = req.body;
    const existingUser = await user.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new user(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const currUser = await user.findById(req.userId);

    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }

    currUser.name = name;
    currUser.addressLine1 = addressLine1;
    currUser.country = country;
    currUser.city = city;

    await currUser.save();
    res.send(currUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default { getCurrentUser, createCurrentUser, updateCurrentUser };
