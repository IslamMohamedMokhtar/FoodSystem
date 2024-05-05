export const baseUrl = "http://localhost:3001";
export const logInUrl = `${baseUrl}/login`; 
export const signOutUrl = `${baseUrl}/signout`;
export const signUpUrl = `${baseUrl}/signup`;
export const menuUrl = `${baseUrl}/menus`;
export const getCurentUserUrl = `${baseUrl}/user/getCurentUser`;
export const bookingsUrl = `${baseUrl}/bookings`;
export const profileUrl = `${baseUrl}/profile`;
export const pictureUrl = `${baseUrl}/picture`;
export const userUrl = `${baseUrl}/user`;
export const minPaginationSize = 20;
export const userRoleEnum = {
    Admin: "admin",
    Customer: "customer"
    };
export const bookingStatusEnum = {
    Pending: "pending",
    Rejected: "rejected",
    Accepted: "accepted"
}
export const menuTypeEnum = {
    Breakfast: "breakfast",
    MainDish: "mainDish",
    Drinks: "drinks",
    Desserts: "desserts"
}