// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Device, User, Todo, DeviceUser } = initSchema(schema);

export {
  Device,
  User,
  Todo,
  DeviceUser
};