import ArrowLeft from "../../components/UIElements/ArrowLeft";
import Head from "next/head";
import Layout from "../../components/layouts/Layout";
import { useRouter } from "next/router";
import GetAPIDetail from "../../components/api/GetAPIdetails";
import UserForm from "../../components/users/UserForm";

const UpdateUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, status, error } = GetAPIDetail({
    url: `/users/${router.query.id}/`,
    key: ["userID", id],
    queryParams: {},
  });

  console.log(data);
  return (
    <>
      <Head>
        <title>Update user</title>
      </Head>

      <Layout>
        <div className="max-w-xl -mx-3 md:mx-auto md:w-full">
          <div className="flex items-center mb-6 space-x-3">
            <button onClick={() => router.back()}>
              <ArrowLeft className="icon-btn" />
            </button>
            <div className="text-lg font-bold text-gray-900 capitalize">
              Update user
            </div>
          </div>
          <div className="w-full px-6 py-12 bg-white border border-gray-200 rounded-lg shadow">
            <UserForm user={data} editing={true} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UpdateUser;
