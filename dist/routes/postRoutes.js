"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
router
    .route('/')
    .get(postController_1.getAllPosts)
    .post(postController_1.addPost);
router
    .route('/:id')
    .get(postController_1.getPostController)
    .patch(postController_1.updatePostController)
    .delete(postController_1.deletePostController);
exports.default = router;
//# sourceMappingURL=postRoutes.js.map