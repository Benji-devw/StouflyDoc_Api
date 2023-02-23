// const fs = require('fs');
const TrackSchema = require('../models/track.model');


/********/
/** GET TRACKS WITH QUERY */
exports.getTracks = async (req, res, next) => {

  const bpmMin = Number(req.query.BpmMin)
  const bpmMax = Number(req.query.BpmMax)
  const search = req.query.search || ""
  const cat = req.query.category || ""
  const tag = req.query.tag || ""
  const skip = Number(req.query.skip)
  // const skip = req.query.skip && /^\d+$/.skip(req.query.skip) ? Number(req.query.skip) : 0

    queryFilters =  {
      $or: [
        { title:    { $regex: search, $options: 'i' } },
        { tags:     { $regex: search, $options: 'i' } },
        { reporter: { $regex: search, $options: 'i' } }
      ], 
      $and: [
        { $or: [{ bpm: { $gte : req.query.BpmMin !== undefined ? bpmMin : 0 }}] },
        { $or: [{ bpm: { $lte: req.query.BpmMax !== undefined ? bpmMax : 200 }}] },
        { $or: [{ category: { $regex: cat, $options: 'i' }}] },
        { $or: [{ tags: { $regex: tag, $options: 'i' }}] }
      ]
    }
    
    
    // console.log(req.query);

    await TrackSchema.find(queryFilters)
    // .limit(req.query.skip ? skip : 9 )
      // .sort(req.query.BpmMin ? { bpm: {$lt: parseFloat(req.query.BpmMin)}} : {})
        .then(data => {
            return res.status(200).json({
                message: "Tacks found !",
                state: data
            });
        })
        .catch(err => next(err))
}

/********/
/** GET ALL TRACKS FOR MAP CAT TAG ...  */
exports.getAlltracks = async (req, res, next) => {
    await TrackSchema.find()
        .then(data => {
            return res.status(200).json({
                message: "Tracks found !",
                state: data
            });
        })
        .catch(err => next(err))
}


exports.getTrackById = (req, res, next) => {

    TrackSchema.findOne({_id: req.params.id}, (err, track) => {
        if (err) { err => res.status(404).json({ message: "Tracks Not Found", error: err })}
        res.status(200).json({
            message: "Tracks find !",
            state: track,
        })
    })
}

/********/
/** POST TRACKS */
exports.postTrack = async (req, res, next) => {
    // console.log('reqBody.....', req.body)
    // console.log('reqFile.....', req.file)

    const track = new TrackSchema({ 
        ...req.body,
        // url: `${req.protocol}://${req.get('host')}/public/${req.body.category}/${req.file.filename}`
        url: `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`
    });

    // await track.save().then(() => {
    //     res.status(201).json({
    //         message: "Insert Track Done !",
    //     })
    // }).catch(
    //     (error) => {
    //       res.status(400).json({
    //         error: error
    //       });
    //     }
    //   );
}

/********/
/** UPDATE TRACK */
exports.updateTrack = (req, res, next) => {

    TrackSchema.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ 
            message: "Update track Done !",  
            state: req.body
        }))
        .catch(err => next(err))
}

/********/
/** DELETE TRACK */
exports.deleteTrack = async (req, res) => {
    // console.log('req', req.params.id)
 
    await TrackSchema.findOneAndDelete(req.params.id)
    .then(res.status(200).json({ message: "Successful" }))
    .catch(err => next(err));

}
