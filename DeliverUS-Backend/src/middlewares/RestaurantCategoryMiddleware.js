import { RestaurantCategory } from '../models/models.js'

const checkRestaurantCategoryName = async (req, res, next) => {
  try {
    const restaurantCategory = await RestaurantCategory.findOne({ where: { name: req.body.name } })
    if (!restaurantCategory) {
      return next()
    }
    return res.status(422).send('This restaurant category already exists')
  } catch (err) {
    return res.status(500).send(err)
  }
}

export { checkRestaurantCategoryName }
