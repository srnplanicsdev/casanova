<script setup>
import ForgotPassword from "@/components/auth/login/ForgotPassword.vue";
import api from "@/utils/api";
import axios from "axios";
import { Form, ErrorMessage, Field } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as yup from "yup";
const router = useRouter();
const store = useStore()
const login = ref({ email: "", password: "" });

const onSubmit = async () => {
   try {
    await store.dispatch("auth/login", {
      email: login.value.email,
      password: login.value.password,
    });
    router.push({name:"blogs"})
  } catch (error) {
    console.error(error);
  }
};
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
</script>
<template>
  <div class="min-h-screen flex items-center dark:bg-neutral-900 justify-center p-4">
    <div
      class="w-full max-w-md dark:bg-neutral-800  rounded-2xl shadow-xl p-8 border  border-gray-100"
    >
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1 text-center">Login</h2>
      <p class="text-gray-500 dark:text-gray-300 text-center mb-8">Sign in to your account</p>

      <Form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >Email</label
          >
          <Field
            name="email"
            v-model="login.email"
            type="email"
            placeholder="you@example.com"
            class="px-4 py-3 rounded-lg border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="email" class="text-sm text-red-600" />
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex justify-between items-center">
            <label for="password" class="text-sm font-medium text-gray-700 dark:text-gray-300"
              >Password</label
            >
            <span @click="router.push({name:'forgotpassword'})" class="text-sm text-blue-600 hover:text-blue-700"
              >Forgot?</span
            >
          </div>
          <Field
            name="password"
            v-model="login.password"
            type="password"
            placeholder="••••••••"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="password" class="text-sm text-red-600" />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          Sign In
        </button>

        <div class="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          Not a user?
          <span
            class="text-blue-600 hover:underline cursor-pointer font-medium"
            @click="router.push({ name: 'register' })"
          >
            Create an account
          </span>
        </div>
      </Form>
    </div>
  </div>
</template>
