import React from "react";
import "tailwindcss/tailwind.css";
import Head from 'next/head';

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useRouter } from 'next/router';

import { useSession, signIn } from 'next-auth/react'

import { useState } from 'react';

import Agreement from '../components/Agreement'


const apiServer = process.env.API_SERVER;

type ContactFormProps = {
    fullName: string;
    company: string;
    address: string;
    primaryContactName: string;
    primaryContactEmail: string;
    primaryContactPhone: string;
    secondaryContactName: string;
    secondaryContactEmail: string;
    secondaryContactPhone: string;
  };

const resolver: Resolver<ContactFormProps> = async (values) => {
    return {
      values: values.fullName && values.primaryContactName && values.secondaryContactName && values.company && values.address  ? values : {},
      errors: {    
          ...(values.fullName
            ? {}
            : {
                fullName: {
                  type: "required",
                  message: "Full legal name is required.",
                },
              }),
        ...(values.primaryContactName
          ? {}
          : {
              primaryContactName: {
                type: "required",
                message: "Primary name is required",
              },
            }),
        ...(values.primaryContactEmail
          ? {}
          : {
              primaryContactEmail: {
                type: "required",
                message: "Primary contact email is required.",
              },
            }),
        ...(values.secondaryContactName
          ? {}
          : {
              secondaryContactName: {
                type: "required",
                message: "Secondary name is required.",
              },
            }),
        ...(values.secondaryContactEmail
          ? {}
          : {
            secondaryContactEmail: {
                type: "required",
                message: "Secondary contact email is required.",
              },
            }),
        ...(values.company
            ? {}
            : {
                company: {
                    type: "required",
                    message: "Company is required.",
                },
                }),            
            ...(values.address
            ? {}
            : {
                address: {
                    type: "required",
                    message: "Address is required.",
                },
                }),
      },
    };
  };

const Contract: React.FC = () => {
 
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormProps>({ resolver });

  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  const onSubmit: SubmitHandler<ContactFormProps> = async (data) => {
    console.log(`${apiServer}/api/email`);
    const response = await fetch(`${apiServer}/api/email`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      router.push('/success-step-one');
    } else {
      console.error('Error submitting form');
    }
  };

  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <div><span>Loading...</span></div>
  }

  if (session) {
    
  return (
    <div>
      <Head>
        <title>Fill in company details - TestDriveLive</title>
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl rounded-lg shadow-lg bg-gray-800 p-8"
      >
        <h2 className="text-gray-100 font-bold text-xl mb-4">Company information</h2>
        <div className="flex">
          <div className="w-1/2 p-4">
            <label htmlFor="fullName" className="text-gray-300 mt-2">
              Full Legal Name
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.fullName && (
              <span className="text-red-500">{errors.fullName.message}</span>
            )}
          </div>
        </div>
        <div className="">
            <div className="flex">
              <div className="w-1/2 p-4">
                  <label htmlFor="company" className="text-gray-300 mt-2">
                  Company Name
                  </label>
                  <input
                      id="company"
                    
                      type="text"
                      {...register("company")}
                      className="bg-gray-700 text-white rounded p-2 w-full"
                      />
                      {errors?.company && (
                      <span className="text-red-500">{errors.company.message}</span>
                      )}
              </div>
            </div>
            <div className="flex">
            <div className="w-full p-4">
                <label htmlFor="address" className="text-gray-300 mt-2">
                Address
                </label>
                <input
                id="address"                
                type="text"
                {...register("address")}
                className="bg-gray-700 text-white rounded p-2 w-full"
                />
                {errors?.address && (
                <span className="text-red-500">{errors.address.message}</span>
                )}
            </div>
            </div>
        </div>
        <span className="text-gray-300"> In addition, please provide the primary and secondary contact form your organization for all onboarding and production matters:</span>

        <div className="flex">
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold text-white">Primary Contact</h3>
            <label htmlFor="primaryContactName" className="text-gray-300">
              Name
            </label>
            <input
              id="primaryContactName"              
              type="text"
              {...register("primaryContactName")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.primaryContactName && (
              <span className="text-red-500">{errors.primaryContactName.message}<br></br></span>
            )}
            <label htmlFor="primaryContactEmail" className="text-gray-300">
              Email
            </label>
            <input
              id="primaryContactEmail"              
              type="email"
              {...register("primaryContactEmail")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.primaryContactEmail && (
              <span className="text-red-500">Primary email is invalid <br></br></span>
            )}
            <label htmlFor="primaryContactPhone" className="text-gray-300">
              Phone
            </label>
            <input
              id="primaryContactPhone"              
              type="tel"
              {...register("primaryContactPhone")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.primaryContactPhone && (
              <span className="text-red-500">Phone is invalid</span>
            )}
          </div>
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold text-white">Secondary Contact</h3>
            <label htmlFor="secondaryContactName" className="text-gray-300">
              Name
            </label>
            <input
              id="secondaryContactName"              
              type="text"
              {...register("secondaryContactName")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.secondaryContactName && (
              <span className="text-red-500">
                {errors.secondaryContactName.message}<br></br>
              </span>
            )}
            <label htmlFor="secondaryContactEmail" className="text-gray-300">
              Email
            </label>
            <input
              id="secondaryContactEmail"             
              type="email"
              {...register("secondaryContactEmail")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.secondaryContactEmail && (
              <span className="text-red-500">Secondary email is invalid<br></br></span>
            )}
            <label htmlFor="secondaryContactPhone" className="text-gray-300">
              Phone
            </label>
            <input
              id="secondaryContactPhone"             
              type="tel"
              {...register("secondaryContactPhone")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            {errors?.secondaryContactPhone && (
              <span className="text-red-500">Phone is invalid</span>
            )}
          </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
            <div className="inline-block align-bottom bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-100" id="modal-title">
                    PRODUCTION AND DISTRIBUTION AGREEMENT
                    </h3>
                    <div className="mt-2 text-gray-100">
                      <Agreement/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
        <div className='field is-grouped'>
              <div>
                
                <input type="checkbox" id="terms" name="terms" onChange={() => setIsChecked(!isChecked)} />
                <span className="text-gray-100"> By checking this box, you are agreeing to the terms and conditions as set out by the user agreement. 
                <button onClick={() => setShowModal(true)} className="ml-2 underline">
                 Click here to review the agreement.
                </button></span>

              </div>
              <div className='control'>
                <button disabled={!isChecked} className='disabled:opacity-10 button is-primary mt-8 px-4 py-2 text-lg border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' type='submit'>
                  Submit
                </button>
              </div>
            </div>
      </form>
    </div>
  );
  }
  return (
    <div className="text-white">
      <p>A provided code is required to see this page.</p>
      <div className="flex flex-col items-center">          
          <div className="flex items-center mt-4">
              <button onClick={() => signIn('code')} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Enter code
              </button>
          </div>
      </div>
    </div>
    
  )

};

export default Contract;
