import { useEffect, useState } from "react";
import Select from "react-select";
import {
  getUsers,
  deleteUser,
  blockUser,
  unblockUser,
} from "../../services/userService";

import UserStatsCard from "./UserStatsCard";
import UserTable from "./UserTable";

const Users = () => {

  const [users,
    setUsers] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  const [search,
    setSearch] =
      useState("");

  const [statusFilter,
  setStatusFilter] =
    useState({
      value: "all",
      label: "All Users",
    });

const statusOptions = [
  {
    value: "all",
    label: "All Users",
  },
  {
    value: "active",
    label: "Active Users",
  },
  {
    value: "blocked",
    label: "Blocked Users",
  },
  {
    value: "admin",
    label: "Admins",
  },
];
  useEffect(() => {

    const fetchUsers =
      async () => {

        try {

          const data =
            await getUsers();

          setUsers(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchUsers();

  }, []);

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteUser(id);

        setUsers(
          users.filter(
            (user) =>
              user._id !== id
          )
        );

        alert(
          "User deleted successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );

      }
    };

  const handleBlock =
    async (id) => {

      try {

        await blockUser(id);

        setUsers(
          users.map(
            (user) =>
              user._id === id
                ? {
                    ...user,
                    status:
                      "blocked",
                  }
                : user
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  const handleUnblock =
    async (id) => {

      try {

        await unblockUser(id);

        setUsers(
          users.map(
            (user) =>
              user._id === id
                ? {
                    ...user,
                    status:
                      "active",
                  }
                : user
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  const filteredUsers =
    users.filter(
      (user) => {

        const matchesSearch =
          user.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          user.email
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        let matchesStatus =
  true;

if (
  statusFilter.value ===
  "active"
) {
  matchesStatus =
    user.status ===
    "active";
}

if (
  statusFilter.value ===
  "blocked"
) {
  matchesStatus =
    user.status ===
    "blocked";
}

if (
  statusFilter.value ===
  "admin"
) {
  matchesStatus =
    user.role ===
    "admin";
}
        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  const totalUsers =
    users.length;

  const activeUsers =
    users.filter(
      (user) =>
        user.status ===
        "active"
    ).length;

  const blockedUsers =
    users.filter(
      (user) =>
        user.status ===
        "blocked"
    ).length;

  const adminUsers =
    users.filter(
      (user) =>
        user.role ===
        "admin"
    ).length;

  if (loading) {
    return (
      <h2>
        Loading Users...
      </h2>
    );
  }

  return (
    <div>

      {/* Header */}

      <div
        style={{
          marginBottom:
            "24px",
        }}
      >

        <h1
          style={{
            fontSize:
              "34px",
            fontWeight:
              "700",
            marginBottom:
              "6px",
          }}
        >
          User Management
        </h1>

        <p
          style={{
            color:
              "#64748B",
          }}
        >
          Manage users and
          permissions
        </p>

      </div>

      {/* Stats */}

      <div
        style={{
          display:
            "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom:
            "25px",
        }}
      >

        <UserStatsCard
          title="Total Users"
          value={
            totalUsers
          }
          color="#3B82F6"
        />

        <UserStatsCard
          title="Active Users"
          value={
            activeUsers
          }
          color="#10B981"
        />

        <UserStatsCard
          title="Blocked Users"
          value={
            blockedUsers
          }
          color="#EF4444"
        />

        <UserStatsCard
          title="Admins"
          value={
            adminUsers
          }
          color="#F59E0B"
        />

      </div>

      {/* Search & Filter */}

      <div
     style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "20px",
          marginBottom: "24px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          boxShadow:
            "0 4px 20px rgba(15,23,42,0.05)",
        }}
      >

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        style={{
  minWidth: "380px",
  height: "52px",
  padding: "0 18px",
  border: "1.5px solid #CBD5E1",
  borderRadius: "14px",
  background: "#FFFFFF",
  fontSize: "15px",
  color: "#0F172A",
  outline: "none",
  transition: "all 0.3s ease",
  boxShadow:
    "0 2px 8px rgba(15,23,42,0.04)",
}}
        />

        <Select
  options={
    statusOptions
  }
  value={
    statusFilter
  }
  onChange={
    setStatusFilter
  }
  placeholder="Filter Users"
  styles={{
    control: (
      base
    ) => ({
      ...base,
      minHeight:
        "52px",
      borderRadius:
        "12px",
      borderColor:
        "#CBD5E1",
      minWidth:
        "220px",
    }),
  }}
/>
      </div>

      {/* Table */}

      <UserTable
        users={
          filteredUsers
        }
        onDelete={
          handleDelete
        }
        onBlock={
          handleBlock
        }
        onUnblock={
          handleUnblock
        }
      />

    </div>
  );
};

export default Users;