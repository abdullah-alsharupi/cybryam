
export const DeletHospital = async (id: string) => {
  //const response=await apifetch.put(`/deleteDepartment/${id}`,"",{headers:{Authorization:`Bearer ${token}`}})

  const response = await fetch(`/api/hospital/id`, {
    method: "PUT", // أو PUT إذا كنت تريد تحديث بيانات

    body: JSON.stringify({ id: `${id}` }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "حدث خطأ غير متوقع."); // استخدم الرسالة من الخادم إذا كانت موجودة
  }

  return response.json();
};
