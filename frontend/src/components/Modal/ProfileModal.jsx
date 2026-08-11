import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Context } from "../context/Context";
import { useContext } from "react";
import { CircleUser, KeyRound, LogOut } from "lucide-react";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
import socket from "../../socket/socket";

const ProfileModal = () => {
  const navigate = useNavigate();

  const { openProfile, setOpenProfile, setJwtToken, userDetails } =
    useContext(Context);

  const logoutHandler = () => {
    socket.disconnect();
    Cookies.removeItem("jwt_token");
    Cookies.removeItem("user");
    setJwtToken(null);

    navigate("/", { replace: true });
  };

  const arrList = [
    {
      id: 1,
      name: "Profile",
      para: "Name, profile picture, usename",
      icon: CircleUser,
    },
    {
      id: 2,
      name: "Account",
      para: "Account info",
      icon: KeyRound,
    },
    {
      id: "logout",
      name: "Logout",
      para: "",
      icon: LogOut,
    },
  ];

  const onCloseModal = () => {
    setOpenProfile(false);
  };

  return (
    <Modal
      open={openProfile}
      onClose={onCloseModal}
      center
      classNames={{
        modalContainer: "!flex !items-center !justify-center",
        modal: "!rounded-xl !p-6",
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="w-30 rounded-full border-2 border-violet-500 p-1 mx-auto">
          <img
            src="https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png"
            alt="profile"
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="mx-auto">
          <p className="text-md font-medium text-orange-500">
            {userDetails.mobileNumber}
          </p>
          <p className="text-md font-medium text-green-500">
            {userDetails.username}
          </p>
        </div>
        <div>
          {arrList.map((each) => (
            <div
              className="flex flex-row items-center gap-3 p-3 mb-2 hover:rounded-md border-1 border-white hover:border-t-red-500
            hover:border-r-blue-500 hover:border-b-green-500 hover:border-l-pink-500 cursor-pointer"
              key={each.id}
            >
              <div>
                <each.icon
                  size={30}
                  className={each.id === "logout" ? "text-red-600" : ""}
                />
              </div>

              {each.id === "logout" ? (
                <div onClick={logoutHandler}>
                  <p className="text-md font-medium text-red-600">
                    {each.name}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-md font-medium">{each.name}</p>
                  <p className="text-sm text-gray-700 font-normal">
                    {each.para}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
