import { showOrganizationDetailsPage, showNewOrganizationPage, createNewOrganization } from './controllers/organizations.js';

import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';



const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for projects details page
router.get("/project/:id", showProjectDetailsPage);

// Route for new organization form page
router.get('/new-organization', showNewOrganizationPage);

// Route for creating a new organization
router.post('/new-organization', createNewOrganization);

export default router;