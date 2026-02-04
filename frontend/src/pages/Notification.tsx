import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

// ---------- Tab Button Component ----------
function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-600 hover:bg-slate-100"
      }`}
    >
      {label}
    </button>
  );
}

// ---------- Notification Item Component ----------
function NotificationItem({
  category,
  title,
  time,
  read,
  link,
  onClick,
}: {
  category: string;
  title: string;
  time: string;
  read: boolean;
  link: string;
  onClick: () => void;
}) {
  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case "팀":
        return {
          bg: "bg-blue-100",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-blue-600"
              aria-hidden="true"
            >
              <path d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.884 12.5 9.99996 12.5H4.99996C4.1159 12.5 3.26806 12.8512 2.64294 13.4763C2.01782 14.1014 1.66663 14.9493 1.66663 15.8333V17.5" />
              <path d="M13.3334 2.60645C14.0482 2.79175 14.6812 3.20917 15.1331 3.79316C15.585 4.37716 15.8302 5.09469 15.8302 5.83311C15.8302 6.57154 15.585 7.28906 15.1331 7.87306C14.6812 8.45706 14.0482 8.87447 13.3334 9.05978" />
              <path d="M18.3334 17.5001V15.8334C18.3328 15.0948 18.0870 14.3774 17.6345 13.7937C17.1820 13.2099 16.5485 12.7930 15.8334 12.6084" />
              <path d="M7.49996 9.16667C9.34091 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34091 2.5 7.49996 2.5C5.65901 2.5 4.16663 3.99238 4.16663 5.83333C4.16663 7.67428 5.65901 9.16667 7.49996 9.16667Z" />
            </svg>
          ),
        };
      case "멘토링":
        return {
          bg: "bg-green-100",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-green-600"
              aria-hidden="true"
            >
              <path d="M13.3334 9.16667L15 10.8333L18.3334 7.5" />
              <path d="M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.884 12.5 9.99996 12.5H4.99996C4.1159 12.5 3.26806 12.8512 2.64294 13.4763C2.01782 14.1014 1.66663 14.9493 1.66663 15.8333V17.5" />
              <path d="M7.49996 9.16667C9.34091 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34091 2.5 7.49996 2.5C5.65901 2.5 4.16663 3.99238 4.16663 5.83333C4.16663 7.67428 5.65901 9.16667 7.49996 9.16667Z" />
            </svg>
          ),
        };
      case "학업":
        return {
          bg: "bg-indigo-100",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-indigo-600"
              aria-hidden="true"
            >
              <path d="M17.85 9.1018C17.9991 9.03599 18.1257 8.92786 18.2141 8.7908C18.3024 8.65375 18.3486 8.49379 18.3469 8.33075C18.3452 8.16771 18.2957 8.00874 18.2046 7.87354C18.1134 7.73834 17.9846 7.63285 17.8341 7.57013L10.6916 4.3168C10.4745 4.21776 10.2386 4.1665 9.99995 4.1665C9.7613 4.1665 9.52542 4.21776 9.30829 4.3168L2.16662 7.5668C2.01826 7.63178 1.89205 7.73858 1.80343 7.87415C1.7148 8.00971 1.6676 8.16817 1.6676 8.33014C1.6676 8.4921 1.7148 8.65055 1.80343 8.78612C1.89205 8.92169 2.01826 9.02849 2.16662 9.09347L9.30829 12.3501C9.52542 12.4492 9.7613 12.5004 9.99995 12.5004C10.2386 12.5004 10.4745 12.4492 10.6916 12.3501L17.85 9.1018Z" />
              <path d="M18.3334 8.3335V13.3335" />
              <path d="M5 10.4165V13.3332C5 13.9962 5.52678 14.6321 6.46447 15.1009C7.40215 15.5698 8.67392 15.8332 10 15.8332C11.3261 15.8332 12.5979 15.5698 13.5355 15.1009C14.4732 14.6321 15 13.9962 15 13.3332V10.4165" />
            </svg>
          ),
        };
      default:
        return { bg: "bg-slate-100", icon: <div /> };
    }
  };

  const { bg, icon } = getCategoryStyle(category);

  return (
    <Link to={link} onClick={onClick} className="block">
      <div
        className={`relative flex items-center gap-4 rounded-xl border p-4 transition ${
          read ? "border-slate-200 bg-white" : "border-blue-300 bg-blue-50"
        }`}
      >
        {!read && (
          <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-blue-500" />
        )}
        <div
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${bg}`}
        >
          {icon}
        </div>
        <div className="flex-grow">
          <p className="text-sm text-slate-500">{category}</p>
          <p className="font-semibold text-slate-800">{title}</p>
        </div>
        <div className="text-xs text-slate-400">{time}</div>
      </div>
    </Link>
  );
}

// ---------- Page Component ----------
export default function Notification() {
  const [activeTab, setActiveTab] = useState("전체");
  const tabs = ["전체", "팀", "멘토링", "학업"];

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: "팀",
      title: "새로운 팀 프로젝트 초대가 있습니다.",
      time: "2시간 전",
      read: false,
      link: "/team-project",
    },
    {
      id: 2,
      category: "멘토링",
      title: "멘토링 세션이 30분 후에 시작됩니다.",
      time: "3시간 전",
      read: false,
      link: "#",
    },
    {
      id: 3,
      category: "학업",
      title: "'소프트웨어 공학' 과제가 내일 마감입니다.",
      time: "1일 전",
      read: true,
      link: "#",
    },
    {
      id: 4,
      category: "팀",
      title: "팀원이 '요구사항 명세서'를 업데이트했습니다.",
      time: "2일 전",
      read: true,
      link: "/team-project",
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(
    (notification) => activeTab === "전체" || notification.category === activeTab
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">알림</h1>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              모두 읽음
            </button>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              label={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                {...notification}
                onClick={() => handleMarkAsRead(notification.id)}
              />
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-500">
                '{activeTab}' 카테고리에 대한 알림이 없습니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
