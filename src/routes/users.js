const router = require('express-promise-router')();


const {
    index,
    newSuperv,
    getSuperv,
    updateSuperv,
    deleteSuperv,
    getSupervDealers,
    newSupervDealer
} = require('../controllers/superv')

router.get('/', index); 
router.post('/', newSuperv);
router.get('/:supervId',getSuperv);
router.put('/:supervId',updateSuperv);
router.delete('/:supervId',deleteSuperv);

router.get('/:supervId/dealer',getSupervDealers);
router.post('/:supervId/dealer',newSupervDealer);
module.exports = router;