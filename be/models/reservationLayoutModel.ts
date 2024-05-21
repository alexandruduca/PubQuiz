import mongoose from 'mongoose';
import { LandmarkType } from '../types/reservationLayout';

const Schema = mongoose.Schema;

const landmarkSchema = new Schema({
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
  type: {
    type: LandmarkType,
    required: true,
  },
  tableName: {
    type: String,
  },
  teamName: {
    type: String,
  },
  recurrentReservation: {
    type: Boolean,
  },
});

const reservationLayoutSchema = new Schema({
  numberOfRows: {
    type: Number,
    required: true,
  },
  numberOfColumns: {
    type: Number,
    required: true,
  },
  landmarks: [landmarkSchema],
});

export default mongoose.model('reservationLayout', reservationLayoutSchema);
