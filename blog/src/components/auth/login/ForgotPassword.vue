<script setup>
import api from "@/utils/api";
import { Field } from "vee-validate";
import { Form } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as yup from "yup";
const router = useRouter();
const email = ref("");
const store = useStore()
const onSubmit = async () => {
  try {
    await store.dispatch("auth/forgotPassword", {
      email: email.value,
    });
  } catch (error) {
    console.error(error);
  }
};
const schema = yup.object({
  email: yup.string().email().required(),
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center  p-4">
    <div
      class="w-full max-w-md rounded-2xl dark:bg-neutral-800 shadow-xl p-8 border border-gray-100"
    >
      <h2 class="text-3xl dark:text-gray-50 font-bold text-gray-900 mb-1 text-center">
        Forgot-Password
      </h2>
      <p class="text-gray-500 dark:text-gray-300 text-center mb-8">Enter your Email to receive the link</p>

      <Form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-medium dark:text-gray-300 text-gray-700"
            >Email</label
          >
          <Field
            name="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="email" class="text-sm text-red-600" />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          Submit
        </button>

        <div class="text-center text-sm dark:text-gray-300 text-gray-600 mt-6">
          Already an user?
          <span
            class="text-blue-600 hover:underline cursor-pointer font-medium"
            @click="router.push({ name: 'login' })"
          >
            Login
          </span>
        </div>
      </Form>
    </div>
  </div>
</template>
