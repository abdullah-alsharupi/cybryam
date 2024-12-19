"use client";
import { useGetDepartments } from "@/queries/department/useGetAllDepartment";
import { useGetLatestNewsData } from "@/queries/news/useGetLatestData";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CardProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  height?: any;
  width?: any | 100;
  type?: "submit" | "reset" | "button" | undefined;
  children?: any;
}

const CenterExcellence: React.FC<CardProps> = ({
  label,
  onClick,
  disabled = false,
  height,
  width,
  className = "",
  type,
  children,
}) => {
const {data}=useGetDepartments()

  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1);
      else if (width < 768) setItemsPerPage(2);
      else if (width < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalItems = Array.isArray(data) ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = Array.isArray(data)
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const repeatedItems =
    currentItems.length < itemsPerPage
      ? [
          ...currentItems,
          ...(Array.isArray(data)
            ? data.slice(0, itemsPerPage - currentItems.length)
            : []),
        ].reverse()
      : currentItems;

  return (
    Array.isArray(data) && (
      <div className="flex flex-col relative items-center justify-center">
        <h1 className="text-[36px] font-[400px] text-[#000] font-serif h-full text-center">
          OUR CENTRES OF
        </h1>
        <h1 className="text-[36px] font-[400px] text-[#D8B36A] font-serif h-full text-center">
          EXCELLENCE
        </h1>
        <div className="w-[80%] text-balance text-center py-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Semper
          ultrices sed adipiscing malesuada aliquam nisl fusce sit. Scelerisque
          suspendisse amet semper volutpat odio. Risus faucibus interdum
          volutpat nibh feugiat lectus nulla ullamcorper porttitor purus enim.
          Volutpat mattis venenatis.
        </div>
        <div className="relative">
          <div
            style={{ scrollbarWidth: "none" }}
            className={` gap-3 text-center flex overflow-y-auto font-serif content-center bg-white`}
          >
            {repeatedItems.map((item: any, index: number) => (
              <button
                className=""
                key={index}
                onClick={() =>
                  router.push(`/main/department/about/${item?.depName}`)
                }
              >
                <div className="relative rounded-3xl flex flex-col items-center  w-full  h-full px-1 pb-5  py-[6%] ">
                  <div className="shadow-xl rounded-3xl overflow-hidden">
                    <img
                      src={`/images/${item?.img ? item.img : "6.svg"}`}
                      className="rounded-3xl w-[380px] h-[240px] object-cover"
                      alt={item.depName}
                    />
                  </div>
                  <div className="absolute bottom-[calc(-1%+10px)] rounded-xl w-[80%] max-w-[300px]  bg-white shadow-md p-[10px] text-center">
                    {item.depName}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 mt-3 rounded-full h-[20px] w-[20px] 
                ${
                  currentPage === index + 1
                    ? "bg-[#29367D] text-white"
                    : "bg-[#eeeeee] text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
         
        </div>
        <div className="flex justify-center mb-4 ">
            <button
              onClick={() => {
                if (currentPage == 1) {
                  setCurrentPage(totalPages);
                } else setCurrentPage((prev) => Math.max(prev - 1, 1));
              }}
              className="absolute z-20  left-[1%] bottom-[170px] transform  hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200">
              
              {/* هنا يمكنك وضع أيقونتك الخاصة، على سبيل المثال: */}
            <img
              src="/icons/previous.svg"
              alt="Prev"
              className="w-[22px] h-[22px]"
            />
          
        </button>
            <button
              onClick={() => {
                if (currentPage == totalPages) {
                  setCurrentPage(1);
                } else setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              }}
              className="absolute z-20  rotate-180 right-[1%] bottom-[170px] transform  hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200">
              
              {/* هنا يمكنك وضع أيقونتك الخاصة، على سبيل المثال: */}
            <img
              src="/icons/previous.svg"
              alt="Prev"
              className="w-[22px] h-[22px]"
            />
          
        </button>
          </div>
      </div>
    )
  );
};

export default CenterExcellence;
