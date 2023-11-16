import React from 'react';
import Head from 'next/head';

const Success: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Head>
        <title>We have successfully received your information to fill in our system. The next steps are:</title>
      </Head>
      <h1 className="text-4xl font-bold text-white">Success!</h1>
      <p className="mt-4 text-lg text-gray-300">
        We have successfully received your information.
      </p>

      <div className="flex flex-col items-center justify-center w-full max-w-4xl">
            <div className="text-gray-200 p-4 m-4">
                <h2 className="text-gray-100 font-bold text-xl mb-4">Steps for the Getting Your Product(s) on Test Drive LIVE:</h2>
                    <ol className="list-decimal list-inside">
                    <li className="flex items-center mb-4">
                        <span className="text-custom-pink font-bold mr-2">1.</span>
                        <div className="text-white p-2 ">
                        You will be Sent Our Standard (Required) Agreement via Docusign 
                        </div>
                    </li>
                    <li className="flex items-center mb-4">
                        <span className="text-custom-pink font-bold mr-2">2.</span>
                        <div className="text-white p-2 ">
                        Execute the DocuSign Agreement
                        </div>
                    </li>
                    <li className="flex items-center mb-4">
                        <span className="text-custom-pink font-bold mr-2">3.</span>
                        <div className="text-white  p-2 ">
                        You will receive an Invoice and Wire Instructions from our Finance Dept
                        </div>
                    </li>
                    <li className="flex items-center mb-4">
                        <span className="text-custom-pink font-bold mr-2">4</span>
                        <div className="text-white  p-2">
                        Complete and Return Agreement via Docusign and Submit Wire
                        </div>
                    </li>
                    <li className="flex items-center mb-4">
                        <span className="text-custom-pink font-bold mr-2">5</span>
                        <div className="text-white  p-2">
                        You will receive a cross executed Docusign of Agreement via email.
                        </div>
                    </li>
                    <li className="flex items-center mb-4">
                        <span className="text-custom-pink font-bold mr-2">6</span>
                        <div className="text-white  p-2">
                        Once wire is confirmed and recorded by our Finance Department, you will receive Welcome Email and Onboarding Instructions from our Programming and Scheduling Coordinator.
                        </div>
                    </li>
                    <li className="flex items-center mb-4">
                        <span className="text-custom-pink font-bold mr-2">7</span>
                        <div className="text-white  p-2">
                        You will be asked to create a Client Account for loading creative assets at a later date. Therefore you may plan to assign this task to others in your company.
                        </div>
                    </li>
                    <li className="flex items-center mb-4">
                        <span className="text-custom-pink font-bold mr-2">8</span>
                        <div className="text-white  p-2">
                        Our Programming and Scheduling Coordinator will set calls/meetings to assemble and launch
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </div>
  );
};

export default Success;
