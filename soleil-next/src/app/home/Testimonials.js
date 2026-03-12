import Link from "next/link";
import { getServerTranslation } from "@/utils/serverTranslation";
import Image from "next/image";

export default async function Testimonials() {
    const {t} = await getServerTranslation();
    return (
        <div className=" my-10 flex justify-center">
    <div
      className=" container bg-[url('/assets/media/images/website/bg-testimonios-home.jpg')] bg-cover bg-left bg-no-repeat max-h-full">
      <div className=" mt-6 p-12">
        <div className="p-4 p-lg-5 my-3 my-xl-4">
          <Image width={70} height={70} src="/assets/media/images/website/icon-literal.svg" alt="literal" />

          <h3 className="my-8">
            <div className="text-gold text-base "> {t("testimonials")}</div>
            <span className="text-black text-5xl font-dm-serif-display mt-2"> {t("testimonial.title")}
              <em>{t("testimonial.title-span")}</em> {t("testimonial.say")}</span>
          </h3>

          <Link href="/testimonials"
            className="mt-4 px-12 py-4 bg-transparent border border-black hover:bg-black hover:text-white text-black ">
            {t("testimonial.read")}
          </Link>
        </div>
      </div>
    </div>
  </div>
    );
}