const Superv = require('../models/superv');
const Dealer = require('../models/dealer');

module.exports = {
  index: async (req, res, next) => {
    const superv = await Superv.find({});
    res.status(200).json(superv);
    
  },

  newSuperv: async (req, res, next) => {
    const newSuperv = new Superv(req.body);
    const superv = await newSuperv.save();
    res.status(200).json(superv);
  },
  getSuperv: async (req, res, next) => {
    const { supervId } = req.params;
    const superv = await Superv.findById(supervId);
    res.status(200).json(superv);
  },
  replaceSuperv: async (req, res, next) => {
    const { supervId } = req.params;
    const newSuperv = req.body;
    const oldSuperv = await Superv.findByIdAndUpdate(supervId, newSuperv);
    res.status(200).json({ sucess: true });
  },
  updateSuperv: async (req, res, next) => {
    const { supervId } = req.params;
    const newSuperv = req.body;
    const oldSuperv = await Superv.findByIdAndUpdate(supervId, newSuperv);
    res.status(200).json({ sucess: true });
  },
  deleteSuperv: async (req, res, next) => {
    const { supervId } = req.params;
    const newSuperv = req.body;
    const oldSuperv = await Superv.findOneAndDelete(supervId, newSuperv);
    res.status(200).json({ sucess: true });
  },
  getSupervDealers: async (req, res, next) => {
    const { supervId } = req.params;
    const superv = await Superv.findById(supervId).populate('de');
    res.status(200).json(superv);
  },
  newSupervDealer: async (req, res, next) => {
    const { supervId } = req.params;
    const newDealer = new Dealer(req.body);
    const superv = await Superv.findById(supervId);
    newDealer.seller = superv;
    await newDealer.save();
    superv.de.push(newDealer);
    await superv.save();
    res.status(200).json({ newDealer });
  }
};
