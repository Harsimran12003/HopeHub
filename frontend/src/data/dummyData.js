export const dummyNGOs = [
    { id: 'ngo1', name: 'Charity Shield', location: 'New Delhi', contact: 'ngo1@mail.com', active: true, username: 'charity.admin' },
    { id: 'ngo2', name: 'Green Hope Foundation', location: 'Mumbai', contact: 'ngo2@mail.com', active: true, username: 'green.hope' },
    { id: 'ngo3', name: 'Kolkata Kids Care', location: 'Kolkata', contact: 'ngo3@mail.com', active: false, username: 'kkc.admin' },
    { id: 'ngo4', name: 'Pune Helping Hands', location: 'Pune', contact: 'ngo4@mail.com', active: true, username: 'punehh' },
    { id: 'ngo5', name: 'The Silent Angels', location: 'Chennai', contact: 'ngo5@mail.com', active: true, username: 'angels' },
    { id: 'ngo6', name: 'Rural Upliftment Trust', location: 'Bangalore', contact: 'ngo6@mail.com', active: true, username: 'rural.ut' },
];

export const dummyDonations = [
    { id: 'd1', item: 'Winter Clothes', donorId: 'u1', donorName: 'Alice Johnson', pickupLocation: 'H-45, Sector 15', status: 'Delivered', assignedNGOId: 'ngo2' },
    { id: 'd2', item: '10 Books', donorId: 'u2', donorName: 'Bob Smith', pickupLocation: 'A-101, Central Apt.', status: 'Pending', assignedNGOId: null },
    { id: 'd3', item: 'Used Laptop', donorId: 'u3', donorName: 'Charlie Brown', pickupLocation: '3rd Floor, Tech Park', status: 'In-progress', assignedNGOId: 'ngo4' },
    { id: 'd4', item: 'Kitchen Utensils', donorId: 'u1', donorName: 'Alice Johnson', pickupLocation: 'H-45, Sector 15', status: 'Delivered', assignedNGOId: 'ngo1' },
    { id: 'd5', item: 'Non-Perishable Food', donorId: 'u4', donorName: 'Diana Prince', pickupLocation: 'Farmhouse, Outer Ring', status: 'Pending', assignedNGOId: null },
    { id: 'd6', item: 'Old Toys', donorId: 'u5', donorName: 'Eve Adams', pickupLocation: 'E-70, Main Street', status: 'In-progress', assignedNGOId: 'ngo5' },
    { id: 'd7', item: 'Medical Supplies', donorId: 'u6', donorName: 'Frank Miller', pickupLocation: 'Clinic Near Park', status: 'Pending', assignedNGOId: null },
];

export const dummyUsers = [
    { id: 'u1', name: 'Alice Johnson', email: 'alice@mail.com', registeredOn: '2025-01-10', status: 'Active', totalDonations: 2 },
    { id: 'u2', name: 'Bob Smith', email: 'bob@mail.com', registeredOn: '2025-02-20', status: 'Active', totalDonations: 1 },
    { id: 'u3', name: 'Charlie Brown', email: 'charlie@mail.com', registeredOn: '2025-03-01', status: 'Active', totalDonations: 1 },
    { id: 'u4', name: 'Diana Prince', email: 'diana@mail.com', registeredOn: '2025-04-15', status: 'Active', totalDonations: 1 },
    { id: 'u5', name: 'Eve Adams', email: 'eve@mail.com', registeredOn: '2025-05-22', status: 'Blocked', totalDonations: 1 },
    { id: 'u6', name: 'Frank Miller', email: 'frank@mail.com', registeredOn: '2025-06-05', status: 'Active', totalDonations: 1 },
    { id: 'u7', name: 'Grace Hall', email: 'grace@mail.com', registeredOn: '2025-07-11', status: 'Active', totalDonations: 0 },
];

export const adminProfile = {
    username: 'admin',
    email: 'admin@gmail.com',
    role: 'Administrator'
}