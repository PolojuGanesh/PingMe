import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Context } from "../context/Context";
import { useContext, useState } from "react";
import { CircleUser, KeyRound, LogOut, Camera } from "lucide-react";
import Cookies from "js-cookies";
import { useNavigate } from "react-router-dom";
import socket from "../../socket/socket";
import { assets } from "../../assets/assets";

const ProfileModal = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const {
    openProfile,
    setOpenProfile,
    setJwtToken,
    userDetails,
    apiUrl,
    setUserDetails,
    fetchContacts,
  } = useContext(Context);

  const uploadProfileImageHandler = async (event) => {
    const selectedProfileImage = event.target.files[0];
    if (!selectedProfileImage) return;
    setImage(selectedProfileImage);

    try {
      const formData = new FormData();
      formData.append("profileImage", selectedProfileImage);
      formData.append("userId", userDetails?.id);

      const options = {
        method: "POST",
        body: formData,
      };

      const response = await fetch(`${apiUrl}/add-profile-image`, options);
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        const updateUserDetails = responseData.user;

        await fetchContacts();
        setUserDetails(updateUserDetails);

        Cookies.setItem("user", JSON.stringify(updateUserDetails), {
          expires: 1,
        });
        setImage(null);
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutHandler = () => {
    socket.disconnect();
    Cookies.removeItem("jwt_token");
    Cookies.removeItem("user");
    setJwtToken(null);
    setOpenProfile(false);

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
      id: 3,
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
        <div className="relative w-30 h-30 mx-auto">
          {/* Profile Image */}
          <div className="w-full h-full rounded-full border-2 border-violet-500 p-1">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : userDetails?.profileImage
                    ? `${apiUrl}/images/${userDetails.profileImage}`
                    : assets.profileimage
              }
              alt="profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Camera Icon */}
          <label
            htmlFor="profileimage"
            className="absolute bottom-0 right-0 
               flex h-9 w-9 cursor-pointer items-center justify-center
               rounded-full bg-violet-500 text-white
               border-2 border-white
               hover:bg-violet-600"
          >
            <Camera size={18} />
          </label>

          {/* File Input */}
          <input
            type="file"
            id="profileimage"
            accept="image/*"
            hidden
            onChange={uploadProfileImageHandler}
          />
        </div>

        <div className="mx-auto">
          <p className="text-md font-medium text-orange-500 text-center">
            {userDetails.mobileNumber}
          </p>
          <p className="text-md font-medium text-green-500 text-center">
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
                  className={each.id === 3 ? "text-red-600" : ""}
                />
              </div>

              {each.id === 3 ? (
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
