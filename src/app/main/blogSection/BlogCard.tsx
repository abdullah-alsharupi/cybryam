"use client";
import { Blog, News } from "@/app/types/types";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useGetLatestBlogData } from "@/queries/blog/useGetLatestData";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-5  rotate-180 top-1/2 transform -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
      onClick={onClick}
    >
      <img src="/icons/previous.svg" alt="Next" className="w-[22px] h-[22px]" />
    </div>
  );
};

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-20  left-10 top-1/2 transform -translate-y-1/2 hover:bg-white rounded-full p-2 shadow-lg cursor-pointer bg-gray-200"
      onClick={onClick}
    >
      <img src="/icons/previous.svg" alt="Prev" className="w-[22px] h-[22px]" />
    </div>
  );
};
function RandomCardBlogs() {
  const router = useRouter();
  const { data: Blog, isLoading, isError } = useGetLatestBlogData();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-red-500">Error loading Blog.</div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,

    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    slidesToShow: Blog && Blog.length < 3 ? Blog.length : 3,

    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: Blog && Blog.length < 2 ? Blog.length : 2,
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
    Blog?.length !== 0 && (
      <div className="p-4 bg-white font-serif h-full w-full flex flex-col mb-[50px] items-center">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center text-[#222F66] mb-4">
            OUR BLOG
          </h2>
          <p className="text-center mb-8 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            scelerisque suspendisse feugiat lectus nulla ullamcorper porttitor
            purus enim.
          </p>
        </div>

        <div className="w-full">
          <div className="pb-5">
            <div className="">
              <Slider {...settings}>
                {Blog?.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-[25%] max-md:w-1/3  max-sm:w-1/3  p-2`}
                  >
                    <div className="shadow-lg bg-white rounded-xl border p-4 h-full flex flex-col justify-center items-center gap-2">
                      <h2 className="text-lg md:text-xl font-semibold">
                        {item.title}
                      </h2>
                      <img
                        className="h-[150px] w-full object-cover"
                        src={`images/${item.img ? item.img : "4.svg"}`}
                        alt={`picture of ${item.title}`}
                      />
                      <p className="text-gray-600 overflow-clip h-[50px] text-base">
                        {item.content}
                      </p>
                      <Button
                        label="READ MORE"
                        onClick={() =>
                          router.push(`/main/blogSection/${item.id}`)
                        }
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

export default RandomCardBlogs;
