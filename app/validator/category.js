import validate from 'jsonschema';

const { Validator } = validate;

export default async (item) => {
  const v = new Validator();

  const schema = {
    title: 'Item',
    type: 'object',
    properties: {
      name: { type: 'string' },
      creationDate: { type: 'string' },
    },
    required: ['name']
  }

  const result = v.validate(item, schema);

  if (result.errors.length > 0)
    throw new Error(result.errors.map(({ stack }) => stack).join(', '));

  return true;
}