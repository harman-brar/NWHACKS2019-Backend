var express = require('express');
var router = express.Router();

const yelp = require('yelp-fusion');

const apiKey = 'vUjAExoExqWO0f2A_DEJ6cza4XeFD0CLLcbuaRoTzGxJ0YjEh3ik9E31ZlDsI6xvJFCUfLJTQwqK3Q6FlIYtsuBLmOqYB0zudrhq9QPYVAZyXh7sR6P7LrtgPPhMXHYx';

const client = yelp.client(apiKey);

const entCriteria = 'active,arts,beautysvc,eventservices,hotelstravel,localflavor,localservices,nightlife,shopping';

const itemLimit = 15;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Entertainment-Finder' });
});

router.get('/businesses', function(req, res, next) {

  var term = req.query.term;
  var location = req.query.loc;

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
    categories: categories,
    limit: itemLimit,
    open_now: true
  };

  client.search(searchRequest).then(response => {
    const allItems = response.jsonBody.businesses;
    //const prettyJson = JSON.stringify(allItems, null, 4);
    res.json(allItems);
    //console.log(allItems);
  }).catch(e => {
    console.log(e);
  });

});

module.exports = router;