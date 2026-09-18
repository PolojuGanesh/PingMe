import express from "express";
import RegisterUser from "../controllers/controller.register.js";
import LoginUser from "../controllers/controller.login.js";
import ResetPassword from "../controllers/controller.reset.js";
import SearchUser from "../controllers/controller.search.js";
import AddToContact from "../controllers/controller.addToContact.js";
import GetAllContacts from "../controllers/controller.getAllContacts.js";
import DeleteChat from "../controllers/controller.deleteChat.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.delete("/delete-chat", DeleteChat);
router.patch("/reset-password", ResetPassword);
router.get("/search-user", SearchUser);
router.post("/add-to-contact", AddToContact);
router.post("/get-contacts", GetAllContacts);

export default router;
