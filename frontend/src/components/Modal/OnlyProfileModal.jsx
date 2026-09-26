import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { Context } from "../context/Context";
import { useContext } from "react";
import { assets } from "../../assets/assets";

const OnlyProfileModal = () => {
  const { openOnlyProfile, setopenOnlyProfile, profile, apiUrl } =
    useContext(Context);

  return (
    <Modal
      open={openOnlyProfile}
      onClose={() => {
        setopenOnlyProfile(false);
      }}
      center
    >
      <img
        src={
          profile[Object.keys(profile).at(-1)] === ""
            ? `${assets.profileimage}`
            : `${apiUrl}/images/${profile.profileImage}`
        }
        alt={profile.username}
        className="w-full h-full object-cover"
      />
    </Modal>
  );
};

export default OnlyProfileModal;
