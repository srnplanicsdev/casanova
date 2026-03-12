"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./featured.css";
import { Pagination, Autoplay } from "swiper/modules";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useLanguage } from "@/utils/useLanguage";

import { useRouter } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import FeaturedSkeleton from "./skeletons/FeaturedSkeleton";
import { api } from "@/utils/apis/api";

export default function Featured() {
  const modules = [Pagination, Autoplay];
  const swiperRef = useRef(null);
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  const pagination = {
    clickable: true,
    type: "custom",
    el: ".custom-pagination",
    renderCustom: (swiper, current, total) => {
      let html = "";
      for (let i = 1; i <= total; i++) {
        html += `
          <span style="cursor: pointer;" class="page-box  ${i === current ? "active" : ""}" data-page="${i}">
           0${i}.
          </span>
        `;
      }
      return html;
    },
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await api.get("/properties");
        setProperties(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const onPaginationClick = (e) => {
    const { page } = e.target.dataset;
    if (!page || !swiperRef.current) return;
    swiperRef.current.slideTo((page - 1) * 3);
  };

  if (loading) return <FeaturedSkeleton />;

  return (
    <>
      <div className="flex justify-center items-center mt-20 md:mt-30 text-center px-4">
        <h2 className="text-3xl md:text-4xl text-gold font-dm-serif-display font-bold">
          {t("featured-properties.featured")}
          <span className="text-black italic">{t("featured-properties.property")}</span>
        </h2>
      </div>

      <div className="flex justify-center items-center w-full container mx-auto px-4">
        <div className="w-full h-full my-10 md:my-15">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 30 },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={pagination}
            modules={modules}
            className="mySwiper"
          >
            {properties.slice(0, 9).map((property) => (
              <SwiperSlide key={property._id}>
                <Link href={property.link || "/properties"}>
                  <PropertyCard cardData={property} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="custom-pagination mt-6 font-dm-serif-display text-2xl font-semibold flex justify-center"
            onClick={onPaginationClick}
          ></div>
        </div>
      </div>

      <div className="flex justify-center items-center px-4">
        <button
          onClick={() => router.push("/properties")}
          className="text-black font-work-sans py-3 w-full md:w-auto md:px-20 text-sm border-black hover:bg-black hover:text-white border transition-colors"
        >
          {t("view-all-properties")}
        </button>
      </div>
    </>
  );
}