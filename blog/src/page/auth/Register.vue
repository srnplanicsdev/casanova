<script setup>
import api from "@/utils/api";
import axios from "axios";
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
const router = useRouter();
const register = ref({});
const redirect = () => {
  router.push({ name: "login" });
};
const onSubmit = async () => {
  try {
    await api.post("/register", {
      name: register.value.name,
      email: register.value.email,
      password: register.value.password,
      password_confirmation: register.value.confirmpassword,
    });
    redirect();
  } catch (error) {
    console.error(error);
  }
};
const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().min(6).required(),
  confirmpassword: yup
    .string()
    .min(6)
    .required()
    .oneOf([yup.ref("password")]),
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div
      class="w-full max-w-md rounded-2xl shadow-xl p-8 border dark:bg-neutral-800 border-gray-100"
    >
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1 text-center">
        Register
      </h2>
      <p class="text-gray-500 dark:text-gray-300 text-center mb-8">Sign UP to account</p>
      <Form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
        <div class="flex flex-col gap-1">
          <label for="name" class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >Name</label
          >
          <Field
            name="name"
            v-model="register.name"
            type="name"
            placeholder="name"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="name" class="text-sm text-red-600" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >Email</label
          >
          <Field
            name="email"
            v-model="register.email"
            type="email"
            placeholder="you@example.com"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="email" class="text-sm text-red-600" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >password</label
          >
          <Field
            name="password"
            v-model="register.password"
            type="password"
            placeholder="••••••••"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="password" class="text-sm text-red-600" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="confirmpassword" class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >Confirm Password</label
          >
          <Field
            name="confirmpassword"
            v-model="register.confirmpassword"
            type="confirmpassword"
            placeholder="••••••••"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="confirmpassword" class="text-sm text-red-600" />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          Sign UP
        </button>

        <div class="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          Already an user?
          <span
            class="text-blue-600 hover:underline cursor-pointer font-medium"
            @click="router.push({ name: 'login' })"
          >
            login
          </span>
        </div>
      </Form>
    </div>
  </div>
</template>
