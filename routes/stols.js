var express = require('express');
var router = express.Router();

// Требующиеся модули контроллеров.
var stol_controller = require('../controllers/stolController');

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
// GET-запрос для создания экземпляра книги. Должен появиться до маршрута, выводящего BookInstance с использованием id

// GET request for list of all BookInstance.
router.get('/', stol_controller.index)
router.get('/stols', stol_controller.stol_list);
router.get('/stols/:id/:data/:time', stol_controller.stol_detail);
router.get('/stols/:id/:data/:time/booked/:name', stol_controller.stol_detail_booked);

module.exports = router;