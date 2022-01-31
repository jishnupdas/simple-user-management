import Head from "next/head";
import Image from "next/image";
import Layout from "../components/layouts/Layout";
import PlusIcon from "../components/UIElements/PlusIcon";
import UserTable from "../components/users/UserTable";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>User management</title>
      </Head>

      <Layout>
        <div className="max-w-sm mx-0 md:-mx-3 md:w-full md:max-w-4xl">
          <div className="flex items-baseline justify-between mb-4 lg:mb-6">
            <div className="text-lg font-bold text-gray-900 capitalize lg:text-xl">
              Users
            </div>
            <button
              className="text-sm font-bold btn btn-primary"
              onClick={() => router.push("/create")}
            >
              <div className="mr-2">
                <PlusIcon />
              </div>
              create user
            </button>
          </div>
          <div className="w-full overflow-x-scroll bg-white border border-gray-200 rounded-lg shadow md:overflow-hidden">
            <UserTable />
          </div>
        </div>
      </Layout>
    </>
  );
}
