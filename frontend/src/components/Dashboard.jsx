import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [timer, setTimer] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) setNickname(savedNickname);
  }, []);

  const [stats, setStats] = useState({
    totalSessions: 0,
    totalTime: 0,
  });

  const [history, setHistory] = useState([]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  useEffect(() => {
    if (timer === 0 && sessionId) {
      alert("Great work! Take a short break!");
      handleFinish();
    }
  }, [timer]);

  const handleStart = async () => {
    try {
      const res = await fetch("http://localhost:5000/focus/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      setSessionId(data.sessionId);
      setIsRunning(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    navigate("/login");
  };

  const handleFinish = async () => {
    setIsRunning(false);

    if (!sessionId) return;

    try {
      await fetch(`http://localhost:5000/focus/${sessionId}/complete`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setSessionId(null);
      setTimer(25 * 60);
      fetchStats();
      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5000/focus/stats", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/focus/history", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearHistory = async () => {
    try {
      await fetch("http://localhost:5000/focus/history", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      fetchStats();
      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchHistory();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>BrainFocus</h1>
        <div className="user-info timer-buttons">
          <span className="welcome-text">Welcome, {nickname}!</span>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="focus-timer">
          <h2>Focus Timer</h2>
          <div className="timer-circle">{formatTime(timer)}</div>
          <div className="timer-buttons">
            <button onClick={handleStart}>START</button>
            <button onClick={handleFinish}>FINISH</button>
          </div>
        </section>

        <section className="statistics">
          <h2>Statistics</h2>
          <div className="stat-item">Total sessions: {stats.totalSessions}</div>
          <div className="stat-item">Total time: {stats.totalTime} min</div>
        </section>

        <section className="statistics">
          <h2>History</h2>
          <div className="timer-buttons">
            <button onClick={handleClearHistory} className="clear-history">
              Clear History
            </button>
          </div>
          {history.map((item) => (
            <div key={item.id} className="stat-item">
              {new Date(item.start_time).toLocaleString()} — {item.duration} min
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
