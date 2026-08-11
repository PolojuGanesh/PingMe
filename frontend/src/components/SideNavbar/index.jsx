import { useContext } from "react";
import { Context } from "../context/Context";
import ProfileModal from "../Modal/profilemodal";

import {
  MessageSquareText,
  Radar,
  MessageCircleMore,
  UsersRound,
  Settings,
  UserRound,
} from "lucide-react";

const SideNavbar = () => {
  const { setOpenProfile } = useContext(Context);

  return (
    <>
      <aside
        className="
          w-16
          md:w-18
          lg:w-20
          border-r
          border-gray-200
          bg-gray-100
          flex
          flex-col
          justify-between
          items-center
          py-4
          shrink-0
        "
      >
        {/* Top Icons */}
        <div className="flex flex-col items-center gap-6">
          <MessageSquareText
            size={22}
            className="cursor-pointer transition hover:text-red-500"
          />

          <Radar
            size={22}
            className="cursor-pointer transition hover:text-red-500"
          />

          <MessageCircleMore
            size={22}
            className="cursor-pointer transition hover:text-red-500"
          />

          <UsersRound
            size={22}
            className="cursor-pointer transition hover:text-red-500"
          />
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col items-center gap-6">
          <Settings
            size={22}
            className="cursor-pointer transition hover:text-red-500"
          />

          <UserRound
            size={22}
            className="cursor-pointer transition hover:text-red-500"
            onClick={() => setOpenProfile(true)}
          />
        </div>
      </aside>

      <ProfileModal />
    </>
  );
};

export default SideNavbar;
