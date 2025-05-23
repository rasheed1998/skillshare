'use client';
import { Formik, Form, Field, FieldArray } from 'formik';
import axios from '../../../../../lib/axios';

export default function CreateSkillModal({ onClose, onSuccess }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Skill</h2>
        <Formik
          initialValues={{
            categoryIds: [],        // ✅ array of number strings
            experience: '',
            nature: 'online',
            hourlyRate: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await axios.post('/skills', {
                ...values,
                hourlyRate: parseFloat(values.hourlyRate),
                categoryIds: values.categoryIds.map(Number), // ✅ ensure number[]
              }, {
                withCredentials: true,
              });
              onSuccess();
            } catch (err) {
              alert('Failed to create skill');
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, values, handleChange }) => (
            <Form className="space-y-4">
              {/* Multi-select or hardcoded checkbox for categories */}
              <label className="block font-semibold">Categories</label>
              <div className="flex gap-4">
                <label>
                  <Field type="checkbox" name="categoryIds" value="1" />
                  <span className="ml-1">Design</span>
                </label>
                <label>
                  <Field type="checkbox" name="categoryIds" value="2" />
                  <span className="ml-1">Development</span>
                </label>
                <label>
                  <Field type="checkbox" name="categoryIds" value="3" />
                  <span className="ml-1">Marketing</span>
                </label>
              </div>

              <Field name="experience" placeholder="Experience (e.g. 3 years)" className="input" />
              <Field as="select" name="nature" className="input">
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
              </Field>
              <Field name="hourlyRate" type="number" placeholder="Hourly Rate" className="input" />

              <div className="flex justify-between">
                <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
