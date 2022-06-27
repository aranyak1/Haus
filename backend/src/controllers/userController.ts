import User from '../models/userModel';
import * as factory from './handlerFactory';

export const getUser = factory.getOne(User);
export const getAllUsers = factory.getAll(User);
export const createUser = factory.createOne(User);
export const updateUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);
