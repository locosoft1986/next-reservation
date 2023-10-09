'use client';

import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { useRegisterUser} from "@/app/queries/auth";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const validationSchema = z
    .object({
        firstName: z.string().min(1, { message: "First name is required" }),
        lastName: z.string().min(1, { message: "Last name is required" }),
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        mobile: z.string().min(1, { message: "Mobile phone number is required" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" }),
    })

type ValidationSchema = z.infer<typeof validationSchema>;

const RegisterModal= () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const {isLoading, mutate: registerUser} = useRegisterUser(() => {
      registerModal.onClose();
      loginModal.onOpen();
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<ValidationSchema>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: ''
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
      registerUser(data)
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Next Table Reservation"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="firstName"
        label="First Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="lastName"
        label="Last Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="mobile"
        label="Mobile"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
      >
        <p>Already have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
