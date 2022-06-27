import Home from '../models/homeModel';
import * as factory  from './handlerFactory';

export const getHome = factory.getOne(Home);
export const getAllHomes = factory.getAll(Home);
export const createHome = factory.createOne(Home);
export const updateHome = factory.updateOne(Home);
export const deleteHome = factory.deleteOne(Home);

