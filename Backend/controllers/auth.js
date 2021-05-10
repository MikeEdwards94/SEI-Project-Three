import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environments.js'

export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    console.log('NEW USER>>', newUser)
    return res.status(202).json({ message: `Welcome ${newUser.username}` })
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const loginUser = async (req, res) => {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error()
    }
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7 days' })
    return res.status(200).json({ message: `Welcome back ${userToLogin.username}`, token })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ message: 'Unauthorized ' })
  }
} 

// * Show a user's profile

export const showUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const profile = await User.findById(id).populate('user')
    // console.log(profile)
    if (!profile) throw new Error()
    return res.status(200).json(profile)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Something went wrong' })
  }
}

// * Show all users
export const getAllUsers = async (_req, res) => {
  const users = await User.find()
  return res.status(200).json(users)
}


// * EDIT user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const userToUpdate = await User.findById(id)
    if (!userToUpdate) throw new Error()
    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()
    return res.status(202).json(userToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}


// * should probs have a delete route too 
