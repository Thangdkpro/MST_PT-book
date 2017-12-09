var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;



var bookSchema = new Schema({

  title: {
    type: String,
    required: true,
    validate: [
      function(title) {
        return title.length >= 1;
      },
      'Title of book must be longer 1 character '
    ],
     
  },


 typeB:{
     
      type: String,
      enum:['Drama', 'Self Help', 'Novel', 'Comics','Art','Dictionaries','Religion'],
      required: 'Kindly enter the type of book'
     
  },

 created_date: {
    type: Date,
    default: Date.now
   },


 description: {
    type: String,
    required: true,
    validate: [
      function(description) {
        return description.length >= 5;
      },
      'You must describe your book to the others can get more information about your books'
    ]
  },
  
  
  address: {
    type: String,
    required: true,
    validate: [
      function(address) {
        return address.length >= 5 ;
      },
      'You have enter your address'
    ]
  },
 
   status: {
     type: String,
     require:true ,
     required: 'Kindly enter the your status of books'
  },

   phoneNumber: {
        type: Number,
        required: true,
        match: [
        /^[0-9-+]+$/,       
       'Please enter your phone number to the others can contact with you'
        ]
   }
    
});

module.exports = mongoose.model('Book', bookSchema);
