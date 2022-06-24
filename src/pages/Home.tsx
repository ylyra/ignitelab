import { gql, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import clsx from "clsx";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Logo } from "../components/Logo";
import { hasErrors } from "../utils/hasErrors";

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber($name: String!, $email: String!) {
    createSubscriber(data: { name: $name, email: $email }) {
      id
    }
  }
`;

type FormProps = {
  name: string;
  email: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export function Home() {
  const { handleSubmit, register, formState } = useForm<FormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const [createSubscriber] = useMutation(CREATE_SUBSCRIBER_MUTATION);
  const navigate = useNavigate();

  const onUserSubmit: SubmitHandler<FormProps> = async (data) => {
    try {
      await createSubscriber({ variables: { ...data } });
      toast.success("Subscriber created successfully");
      navigate("/event");
    } catch {
      toast.error("Error creating subscriber");
    }
  };

  const onUserErrorSubmit: SubmitErrorHandler<FormProps> = useCallback(
    (error) => {
      Object.keys(error).map((key) => {
        const nKey = key as "name" | "email";
        toast.error(error[nKey]?.message);
      });
    },
    []
  );

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />

          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong> JS
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanas para acessar as melores
            oportunidades do mercado
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2lx mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubmit(onUserSubmit, onUserErrorSubmit)}
            className="flex flex-col gap-2 w-full"
          >
            <input
              className={clsx("bg-gray-900 rounded px-5 h-14 border", {
                "border-gray-900": !formState.errors.name,
                "border-red-500": formState.errors.name,
              })}
              type="text"
              placeholder="Seu nome completo"
              {...register("name")}
            />
            <input
              className={clsx("bg-gray-900 rounded px-5 h-14 border", {
                "border-gray-900": !formState.errors.email,
                "border-red-500": formState.errors.email,
              })}
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email")}
            />

            <button
              type="submit"
              className={clsx(
                "mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors",
                {
                  "cursor-not-allowed opacity-50":
                    hasErrors<FormProps>(formState) || formState.isSubmitting,
                  "flex items-center justify-center": formState.isSubmitting,
                }
              )}
              disabled={
                hasErrors<FormProps>(formState) || formState.isSubmitting
              }
            >
              {formState.isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Cadastrando...
                </>
              ) : (
                "Garantir minha vaga"
              )}
            </button>
          </form>
        </div>
      </div>
      <img
        src="/src/assets/code-mockup.png"
        className="mt-10"
        alt="Code Mockup"
      />
    </div>
  );
}
