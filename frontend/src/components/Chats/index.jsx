import { EllipsisVertical } from "lucide-react";

const accountsData = [
  {
    id: 1,
    name: "John Doe",
    mobile: "1234567890",
    time: "10:30 AM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    mobile: "0987654321",
    time: "11:00 AM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 3,
    name: "Alice Johnson",
    mobile: "5555555555",
    time: "09:15 AM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 4,
    name: "Bob Brown",
    mobile: "4444444444",
    time: "01:45 PM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 5,
    name: "Charlie Davis",
    mobile: "3333333333",
    time: "02:20 PM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 6,
    name: "Diana Evans",
    mobile: "2222222222",
    time: "03:10 PM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 7,
    name: "Frank Green",
    mobile: "1111111111",
    time: "04:05 PM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 8,
    name: "Grace Harris",
    mobile: "6666666666",
    time: "05:30 PM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 9,
    name: "Hank Irving",
    mobile: "7777777777",
    time: "06:45 PM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
  {
    id: 10,
    name: "Ivy Jackson",
    mobile: "8888888888",
    time: "07:15 PM",
    imageUrl:
      "https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769329160/ChatGPT_Image_Jan_25_2026_01_48_42_PM_afyucw.png",
  },
];

const Chats = ({ selectedChat, setSelectedChat }) => {
  return (
    <section
      className="
        flex
        flex-col
        w-full
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
            src="https://res.cloudinary.com/dzqfuqpu4/image/upload/v1769187561/ChatGPT_Image_Jan_16__2026__08_06_42_PM-removebg-preview_g4tucn.png"
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
          />
        </div>
      </header>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {accountsData.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedChat(contact)}
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
              cursor-pointer
              hover:bg-gradient-to-r from-red-200 via-green-200 to-pink-200
              ${selectedChat?.id === contact.id ? "bg-violet-50" : ""}
            `}
          >
            {/* Profile */}
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
              <img
                src={contact.imageUrl}
                alt={contact.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold truncate">{contact.mobile}</h2>

                <span className="text-xs text-gray-500">{contact.time}</span>
              </div>

              <p className="text-sm text-gray-600 truncate">{contact.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Chats;
