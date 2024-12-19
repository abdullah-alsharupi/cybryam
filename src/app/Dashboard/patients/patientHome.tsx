"use client";

import { formatArabicDateTime } from "@/app/util/dateFormat";
import Loader from "@/components/ui/loader";
import StatusButton from "@/components/ui/status-button";
import { useGetAcceptedRequests } from "@/queries/oppo/useGetAcceptedRequests";
import { useGetAllPatientsWithOppon } from "@/queries/oppo/useGetPatientWithOppo";
import { useEffect } from "react";

const AppointmentToday = () => {
  const { data: Appointmen, error, isLoading } = useGetAllPatientsWithOppon();

  if (error) {
    return (
      <div className="text-red-500 text-center">حدث خطأ أثناء جلب المواعيد</div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }
  const appointmentConfirmed = Appointmen?.filter(
    (appointments) => appointments.status === "CONFIRMED"
  );
  return (
    <div className="w-full font-serif overflow-x-auto overflow-y-hidden">
      <table className="min-w-full divide-y divide-gray-400">
        <thead className="max-sm:hidden">
          <tr>
            <th
              className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
            >
              الاسم
            </th>
            <th
              className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
            >
              <h1 className="sm:hidden font-bold"> اسماء الدكاترة</h1>
              الجنس
            </th>
            <th
              className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
            >
              الطبيب المعالج
            </th>
            <th
              className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
            >
              العنوان
            </th>
            <th
              className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
            >
              التاريخ
            </th>
            <th
              className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
            >
              الحالة
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {appointmentConfirmed?.map((oppointement,index) => (
            <tr key={index}>
              <td
                className={`px-1  text-center bg-red-500  sm:hidden text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
              ></td>

              <td
                className={`px-1 py-4 text-center  bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
              >
                <h1 className="sm:hidden font-bold"> اسم المريض</h1>
                {oppointement.patient.patName}
              </td>
              <td
                className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
              >
                <h1 className="sm:hidden font-bold"> الجنس</h1>
                {oppointement.patient.gender ?? "can't find gender"}
              </td>
              <td
                className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
              >
                <h1 className="sm:hidden font-bold"> اسم الدكتور </h1>{" "}
                {oppointement.doctor.doctorName ?? "can't find doctor"}
              </td>
              <td
                className={`px-1 py-4 text-center bg-white  text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
              >
                <h1 className="sm:hidden font-bold">عنوان المريض</h1>{" "}
                {oppointement.patient.address ?? "can't find address"}
              </td>
              <td
                className={`px-1 py-4 text-center bg-white   text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
              >
                <h1 className="sm:hidden font-bold">الموعد</h1>{" "}
                {formatArabicDateTime(oppointement.date)}
              </td>
              <td
                className={`px-1 py-4 text-center bg-white   text-balance max-sm:grid max-sm:grid-flow-col max-sm:justify-between max-sm:px-10 max-sm:border-gray-100 max-sm:border-solid max-sm:border-[3px]`}
              >
                <h1 className="sm:hidden font-bold">الموعد</h1>{" "}
                {<StatusButton status={oppointement.status} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AppointmentToday;
