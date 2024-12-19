"use client";
import { formatDate } from "@/app/util/dateFormat";
import { Oppontement } from "@/app/types/types";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash, faEdit, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import StatusButton from "@/components/ui/status-button";
import DangerDialog from "@/components/ui/danger-dialog";
import AppointmentUpdate from "./UpdateAppointment";
import Input from "@/components/ui/input";
import ToastContainer from "@/components/ui/toastCobtainer";
import { message } from "antd";

export type Props = {
  appointment: Oppontement;
  onDelete: (data: FormData) => void;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Oppontement[] | null, Error>>;
};

export const AppointmentCard = ({ appointment, onDelete, refetch }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [Message, setMessage] = useState("");

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("docId", appointment.doctor.id);
    formData.append("patId", appointment.patient.id);
    onDelete(formData);
    refetch();
    setOpenDialog(false);
  };

  const handleSendMessage = async () => {
    try {
      const response = await fetch("/api/patient/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: appointment.patient.id,
          Message,
          email: appointment.patient.email, 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setMessage(""); 
      message.success("message sent successfully");
    } catch (error) {
      message.error("Failed to send message")
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl h-1/3 p-4 mx-2 mb-4 w-[48%] max-md:w-auto" dir="ltr">
      <div className="flex  justify-between  items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold">{appointment?.patient?.patName}</h1>
          <h6 className="text-base font-bold">
            {<StatusButton status={appointment.status}></StatusButton>}
          </h6>
          <h4 className="text-gray-600">
            {formatDate(new Date(appointment.date))}
          </h4>
          <p>{appointment.patient.email}</p>
        </div>
        <div>
          <h1 className="font-bold text-lg">Doctor:</h1>
          <h3 className="text-lg font-medium">
            {appointment.doctor.doctorName}
          </h3>
        </div>
        <div>
          <div className="flex max-md:flex max-md:flex-col gap-2">
            <button
              onClick={() => setOpenDialog(true)}
              className="bg-red-500 hover:bg-blue-100 text-white rounded-[100%] items-center flex border border-red-500"
            >
              <FontAwesomeIcon icon={faTrash} className="p-3" />
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#222F66] hover:bg-blue-500 text-white rounded-[100%] items-center flex border border-white"
            >
              <FontAwesomeIcon icon={faEdit} className="p-3" />
            </button>
            <button
            disabled={!Message}
              onClick={handleSendMessage}
              className={`bg-blue-500 hover:bg-blue-200 text-white rounded-[100%] items-center flex border border-blue-500 ${!Message? "opacity-50  cursor-not-allowed":""}`}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="p-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <Input
          type="text"
          placeholder="Type your message here..."
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <DangerDialog
        title="Confirm Delete"
        content={`Are you sure to delete appointment `}
        onClose={() => setOpenDialog(false)}
        onConfirm={()=>handleDelete()}
        open={openDialog}
      />

      <AppointmentUpdate
        appointmentData={appointment}
        isOpen={openModal}
        refetch={refetch}
        setIsOpen={setOpenModal}
        key={appointment.patID}
      />
    </div>
  );
};