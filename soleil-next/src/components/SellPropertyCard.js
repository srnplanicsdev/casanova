import Image from "next/image";

export default function SellPropertyCard({ cardData }) {
    return (
       <div className="py-15 px-6 flex flex-col gap-6">
    <div>
        {cardData.image ? (
            <Image width={40} height={40} src={cardData.image} className="h-10 w-10" alt={cardData.title} />
        ):(
            <span className="font-dm-serif-display font-semibold text-lg text-gold">{cardData.id}</span>
        )}
    </div>
    <div className=" italic font-semibold text-gray-800 font-dm-serif-display text-2xl w-full border-b border-gray-300">
      { cardData.title }
    </div>
    <p className=" font-work-sans font-light text-base mt-3">
      { cardData.description }
    </p>
  </div>
    )
}