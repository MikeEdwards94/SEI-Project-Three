import Park from '../models/parks.js'

// * INDEX ROUTE
export const getAllParks = async (_req, res) => {
  const parks = await Park.find()
  return res.status(200).json(parks)
}


// * SHOW ROUTE
export const getOnePark = async (req, res) => {
  try {
    const { id } = req.params
    const singlePark = await Park.findById(id).populate('comments.owner').populate('recommendations.owner')
    if (!singlePark) {
      throw new Error()
    }
    return res.status(200).json(singlePark)
  } catch (err) {
    console.log('Something went wrong!')
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}


// * DELETE ROUTE
export const deletePark = async (req, res) => {
  try {
    const { id } = req.params
    const parkToDelete = await Park.findById(id)
    if (!parkToDelete) throw new Error()
    // if (!parkToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await parkToDelete.remove()
    return res.status(204).json({ 'message': 'Park deleted' })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}


// * UPDATE ROUTE
export const updatePark = async (req, res) => {
  try {
    const { id } = req.params
    const parkToUpdate = await Park.findById(id)
    if (!parkToUpdate) throw new Error()
    Object.assign(parkToUpdate, req.body)
    await parkToUpdate.save()
    return res.status(202).json(parkToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

// * Add a Comment
export const addCommentToPark = async (req, res) => {
  try {
    const { id } = req.params
    const park = await Park.findById(id)
    console.log('CURRNT USER>>>>>>>>>>>>> 🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘🆘', req.currentUser)
    if (!park) throw new Error('Cannot find park')
    const newComment = { ...req.body, owner: req.currentUser._id }
    park.comments.push(newComment)
    await park.save()
    return res.status(200).json(park)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// * SHOW ONE comment 
export const getOneComment = async (req, res) => {
  try {
    const { id, commentId } = req.params
    const singlePark = await Park.findById(id)
    if (!singlePark) {
      throw new Error()
    }
    const commentToUpdate = singlePark.comments.id(commentId)
    if (!commentToUpdate) throw new Error('Recommendation not found')
    return res.status(200).json(commentToUpdate)
  } catch (err) {
    console.log('Something went wrong!')
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

// * Edit a comment
export const editParkComments = async (req, res) =>{
  try {
    const { id, commentId } = req.params
    const parkToUpdate = await Park.findById(id)
    console.log('park to update ',parkToUpdate.comments)
    if (!parkToUpdate) throw new Error()
    const commentToUpdate = parkToUpdate.comments.id(commentId)
    if (!commentToUpdate) throw new Error('Comment not found')
    console.log('req.body', req.body)
    Object.assign(commentToUpdate, req.body)
    await parkToUpdate.save()
    console.log('comment to update', commentToUpdate)
    return res.status(202).json(commentToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

// * Delete a Comment
export const deleteCommentFromPark = async (req, res) => {
  try {
    const { id, commentId } = req.params
    const park = await Park.findById(id)
    if (!park) throw new Error('Park not found')
    const commentToDelete = park.comments.id(commentId)
    if (!commentToDelete) throw new Error('Comment not found')
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await commentToDelete.remove()
    await park.save()
    return res.status(204).json()
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}




// * Add a recommendation
export const addRecommendationToPark = async (req, res) => {
  try {
    const { id } = req.params
    const park = await Park.findById(id)
    if (!park) throw new Error('Cannot find park')
    const newRecommendation = { ...req.body, owner: req.currentUser._id }
    park.recommendations.push(newRecommendation)
    await park.save()
    return res.status(200).json(park)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}

// * SHOW ONE Recommendation
export const getOneRecommendation = async (req, res) => {
  try {
    const { id, recommendationId } = req.params
    const singlePark = await Park.findById(id)
    if (!singlePark) {
      throw new Error()
    }
    const recommendationToUpdate = singlePark.recommendations.id(recommendationId)
    if (!recommendationToUpdate) throw new Error('Recommendation not found')
    return res.status(200).json(recommendationToUpdate)
  } catch (err) {
    console.log('Something went wrong!')
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

// * Edit a recommendation
export const editParkRecommendation = async (req, res) =>{
  try {
    const { id, recommendationId } = req.params
    const parkToUpdate = await Park.findById(id)
    console.log('park to update ', parkToUpdate.recommendations)
    if (!parkToUpdate) throw new Error()
    const recommendationToUpdate = parkToUpdate.recommendations.id(recommendationId)
    if (!recommendationToUpdate) throw new Error('Recommendation not found')
    console.log('req.body', req.body)
    Object.assign(recommendationToUpdate, req.body)
    await parkToUpdate.save()
    console.log('recommendation to update', recommendationToUpdate)
    return res.status(202).json(recommendationToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'Not found' })
  }
}

// * Delete a recommendation
export const deleteRecommendationToPark = async (req, res) => {
  try {
    const { id, recommendationId } = req.params
    const park = await Park.findById(id)
    if (!park) throw new Error('Park not found')
    const recommendationToDelete = park.recommendations.id(recommendationId)
    if (!recommendationToDelete) throw new Error('Recommendation not Found')
    if (!recommendationToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await recommendationToDelete.remove()
    await park.save()
    return res.status(204).json({ 'message': 'recommendation deleted' })
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: err.message })
  }
}







