const express = require("express");
import homeController from "../controller/homeController";
import userController from "../controller/userController"
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/home", homeController.getHomePage);
  router.get("/getcrud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD); // Sửa thành phương thức POST
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.GetEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  //bắt đầu tạo 1 api 
  router.post("/api/login", userController.handleLogin); //api login
  app.use("/", router);
};

module.exports = initWebRoutes;
