'use client';
import { useState } from 'react';
import UpdateSkillModal from './modals/UpdateSkillModal';

export default function SkillTable({ skills, onReload }: any) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2">Experience</th>
            <th className="px-4 py-2">Nature</th>
            <th className="px-4 py-2">Rate</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {skills.map((skill: any) => (
            <tr key={skill.id}>
              <td className="px-4 py-2">{skill.category}</td>
              <td className="px-4 py-2">{skill.experience}</td>
              <td className="px-4 py-2">{skill.nature}</td>
              <td className="px-4 py-2">{skill.hourlyRate}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setSelected(skill)}
                  className="text-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <UpdateSkillModal
          skill={selected}
          onClose={() => setSelected(null)}
          onSuccess={onReload}
        />
      )}
    </div>
  );
}