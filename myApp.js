require('dotenv').config();

const mongoose = require('mongoose');
let Person = require('./models/Person.js');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Person
const createAndSavePerson = (done) => {
  const person = new Person({ name: 'Luigo', age: '44', favouriteFoods: ['Egg', 'Milk'] });
  person.save((error, person) => {
    if (error) return console.log(error);
    done(null, person);
  });
};

// Can be used with createManyPeople() for test
const people = [
  { name: 'Pavlo', age: 35, favoriteFoods: ['Salad'] },
  { name: 'Pablo', age: 36, favoriteFoods: ['Sashimi'] },
  { name: 'Walter', age: 54, favoriteFoods: ['Pancake'] }
];

// Create many Persons from an array
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(people, (error, people) => {
    if (error) return console.log(error);
    done(null, people);
  });
};

// Search for a person with the given name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, person) => {
    if (error) return console.log(error);
    done(null, person);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, person) => {
    if (error) return console.log(error);
    done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, person) => {
    if (error) return console.log(error);
    done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById (personId, (error, person) => {
    if (error) return console.log(error);

    person.favoriteFoods.push(foodToAdd);

    person.save(person).then(()=>done(null, person))
      .catch(error=>console.log(error))
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true })
  .then( (person) => done(null, person))
  .catch(error => console.log(error))
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId)
  .then(result => done(null, result))
  .catch(error => console.log(error));
};

const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  try {
    const result = await Person.remove({name: nameToRemove});
    done(null, result);
  } catch (error) {
    return console.log(error);
  }
};

const queryChain = async (done) => {
  const foodToSearch = "burrito";

  const query = Person.find({favoriteFoods: foodToSearch});
  query.sort({name: 1});
  query.limit(2);
  query.select({age: 0});

  try {
    const result = await query.exec();
    done(null, result);
  } catch (error) {
    return console.log(error);
  }
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
