const User = require('./models/user')
const Document = require('./models/document');

const create_user = async (req, res) => {
    console.log('creating');
    const username = req.body.name;
    const password = req.body.password;

    const user = await User.findOne({ name:username })
    

    console.log('user')
    const new_user = await User.create({
        name: username,
        password: password
    })
    new_user.save();
    res.json(new_user);

}

const share = async (req, res) => {
    const username = req.body.name;
    const groupId = req.body.group;

    const user = await User.findOne({name:username});

    if (user){
        const new_document = await Document.create({
            name: username,
            group: groupId
        });
        new_document.save();
        res.json(new_document);
    }
    else{
        res.status(400);
    }
}

module.exports = { share, create_user }