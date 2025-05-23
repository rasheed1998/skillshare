'use client';
import { Formik, Form, Field } from 'formik';
import axios from '../../../../../lib/axios';

export default function UpdateSkillModal({ skill, onClose, onSuccess }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Skill</h2>
        <Formik
          initialValues={{
            category: skill.category,
            experience: skill.experience,
            nature: skill.nature,
            hourlyRate: skill.hourlyRate,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.put(`/skills/${skill.id}`, {
                ...values,
                hourlyRate: parseFloat(values.hourlyRate),
              });
              onSuccess();
            } catch (err) {
              alert('Failed to update skill');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field name="category" placeholder="Category" className="input" />
              <Field name="experience" placeholder="Experience" className="input" />
              <Field as="select" name="nature" className="input">
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
              </Field>
              <Field name="hourlyRate" placeholder="Hourly Rate" className="input" />
              <div className="flex justify-between">
                <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isSubmitting ? 'Updating...' : 'Update'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}