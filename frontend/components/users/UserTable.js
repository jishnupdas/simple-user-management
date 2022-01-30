import GetUsers from "./GetUsers";
import React from "react";
import LoadingRow from "./LoadingRow";
import UserRow from "./TableRow";

const UserTable = () => {
  const tableHeaders = ["name", "email", "role", "actions"];

  const { status, flatData, loadNext, isFetching, hasNextPage } = GetUsers({
    queryParams: {},
  });

  return (
    <div className="-mx-3 overflow-x-scroll md:mx-auto md:overflow-x-hidden">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
        <table className="w-full border-b">
          <thead>
            <tr className="px-4 py-6 border-b border-gray-300">
              {tableHeaders.map((item, index) => (
                <td
                  className="py-6 text-sm text-gray-500 uppercase pl-7"
                  key={index}
                >
                  {item}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {status === "success"
              ? flatData.map((user) => <UserRow key={user.id} user={user} />)
              : [...Array(10).keys()].map((n) => <LoadingRow key={n} />)}
          </tbody>
        </table>
        {hasNextPage && (
          <button className="mx-auto my-3 bg-gray-300 btn" onClick={loadNext}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default UserTable;
