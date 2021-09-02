"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostController = exports.updatePostController = exports.getPostController = exports.addPost = exports.getAllPosts = void 0;
const post_1 = require("../repositories/post");
function getAllPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, post_1.getPosts)();
        return res.status(200).json({
            status: 'success',
            data: result,
        });
    });
}
exports.getAllPosts = getAllPosts;
function addPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPost = req.body;
        newPost.posted = new Date();
        const response = yield (0, post_1.createPost)(newPost);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    });
}
exports.addPost = addPost;
function getPostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, post_1.getPost)(Number(req.params.id));
        if (!result)
            res.status(404).send({ message: "No post found" });
        return res.status(200).json({
            status: 'success',
            data: result,
        });
    });
}
exports.getPostController = getPostController;
function updatePostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, post_1.updatePost)(Number(req.params.id), req.body);
        if (!result)
            res.status(404).send({ message: "No post found" });
        return res.status(200).json({
            status: 'success',
            data: result,
        });
    });
}
exports.updatePostController = updatePostController;
function deletePostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, post_1.deletePost)(Number(req.params.id));
        return res.status(200).json({
            status: 'success'
        });
    });
}
exports.deletePostController = deletePostController;
//# sourceMappingURL=postController.js.map