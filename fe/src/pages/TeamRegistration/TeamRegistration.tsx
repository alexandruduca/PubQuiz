import React, { useEffect } from 'react';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectId, selectIsAdmin } from '../Login/selectors';
import { selectMyTeam } from '../Teams/selectors';
import { getTeamsTrigger } from '../Teams/teamsSlice';
import ReservationForm from './ReservationForm';
import TablesLayout from './TablesLayout';
import { selectLoading } from './selectors';
import { getReservationsTrigger } from './teamRegistrationSlice';
import AdminReservationForm from './AdminReservationForm';

export const TeamRegistration = () => {
  const dispatch = useAppDispatch();
  const team = useAppSelector(selectMyTeam);
  const id = useAppSelector(selectId);
  const isCurrentLeader = team && team.leader._id === id;
  const registrationLoading = useAppSelector(selectLoading);
  const isAdmin = useAppSelector(selectIsAdmin);

  useEffect(() => {
    dispatch(getTeamsTrigger(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getReservationsTrigger());
  }, [dispatch]);

  return (
    <Loader loading={registrationLoading}>
      <div>
        <TablesLayout />
        {isCurrentLeader && <ReservationForm />}
        {isAdmin && <AdminReservationForm />}
      </div>
    </Loader>
  );
};
