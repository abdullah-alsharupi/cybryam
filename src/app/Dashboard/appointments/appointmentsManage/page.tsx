"use client";
import { useMutation } from "@tanstack/react-query";
import { DeleteAppointment } from "@/mutations/oppo/DeleteAppointment";
import { useGetAllPatientsWithOppon } from "@/queries/oppo/useGetPatientWithOppo";
import { AppointmentCard } from "./AppointmentsCard";
import { Key, useEffect, useState } from "react";
import { Oppontement } from "@/app/types/types";
import Input from "@/components/ui/input";
import React from "react";
import Loader from "@/components/ui/loader";

export default function AppointmentsList() {
  const [filterAppointments, setFilterAppointments] = React.useState<
    Oppontement[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [AppointData, setData] = useState<Oppontement[] | null>([]);
  const { data: appointment, refetch ,isLoading,isError} = useGetAllPatientsWithOppon();
  if (appointment?.length == 0) {
    return <div>appointment is null</div>;
  }
  useEffect(() => {
    if (appointment) {
      setFilterAppointments(
        appointment?.map((appointments: Oppontement) => ({ ...appointments }))
      );
    }
  }, [appointment]);
  const deleteMutation = useMutation({
    mutationKey: ["deleteAppointment"],
    mutationFn: (data: any) => DeleteAppointment(data),

    onSuccess: () => {},
  });
  if (isLoading) {
    return <Loader/>
   }
 
   if (isError) {
     return (
       <div className="text-center p-8 text-red-500">Error loading Appointments.</div>
     );
   }

  const filteredAppointments = filterAppointments.filter((appointment) =>
    appointment.patient.patName
      ?.toLowerCase()
      .includes(searchTerm.toLocaleLowerCase())
  );


  const handleDelete = (data: FormData) => {
    deleteMutation.mutate(data);
    refetch();
  };

  return (
  <div>
    <div className="w-[30%] mb-4">
        <Input
          onChange={(e) => setSearchTerm(e.target.value)}
          name=""
          placeholder=" patient name..."
          type="text"
          className="w-[70%]"
        />
      </div>
      <div
  className="flex flex-wrap justify-between  max-md:flex-col max-md:w-auto overflow-scroll font-serif rounded-br-2xl rounded-bl-2xl"
  style={{
    height: `${window.screen.height - window.screen.height / 3.2}px`,
    scrollbarWidth: "thin", // For Firefox
    scrollbarColor: "orange #000 ", // For Firefox (thumb color, track color)
  }}
  dir="ltr"
>
      {filteredAppointments
        ?.filter((appointments) => appointments !== null)
        .map((appointment, index) => (
          <AppointmentCard
            key={index}
            appointment={appointment}
            onDelete={handleDelete}
            refetch={refetch}
          />
        ))}
    </div>
  </div>
  );
}
