const defaultModal = require('../Models/DefaultModel');

const getImages = async (req, res) => {
    try {
        const BannerImagesModal = defaultModal.BannerImages;
        const images = await BannerImagesModal.find();
        if(images) {
            const BannerImages = [];
            images.map((image) => {
                BannerImages.push(image.Image);
            });
            return res.status(200).json(BannerImages);
        }
        res.status(404).json({message: "No Images found"});
    }
    catch(e){
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const getCategories = async (req, res) => {
    try {
        const CategoryModal = defaultModal.Categories;
        const category = await CategoryModal.find();
        if(category) {
            return res.status(200).json(category);
        }
        res.status(404).json({message: "No Categories found"});
    }
    catch(e){
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const getCategoryNames = async (req, res) => {
    try {
        const CategoryModal = defaultModal.Categories;
        const category = await CategoryModal.find().sort({index: 1});
        if(category) {
            const categoryList = [];
            category.map((ctor) => {
                categoryList.push(ctor.name);
            });
            return res.status(200).json(categoryList);
        }
        res.status(404).json({message: "No Categories found"});
    }
    catch(e){
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}

const getbannerImage = async (req, res) => {
    try {
        const CategoryModal = defaultModal.Categories;
        const category = await CategoryModal.find().sort({index: 1});
        if(category) {
            const bannerImages = [];
            category.map((ctor) => {
                bannerImages.push(ctor.bannerImage);
            });
            return res.status(200).json(bannerImages);
        }
        res.status(404).json({message: "No Categories found"});
    }
    catch(e){
        console.log(e.message);
        res.status(400).json({message: 'Internal Server Error'});
    }
}


module.exports = {
    getImages,
    getCategories,
    getCategoryNames,
    getbannerImage,
}