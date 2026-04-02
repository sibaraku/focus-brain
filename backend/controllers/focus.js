import { db } from "../db.js";

// START
export const startFocus = (req, res) => {
  const userId = req.userId;

  const sql = `
    INSERT INTO focus_sessions (user_id, start_time)
    VALUES (?, NOW())
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ sessionId: result.insertId });
  });
};

// COMPLETE
export const completeFocus = (req, res) => {
  const id = req.params.id;

  const sql = `
    UPDATE focus_sessions 
    SET completed = true,
        duration = ROUND(TIMESTAMPDIFF(SECOND, start_time, NOW()) / 60)
    WHERE id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Session completed" });
  });
};

// STATS
export const getStats = (req, res) => {
  const userId = req.userId;

  const sql = `
    SELECT 
      COUNT(*) as totalSessions,
      COALESCE(SUM(duration),0) as totalTime
    FROM focus_sessions
    WHERE user_id=? AND completed=true
  `;

  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};

// HISTORY
export const getHistory = (req, res) => {
  const userId = req.userId;

  const sql = `
    SELECT id, start_time, duration 
    FROM focus_sessions
    WHERE user_id=? AND completed=true
    ORDER BY start_time DESC
    LIMIT 10
  `;

  db.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};