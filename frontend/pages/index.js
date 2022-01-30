import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../components/layouts/Layout";
import PlusIcon from "../components/UIElements/PlusIcon";
import UserTable from "../components/users/UserTable";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>User management</title>
      </Head>

      <Layout>
        <div className="max-w-4xl -mx-3 md:mx-auto md:w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg font-bold text-gray-900 capitalize">
              Users
            </div>
            <button
              className="text-sm font-bold btn btn-primary"
              onClick={() => router.push("/create")}
            >
              <div className="pr-3">
                <PlusIcon />
              </div>
              create user
            </button>
          </div>
          <UserTable />
        </div>
      </Layout>
    </>
  );
}
