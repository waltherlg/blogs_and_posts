"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = exports.nameValidation = void 0;
const express_validator_1 = require("express-validator");
exports.nameValidation = (0, express_validator_1.body)('name')
    .exists().bail().withMessage({ "message": "name not exist", "field": "name" })
    .notEmpty().withMessage({ "message": "name is empty", "field": "name" }).bail()
    .trim().bail().withMessage({ "message": "name is not string", "field": "name" })
    .isLength({ max: 15 }).bail().withMessage({ "message": "wrong length name", "field": "name" });
const inputValidationMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let errorsMessages = { errorsMessages: errors.array().map(x => {
                return x.msg;
            }) };
        return res.status(400).json(errorsMessages);
        // const  errors = validationResult(req).array({onlyFirstError: true}).map((item) => {
        //     return{massage:"incorrect input",field:item.param}
        // })
        // if (errors.length){
        //         let errorsMessages = ({errorsMessages: errors})
        //         return res.status(400).send(errorsMessages)
        // let errorsMessages = ({errorsMessages: errors.array().map( x => {
        //     return x.msg
        //     }
        //     )})
        //return res.status(400).send(errorsMessages)
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
