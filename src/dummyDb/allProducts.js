// id, name, description, price, img, category_id

const allProducts = [
    {
        id: 1,
        name: "Burger",
        description: "This is a burger This is a burger This is a burger This is a burger. This is a burger. ",
        price: 10,
        img: "https://www.allrecipes.com/thmb/RTo6ddljby-5lAszPdMRwQ-aVh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19863best-burger-everFranceC4x3-c9c7d5cae40b4a58a110a33e04b531d1.jpg",
        category_id: 1
    },
    {
        id: 2,
        name: "Pizza",
        description: "This is a pizza",
        price: 20,
        img: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
        category_id: 1
    },
    {
        id: 3,
        name: "Pasta",
        description: "This is a pasta",
        price: 15,
        img: "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_3607,h_3607,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg",
        category_id: 1
    },
    {
        id: 11,
        name: "Burger",
        description: "This is a burger This is a burger This is a burger This is a burger. This is a burger. ",
        price: 10,
        img: "https://www.allrecipes.com/thmb/RTo6ddljby-5lAszPdMRwQ-aVh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19863best-burger-everFranceC4x3-c9c7d5cae40b4a58a110a33e04b531d1.jpg",
        category_id: 1
    },
    {
        id: 12,
        name: "Pizza",
        description: "This is a pizza",
        price: 20,
        img: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
        category_id: 1
    },
    {
        id: 13,
        name: "Pasta",
        description: "This is a pasta",
        price: 15,
        img: "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_3607,h_3607,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg",
        category_id: 1
    },
    {
        id: 21,
        name: "Burger",
        description: "This is a burger This is a burger This is a burger This is a burger. This is a burger. ",
        price: 10,
        img: "https://www.allrecipes.com/thmb/RTo6ddljby-5lAszPdMRwQ-aVh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19863best-burger-everFranceC4x3-c9c7d5cae40b4a58a110a33e04b531d1.jpg",
        category_id: 1
    },
    {
        id: 22,
        name: "Pizza",
        description: "This is a pizza",
        price: 20,
        img: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
        category_id: 1
    },
    {
        id: 23,
        name: "Pasta",
        description: "This is a pasta",
        price: 15,
        img: "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_3607,h_3607,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg",
        category_id: 1
    },
    {
        id: 31,
        name: "Burger",
        description: "This is a burger This is a burger This is a burger This is a burger. This is a burger. ",
        price: 10,
        img: "https://www.allrecipes.com/thmb/RTo6ddljby-5lAszPdMRwQ-aVh0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/19863best-burger-everFranceC4x3-c9c7d5cae40b4a58a110a33e04b531d1.jpg",
        category_id: 1
    },
    {
        id: 32,
        name: "Pizza",
        description: "This is a pizza",
        price: 20,
        img: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
        category_id: 1
    },
    {
        id: 33,
        name: "Pasta",
        description: "This is a pasta",
        price: 15,
        img: "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_3607,h_3607,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg",
        category_id: 1
    },
    {
        id: 4,
        name: "Coke",
        description: "This is a coke",
        price: 5,
        img: "https://via.placeholder.com/150",
        category_id: 2
    },
    {
        id: 5,
        name: "Pepsi",
        description: "This is a pepsi",
        price: 5,
        img: "https://via.placeholder.com/150",
        category_id: 2
    },
    {
        id: 6,
        name: "Fanta",
        description: "This is a fanta",
        price: 5,
        img: "https://via.placeholder.com/150",
        category_id: 2
    },
    {
        id: 7,
        name: "French Fries",
        description: "This is a french fries",
        price: 5,
        img: "https://via.placeholder.com/150",
        category_id: 3
    },
    {
        id: 8,
        name: "Onion Rings",
        description: "This is a onion rings",
        price: 5,
        img: "https://via.placeholder.com/150",
        category_id: 3
    },
    {
        id: 9,
        name: "Chicken Wings",
        description: "This is a chicken wings",
        price: 5,
        img: "https://via.placeholder.com/150",
        category_id: 3
    }
];

const getProducts = (category_id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filteredProducts = allProducts.filter((product) => product.category_id === category_id);
            resolve(filteredProducts);
        }, 10); 
    });
};

export default getProducts;
