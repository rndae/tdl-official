import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

const apiServer = process.env.API_SERVER;


type UploadFormProps = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  dropboxLink: string;
  googleDriveLink: string;
  internalUpload: FileList;
};

const UploadPage: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadFormProps>();

  const onSubmit: SubmitHandler<UploadFormProps> = async (data) => {
    console.log(`${apiServer}/api/upload`);
    const formData = new FormData();
    formData.append("question1", data.question1);
    formData.append("question2", data.question2);
    formData.append("question3", data.question3);
    formData.append("question4", data.question4);
    formData.append("question5", data.question5);
    formData.append("dropboxLink", data.dropboxLink);
    formData.append("googleDriveLink", data.googleDriveLink);
    formData.append("internalUpload", data.internalUpload[0]);

    const response = await fetch(`${apiServer}/api/upload`, {
      method: "POST",
      body: formData,
    });


    if (response.ok) {
      router.push("/success-upload");
    } else {
      console.error("Error uploading files and questionnaire");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white">Step 3: Upload Files and Questionnaire</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl rounded-lg shadow-lg bg-gray-800 p-8"
      >
        <div className="flex">
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold text-white">Upload links</h3>
            <label htmlFor="dropboxLink" className="text-gray-300">
              Dropbox link
            </label>
            <input
              id="dropboxLink"
              type="text"
              {...register("dropboxLink")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="googleDriveLink" className="text-gray-300">
              Google Drive link
            </label>
            <input
              id="googleDriveLink"
              type="text"
              {...register("googleDriveLink")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="internalUpload" className="text-gray-300">
              Internal upload
            </label>
            <input
              id="internalUpload"
              type="file"
              {...register("internalUpload")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
          </div>
          <div className="w-1/2 p-4">
            <h3 className="text-lg font-bold text-white">Questionnaire</h3>
            <label htmlFor="question1" className="text-gray-300">
              Question 1
            </label>
            <input
              id="question1"
              type="text"
              {...register("question1")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="question2" className="text-gray-300">
              Question 2
            </label>
            <input
              id="question2"
              type="text"
              {...register("question2")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="question3" className="text-gray-300">
              Question 3
            </label>
            <input
              id="question3"
              type="text"
              {...register("question3")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="question4" className="text-gray-300">
              Question 4
            </label>
            <input
              id="question4"
              type="text"
              {...register("question4")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
            <label htmlFor="question5" className="text-gray-300">
              Question 5
            </label>
            <input
              id="question5"
              type="text"
              {...register("question5")}
              className="bg-gray-700 text-white rounded p-2 w-full"
            />
          </div>
        </div>
        <div className="flex justify-end p-4">
          <Link href="/invoice">
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

export default UploadPage;
