

// Import any needed model functions
import { getAllOrganizations, getOrganizationDetails, createOrganization } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    res.render('organization', { title, organizationDetails, projects });
};

// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
};

const showNewOrganizationPage = async (req, res) => {
    const title = 'Add New Organization';

    res.render('new-organization', { title });
};



const createNewOrganization = async (req, res, next) => {
    try {
        const { name, description, contactEmail, logoFilename } = req.body;

        await createOrganization(name, description, contactEmail, logoFilename || null);

        res.redirect('/organizations');
    } catch (error) {
        next(error);
    }
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationPage, createNewOrganization };