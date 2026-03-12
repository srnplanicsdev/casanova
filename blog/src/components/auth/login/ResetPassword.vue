<script setup>
import api from "@/utils/api";
import { ErrorMessage } from "vee-validate";
import { Form } from "vee-validate";
import { Field } from "vee-validate";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as yup from "yup";

const reset = ref({});
const route = useRoute();
const store = useStore()
const router = useRouter();
const onSubmit = async () => {
  try {
     await store.dispatch("auth/resetPassword", {
      token: route.query.token,
      email: route.query.email,
      password: reset.value.password,
      password_confirmation: reset.value.confirmpassword,
    });
    router.push({name:'login'})
  } catch (error) {
    console.error(error);
  }
};
const schema = yup.object({
  password: yup.string().min(6).required(),
  confirmpassword: yup
    .string()
    .min(6)
    .required()
    .oneOf([yup.ref("password")]),
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center  p-4">
    <div
      class="w-full max-w-md dark:bg-neutral-800 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
    >
      <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1 text-center">
        Reset Password
      </h2>

      <Form @submit="onSubmit" :validation-schema="schema" class="space-y-6">
        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm font-medium dark:text-gray-300 text-gray-700"
            >New Password</label
          >
          <Field
            name="password"
            v-model="reset.password"
            type="password"
            placeholder="••••••••"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="password" class="text-sm text-red-600" />
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex justify-between items-center">
            <label for="password" class="text-sm font-medium dark:text-gray-300 text-gray-700"
              >Confirm Password</label
            >
          </div>
          <Field
            name="confirmpassword"
            v-model="reset.confirmpassword"
            type="password"
            placeholder="••••••••"
            class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <ErrorMessage name="confirmpassword" class="text-sm text-red-600" />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
        >
          Sign In
        </button>
      </Form>
    </div>
  </div>
</template>
