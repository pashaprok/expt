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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = exports.getAllPosts = void 0;
const db_1 = __importDefault(require("../db/db"));
function getAllPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield db_1.default.query('SELECT * FROM post;');
        return res.status(200).json({
            status: 'success',
            results: posts.rows.length,
            data: {
                data: posts.rows,
            },
        });
    });
}
exports.getAllPosts = getAllPosts;
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const p = req.body;
        p.posted = new Date();
        let newPost;
        if (p.author) {
            newPost = yield db_1.default.query('INSERT INTO post (title, content, posted, author) values ($1, $2, $3, $4) returning id;', [p.title, p.content, p.posted, p.author]);
        }
        else {
            newPost = yield db_1.default.query('INSERT INTO post (title, content, posted) values ($1, $2, $3) returning id;', [p.title, p.content, p.posted]);
        }
        const post = yield db_1.default.query('SELECT * FROM post WHERE id = $1;', [newPost.rows[0].id]);
        const [data] = post.rows;
        return res.status(200).json({
            status: 'success',
            data: {
                data,
            },
        });
    });
}
exports.createPost = createPost;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const post = yield db_1.default.query('SELECT * FROM post WHERE ID = $1;', [id]);
        const data = post.rows[0];
        return res.status(200).json({
            status: 'success',
            data: {
                data,
            },
        });
    });
}
exports.getPost = getPost;
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const p = req.body;
        yield db_1.default.query('UPDATE post SET title=$1, content=$2 WHERE ID=$3;', [p.title, p.content, id]);
        const post = yield db_1.default.query('SELECT * FROM post WHERE id = $1;', [id]);
        const data = post.rows[0];
        return res.status(200).json({
            status: 'success',
            data: {
                data,
            },
        });
    });
}
exports.updatePost = updatePost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        yield db_1.default.query('DELETE FROM post WHERE ID = $1;', [id]);
        return res.status(200).json({
            status: 'success',
        });
    });
}
exports.deletePost = deletePost;
//# sourceMappingURL=postController.js.map