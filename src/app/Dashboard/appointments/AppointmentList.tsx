
import React from 'react';
import AppointmentCard from './AppointmentCard';
import { PatientsWithOppon } from '@/queries/oppo/useGetPatientWithOppo';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Oppontement } from '@/app/types/types';
type Props = {
  appointment: PatientsWithOppon;
  onConfirm: (data: FormData) => void;
  onCancel: (data: FormData) => void;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<Oppontement[] | null, Error>>
};
const AppointmentList = ({ appointment, onConfirm, onCancel,refetch }:any) => {
  return (
    <div className="space-y-4">
      {appointment?.map((appointment: Oppontement,index:number) => (
        <AppointmentCard
          key={index}
          appointment={appointment}
          onConfirm={onConfirm}
          onCancel={onCancel}
          refetch={refetch}
        />
      ))}
    </div>
  );
};

export default AppointmentList;