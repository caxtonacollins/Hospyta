import { Request } from 'express';
import { Db } from 'mongodb';

/**
 * @interface IRequest
 */
export interface IRequest extends Request {
  user: string;
  params: any
  db?: Db;
}
