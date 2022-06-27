import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { statusCode } from '../utils/stausCodes';
import { Request, Response, NextFunction } from 'express';
import { APIFeatures } from '../utils/apiFeatures';

export const getOne = (Model: any, popOptions?: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(Model);
    let query = Model.findById(req.params.id);
    // with .populate we populate the owner field in houses with users and
    // in here only firstname and email are populated
    // let query = Model.findById(req.params.id).populate('owner','firstName email');
    // if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(
        new AppError('No document found with that ID', statusCode.NotFound),
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getAll = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};

    // this function chaining follows builder pattern
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // query.explain() returns important execution stats
    // const docs = await features.query.explain();

    const totalResultsQuery = new APIFeatures(Model.find(filter), req.query).filter();
    const totalResults = await totalResultsQuery.query;
    let docs = await features.query;

    // const docs = await Model.find().sort('price');

    //SEND RESPONSE
    res.status(statusCode.OK).json({
      status: 'success',
      totalResults:totalResults.length,
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

export const createOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);
    res.status(statusCode.Created).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const deleteOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError('No document with that id found', statusCode.NotFound),
      );
    }

    res.status(statusCode.NoContent).json({
      status: 'success',
      data: {
        data: null,
      },
    });
  });

export const updateOne = (Model: any) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(
        new AppError('No document with that id found', statusCode.NotFound),
      );
    }

    res.status(statusCode.OK).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
