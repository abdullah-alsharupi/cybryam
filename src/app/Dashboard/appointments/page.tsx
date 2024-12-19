"use client";
import AppointmentList from "./AppointmentList";
import { useGetAllPatientsWithOppon } from "@/queries/oppo/useGetPatientWithOppo";
import { useMutation } from "@tanstack/react-query";
import { UpdateStatusFuntion } from "@/mutations/oppo/UpdateStatus";
import Loader from "@/components/ui/loader";
import { useEffect } from "react";

const AppointmentRequests = () => {
  const { data: appointment, refetch,isError,isLoading } = useGetAllPatientsWithOppon();

  const FilterOnlyPending=appointment?.filter((appointments)=>appointments.status==="PENDING")

  const mutate = useMutation({
    mutationKey: ["update-status"],
    mutationFn: (data: any) => UpdateStatusFuntion(data),
    onError: (error: any) => {
      console.log(error);
    },
    onSuccess: () => {
      refetch();
    },
  });
  if (isLoading) {
   return <Loader/>
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-500">Error loading Appointments.</div>
    );
  }
  const handleConfirm = (data: FormData) => {
   
    mutate.mutate(data);
    refetch();
  };

  const handleCancel = (data: FormData) => {
    mutate.mutate(data);
    refetch();
  };

  return (
    <div
      className="bg-gray-100  font-serif  rounded-br-2xl rounded-bl-2xl "
      style={{
        height: `${window.screen.height - window.screen.height / 4}px`,
        scrollbarColor: "black", 
        scrollbarWidth: "thin",
      }}
    >
  
        <AppointmentList
          appointment={FilterOnlyPending}
          onConfirm={handleConfirm}
          refetch={refetch}
          onCancel={handleCancel}
        />
      </div>
  );
};

export default AppointmentRequests;
