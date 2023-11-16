import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

type InvoiceFormProps = {
  invoiceNumber: string;
  invoiceDate: string;
  invoiceAmount: number;
  wireAccount: string;
  wireRouting: string;
};

const apiServer = process.env.API_SERVER;

const InvoicePage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<InvoiceFormProps>();

  const onSubmit: SubmitHandler<InvoiceFormProps> = async (data) => {
    console.log(`${apiServer}/api/invoice`);
    const response = await fetch(`${apiServer}/api/invoice`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      router.push("/success");
    } else {
      console.error("Error submitting invoice");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white">Step 2: Invoice - Wire Payment</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl rounded-lg shadow-lg bg-gray-800 p-8"
      >
        <div className="flex">
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold text-white">Your invoice details</h3>
            <label htmlFor="invoiceNumber" className="text-gray-300">
              Invoice number
            </label>
            <input
              id="invoiceNumber"
              type="text"
              {...register("invoiceNumber")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="invoiceDate" className="text-gray-300">
              Invoice date
            </label>
            <input
              id="invoiceDate"
              type="date"
              {...register("invoiceDate")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="invoiceAmount" className="text-gray-300">
              Invoice amount
            </label>
            <input
              id="invoiceAmount"
              type="number"
              {...register("invoiceAmount")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
          </div>
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold text-white">Your wire payment details</h3>
            <label htmlFor="wireAccount" className="text-gray-300">
              Wire account number
            </label>
            <input
              id="wireAccount"
              type="text"
              {...register("wireAccount")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="wireRouting" className="text-gray-300">
              Wire routing number
            </label>
            <input
              id="wireRouting"
              type="text"
              {...register("wireRouting")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-end p-4">
          <Link href="/info">
            <button className="mr-4 px-4 py-2 text-lg text-white bg-pink-700 rounded hover:bg-pink-600">
              Back
            </button>
          </Link>
          <button
            type="submit"
            className="px-4 py-2 text-lg text-white bg-pink-700 rounded hover:bg-pink-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoicePage;
