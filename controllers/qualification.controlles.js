const qualification = require ("../model/qualification.model");
const { check, validationResult } = require("express-validator");
const life_jwt = require("jsonwebtoken");



router.post(
    '/ createqualification',
    [
      check('students', 'subjects',' are required').notEmpty(),
      check('note_01','note_02', 'note_03','note_04', 'are required').notEmpty(),
    ],
    
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { note_1, note_02, note_03, note_04 } = req.body;
      const itemObject = { students,subjects };
      
      
      try {
        let Itemqualification = await qualification.find({
          user: req.user.id,
        });
        
        if (Itemqualification.length === 0) {
          const newQualif = new Category({
            user: req.user.id,
            items: itemObject,
            note: qualification ,
          });
          await newQualif.save();
          Itemqualification= await qualification.find({
            user: req.user.id,
          });
          res.json(Itemqualification);
        } else if (Itemqualification.length !== 0) {
          //   check if Itemqualification already exists
          Itemqualification.map(async (cat) => {
            if (cat.note.toLowerCase() === qualification.toLowerCase()) {
              cat.items.push(itemObject);
              await cat.save();
              Itemqualification = await qualification.find({
                user: req.user.id,
              });
              res.json(Itemqualification);
            } else {
              //   create new qualification
              const newQualif = new Category({
                user: req.user.id,
                items: itemObject,
                note: qualification ,
              });
              await newQualif.save();
              Itemqualification = await qualification.find({
                user: req.user.id,
              });
              res.json(Itemqualification);
            }
          });
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  module.exports = qualification = mongoose.model('qualification', QualificationsSchema);