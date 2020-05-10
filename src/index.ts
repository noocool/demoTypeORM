import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import { NguoiDung } from "./entity/NguoiDung";

createConnection({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "ngo",
    "password": "123456",
    "database": "e_learning",
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/entity/**/*.ts"
    ]}).then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // // register express routes from defined application routes
    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //         const result = (new (route.controller as any))[route.action](req, res, next);
    //         if (result instanceof Promise) {
    //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

    //         } else if (result !== null && result !== undefined) {
    //             res.json(result);
    //         }
    //     });
    // });

    const nguoiDungRepository = connection.getRepository(NguoiDung);

    // Router
    const nguoiDungRouter = require('./routes/NguoiDung');
    app.use('/', nguoiDungRouter);


    app.get('/lay-danh-sach', async function(req: Request, res: Response) {
        const users = await nguoiDungRepository.find();
        res.json(users);
    });




    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
