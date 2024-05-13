import express from "express";
import userUseCases from "../../../useCases/user/index.js";

import {validateUserSchema} from "../../../validators/user-validators.js";
import { validate } from "../../../validators/validate.js";

export const userRoutes = express.Router();

userRoutes.get('/list', async(req, res) => {
    const users = await userUseCases.users(req.body);
    return res.status(201).json({
        users: users
    })
});

userRoutes.get('/:id', async(req, res) => {
    const user = await userUseCases.user(req.params);
    return res.status(201).json({
        user: user
    })
});

userRoutes.post('/create', async(req, res) => {
    try {
        await validate(validateUserSchema(), req.body.user);
        const user = await userUseCases.createUser(req.body);
        return res.status(201).json({
            message: 'User created Successfully',
            result: user
        })
    }catch(err) {
        return res.status(401).json(err)
    }
});

userRoutes.post('/update', async(req, res) => {
    await validate(validateUserSchema(), req.body.user);
    const user = await userUseCases.updateUser(req.body);
    return res.status(201).json({
        message: 'User updated Successfully',
        result: user
    })
});

userRoutes.post('/delete', async(req, res) => {
    const user = await userUseCases.deleteUser(req.body);
    return res.status(201).json({
        message: 'User deleted Successfully',
        result: user
    })
});

userRoutes.post('/disabled', async(req, res) => {
    const user = await userUseCases.disableUser(req.body);
    return res.status(201).json({
        message: 'User disabled Successfully',
        result: user
    })
});

userRoutes.post('/enable', async(req, res) => {
    const user = await userUseCases.enableUser(req.body);
    return res.status(201).json({
        message: 'User enabled Successfully',
        result: user
    })
});
