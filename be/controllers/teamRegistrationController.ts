import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import ReservationLayout from '../models/reservationLayoutModel';
import { ResponseCodes } from '../types/constants';
import { Landmark } from '../types/reservationLayout';

export const getReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const layout = await ReservationLayout.findOne({});
    return res.status(200).send(layout);
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const postReservations = async (req: Request, res: Response, next: NextFunction) => {
  const layout = req.body;
  try {
    const newLayout = new ReservationLayout(layout);
    newLayout.save();
    return res.status(200).send('success');
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const reserveTable = async (req: Request, res: Response, next: NextFunction) => {
  const { tableId, teamName } = req.body;
  try {
    await ReservationLayout.findOneAndUpdate(
      { 'landmarks._id': new ObjectId(tableId) },
      { $set: { 'landmarks.$.teamName': teamName } },
      { new: true }
    );
    return res.status(201).send(ResponseCodes.TABLE_RESERVED_SUCCESSFULLY);
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const resetReservations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reservations = await ReservationLayout.findOne({});
    reservations.landmarks.forEach((landmark: Landmark) => {
      if (!landmark.recurrentReservation) {
        landmark.teamName = undefined;
      }
    });
    await reservations.save();
    return res.status(201).send(ResponseCodes.RESERVATIONS_RESET_SUCCESSFULLY);
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};

export const updateLandmark = async (req: Request, res: Response, next: NextFunction) => {
  const landmark = req.body;
  if (!landmark.teamName) {
    delete landmark.teamName;
  }
  try {
    await ReservationLayout.findOneAndUpdate(
      { 'landmarks._id': new ObjectId(landmark._id) },
      { $set: { 'landmarks.$': landmark } },
      { new: true }
    );
    return res.status(201).send(ResponseCodes.LANDMARK_UPDATED_SUCCESSFULLY);
  } catch (e: any) {
    res.status(404).send(e.message);
  }
};
