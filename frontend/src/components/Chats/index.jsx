import { useEffect, useContext } from "react";
import { EllipsisVertical } from "lucide-react";

import { Context } from "../context/Context";
import { assets } from "../../assets/assets";
import OnlyProfileModal from "../Modal/OnlyProfileModal";

const Chats = () => {
  const {
    apiUrl,
    userDetails,
    allContacts,
    addToContactsHandler,
    searchInput,
    setSearchInput,
    searchResults,
    setSearchResults,
    selectedChat,
    setSelectedChat,
    setopenOnlyProfile,
    setProfile,
  } = useContext(Context);

  const userSearchHandler = async () => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const url = `${apiUrl}/search-user?searchQuery=${encodeURIComponent(searchInput)}`;

      const response = await fetch(url);
      const responseData = await response.json();

      if (response.ok) {
        setSearchResults(responseData.users);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching for users:", error);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      userSearchHandler();
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchInput, apiUrl]);

  const isSearching = searchInput.trim().length > 0;

  const contactsToDisplay = isSearching ? searchResults : allContacts;

  const checkContactInList = (contact) => {
    const contactExists = allContacts.some(
      (existingContact) =>
        existingContact.mobileNumber === contact.mobileNumber,
    );

    if (contactExists) {
      setSelectedChat(contact);
    }
  };

  return (
    <section
      className="
        flex
        flex-col
        w-[85%]
        md:w-[340px]
        lg:w-[380px]
        xl:w-[420px]
        border-r
        bg-white
        shrink-0
      "
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <img
            src={assets.chatslogo}
            alt="logo"
            className="h-14 md:h-16 object-contain"
          />

          <EllipsisVertical
            size={22}
            className="cursor-pointer hover:text-red-500 transition"
          />
        </div>

        <div className="px-4 pb-3">
          <input
            type="search"
            placeholder="Search contact or username"
            className="
              w-full
              rounded-lg
              border-2
              border-gray-200
              bg-gray-100
              px-4
              py-2
              outline-none
              transition
              focus:border-violet-500
            "
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </header>

      {/* Contact List */}
      {contactsToDisplay.length > 0 ? (
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {contactsToDisplay.map((contact) => {
            return (
              <div
                key={contact._id}
                onClick={() => checkContactInList(contact)}
                className={`
                    flex
                    cursor-pointer
                    items-center
                    gap-4
                    px-4
                    py-3
                    border
                    border-gray-100
                    transition
                    hover:border-t-red-500
                    hover:border-r-blue-500 
                    hover:border-b-green-500 
                    hover:border-l-pink-500 
                    hover:bg-gradient-to-r from-blue-200 via-purple-200 to-violet-200
                    ${selectedChat?._id === contact._id ? "bg-violet-50" : ""}
                  `}
              >
                {/* Profile */}
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 hover:border-2 hover:border-orange-500">
                  <img
                    src={
                      contact.profileImage === ""
                        ? `${assets.profileimage}`
                        : `${apiUrl}/images/${contact.profileImage}`
                    }
                    alt={contact.username}
                    className="w-full h-full object-cover cursor-default"
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfile({
                        profileImage: contact.profileImage,
                        username: contact.username,
                      });
                      setopenOnlyProfile(true);
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold truncate">
                      {contact.mobileNumber}{" "}
                      {userDetails?.id === contact._id && (
                        <span className="text-red-500 font-semibold">
                          (You)
                        </span>
                      )}
                    </h2>

                    {allContacts.some(
                      (eachContact) =>
                        contact.mobileNumber === eachContact.mobileNumber,
                    ) && (
                      <span className="text-xs text-gray-500">07:07 PM</span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 truncate">
                    {contact.username}
                  </p>
                </div>
                {!allContacts.some(
                  (eachContact) =>
                    contact.mobileNumber === eachContact.mobileNumber,
                ) && (
                  <button
                    type="button"
                    className="border border-gray-500 rounded p-1 text-sm hover:bg-violet-500 hover:text-white hover:border-violet-500 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToContactsHandler(contact, userDetails.id);
                    }}
                  >
                    Add to contacts
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 font-medium text-lg text-center py-4 flex flex-col justify-center items-center h-full">
          No contacts found.
        </p>
      )}
      <OnlyProfileModal />
    </section>
  );
};

export default Chats;
