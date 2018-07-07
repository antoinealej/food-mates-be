import validate from 'jsonschema';

const { Validator } = validate;

export default async (user) => {
  const v = new Validator();

  const schema = {
    title: 'User',
    type: 'object',
    properties: {
      userName: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['userName', 'password']
  }

  const result = v.validate(user, schema);

  if (result.errors.length > 0) throw new Error(result.errors.map(({ stack }) => stack).join(', '));

  return true;
}