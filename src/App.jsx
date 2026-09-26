import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [range, setRange] = useState('7d')
  const [revenue, setRevenue] = useState(45231)
  const [users, setUsers] = useState(1203)

  const [chartData, setChartData] = useState([
    { name: 'Mon', revenue: 1200, users: 200 },
    { name: 'Tue', revenue: 1900, users: 300 },
    { name: 'Wed', revenue: 1500, users: 250 },
    { name: 'Thu', revenue: 2000, users: 400 },
    { name: 'Fri', revenue: 3000, users: 500 },
    { name: 'Sat', revenue: 5500, users: 600 },
    { name: 'Sun', revenue: 7000, users: 800},
  ])

  // Guardar tema

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) setDarkMode(saved === 'dark')
    }, [])

    const toggleTheme = () => {
      const newMode = !darkMode
      setDarkMode(newMode)
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
    }

    const updateData = () => {
      setRevenue(Math.floor(Math.random() * 20000) + 4000)
      setUsers(Math.floor(Math.random() * 500) + 1000)
      setChartData(chartData.map(d => ({ ...d, revenue: Math.floor(Math.random() * 6000) + 1000, users: Math.floor(Math.random() * 500) + 200 })))

    }

    const bg = darkMode ? '#0a0a0a' : '#f5f5f5'
    const cardBg = darkMode ? '#1a1a1a' : '#ffffff'
    const textColor = darkMode ? '#fff' : '#000'
    const subText = '#888'

    const downloadCSV = () => {
      const headers = 'Month,Revenue,Users\n'
      const rows = chartData.map((row) => `${row.name},${row.revenue},${row.users}`).join('\n')
      const csv = headers + rows
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `toronto_dashboard_${range}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }

    return (
      <div style={{ backgroundColor: bg, color: textColor, minHeight: '100vh', padding: '20px', fontFamily: 'Arial', transition: '0.3s' }}>
        {/* PROFILE DIA 5 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '25px',
            padding: '15px',
            background: cardBg,
            borderRadius: '12px',
            border: `1px solid ${darkMode ? '#333' : '#e5e7eb'}`,
          }}
        >
          <img src="/yo.jpg" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} alt="Alejandro" />
          <div>
            <h3 style={{ margin: 0 }}>Alejandro - Frontend Dev</h3>
            <p style={{ margin: '2px 0', color: subText, fontSize: '14px' }}>Open to Relocation | Open to Remote</p>
          </div>
          <span style={{ marginLeft: 'auto', background: '#10b981', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
            Open to Work
          </span>
        </div>

        {/* HEADER DIA 4 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0 }}>Toronto Dashboard</h1>
          <button onClick={toggleTheme} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: darkMode ? '#fff' : '#000', color: darkMode ? '#000' : '#fff' }}>
            {darkMode ? 'Light' : 'Dark'} 
          </button>
        </div>

        {/* FILTROS DIA 4 */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {['7d', '30d', '90d'].map(r => (
            <button key={r} onClick={() => setRange(r)} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid #333', background: range === r ? '#00ff88' : cardBg, color: range === r ? '#000' : textColor, cursor: 'pointer' }}>
              {r === '7d' ? 'Last 7 Days' : r === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
          <button onClick={updateData} style={{ marginLeft: 'auto', padding: '6px 14px', background: '#00f5ff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
           Update Data
          </button>

          <button onClick={downloadCSV} style={{ padding: '6px 14px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Download
          </button>
        </div>

      
        {/* CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px'}}>
          <div style={{ background: cardBg, padding: '20px', borderRadius: '12px' }}>
            <p style={{ color: subText, fontSize: '13px' }}>Revenue ({range})</p>
            <motion.h2
              key={revenue}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: '28px' }}
            >
              ${revenue.toLocaleString()}
            </motion.h2>
          </div>
          <div style={{ background: cardBg, padding: '20px', borderRadius: '12px' }}>
            <p style={{ color: subText, fontSize: '13px' }}>Users</p>
            <motion.h2
              key={users}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: '28px' }}
            >
              {users.toLocaleString()}
            </motion.h2>
          </div>
          <div style={{ background: cardBg, padding: '20px', borderRadius: '12px' }}>
            <p style={{ color: subText, fontSize: '13px' }}>Growth</p>
            <h2 style={{ fontSize: '28px', color: '#00ff88' }}>+12.5%</h2>
          </div>
        </div>

        {/* CHART */}
        <div style={{ width: '100%', height: '300px', background: cardBg, padding: '20px', borderRadius: '12px', marginTop: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>Sales Trend - {range}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#eee'} />
              <XAxis dataKey="name" stroke={darkMode ? '#888' : '#333'} />
              <YAxis stroke={darkMode ? "#888" : '#333'} />
              <Tooltip contentStyle={{ background: cardBg, border: `1px solid ${darkMode ? '#333' : '#ddd'}` }} />
              <Line type="monotone" dataKey="revenue" stroke="#00f5ff" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

export default App