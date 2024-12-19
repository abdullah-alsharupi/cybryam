"use client";
import { apifetch } from "@/api";
import { News } from "@/app/types/types";
import { formatDate, formatDateTime } from "@/app/util/dateFormat";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useGetLatestNewsData } from "@/queries/news/useGetLatestData";
import { useGetNews } from "@/queries/news/useGetNews";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Slider from "react-slick";
const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute  rotate-180 right-5 top-1/2 transform -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
      onClick={onClick}
    >
      {/* هنا يمكنك وضع أيقونتك الخاصة، على سبيل المثال: */}
      <img src="/icons/previous.svg" alt="Next" className="w-[22px] h-[22px]" />
    </div>
  );
};

// قم بإنشاء أيقونة Prev
const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-20 left-10 top-1/2 transform -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
      onClick={onClick}
    >
      {/* هنا يمكنك وضع أيقونتك الخاصة، على سبيل المثال: */}
      <img src="/icons/previous.svg" alt="Prev" className="w-[22px] h-[22px]" />
    </div>
  );
};

function RandomCardNews() {
  const router = useRouter();
  const { data: news, isLoading, isError } = useGetLatestNewsData();

  if (isLoading) {
    return <Loader />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,

    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    slidesToShow: news && news.length < 3 ? news.length : 3,

    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: news && news.length < 2 ? news.length : 2,
          slidesToScroll: 1,

          dots: true,
        },
      },

      {
        breakpoint: 730,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };
  return (
    news?.length !== 0 && (
      <div className="p-4 bg-white font-serif h-full w-full flex flex-col items-center">
         <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl text-center font-bold text-[#232f66] mb-4">AL-MAJD NEWS</h1>
          <p className="mb-6 text-black text-sm text-center md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolor
            totam reprehenderit assumenda. Mollitia ab odit laborum quisquam
            dolorem perferendis? Numquam, ipsa dolores rem eos sunt
            reprehenderit modi incidunt eius!
          </p>
          <Button
            label="READ ALL NEWS"
            className="mb-6 bg-[#222F66] w-[50%] text-center text-white"
            onClick={() => router.push("/main/news")}
          />
        </div>

        <div className="w-full">
          <div className="overflow-hidden pb-8">
            <div className="">
              <Slider {...settings}>
                {news?.map((item, index) => (
                  <div key={index} className=" max-md:w-full w-1/3   p-2">
                    <div className="shadow-lg bg-white rounded-xl border p-4 h-full flex flex-col justify-center items-center gap-2">
                      <h2 className="text-lg md:text-xl  font-semibold">
                        {item.headline}
                      </h2>
                      <img
                        src={`images/${item.img?item.img:'4.svg'}`}
                        alt=""
                        className="h-[150px] w-full object-contain "
                      />

                      <p className="text-gray-600 overflow-clip h-[50px]  text-base">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500">
                        <img
                          src="/icons/books.svg"
                          alt="Date Icon"
                          className="w-4 h-4"
                        />
                        <span className="font-sans">
                          {formatDateTime(new Date(item.createdAt))}
                        </span>
                      </div>
                      <Button
                        label="READ MORE"
                        onClick={() => router.push(`/main/news/${item.id}`)}
                        className="bg-[#222F66] text-white rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default RandomCardNews;
