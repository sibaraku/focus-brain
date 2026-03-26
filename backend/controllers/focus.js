import {db} from "../db.js"

export const startFocus = (req,res)=>{
 const userId = req.userId
 const sql = "INSERT INTO focus_sessions (user_id,duration) VALUES (?,1500)"
 db.query(sql,[userId],(err,result)=>{
  if(err) return res.status(500).json(err)
  res.json({sessionId:result.insertId})
 })
}

export const completeFocus = (req,res)=>{
 const id = req.params.id
 const sql = "UPDATE focus_sessions SET completed=true WHERE id=?"
 db.query(sql,[id],(err,result)=>{
  if(err) return res.status(500).json(err)
  res.json({message:"Session completed"})
 })
}

export const getStats = (req,res)=>{
 const userId = req.userId
 const sql = `
 SELECT COUNT(*) as totalSessions,
 SUM(duration) as totalTime FROM focus_sessions
 WHERE user_id=? AND completed=true
 `
 db.query(sql,[userId],(err,data)=>{
  if(err) return res.status(500).json(err)
  res.json(data[0])
 })
}