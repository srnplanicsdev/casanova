/* eslint-disable react-hooks/purity */
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { useRef } from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { useMemo } from 'react';
import Image from 'next/image';
import { handleCardPrice } from '../utils/helper/helper';
import { useLanguage } from '../utils/useLanguage';
import { mapTypeToKey, mapStatusToKey } from '../utils/translationHelpers';
import { useFavorite } from "../context/FavoriteContext";

export default function PropertyCard({ cardData }) {
  const { t } = useLanguage();
  const modules = [Pagination, Navigation, Autoplay, EffectFade];
  const swiperRef = useRef(null);
  const{addFavorite, removeFavorite, favorites}=useFavorite();
  const badges = useMemo(() => {
    const badge = [];
    const features = cardData.communityFeatures || [];
    if (!features.length) return badge;
     
    const numberOfBadges = Math.min(Math.floor(Math.random() * 3) + 1, features.length);
    const shuffled = [...features].sort(() => 0.5 - Math.random());
    badge.push(...shuffled.slice(0, numberOfBadges));
    return badge;
  }, [cardData]);


  const handleLocation = () => {
    const { area, city, zone } = cardData.location || {}
    return [area, city, zone].filter(Boolean).join(' · ')
  }
  return (
    <div className=" max-w-125 font-dm-serif-display group mx-2 mb-4 relative w-full">
      <div
        className="property-featured block relative bg-white hover:border-gold hover:border-b-8 border-b-8 border-transparent overflow-hidden shadow-lg transition-all duration-300">

        <div className="porta-img relative">
          {cardData.images && (
            <div v-if="cardData.images">

              <Swiper modules={modules} slidesPerView="auto" effect="fade" centeredSlides={true} pagination={{ clickable: true }}
                navigation={true} autoplay={{ delay: 2500 }} className="mySwiper">
                {cardData.images.slice(0, 5).map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="overflow-hidden">
                      <Image src={image.url} alt="Villa - Resale - Altea - Altea La Vella"
                        title="Villa - Resale - Altea - Altea La Vella" loading='eager'
                        className="w-full group-hover:scale-110 max-w-full transition-all duration-800 ease-in-out h-64 object-cover"
                        width={500}
                        height={500}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          <div className="labels absolute top-2 left-2 flex gap-2 z-10">
            {badges.map((badge, index) => (
              <div key={index}
                className="badge bg-gray-800 text-white text-xs px-4 py-1 rounded-xl">
                {badge}
              </div>
            ))}
          </div>
        </div>

        <div className="property-detail p-4 relative bg-white z-10 ">
          <div className="absolute -top-5 right-2 bg-white rounded-full p-2 flex space-x-2">
            <span className="add-fav cursor-pointer" title="Add to Favorites">
            {favorites.includes(cardData) ? (
              <Image width={24} height={24} src={"/assets/media/images/website/properties/icon-favorites-full.svg"} alt="Add to Favorites"
                className="w-6 h-6" onClick={(e)=>{e.stopPropagation();e.preventDefault();removeFavorite(cardData)}} />
            ) : (
              <Image width={24} height={24} src={"/assets/media/images/website/properties/icon-favorites.svg"} alt="Add to Favorites"
                className="w-6 h-6" onClick={(e)=>{e.stopPropagation();e.preventDefault();addFavorite(cardData)}} />
            )}

            </span>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 italic truncate mt-6 font-dm-serif-display">
            <strong className="font-dm-serif-display not-italic">{t(mapTypeToKey(cardData.type))}</strong> · {t(mapStatusToKey(cardData.status))}
          </h3>
          <h4 className="text-sm text-gold uppercase mt-2 tracking-[3px] font-dm-serif-display truncate">{handleLocation()}
          </h4>
          <div className="icons mt-2">
            <ul className="flex flex-wrap text-sm text-gray-700 gap-8 py-5">

              {cardData.propertyDetails.usableArea && (
                <li className="flex flex-col items-center gap-1">
                  <Image width={20} height={20} src={"/assets/media/images/website/house.svg"} className="h-5" alt="meters" />
                  <span>{cardData.propertyDetails.usableArea}</span>
                </li>
              )}
              {cardData.propertyDetails.plotSize && (
                <li className="flex flex-col items-center gap-1">
                  <Image width={20} height={20} src={"/assets/media/images/website/plano.svg"} className="h-5" alt="plot" />
                  <span>{cardData.propertyDetails.plotSize}</span>
                </li>
              )}
              {cardData.propertyDetails.bedrooms && (
                <li className="flex flex-col items-center gap-1">
                  <Image width={20} height={20} src={"/assets/media/images/website/bed.svg"} className="h-5" alt="bedrooms" />
                  <span>{cardData.propertyDetails.bedrooms}</span>
                </li>
              )}
              {cardData.propertyDetails.bathrooms && (
                <li className="flex flex-col items-center gap-1">
                  <Image width={20} height={20} src={"/assets/media/images/website/bath.svg"} className="h-5" alt="baths" />
                  <span>{cardData.propertyDetails.bathrooms}</span>
                </li>
              )}
              {cardData.propertyDetails.pool && (
                <li className="flex flex-col items-center gap-1">
                  <Image width={20} height={20} src={"/assets/media/images/website/pool.svg"} className="h-5" alt="pool" />
                  <span>{cardData.propertyDetails.pool}</span>
                </li>
              )}
              {cardData.propertyDetails.parking && (
                <li className="flex flex-col items-center gap-1">
                  <Image width={20} height={20} src={"/assets/media/images/website/garaje.svg"} className="h-5" alt="parking" />
                  <span>{cardData.propertyDetails.parking}</span>
                </li>
              )}
            </ul>
          </div>

          <div className="flex justify-between items-center mt-3 text-sm font-medium text-gray-700">
            <div className="rounded-full bg-gray-100 px-3 py-1">Ref. {cardData.reference}</div>
            <div className="text-4xl text-black font-light">{handleCardPrice(cardData.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}