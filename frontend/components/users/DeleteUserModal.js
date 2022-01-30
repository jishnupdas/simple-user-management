import { useQueryClient } from "react-query";
import Axios from "../setup/Axios";
import Modal from "../UIElements/Modal";
import WarningIcon from "../UIElements/WarningIcon";

const DeleteUserModal = ({ visible, setVisible, user }) => {
  const queryClient = useQueryClient();

  const DeleteUser = async () => {
    let url = `/users/${user.id}/`;
    console.log(url);
    const res = await Axios.delete(url);
    console.log(res);
    if (res.status == 204) {
      console.log("deleted user");
      console.log("invalidated queries");
    }
    await queryClient.invalidateQueries();
  };

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <div className="flex flex-row items-center justify-between py-3 pl-3 pr-2 bg-gray-100">
        <span className="flex items-center">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <WarningIcon className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="pl-3 font-bold text-gray-800">Delete user</h3>
        </span>
        <div
          className="px-3 py-1 text-gray-900 bg-gray-300 rounded-lg"
          onClick={() => setVisible(false)}
        >
          x
        </div>
      </div>
      <div className="px-4 pt-6 pb-4">
        Are you sure you want to delete
        <span className="px-2 italic font-bold">
          {user.first_name} {user.last_name}?
        </span>
      </div>
      <div className="flex justify-end w-full px-2 pb-2">
        <button
          className="font-bold text-white uppercase bg-red-400 btn"
          onClick={DeleteUser}
        >
          Yes
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
