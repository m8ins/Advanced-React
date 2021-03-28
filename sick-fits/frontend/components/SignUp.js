import gql from 'graphql-tag';

import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    await signup().catch(console.error);
    resetForm();
    // Send the email and password to the graphql API
  }

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign up for an account</h2>
      <Error error={error} />
      <fieldset>
        {data?.createUser && (
          <p>Signed up with {data.createUser.email} – You can sign in now!</p>
        )}
        <label htmlFor="name">
          Your name
          <input
            type="text"
            name="name"
            placeholder="Eleanor Shellstrop"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="eleanor@thegoodplace.com"
              autoComplete="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </label>
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="*******"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign in!</button>
      </fieldset>
    </Form>
  );
}
