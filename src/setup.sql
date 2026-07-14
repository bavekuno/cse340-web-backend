#comments :creating the organization table and inserting sample data
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
	description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


SELECT * FROM organization;


#comments :creating the projects table and inserting sample data
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO projects (organization_id, title, description, location, date)
VALUES
(2, 'Street Sweeping', 'Help sweep the streets of downtown', 'Central Park', '01-01-2020'),
(1, 'Home Repair for Seniors', 'Organize volunteer teams to perform minor home repairs, install safety features, and improve accessibility for elderly homeowners.', 'Shady Acres retirement home', '04-11-2023'),
(1, 'Community Playground Build', 'Partner with local schools or parks to design and construct a safe, inclusive playground for children.', 'Grace Charity Park', '04-11-2023'),
(1, 'Affordable Housing Renovation', 'Renovate vacant or aging homes for low-income families, veterans, or individuals transitioning out of homelessness.', 'Corner of 6th and Main', '04-11-2023'),
(1, 'School Improvement Weekend', 'Repair classrooms, paint buildings, build outdoor learning spaces, and improve school facilities before the new school year.', 'Albert Elementary School', '04-11-2023'),
(1, 'Disaster Recovery Assistance', 'Mobilize volunteers to help rebuild homes and community facilities after storms, floods, or wildfires.', '223 Wingsley Avenue', '04-11-2023'),
 
(2, 'Community Garden Initiative', 'Create and maintain community gardens that provide fresh produce and educational opportunities for local residents.', 'Viridian Community Park', '04-11-2023'),
(2, 'Food Bank Harvest Days', 'Grow and donate fresh fruits and vegetables to local food banks, shelters, and soup kitchens.', '254 Bishops Muse', '04-11-2023'),
(2, 'Tree Planting and Urban Greening', 'Organize neighborhood tree-planting events to improve air quality and beautify public spaces.', '1011 Central Ave', '04-11-2023'),
(2, 'Youth Agriculture Education Program', 'Teach children and teens about sustainable farming, gardening, composting, and healthy eating through hands-on workshops.', 'Albert Elementary School', '04-11-2023'),
(2, 'Pollinator Habitat Restoration', 'Plant native flowers and establish habitats that support bees, butterflies, and other important pollinators.', 'Bumblebee Sanctuary', '04-11-2023'),
 
(3, 'Neighborhood Clean-Up Campaign', 'Coordinate volunteers to clean parks, streets, rivers, and public spaces while promoting environmental stewardship.', '5th street and Maple', '04-11-2023'),
(3, 'Senior Companion Program', 'Match volunteers with older adults for regular visits, errands, technology assistance, and companionship.', 'Shady acres Retirement Home', '04-11-2023'),
(3, 'School Supply Drive', 'Collect backpacks, notebooks, and classroom supplies for students and teachers in underserved communities.', 'Albert Elementary School', '04-11-2023'),
(3, 'Community Meal Service', 'Prepare and distribute nutritious meals to individuals experiencing homelessness or food insecurity.', '666 Jack Drive', '04-11-2023'),
(3, 'Kindness in Action Week', 'Host a week of daily service projects including blood drives, clothing donations, literacy tutoring, park beautification, and care package assembly.', 'Charity Grace Community Park', '04-11-2023');
 
SELECT * FROM projects;
