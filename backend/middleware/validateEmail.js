import {body, validationResult} from 'express-validator'


export const validateEmail = [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const validateRequest = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

//validateEmail does not need next() because express-validator automatically processes it internally
// Only validateRequest needs next() because it explicitly checks errors and decides the request flow.


    

