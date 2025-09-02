import { useState } from 'react';
import Modal from '@/components/Modal';

export default function OnboardingModal() {
  const [open, setOpen] = useState(true);
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Flora-Science</h2>
        <p className="text-base text-gray-700 dark:text-gray-300">
          This app helps you track plant care, log experiments, and gain scientific insights. Here’s how to get started:
        </p>
        <ul className="list-disc pl-5 text-base">
          <li>Add your first plant or room</li>
          <li>Log watering, fertilizing, and growth data</li>
          <li>Explore analytics and experiment logging</li>
        </ul>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setOpen(false)}
        >
          Get Started
        </button>
      </div>
    </Modal>
  );
}
