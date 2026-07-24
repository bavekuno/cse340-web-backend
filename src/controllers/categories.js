// Import model functions
import {
    getAllCategories,
    getCategoryById,
    getProjectsByCategoryId
} from '../models/categories.js';

// Categories page
const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Service Categories';

        res.render('categories', {
            title,
            categories
        });
    } catch (error) {
        next(error);
    }
};

// Category Details page
const showCategoryDetailsPage = async (req, res, next) => {

    try {
        const categoryId = req.params.id;

        const category = await getCategoryById(categoryId);

        const projects = await getProjectsByCategoryId(categoryId);

        const title = 'Category Details';

        res.render('category', {
            title,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
};

// Export controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage
};