const express = require('express');
const router = express.Router();
import { getRepository } from 'typeorm';
import { NguoiDung } from '../entity/NguoiDung';
const nguoiDungRepository = getRepository(NguoiDung);

router.post('/DangKy', async (req, res) => {
    const user = await nguoiDungRepository.create(req.body);
    try {
        const newUser = await nguoiDungRepository.save(user);
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

const jwt = require('jsonwebtoken');

router.post('/token', async (req, res) => {
    if(req.body.taiKhoan="zerocool") {
        if(req.body.matKhau="zerocool") {
            const payload = {
                check: true
            }
            
            var token = jwt.sign(payload, 'zerocool', {
                expiresIn: 1440 // expire in 24 hours
            });

            res.json({
                message: 'authentication done!',
                token
            });
        } else {
            res.json({message: "please check your password!"})
        }
    } else {
        res.json({message: "taiKhoan not found !"})
    }
});

const ProtectedRoutes = express.Router();

router.use('/token', ProtectedRoutes);
ProtectedRoutes.use((req, res, next) => {
    let token = req.headers['access-token'];

    if(token) {
        jwt.verify(token, "zerocool", (err, decoded) => {
            if(err) {
                return res.json({message: 'anh dung co che'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.send({ message: 'No token provided.'});
    }
});

ProtectedRoutes.get('/LayDanhSachNguoiDun', async (req, res) => {
    try {
        const users = await nguoiDungRepository.find();
        res.json(users);
    } catch(err) {
        res.json({ message: err.message });
    }
});

router.post("/DangNhap", async (req, res, next) => {
    try {
        const findUser = await nguoiDungRepository.findOne({ where: req.body });
        if(findUser) {
            res.status(200).json(findUser);
        } else {
            res.status(500).json({ message: "tai khoan hoac mat khau khong dung!"});
        }
    } catch(err) {
        res.json({ message: err.message });
    }
});

router.get('/LayDanhSachNguoiDung', async (req, res) => {
    try {
        const users = await nguoiDungRepository.find();
        res.json(users);
    } catch(err) {
        res.json({ message: err.message });
    }
});

router.post('/ThemNguoiDung', async (req, res) => {
    const user = await nguoiDungRepository.create(req.body);
    try {
        const newUser = await nguoiDungRepository.save(user);
        res.status(201).json(newUser);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;