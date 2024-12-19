import { formatShortDateTime } from "@/app/util/dateFormat";
import { PatientsWithOppon } from "@/queries/oppo/useGetPatientWithOppo";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Oppontement } from "@/app/types/types";
import { formatPhoneNumber } from "@/app/util/phoneFormat";

export type Props = {
  appointment: Oppontement;
  onConfirm: (data: FormData) => void;
  onCancel: (data: FormData) => void;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Oppontement[] | null, Error>>;
};

const AppointmentCard = ({
  appointment,
  onConfirm,
  onCancel,
  refetch,
}: Props) => {
  const [showButtons, setShowButtons] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const formData = new FormData();
  useEffect(() => {
    const interival = setInterval(() => {
    refetch();
    }, 5000);
    return () => clearInterval(interival);
    }, [refetch]);

  useEffect(() => {
    if (appointment.status === "CONFIRMED") {
      setConfirmed(true);
      setShowButtons(false);
      setCanceled(false)
    } else if (appointment.status === "CANCELLED") {
      setCanceled(true);
      setShowButtons(false);
      setConfirmed(false)
    } else if (appointment.status === "PENDING") {
      setShowButtons(true); 
      setConfirmed(false);
      setCanceled(false);
    }
  }, [appointment.status]);

 

  const handleConfirm = () => {
    formData.append("docId", appointment.doctor.id);
    formData.append("patId", appointment.patient.id);
    formData.append("status", "CONFIRMED");
    onConfirm(formData);
    refetch();
  };

  const handleCancel = () => {
    formData.append("docId", appointment.doctor.id);
    formData.append("patId", appointment.patient.id);
    formData.append("status", "CANCELLED");
    onCancel(formData);
    refetch();
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 h-[100px] max-md:h-auto" dir="ltr">
      <div className="flex flex-row justify-between items-center w-[100%]" key={appointment.patID}>
        <div>
          <h1 className="text-[14px] font-bold">{appointment.patient.patName}</h1>
          <p className="text-gray-600 text-[12px]">{formatShortDateTime(new Date(appointment.date))}</p>
        </div>
        <div className="h-full">
          <h1 className="font-bold text-[14px]">Doctor's</h1>
          <h3 className="text-[14px] font-medium h-full">{appointment.doctor.doctorName}</h3>
        </div>
        <div>
          {showButtons && !confirmed && !canceled && (
            <div className="flex flex-row gap-4 max-md:flex-col">
              <button
                className="hover:bg-green-600 hover:text-white text-white rounded-[100%] flex items-center border border-green-500"
                onClick={handleConfirm}
              >
                <FontAwesomeIcon icon={faCheck} className="p-2 text-lg hover:text-white text-green-500" />
              </button>
              <button
                className="hover:bg-red-500 rounded-[100%] flex items-center border border-red-500"
                onClick={handleCancel}
              >
                <FontAwesomeIcon icon={faTimes} className="p-2 text-lg hover:text-white text-red-700" />
              </button>
            </div>
          )}
          {confirmed && (
            <div className="border bg-purple-100 text-purple-600 rounded-xl p-1 text-[14px]">
              {appointment.status}
            </div>
          )}
          {canceled && (
            <div className="border bg-gray-200 text-red-700 rounded-xl p-1 text-[14px]">
              {appointment.status}
            </div>
          )}
          {appointment.status === "PENDING" && !showButtons && (
            <div className="text-red-500">Pending</div> // عرض كلمة PENDING فقط
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
