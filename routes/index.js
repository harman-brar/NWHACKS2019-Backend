var express = require('express');
var router = express.Router();

const yelp = require('yelp-fusion');

const apiKey = 'vUjAExoExqWO0f2A_DEJ6cza4XeFD0CLLcbuaRoTzGxJ0YjEh3ik9E31ZlDsI6xvJFCUfLJTQwqK3Q6FlIYtsuBLmOqYB0zudrhq9QPYVAZyXh7sR6P7LrtgPPhMXHYx';

const client = yelp.client(apiKey);

const entCriteria = 'active,arts,beautysvc,eventservices,hotelstravel,localflavor,localservices,nightlife,shopping';

var itemLimit = 15;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Entertainment-Finder' });
});

router.post('/businesses', function(req, res, next) {

  var term = req.query.term;
  var location = req.query.loc;

  if (req.query.limit != null) {
    itemLimit = req.query.limit;
  }

  var categories = null;

  if(term == 'entertainment') {
    categories = entCriteria;
  } else {
    categories = 'food,restaurants';
  }

  console.log(categories);

  const searchRequest = {
    term: term,
    location: location,
    radius: 10000,
    categories: categories,
    limit: itemLimit,
    open_now: true,
  };

  client.search(searchRequest).then(response => {
    const allItems = response.jsonBody.businesses;
    res.json(allItems);
  }).catch(e => {
    console.log(e);
  });

});

module.exports = router;
