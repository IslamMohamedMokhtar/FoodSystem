const pass = encodeURIComponent('NChb4ILm3cKutrsK');
const dbURI = `mongodb+srv://enislammohamed:${pass}@cluster0.hgs31oy.mongodb.net/foodSystem?retryWrites=true&w=majority`;
const userRoleEnum ={
    Admin: "admin",
    Customer: "customer"
    }
const bookingStatusEnum = {
    Pending: "pending",
    Rejected: "rejected",
    Accepted: "accepted"
}
const menuTypeEnum = {
    Breakfast: "breakfast",
    MainDish: "mainDish",
    Drinks: "drinks",
    Desserts: "desserts"
}
const authErrors = { email: '', password: '', userRole: '', token: ''};   
const menuErrors = {name:'', price:'', description:'', createdBy:''};
const bookingErrors = {customerName:'', customerPhone:'', bookedTime:'', bookedDate:'', totalPerson:'', createdBy:'', bookingStatus:'', acceptedBy:''};
const profileErrors = {userId:'', userName:'', userProfilePicUrl:''}

module.exports={
    dbURI,
    userRoleEnum,
    authErrors,
    menuErrors,
    bookingStatusEnum,
    bookingErrors,
    profileErrors,
    menuTypeEnum
}