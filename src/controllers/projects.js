

import {
    getUpcomingProjects,
    getProjectDetails
} from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;


const showProjectsPage = async (req, res, next) => {
    try {

        const projects =
            await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

        res.render("projects", {
            title: "Upcoming Service Projects",
            projects
        });

    } catch (error) {
        next(error);
    }
};


const showProjectDetailsPage = async (req, res, next) => {

    try {

        const id = req.params.id;

        const project =
            await getProjectDetails(id);

        res.render("project", {
            title: project.title,
            project
        });

    } catch (error) {
        next(error);
    }

};


export {
    showProjectsPage,
    showProjectDetailsPage
};