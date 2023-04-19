import AdminUserSchema from "./AdminUserSchema.js";

// Insert Admin User
export const addAdminUser = (obj) => {
  return AdminUserSchema(obj).save();
};
