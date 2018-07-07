import validate from 'jsonschema';

const { Validator } = validate;

export default async (category) => {
  const v = new Validator();

  const schema = {
    title: 'Category',
    type: 'object',
    properties: {
      name: { type: 'string' },
      creationDate: { type: 'string' },
    },
    required: ['name']
  }

  const result = v.validate(category, schema);

  if (result.errors.length > 0) throw new Error(result.errors.map(({ stack }) => stack).join(', '));

  return true;
}