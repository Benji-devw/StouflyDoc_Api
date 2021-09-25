// const fs = require('fs');
let SoundSchema = require('../models/soundModel');



exports.getSounds = async (req, res, next) => {

    await SoundSchema.find()
        .then(data => {
            return res.status(200).json({
                message: "Sounds list from getSounds Done !",
                state: data,
            });
        }).catch(err => next(err))
}


exports.postSound = async (req, res, next) => {
    // console.log('reqBody.....', req.body)

    const sound = new SoundSchema({ ...req.body });

    await sound.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Insert sound Done !",
            state: result
        })
    }).catch(err => next(err))
}


exports.getSoundById = (req, res, next) => {

    SoundSchema.findOne({_id: req.params.id}, (err, sound) => {
        if (err) { err => res.status(404).json({ message: "Sounds Not Found", error: err })}
        res.status(200).json({
            message: "Sounds list from getSoundById Done !",
            state: sound,
        })
    })
}


exports.updateSound = (req, res, next) => {

    SoundSchema.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ 
            message: "Update product Done !",  
            state: req.body
        }))
        .catch(err => next(err))
}


exports.deleteSound = async (req, res) => {
    // console.log('req', req.params.id)
 
    await SoundSchema.findOneAndDelete(req.params.id)
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





