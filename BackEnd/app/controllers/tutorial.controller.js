const db = require('../models');
const Tutorial = db.tutorials;

//create and save a new tutorial
exports.create = (req, res) => {

    //validate request
    if(!req.body.title)
    {
        res.status(404).send({messsage : "Content cannot be empty!"});
        return;
    }

    //create tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    //save tutorial
    tutorial
    .save(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({messsage : err.message || "Some error occured while creating the recipe!"});
    });
}

//retrive all the tutorials in the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title : {$regex: new RegExp(title), $options: "i"}} : {};
    Tutorial.find(condition)
    .then(data =>{res.send(data);
    })
    .catch(err => {
        res.status(500).send({messsage : err.message || "Some error occured while creating the recipe!"});
    });
}

//find a single tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
    .then(data =>{
        if (!data)
        {
            res.status(404).send({messsage : "Not found recipe with id " + id});
        }
        else
        {
            res.send(data);
        }
    })
    .catch(err => {
        res
        .status(500)
        .send({messsage : err.message || "error retrieving recipe with id "+ id});
    });
}

//Update a tutorial by the id in request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({messsage: "Data to update cannot be empty!!!"})
    }
    const id = req.params.id;
    Tutorial.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
    .then(data =>{
        if(!data)
        {
            res.status(404).send({messsage: `Cannot update recipe with id=${id}. Maybe recipe was not found!`});
        }
        else
        {
            res.send({message: "Recipe was updated successfully!!!"});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating recipe with id=" + id
        });
    });
}

//Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id)
    .then(data => {
        if(!data)
        {
            res.status(404).send({messsage: `Cannot delete recipe with id=${id}. Maybe recipe was not found!`});
        }
        else
        {
            res.send({message: "Recipe was deleted successfully!!!"});
        }
    }).catch(err => {
        res.status(500).send({messsage: `Couldn't delete recipe with id=${id}`});
    })
}

//Delete all the tutorials in the database
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
    .then(data =>{
        res.send({message : `${data.deletedCount} recipe deleted successfully`});
    }).catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while deleting all recipes"});
    });
};

//find all published tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({published: true})
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while retrieving all recipes"});
    });
}