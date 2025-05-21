import { useState } from 'react';
import axios from 'axios';

export default function TaskProgress() {
  const [taskId, setTaskId] = useState('');
  const [progress, setProgress] = useState('');
  const [completeId, setCompleteId] = useState('');

  const updateProgress = async () => {
    await axios.put(`http://localhost:3000/tasks/${taskId}/progress`, {
      progressUpdate: progress,
    });
    alert('Progress updated');
  };

  const markComplete = async () => {
    await axios.put(`http://localhost:3000/tasks/${completeId}/complete`);
    alert('Task marked as completed');
  };

  return (
    <div>
      <h2>Update Task Progress</h2>
      <input placeholder="Task ID" value={taskId} onChange={e => setTaskId(e.target.value)} />
      <input placeholder="Progress Description" value={progress} onChange={e => setProgress(e.target.value)} />
      <button onClick={updateProgress}>Update Progress</button>

      <h2>Mark Task as Completed</h2>
      <input placeholder="Task ID" value={completeId} onChange={e => setCompleteId(e.target.value)} />
      <button onClick={markComplete}>Mark Completed</button>
    </div>
  );
}
