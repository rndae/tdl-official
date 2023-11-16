import React from "react";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useRouter } from 'next/router';
import Head from 'next/head';


const apiServer = process.env.API_SERVER;

type ContactFormProps = {
  primaryName: string;
  primaryEmail: string;
  primaryPhone: string;
  yourProduct: string;
  companyName: string;
};

const resolver: Resolver<ContactFormProps> = async (values) => {
  return {
    values: values.primaryName && values.primaryEmail ? values : {},
    errors: {
      ...(values.primaryName
        ? {}
        : {
            primaryName: {
              type: "required",
              message: "Name is required.",
            },
          }),
      ...(values.primaryEmail
        ? {}
        : {
            primaryEmail: {
              type: "required",
              message: "Email address is required.",
            },
          }),
    },
  };
};

export default function ContactForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormProps>({ resolver });
  const onSubmit: SubmitHandler<ContactFormProps> = async (data) => {
    console.log(`${apiServer}/api/submit`);
    const response = await fetch(`${apiServer}/api/email`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      router.push('/success-join-request');
    } else {
      console.error('Error submitting form');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Request a code to join - TestDriveLive</title>
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl rounded-lg shadow-lg bg-gray-800 p-8"
      >
        <h2 className="text-gray-100 font-bold text-xl mb-4">Request a code to join in to TestDriveLive</h2>
        <div className="flex">
          <div className="w-1/2 p-4">
            <h1 className="text-gray-400 hover:text-gray-600">Fill out your contact and product information:</h1>
            <label htmlFor="primaryName" className="text-gray-300">
              Name
            </label>
            <input
              id="primaryName"
              
              type="text"
              {...register("primaryName")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.primaryName && (
              <span className="text-red-500">{errors.primaryName.message} <br></br></span>
            )}
            <label htmlFor="primaryEmail" className="text-gray-300">
              Email
            </label>
            <input
              id="primaryEmail"
              
              type="email"
              {...register("primaryEmail")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.primaryEmail && (
              <span className="text-red-500">Email is invalid.<br></br></span> 
            )}
            <label htmlFor="primaryPhone" className="text-gray-300">
              Phone
            </label>
            <input
              id="primaryPhone"
              
              type="tel"
              {...register("primaryPhone")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.primaryPhone && (
              <span className="text-red-500">Phone is invalid <br></br></span>
            )}

            <label htmlFor="yourProduct" className="text-gray-300">
              Your Product
            </label>
            <input
              id="yourProduct"
              
              type="text"
              {...register("yourProduct")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />

            <label htmlFor="companyName" className="text-gray-300">
              Company name
            </label>
            <input
              id="companyName"
              
              type="text"
              {...register("companyName")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />


            <div className='field is-grouped'>
              <div className='control'>
                <button className='button is-primary mt-8 px-4 py-2 text-lg font-mono font-bold text-pink-700 bg-gray-700 rounded hover:bg-gray-700' type='submit'>
                  Submit
                </button>
              </div>
            </div>

          </div>          
        </div>        
      </form>
    </div>
  );
}
