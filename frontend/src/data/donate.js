// src/data/donate.js
import bright from "../assets/bright.jpeg";
import brightfuture from "../assets/brightfuture.png";
import caringhands from "../assets/caringhands.jpeg";
import givinghands from "../assets/givinghands.png";
import golden from "../assets/golden.jpeg";
import hopecircle from "../assets/hopecircle.png";
import hopeforall from "../assets/hopeforall.png";
import hopeHappiness from "../assets/hopeHappiness.png";
import joyfull from "../assets/joyfull.jpeg";
import kindness from "../assets/kindness.png";
import rainbow from "../assets/rainbow.png";
import shiningstars from  "../assets/shiningstars.jpeg";
import smile from "../assets/smile.jpeg";
import sunshine from "../assets/sunshine.png";
import togetherwecan from "../assets/togetherwecan.jpeg";

const donateNGOs = [
  {
    id: 1,
    name: "Sunshine Foundation",
    image: sunshine,
    description: "Helping children in need with daily essentials.",
    contact: "+91 9876543210",
    address: "123, Main Street, Delhi",
    population: { kids: 40, oldAge: 10, total: 50 },
    requirements: [
      { item: "Food", quantity: "100 kg" },
      { item: "Clothes", quantity: "150 pieces" },
      { item: "Stationary", quantity: "50 sets" },
      { item: "Other Goods", quantity: "Toys, Blankets" },
    ],
  },
  {
    id: 2,
    name: "Hope for All",
    image: hopeforall,
    description: "Supporting local families and children with essential goods.",
    contact: "+91 9123456780",
    address: "456, Park Avenue, Mumbai",
    population: { kids: 30, oldAge: 20, total: 50 },
    requirements: [
      { item: "Food", quantity: "80 kg" },
      { item: "Clothes", quantity: "120 pieces" },
      { item: "Stationary", quantity: "40 sets" },
      { item: "Other Goods", quantity: "Toys, Hygiene Kits" },
    ],
  },
  {
    id: 3,
    name: "Smile NGO",
    image: smile,
    description: "Spreading joy through small events and gatherings.",
    contact: "+91 9988776655",
    address: "789, Lake Road, Bangalore",
    population: { kids: 25, oldAge: 15, total: 40 },
    requirements: [
      { item: "Food", quantity: "60 kg" },
      { item: "Clothes", quantity: "100 pieces" },
      { item: "Stationary", quantity: "30 sets" },
      { item: "Other Goods", quantity: "Books, Toys" },
    ],
  },
  {
    id: 4,
    name: "Bright Hearts",
    image: bright,
    description: "Organizing community gatherings and birthday celebrations.",
    contact: "+91 9001004004",
    address: "10, Rose Street, Pune",
    population: { kids: 35, oldAge: 5, total: 40 },
    requirements: [
      { item: "Food", quantity: "90 kg" },
      { item: "Clothes", quantity: "130 pieces" },
      { item: "Stationary", quantity: "45 sets" },
      { item: "Other Goods", quantity: "Games, Toys" },
    ],
  },
  {
    id: 5,
    name: "Kindness Hub",
    image: kindness,
    description: "Helping NGOs celebrate special occasions with children and elders.",
    contact: "+91 9012345678",
    address: "22, Lake View, Hyderabad",
    population: { kids: 20, oldAge: 10, total: 30 },
    requirements: [
      { item: "Food", quantity: "50 kg" },
      { item: "Clothes", quantity: "70 pieces" },
      { item: "Stationary", quantity: "25 sets" },
      { item: "Other Goods", quantity: "Toys, Blankets" },
    ],
  },
  {
    id: 6,
    name: "Golden Smile Foundation",
    image: golden,
    description: "Celebrations for orphanages and community events.",
    contact: "+91 9123456789",
    address: "45, Park Lane, Chennai",
    population: { kids: 40, oldAge: 15, total: 55 },
    requirements: [
      { item: "Food", quantity: "120 kg" },
      { item: "Clothes", quantity: "160 pieces" },
      { item: "Stationary", quantity: "60 sets" },
      { item: "Other Goods", quantity: "Toys, Books" },
    ],
  },
  {
    id: 7,
    name: "Hope Circle",
    image: hopecircle,
    description: "Creating joyful moments for underprivileged children.",
    contact: "+91 9234567890",
    address: "78, Oak Street, Kolkata",
    population: { kids: 50, oldAge: 5, total: 55 },
    requirements: [
      { item: "Food", quantity: "140 kg" },
      { item: "Clothes", quantity: "180 pieces" },
      { item: "Stationary", quantity: "70 sets" },
      { item: "Other Goods", quantity: "Toys, Games" },
    ],
  },
  {
    id: 8,
    name: "Rainbow Trust",
    image: rainbow,
    description: "Organizing colorful celebrations with our partner NGOs.",
    contact: "+91 9345678901",
    address: "12, Maple Avenue, Jaipur",
    population: { kids: 30, oldAge: 20, total: 50 },
    requirements: [
      { item: "Food", quantity: "80 kg" },
      { item: "Clothes", quantity: "120 pieces" },
      { item: "Stationary", quantity: "40 sets" },
      { item: "Other Goods", quantity: "Books, Toys" },
    ],
  },
  {
    id: 9,
    name: "Giving Hands",
    image: givinghands,
    description: "NGO dedicated to helping communities celebrate their milestones.",
    contact: "+91 9456789012",
    address: "56, Green Road, Surat",
    population: { kids: 25, oldAge: 15, total: 40 },
    requirements: [
      { item: "Food", quantity: "60 kg" },
      { item: "Clothes", quantity: "100 pieces" },
      { item: "Stationary", quantity: "30 sets" },
      { item: "Other Goods", quantity: "Toys, Blankets" },
    ],
  },
  {
    id: 10,
    name: "Joyful Hearts",
    image: joyfull,
    description: "Celebration programs for children, elders, and families.",
    contact: "+91 9567890123",
    address: "34, Blossom Street, Lucknow",
    population: { kids: 35, oldAge: 20, total: 55 },
    requirements: [
      { item: "Food", quantity: "100 kg" },
      { item: "Clothes", quantity: "140 pieces" },
      { item: "Stationary", quantity: "50 sets" },
      { item: "Other Goods", quantity: "Books, Toys" },
    ],
  },
  {
    id: 11,
    name: "Caring Hands",
    image: caringhands,
    description: "Events organized by NGOs to spread happiness in communities.",
    contact: "+91 9678901234",
    address: "67, Willow Lane, Ahmedabad",
    population: { kids: 20, oldAge: 10, total: 30 },
    requirements: [
      { item: "Food", quantity: "50 kg" },
      { item: "Clothes", quantity: "70 pieces" },
      { item: "Stationary", quantity: "25 sets" },
      { item: "Other Goods", quantity: "Toys, Blankets" },
    ],
  },
  {
    id: 12,
    name: "Together We Can",
    image: togetherwecan,
    description: "Partner NGOs create memorable celebrations for children and elders.",
    contact: "+91 9789012345",
    address: "89, Sunset Boulevard, Chandigarh",
    population: { kids: 40, oldAge: 15, total: 55 },
    requirements: [
      { item: "Food", quantity: "120 kg" },
      { item: "Clothes", quantity: "160 pieces" },
      { item: "Stationary", quantity: "60 sets" },
      { item: "Other Goods", quantity: "Books, Toys" },
    ],
  },
  {
    id: 13,
    name: "Hope & Happiness",
    image: hopeHappiness,
    description: "NGO-driven celebrations for meaningful causes.",
    contact: "+91 9890123456",
    address: "23, Horizon Street, Pune",
    population: { kids: 35, oldAge: 20, total: 55 },
    requirements: [
      { item: "Food", quantity: "100 kg" },
      { item: "Clothes", quantity: "140 pieces" },
      { item: "Stationary", quantity: "50 sets" },
      { item: "Other Goods", quantity: "Toys, Books" },
    ],
  },
  {
    id: 14,
    name: "Bright Future",
    image: brightfuture,
    description: "Celebration programs supporting children and communities.",
    contact: "+91 9901234567",
    address: "45, River Road, Bangalore",
    population: { kids: 30, oldAge: 20, total: 50 },
    requirements: [
      { item: "Food", quantity: "80 kg" },
      { item: "Clothes", quantity: "120 pieces" },
      { item: "Stationary", quantity: "40 sets" },
      { item: "Other Goods", quantity: "Books, Toys" },
    ],
  },
  {
    id: 15,
    name: "Shining Stars",
    image: shiningstars,
    description: "Helping NGOs organize special occasion celebrations for everyone.",
    contact: "+91 9012345678",
    address: "12, Star Avenue, Mumbai",
    population: { kids: 50, oldAge: 10, total: 60 },
    requirements: [
      { item: "Food", quantity: "150 kg" },
      { item: "Clothes", quantity: "200 pieces" },
      { item: "Stationary", quantity: "70 sets" },
      { item: "Other Goods", quantity: "Toys, Blankets, Books" },
    ],
  },
];

export default donateNGOs;
