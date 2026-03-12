import mongoose from "mongoose";
import Testimonial from "../model/testimonialsModel.js";

async function addSlugs() {
  await mongoose.connect("mongodb://localhost:27017/casanova");

  const testimonials = await Testimonial.find({});

  for (const t of testimonials) {
    if (!t.slug) {

      t.slug = t.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      await t.save();
      console.log(`Added slug for ${t.name}: ${t.slug}`);
    }
  }

  console.log("All slugs added!");
  mongoose.disconnect();
}

addSlugs().catch(console.error);