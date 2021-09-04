const Users = require('../models/register');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const register = async (req, res) => {

    try {
        const emailExist = await Users.findOne({ where: { email: req.body.email } })
        if (emailExist) {
            res.status(400).json({ "error": 'Email already Exist' })

        }

        const salt = await bcrypt.genSalt(10);
        hashpassword = await bcrypt.hash(req.body.password, salt)

        let data = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: hashpassword
        });
        const payload = {
            id: data.id
        };
        jwt.sign(payload, "anystring", { expiresIn: '2d' }, function (err, token) {
            if (err) {
                res.send(err)
            }
            res.status(200).json({
                token,
                data
            })
        })
     
    } catch (error) {
        console.log(error)
        res.status(400).send(error)

    }

}


const login = async (req, res) =>{
    try {
        Users.findOne({where:{email:req.body.email}})
        .then(user =>{
            console.log(user.password)
            if(!user) return res.status(404).json({"error":"no email found"})
            else{
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    console.log(result)
                    if(err) return res.status(500).json(err)
                    else if (result) return res.status(200).json({"success":"login successfully"})
                    else return res.status(403).json({"error":"password do not match"})
                });
            }
        })
        
    } catch (error) {
        res.status(500).json(error)
        
    }
}

module.exports = {register,login};