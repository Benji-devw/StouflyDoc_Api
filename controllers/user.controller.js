const UserSchema = require('../models/user.model');
const passwordHash = require("password-hash");
const config = require("../config/auth.config");
const sign = require('jwt-encode');



exports.register = async (req, res) => {
    // console.log('reqBody.....', req.body)
    const { name, email, password, status } = req.body;

    const nameCheck = await UserSchema.find({name: name})
    const emailCheck = await UserSchema.find({email: email})
    // console.log(nameCheck.length);

    // if (req.body.status != "Active") {
    //     return res.status(401).send({
    //       message: "Pending Account. Please Verify Your Email!",
    //     });
    //   }

    const token = sign({email: email}, config.secret)

    const user = new UserSchema({
        name: name,
        email: email,
        password: passwordHash.generate(password),
        confirmationCode: token
    });

    await user.save()
    .then(() => {
        res.status(201).json({
            message: "User registred !",
        })
    }) 
    .catch( err => {

        if (nameCheck.length >= 1) {
            res.status(422).send({ message: 'Nom déjà utilisé !' })
            return;
        } 
        else if (emailCheck.length >= 1) { 
            res.status(422).send({ message: 'Email déjà utilisé !' })
            return;
        } else { 
            res.status(500).send(err) 
        };  
    });


}





exports.login = async (req, res) => {
    // console.log('reqBody.....', req.body)
    const { email, password, status } = req.body;


    await UserSchema.findOne({  email: email })
        .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "Email non trouvé !" });
        }

        const passwordIsValid = user.authenticate(password)

        if (!passwordIsValid) {
            return res.status(401).send({
            accessToken: null,
            message: "Passwors invalid !",
            });
        }

        if (user.status != "Active") {
            return res.status(401).send({
            message: "Pending Account. Please Verify Your Email!",
            });
        }

        const token = sign({ id: user._id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            accessToken: token,
            status: user.status,
        });
    });
};



exports.getUser = async (req, res) => {
    // console.log(req.body);
    UserSchema.find({}, function (err, users) {
        // console.log('users', users)
        if (err){
             return res.status(401).json({
             success: false, 
             error: 'Users Not found'
        })}

        return res.status(200).send({ success: true, data: users })
   });
}