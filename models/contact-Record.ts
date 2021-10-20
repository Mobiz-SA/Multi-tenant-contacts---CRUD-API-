import {Guid} from 'guid-typescript';

export interface contactRecord {
  id: Guid;
  userId: string;
  name: string;
  surname: string;
  phonenumber: string;
}
