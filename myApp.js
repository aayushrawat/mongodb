require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;



mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Listen for the connected event
mongoose.connection.on('connected', () => {
  console.log('Database connected successfully!');
});
// Listen for the error event
mongoose.connection.on('error', (err) => {
  console.error('Database connection error:', err);
});
// Listen for the disconnected event
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

const personSchema = new mongoose.Schema({
name: String,
age: Number,
favoriteFoods: [String]
});


const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const ironman = new Person({name: "ironman", age: 45, favoriteFoods: ['Burger', 'Cake', 'Taccos']});
  ironman.save(function(err,data){
    if (err) return console.error(err);
    done(null, data);
  });
};



const createManyPeople = (arrayOfPeople, done) => {
  
  const arrayOfPeople = [
    {
      name: 'John',
      age: 30,
      favoriteFoods: ['Pizza', 'Burger']
    },
    {
      name: 'Emily',
      age: 25,
      favoriteFoods: ['Sushi', 'Ice Cream']
    },
    {
      name: 'Michael',
      age: 40,
      favoriteFoods: ['Steak', 'Pasta', 'Chocolate']
    }
  ];
  Person.create(arrayOfPeople, function(err, createdPeople) {
    if (err) {
      console.error(err);
      done(err);
    } else {
      done(null, createdPeople);
    }
  });
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
