import { Types } from 'mongoose';

export class RemindIntervalSetDto {
  userId: Types.ObjectId;
  hours: number;
}
