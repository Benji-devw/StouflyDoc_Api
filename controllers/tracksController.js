// const fs = require('fs');
let TrackSchema = require('../models/tracksModel');



exports.getTracks = async (req, res, next) => {

    // console.log(req.query.category);
    const cat = req.query.category

    await TrackSchema.find(cat ? {category: req.query.category} : {})
        .then(data => {
            return res.status(200).json({
                message: "Tracks list from getTracks Done !",
                state: data,
            });
        }).catch(err => next(err))
}




exports.postTrack = async (req, res, next) => {
    // console.log('reqBody.....', req.body)
    // console.log('reqFile.....', req.file)

    const track = new TrackSchema({ 
        ...req.body,
        // url: `${req.protocol}://${req.get('host')}/public/${req.body.category}/${req.file.filename}`
        url: `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`
    });

    await track.save().then(() => {
        
        res.status(201).json({
            message: "Insert Track Done !",
        })
    }).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
}





exports.getTrackById = (req, res, next) => {

    TrackSchema.findOne({_id: req.params.id}, (err, track) => {
        if (err) { err => res.status(404).json({ message: "Tracks Not Found", error: err })}
        res.status(200).json({
            message: "Tracks list from gettrackById Done !",
            state: track,
        })
    })
}


exports.updateTrack = (req, res, next) => {

    TrackSchema.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ 
            message: "Update track Done !",  
            state: req.body
        }))
        .catch(err => next(err))
}


exports.deleteTrack = async (req, res) => {
    // console.log('req', req.params.id)
 
    await TrackSchema.findOneAndDelete(req.params.id)
    .then(res.status(200).json({ message: "Successful" }))
    .catch(err => next(err));

}






// exports.getProductsPost = async (req, res) => {
//     // console.log('req.body', req.body.filters)

//     let findArgs = {};
//     const sortValue = []

//     for (let key in req.body.filters) {
//         if (req.body.filters[key].length > 0) {
//             findArgs[key] = req.body.filters[key];
//         }
//     }

//     if (req.body.filters.promotionProduct === true) {
//         sortValue.push('byPromo')
//     }
//     else if (req.body.filters.novelty === true) {
//         sortValue.push('byNovelty')
//     }
//     else if (req.body.filters.price === true) {
//         sortValue.push('byDesc')
//     }
//     else if (req.body.filters.price === false) {
//         sortValue.push('byAsc')
//     }

//     function sorting() {
//         switch (sortValue[0]) {
//             case 'byPromo':
//                 return { promotionProduct: -1 }
//                 break;
//             case 'byNovelty':
//                 return { novelty: -1 }
//                 break;
//             case 'byDesc':
//                 return { priceProduct: -1 }
//                 break;
//             case 'byAsc':
//                 return { priceProduct: 1 }
//                 break;
//             default:
//                 break;
//         }
//     }

//     // console.log('TESTSESTESTE');
//     // console.log('sortValue', sortValue);
//     // console.log('findArgs', findArgs)
//     Product.find(findArgs)
//         .sort(sorting())

//         .then(data => {
//             return res.status(200).json({
//                 message: findArgs,
//                 products: data
//             });
//         })
//         .catch(err => console.log('Get products error :', err))
// }





