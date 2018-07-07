import validate from 'jsonschema';
import { categoryCollection, foodOriginCollection } from '../utils/mongo';

const { Validator } = validate;

export default async (item) => {
  const v = new Validator();
  const categories = await categoryCollection().find({}).toArray();
  const foodOrigin = await foodOriginCollection().find({}).toArray();

  console.log(categories.map((cat) => cat));

  const schema = {
    title: 'Item',
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      category: { type: 'string', 'enum': categories.map(({ _id }) => _id.toString()) },
      foodOrigin: { type: 'string', 'enum': foodOrigin.map(({ _id }) => _id.toString()) },
      expiryDate: { type: 'string' },
      location: { type: 'string' },
      coordinates: { type: 'object' },
      usedCondition: { type: 'string' },
      postDate: { type: 'string' },
    },
    required: ['title', 'description', 'category', 'expiryDate', 'location', 'coordinates']
  }

  const result = v.validate(item, schema);

  if (result.errors.length > 0)
    throw new Error(result.errors.map(({ stack }) => stack).join(', '));

  return true;
}