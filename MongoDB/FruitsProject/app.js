const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true
}).then(
  () => {
    console.log("Successfully connected to Mongo DB!");
  },
  err => {
    console.log(err);
  }
);

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});


const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "It is very good."
})

pineapple.save();

const person = new Person({
  name: "John",
  age: 37,
  favouriteFruit: pineapple
});

person.save();



// **Reference for insertMany**

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 6,
//   review: "Too sour!"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 9,
//   review: "It is delicious!"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 10,
//   review: "This is my favorite fruit"
// });
//
// // Fruit.insertMany([kiwi, orange, banana], function(err){
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("Successfully saved all the fruits to fruitsDB");
// //   }
// // });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  }
});
