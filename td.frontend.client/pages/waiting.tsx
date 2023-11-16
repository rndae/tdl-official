import Link from "next/link";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

type PaymentUpdate = {
  date: string;
  message: string;
};

const WaitingPage: React.FC = () => {
  const [updates, setUpdates] = useState<PaymentUpdate[]>([]);

  useEffect(() => {
    // fetch updates from the server
    // for now, use a mock data
    const mockUpdates: PaymentUpdate[] = [
      {
        date: "11/3/2023",
        message: "We have received your wire payment request and are processing it.",
      },
      {
        date: "11/5/2023",
        message: "Your wire payment has been verified and approved.",
      },
      {
        date: "11/7/2023",
        message: "Your wire payment has been completed and transferred to your account.",
      },
    ];
    setUpdates(mockUpdates);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white">Step 4: Waiting for payment complete</h1>
      <p className="text-lg text-gray-300">
        Your wire payment details are as follows:
      </p>
      <div className="w-full max-w-4xl rounded-lg shadow-lg bg-gray-800 p-8">
        <div className="flex">
          <div className="w-1/2 p-4">
            <label htmlFor="invoiceNumber" className="text-gray-300">
              Invoice number
            </label>
            <input
              id="invoiceNumber"
              type="text"
              value="INV-123456"
              readOnly
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="invoiceDate" className="text-gray-300">
              Invoice date
            </label>
            <input
              id="invoiceDate"
              type="date"
              value="11/2/2023"
              readOnly
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="invoiceAmount" className="text-gray-300">
              Invoice amount
            </label>
            <input
              id="invoiceAmount"
              type="number"
              value="5000"
              readOnly
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
          </div>
          <div className="w-1/2 p-4">
            <label htmlFor="wireAccount" className="text-gray-300">
              Wire account number
            </label>
            <input
              id="wireAccount"
              type="text"
              value="1234567890"
              readOnly
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="wireRouting" className="text-gray-300">
              Wire routing number
            </label>
            <input
              id="wireRouting"
              type="text"
              value="987654321"
              readOnly
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
          </div>
        </div>
      </div>
      <p className="text-lg text-gray-300 mt-4">
        Any updates on your wire payment will be posted here. The whole process
        can take anywhere from 3 days to 10 days, depending on the bank and the
        transaction.
      </p>
      <div className="w-full max-w-4xl rounded-lg shadow-lg bg-gray-800 p-8 mt-4 overflow-y-auto h-64">
        {updates.map((update, index) => (
          <div key={index} className="flex items-start p-4 border-b border-gray-700">
            <div className="text-gray-300 mr-4">{update.date}</div>
            <div className="text-white">{update.message}</div>
          </div>
        ))}
      </div>
      <Link href="/upload">
        <button className="mt-8 px-4 py-2 text-lg text-white bg-pink-700 rounded hover:bg-pink-600">
          Back
        </button>
      </Link>
    </div>
  );
};

export default WaitingPage;
