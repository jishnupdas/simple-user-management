import ArrowLeft from "../components/UIElements/ArrowLeft";
import Head from "next/head";
import Layout from "../components/layouts/Layout";
import PlusIcon from "../components/UIElements/PlusIcon";
import UserTable from "../components/users/UserTable";
import { useRouter } from "next/router";
import UserForm from "../components/users/UserForm";

const CreateUser = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Create new user</title>
      </Head>

      <Layout>
        <div className="max-w-xl -mx-3 md:mx-auto md:w-full">
          <div className="flex items-center mb-6 space-x-3">
            <button onClick={() => router.back()}>
              <ArrowLeft className="w-6 h-6 icon-btn" />
            </button>
            <div className="text-lg font-bold text-gray-900 capitalize">
              Create user
            </div>
          </div>
          <div className="w-full px-6 py-12 bg-white border border-gray-200 rounded-lg shadow">
            <UserForm editing={false} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateUser;
