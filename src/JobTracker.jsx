import React, { useState } from 'react';

function JobTracker() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem('torontoJobs');
    return saved ? JSON.parse(saved) : [];
  });

  const addJob = () => {
    const newJob = {
      company,
      role,
      date: new Date().toLocaleDateString(),
    };

    const newJobs = [...jobs, newJob];
    setJobs(newJobs);
    localStorage.setItem('torontoJobs', JSON.stringify(newJobs));
    setCompany('');
    setRole('');
  };

  return (
    <div className="mt-10 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h2 className="text-xl font-bold mb-4">CA My Toronto Job Tracker</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Company - Eg: Shopify"
          className="flex-1 p-2 rounded bg-zinc-800 border border-zinc-700"
        />
        <button
          onClick={addJob}
          className="px-4 py-2 bg-white text-black rounded font-bold"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {jobs.map((j, i) => (
          <li key={i} className="p-2 bg-zinc-800 rounded flex justify-between">
            <span>
              <b>{j.company}</b> - {j.role}
            </span>
            <span className="text-xs text-zinc-400">{j.date}</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-zinc-500 mt-4">Total applied: {jobs.length}</p>
    </div>
  );
}

export default JobTracker;