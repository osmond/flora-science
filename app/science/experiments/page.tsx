'use client';
import { useState } from 'react';

interface Experiment {
  id: string;
  title: string;
  description: string;
  date: string;
  results: string;
}

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [form, setForm] = useState<Partial<Experiment>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExperiments([
      ...experiments,
      { ...form, id: Date.now().toString(), date: new Date().toISOString() } as Experiment,
    ]);
    setForm({});
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Experiment Log</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          name="title"
          value={form.title || ''}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={form.description || ''}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="results"
          value={form.results || ''}
          onChange={handleChange}
          placeholder="Results"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Log Experiment</button>
      </form>
      <ul>
        {experiments.map(exp => (
          <li key={exp.id} className="mb-4 p-2 border rounded bg-gray-50 dark:bg-gray-900">
            <strong>{exp.title}</strong> <span className="text-xs text-gray-500">{exp.date}</span>
            <div>{exp.description}</div>
            {exp.results && <div className="mt-2 text-green-700">{exp.results}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
