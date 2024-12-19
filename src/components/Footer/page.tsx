"use client";
import React from "react";
import Button from "../ui/button";
import { useScroll } from "@/app/main/book/ScrollProvider";

const Footer = () => {
  const { ScrollToTarget } = useScroll();
  const imageUrl = "/icons/Rectangle 50.svg";
  return (
    <div className="h-full  ">
      <div className="bg-[#D9D9D9] flex  justify-center space-x-8">
        <div className="bg-[#222F66] top-[-10px] rounded-[100%] relative h-60 w-60 max-md:w-40 max-md:h-40  ">
          <img
            src="/images/footerImage.svg"
            className="object-contain absolute top-[-70px] max-md:h-60 max-md:w-40  h-80 w-60"
          />
        </div>

        <div className="w-1/3 py-8">
          <h2 className="md:text-2xl font-bold mb-4">
            Looking for professional & trusted medical healthcare?
          </h2>
          <p className="mb-4 text-white">DON{"'"}T HESITATE TO CONTACT US.</p>
          <Button
            onClick={ScrollToTarget}
            className="bg-[#222F66] text-white max-md:py-0 px-4  rounded-full hover:bg-blue-500"
          >
            MAKE APPOINTMENT
          </Button>
        </div>
      </div>
      <div className="bg-[#222F66] text-white py-10">
        <div className="container mx-auto px-4 ">
          <div className="mt-8">
            <div className=" flex lg:w-[60%] lg:translate-x-[30%]  text-center items-center max-sm:flex-col gap-8 mb-8 justify-center ">
              <div className="flex gap-8 max-sm:w-full  w-2/3 max-sm:gap-2 col-span-2 ">
                <div className="flex  w-full justify-center max-md:flex-col items-center border border-blue-500 py-6 rounded-xl">
                  <img
                    src="/icons/phone.png"
                    alt=""
                    className="object-contain"
                    width={30}
                    height={30}
                  />
                  <div>
                    <h2 className="text-nowrap">+91-022-67570111</h2>
                    <h6 className="text-nowrap">Call us Now</h6>
                  </div>
                </div>
                <div className="flex w-full justify-center max-md:flex-col items-center  border border-blue-500 py-6 rounded-xl">
                  <img
                    src="/icons/email.png"
                    alt=""
                    className="object-contain"
                    width={30}
                    height={30}
                  />
                  <div>
                    <h2 className="text-nowrap">AlMajd@gmail.com</h2>
                    <h6 className="text-nowrap">Drop us an email</h6>
                  </div>
                </div>
              </div>
              <div className="flex justify-center max-sm:w-full  w-1/3 max-md:flex-col  items-center  border border-blue-500 py-6 rounded-xl">
                <img
                  src="/icons/watch.png"
                  alt=""
                  className="object-contain"
                  width={30}
                  height={30}
                />
                <div>
                  <h2 className="text-nowrap">24 X 7 support</h2>
                  <h6 className="text-nowrap">We are open on</h6>
                </div>
              </div>
            </div>
            <div className="flex max-lg:grid px-[10%]  max-lg:grid-cols-2 justify-between">
              <div>
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <p>+967711459990</p>
                <p>write@Al-Majdhospital.com</p>
                <p>24 x 7 support</p>
              </div>
              <div className="">
                <h3 className="text-lg font-semibold">Patient Care</h3>
                <ul>
                  <li>Find A Doctor</li>
                  <li>Medical Services</li>
                  <li>Patient Testimonials</li>
                  <li>Value Added Services</li>
                  <li>Pay Online</li>
                  <li>Saifee Surgery</li>
                </ul>
              </div>

              <div className="">
                <h3 className="text-lg font-semibold">Centres Of Excellence</h3>
                <ul>
                  <li>Orthopaedics</li>
                  <li>Nephrology & Urology</li>
                  <li>Bariatric Surgery</li>
                  <li>Cardiology</li>
                  <li>Pulmonology</li>
                  <li>Gastroenterology</li>
                  <li>Spine Surgery</li>
                  <li>Oncology</li>
                  <li>Neurology & Neurosurgery</li>
                </ul>
              </div>
              <div className="f">
                <h3 className="text-lg font-semibold">Medical Procedures</h3>
                <ul>
                  <li>Proton Therapy For Cancer Treatment</li>
                  <li>Cosmetic And Plastic Surgery</li>
                  <li>Bone Marrow Transplant</li>
                  <li>Oral & Maxillofacial Surgery</li>
                  <li>Hand Microsurgery</li>
                  <li>Hip Arthroscopy</li>
                  <li>Minimally Invasive Cardiac Surgery</li>
                  <li>Knee Replacement Surgery</li>
                  <li>Cochlear Implant Surgery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>© 2024 Al-Majd Hospital. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
