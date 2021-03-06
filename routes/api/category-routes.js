const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      { 
        model: Product,
        attributes: ['product_name']
      }
    ]
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { 
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]  
  })
  .then(dbCategory => {
    if(!dbCategory) {
      res.status(404).json({message:'Missing Category'});
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  //creates category 
  Category.create(req.body)
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
  Category.update(req.body, {
    where: { 
      id: req.params.id
    }
  })
  .then(dbCategory => {
    if(!dbCategory[0]){
      res.status(404).json({message: 'Category missing'});
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ 
    where: {
      id: req.params.id
    }
  })
  .then(dbCategory => {
    if(!dbCategory){
      res.status(404).json({message: 'Category Missing'});
      return;
    }
    res.json(dbCategory);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
