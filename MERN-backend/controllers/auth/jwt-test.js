const express = require('express');
const router = express.Router();

router.get('/sign-token', (req, res) => {
    res.json({message: 'you are authorized'})
});

module.exports = router;