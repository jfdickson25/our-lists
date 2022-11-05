const express = require('express');
const router = express();

const listController = require('../../controllers/listController');
const listModel = require('../../models/list');

router
    .get('/:id', async (req, res, next) => {
        let list = await listModel.findOne({code: req.params.id});
        
        res.status(200).render('list', {list: list});
    })
    .post('/addItem', async (req, res, next) => {
        let list = await listModel.findOne({code: req.body.code});

        let item = {
            name: req.body.item,
            quantity: req.body.qnt
        }

        let index = list.categories.findIndex(category => {
            return category.name === req.body.category;
        });

        list.categories[index].items.push(item);

        list.save();
    })
    .post('/addCategory', async (req, res, next) => {
        let list = await listModel.findOne({code: req.body.code});

        list.categories.push({
            name: req.body.categoryName,
            items: []
        });

        list.save()
    })
    .post('/changeQnt', async(req, res, next) => {
        // Get the list by it's code
        let list = await listModel.findOne({code: req.body.code});

        let item = {
            name: req.body.item,
            quantity: req.body.qnt,
            category: req.body.category
        }

        let categoryIndex = await listController.getCategoryIndex(list, item.category);
        let itemIndex = await listController.getItemIndex(list, categoryIndex, item.name);

        // Return the array of the items with the desired item removed
        list.categories[categoryIndex].items[itemIndex].quantity = item.quantity;

        // Save the list with the updated items array
        list.save();
    })
    .post('/crossOff', async(req, res, next) => {
        // Get the list by it's code
        let list = await listModel.findOne({code: req.body.code});

        let item = {
            name: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category
        }

        let categoryIndex = await listController.getCategoryIndex(list, item.category);
        let itemIndex = await listController.getItemIndex(list, categoryIndex, item.name);

        // Return the array of the items with the desired item removed
        list.categories[categoryIndex].items.splice(itemIndex, 1);

        // Validate item has not already been crossed off 
        if (list.crossedOff.filter(i => i.name === item.name).length === 0) {
            // Add item to crossed off array
            list.crossedOff.push(item);

            // Save the list with the updated items array
            list.save();
        }
    })
    .post('/removeCrossedOff', async(req, res, next) => {
        // Get the list by it's code
        let list = await listModel.findOne({code: req.body.code});

        let itemIndex = list.crossedOff.findIndex(item => {
            return item.name === req.body.item;
        });

        list.crossedOff.splice(itemIndex, 1);

        let categoryIndex = await listController.getCategoryIndex(list, req.body.category);

        let item = {
            name: req.body.item,
            quantity: req.body.qnt
        }

        list.categories[categoryIndex].items.push(item);

        list.save();
    })
    .post('/moveDown', async(req, res, next) => {
        let list = await listModel.findOne({code: req.body.code});
        let index = list.categories.findIndex(category => {
            return category.name === req.body.category;
        });

        if(list.categories[index + 1] !== null) {
            [list.categories[index], list.categories[index + 1]] = [list.categories[index + 1], list.categories[index]];
            list.save();
        }
    })
    .post('/moveUp', async(req, res, next) => {
        let list = await listModel.findOne({code: req.body.code});
        let index = list.categories.findIndex(category => {
            return category.name === req.body.category;
        });

        if (list.categories[index - 1] !== null) {
            [list.categories[index - 1], list.categories[index]] = [list.categories[index], list.categories[index - 1]];
            list.save();
        }

    })
    .delete('/', async(req, res, next) => {
        let deletedList = await listModel.findOneAndDelete({code: req.body.code});
        res.status(200).send("Success");
    })
    .delete('/category', async (req, res, next) => {
        let remaingCategories = await listModel.findOneAndUpdate({code: req.body.code}, { $pull: {"categories": {name: req.body.categoryName} } });

        remaingCategories.save();
    })
    .delete('/item', async (req, res, next) => {
        // Get the list by it's code
        let list = await listModel.findOne({code: req.body.code});

        // Find the index of the item
        let itemIndex = list.crossedOff.findIndex(item => {
            return item.name === req.body.item;
        });

        // Return the array of the items with the desired item removed
        list.crossedOff.splice(itemIndex, 1);

        // Save the list with the updated items array
        list.save();
    });

module.exports = router;