import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req,res) => {
 const {email,password} = req.body
 const hashed = bcrypt.hashSync(password,10)
 const sql = "INSERT INTO users (email,password) VALUES (?,?)"
 db.query(sql,[email,hashed],(err,result)=>{
  if(err)
   return res.status(500).json(err)
  res.json({message:"User created"})
 })
}

export const login = (req,res)=>{
 const {email,password} = req.body
 const sql = "SELECT * FROM users WHERE email=?"
 db.query(sql,[email],(err,data)=>{
  if(err) return res.status(500).json(err)
  if(data.length===0)
   return res.status(404).json({message:"User not found"})
  const valid = bcrypt.compareSync(password,data[0].password)
  if(!valid)
   return res.status(401).json({message:"Wrong password"})
  const token = jwt.sign(
   {id:data[0].id},
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
  )
  res.json({token})
 })
}