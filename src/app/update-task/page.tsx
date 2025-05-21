import { useState } from 'react';
import axios from 'axios';

export default function UpdateTask() {
  const [formData, setFormData] = useState({
    taskId: '',
    category: '',
    name: '',
    description: '',
    startDate: '',
    hours: '',
    rate: '',
    currency: 'USD',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/tasks/${formData.taskId}`, {
      category: formData.category,
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      hours: Number(formData.hours),
      rate: Number(formData.rate),
      currency: formData.currency,
    });
    alert('Task updated successfully');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Task</h2>
      <input name="taskId" placeholder="Task ID" onChange={handleChange} required />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="name" placeholder="Task Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="startDate" type="date" onChange={handleChange} />
      <input name="hours" placeholder="Working Hours" onChange={handleChange} />
      <input name="rate" placeholder="Hourly Rate" onChange={handleChange} />
      <select name="currency" onChange={handleChange}>
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="SGD">SGD</option>
        <option value="INR">INR</option>
      </select>
      <button type="submit">Update Task</button>
    </form>
  );
}