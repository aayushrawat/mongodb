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

const arrayOfPeople = [
  {name: 'John', age: 30, favoriteFoods: ['Pizza', 'Burger']},
  {name: 'Emily', age: 25,favoriteFoods: ['Sushi', 'Ice Cream']},
  {name: 'Michael', age: 40, favoriteFoods: ['Steak', 'Pasta', 'Chocolate']}
];

const createAndSavePerson = (done) => {
  const ironman = new Person({name: "ironman", age: 45, favoriteFoods: ['Burger', 'Cake', 'Taccos']});
  ironman.save(function(err,data){
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, createdPeople) {
    if (err) return console.error(err);
    done(null, createdPeople);
  });
};

const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, function(err, data){
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if (err) return console.log(err);
    done(null ,data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};


const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updatedDoc){
    if(err) return console.log(err);
    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
Person.findByIdAndRemove(personId, function(err, removedDoc){
  if (err) console.log(err);
  done(null,removedDoc);
});

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, removed){
    if (err) console.log(err);
    done(null, removed);
  });
};

// Modify the queryChain function to find people who like the food specified by the variable named foodToSearch. 
// Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select()
// and then .exec(). Pass the done(err, data) callback to exec().


const queryChain = (done) => {
  const foodToSearch = "burrito";

  var query = Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 });

  query.exec((err, data) => {
    if (err) {
      console.log(err);
    } else {
      done(null, data);
    }
  });
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
