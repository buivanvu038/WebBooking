import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal Server Error');
    }
};

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
};

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
};

let postCRUD = async (req, res) => {
    try {
        let message = await CRUDService.createNewUser(req.body);
        console.log(message);
        return res.send('Post CRUD from server');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

let displayGetCRUD = async (req, res) => {
    try {
        let data = await CRUDService.getAllUser();
        console.log('-------------------------------------');
        console.log(data);
        console.log('-------------------------------------');
        return res.render('displayCRUD.ejs', {
            dataTable: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

let getEditCRUD = async (req, res) => {
    try {
        let userId = req.query.id;
        if (userId) {
            let userData = await CRUDService.getUserInfoById(userId);
            return res.render('editCRUD.ejs', {
                user: userData
            });
        } else {
            return res.send('User not found');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

let putCRUD = async (req, res) => {
    try {
        let data = req.body;
        let allUsers = await CRUDService.updateUserData(data);
        return res.render('displayCRUD.ejs', {
            dataTable: allUsers
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

let deleteCRUD = async (req, res) => {
    try {
        let id = req.query.id;
        if (id) {
            await CRUDService.deleteUserById(id);
            return res.send('Delete user succeed');
        } else {
            return res.send('User not found');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
};
