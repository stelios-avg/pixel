'use client'
import { useState } from 'react'

interface Props {
  onClose: () => void
}

export default function ContactModal({ onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
  if (!name || !email || !message) {
    alert('Συμπλήρωσε όλα τα πεδία.');
    return;
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('we received your request!');
    } else {
      alert(data.error || 'Αποτυχία αποστολής.');
    }

    onClose(); // Κλείνει το modal
  } catch (err) {
    console.error(err);
    alert('Σφάλμα κατά την αποστολή. Δοκίμασε ξανά.');
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-neutral-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl mb-4 font-bold text-white">Send your Project</h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-3 rounded text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 mb-3 rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Project description"
          className="w-full p-2 mb-3 rounded text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        />
        <div className="flex justify-between">
          <button
            className="bg-white text-black font-semibold px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Send
          </button>
          <button
            className="text-white border px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
