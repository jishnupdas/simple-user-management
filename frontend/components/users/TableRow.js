import React, { useState } from "react";

import DeleteIcon from "../UIElements/DeleteIcon";
import EditIcon from "../UIElements/EditIcon";
import { useRouter } from "next/router";
import DeleteUserModal from "./DeleteUserModal";

const UserRow = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  return (
    <tr className="px-4 py-6 transition duration-200 ease-out cursor-pointer hover:bg-gray-50 hover:shadow-sm">
      <td className="table-cell">
        {user.first_name} {user.last_name}
      </td>
      <td className="table-cell">{user.email}</td>
      <td className="table-cell">{user.role}</td>
      <td className="table-cell">
        <div className="flex flex-row space-x-3">
          <button onClick={() => setVisible(true)}>
            <DeleteIcon className="text-red-700 icon-btn" />
          </button>
          <button onClick={() => router.push(`/update/${user.id}/`)}>
            {/* ?name=${user.first_name}&role=${user.role} */}
            <EditIcon className="icon-btn text-cyan-700" />
          </button>
          <DeleteUserModal
            visible={visible}
            setVisible={setVisible}
            user={user}
          />
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
