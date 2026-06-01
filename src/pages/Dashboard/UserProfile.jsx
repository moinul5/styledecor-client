import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiMail, FiPhone, FiCalendar, FiShield, FiEdit2 } from "react-icons/fi";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-4 max-w-4xl mx-auto">
        <div className="skeleton h-8 w-40 rounded-xl mb-2"></div>
        <div className="skeleton h-[140px] rounded-t-3xl"></div>
        <div className="skeleton h-64 rounded-b-3xl"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="px-8 lg:px-12 py-10 max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-xs text-base-content/40 uppercase tracking-widest">
          <span>Dashboard</span>
          <span>›</span>
          <span className="text-base-content/70">My Profile</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl font-semibold font-serif mb-6 text-base-content">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="rounded-2xl overflow-hidden border border-base-content/10 bg-base-100 shadow-sm">

          {/* Cover */}
          <div
            className="relative h-36"
            style={{
              background:
                "linear-gradient(120deg, #7F77DD 0%, #AFA9EC 60%, #FAC775 100%)",
            }}
          >
            <button className="absolute top-4 right-4 flex items-center gap-2 bg-base-100 hover:bg-base-200 transition-colors border border-base-content/15 text-base-content text-sm font-medium px-4 py-2 rounded-xl shadow-sm">
              <FiEdit2 size={14} />
              Edit profile
            </button>
          </div>

          {/* Body */}
          <div className="px-6 lg:px-8 pb-8 bg-base-100">

            {/* Identity Row — avatar overlaps cover by 44px */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-11 mb-7">
              {/* Avatar */}
              <div
                className="w-[88px] h-[88px] rounded-full overflow-hidden border-[3px] border-base-100 bg-base-200 shrink-0 shadow"
                style={{ zIndex: 10, position: "relative" }}
              >
                <img
                  src={
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.displayName || "User"
                    )}&background=7F77DD&color=fff&size=88`
                  }
                  alt={user?.displayName || "User avatar"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + tagline — pushed down to align with bottom of avatar */}
              <div className="pb-1 pt-12 sm:pt-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-base-content">
                    {user?.displayName || "User"}
                  </h2>
                  <span
                    className="text-[11px] font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "#EEEDFE",
                      color: "#534AB7",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {dbUser?.role
                      ? dbUser.role.charAt(0).toUpperCase() + dbUser.role.slice(1)
                      : "User"}
                  </span>
                </div>
                <p className="text-sm text-base-content/50">
                  Welcome back. Review your account info and keep your contact
                  details up to date.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-base-content/10 mb-6" />

            {/* Info Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {/* Contact Information */}
              <div className="rounded-xl border border-base-content/10 bg-base-200/40 p-5">
                <p className="text-[11px] font-medium uppercase tracking-widest text-base-content/40 mb-4">
                  Contact information
                </p>

                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-center gap-3 py-3 border-b border-base-content/10">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#EEEDFE" }}
                    >
                      <FiMail size={16} style={{ color: "#534AB7" }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-base-content/40 mb-0.5">
                        Email address
                      </p>
                      <p className="text-sm font-medium text-base-content break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 py-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#EEEDFE" }}
                    >
                      <FiPhone size={16} style={{ color: "#534AB7" }} />
                    </div>
                    <div>
                      <p className="text-[11px] text-base-content/40 mb-0.5">
                        Phone number
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          dbUser?.phone
                            ? "text-base-content"
                            : "text-base-content/40"
                        }`}
                      >
                        {dbUser?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="rounded-xl border border-base-content/10 bg-base-200/40 p-5">
                <p className="text-[11px] font-medium uppercase tracking-widest text-base-content/40 mb-4">
                  Account details
                </p>

                <div className="space-y-3">
                  {/* Member Since */}
                  <div className="flex items-center gap-3 py-3 border-b border-base-content/10">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#EEEDFE" }}
                    >
                      <FiCalendar size={16} style={{ color: "#534AB7" }} />
                    </div>
                    <div>
                      <p className="text-[11px] text-base-content/40 mb-0.5">
                        Member since
                      </p>
                      <p className="text-sm font-medium text-base-content">
                        {dbUser?.createdAt
                          ? new Date(dbUser.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "Recently joined"}
                      </p>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="flex items-center gap-3 py-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#EEEDFE" }}
                    >
                      <FiShield size={16} style={{ color: "#534AB7" }} />
                    </div>
                    <div>
                      <p className="text-[11px] text-base-content/40 mb-0.5">
                        Account status
                      </p>
                      <p className="text-sm font-medium text-base-content flex items-center gap-1.5">
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ background: "#1D9E75" }}
                        />
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;