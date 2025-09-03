import { useState } from 'react';
import Modal from '@/components/Modal';

export default function OnboardingModal() {
  const [open, setOpen] = useState(true);
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      title="Welcome to Flora-Science"
      description="This app helps you track plant care, log experiments, and gain scientific insights. Here’s how to get started:"
    >
      <div className="space-y-4">
        {/* ...existing code... */}
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
