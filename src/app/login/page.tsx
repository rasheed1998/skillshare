'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(values),
          });

          if (res.ok) {
            router.push('/dashboard');
          } else {
            alert('Login failed');
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <Field name="email" type="email" placeholder="Email" className="input" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

            <Field name="password" type="password" placeholder="Password" className="input" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
