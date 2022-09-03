

let express = require("express");
const router = express.Router();
import {Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
let bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

router.post('/register', async (req: Request, res: Response) => {
    let user = await prisma.user.create({
        data: {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        }
    })

    res.send({
        id: user.id,
        email: user.email
    })
})

router.post('/signin', async (req: Request, res: Response) => {
    await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    }).then((user) =>{
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    id: user.id,
                    email: user.email,
                    //token add later
                })
            } else {
                res.send("error")
            }
        }
    })
    .catch((err: any) => {
        console.log(err)
    })
})

module.exports = router;