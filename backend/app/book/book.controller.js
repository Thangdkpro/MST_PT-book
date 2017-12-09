const User = require('../user/user.model');
const Book = require('./book.model');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');

 
// exports.postBook = function(req, res) {
//   if (!req.body.title) {
//     res.json({ success: false, message: 'Book title is required.' });
//   } else {
//     if (!req.body.description) {
//       res.json({success: false,  message: 'Book description is required.' });
//     } else {
//       if (!req.body.created_date) {
//         res.json({success: false, message: 'created date is required.' });
//       } else {
//         if (!req.body.typeB) {
//           res.json({ success: false, message: 'Type of Book  is required.'});
//         } else {
//           if (!req.body.address) {
//           res.json({ success: false, message: ' address is required.' });
//           } else {
//           if (!req.body.status) {
//             res.json({   success: false, message: ' status is required.'});
//           } else {
//           if (!req.body.phoneNumber) {
//             res.json({   success: false, message: ' phoneNumber is required.'});
//           } 


//           else {
//             User.findOne({ _id: req.decoded.userId }, (err, user) => {
//               // Check if error was found
//               if (err) {
//                 res.json({ success: false, message: err }); // Return error
//               } else {
//                 // Check if usertitle was found in database
//                 if (!user) {
//                   res.json({
//                     success: false,
//                     message: 'Unable to authenticate user'
//                   }); // Return error message
//                 } else {
//                   const book = new Book({
//                     title: req.body.title,
//                     description: req.body.description,
//                     typeB: req.body.typeB,
//                     created_date: req.body.created_date,
//                     address: req.body.address,
//                     status: req.body.status,
//                     phoneNumber: req.body.phoneNumber

 
//                   });
//                   // Save book into database
//                   book.save(err => {
//                     // Check if error
//                     if (err) {
//                       // Check if error is a validation error
//                       if (err.errors) {
//                         // Check if validation error is in the title field
//                         if (err.errors.title) {
//                           res.json({
//                             success: false,
//                             message: err.errors.title.message
//                           }); // Return error message
//                         } else {
//                           // Check if validation error is in the description field
//                           if (err.errors.description) {
//                             res.json({
//                               success: false,
//                               message: err.errors.description.message
//                             }); // Return error message
//                           } else {
//                             if (err.errors.typeB) {
//                               res.json({
//                                 success: false,
//                                 message: err.errors.typeB.message
//                               }); // Return error message
//                             } else {
//                               if (err.errors.created_date) {
//                                 res.json({
//                                   success: false,
//                                   message: err.errors.created_date.message
//                                 }); // Return error message
//                               } else {
//                                 if (err.errors.status) {
//                                   res.json({
//                                     success: false,
//                                     message: err.errors.status.message
//                                   }); // Return error message
//                                 } else {
//                                 if (err.errors.address) {
//                                   res.json({
//                                     success: false,
//                                     message: err.errors.address.message
//                                   }); // Return error message
//                                 } else {
//                                 if (err.errors.phoneNumber) {
//                                   res.json({
//                                     success: false,
//                                     message: err.errors.phoneNumber.message
//                                   }); // Return error message
//                                 } 


//                                 else {
//                                   res.json({
//                                     success: false,
//                                     message: err.errors
//                                   }); // Return general error message
//                                 }
//                               }
//                             }
//                               }
//                             }
//                           }
//                         }
//                       } else {
//                         res.json({
//                           success: false,
//                           message: err
//                         }); // Return general error message
//                       }
//                     } else {
//                       res.json({
//                         success: true,
//                         message: 'Book saved!'
//                       }); // Return success message
//                     }
//                   });
//                 }
//               }

//             })  ;
//           }
//         }
//       }
//     }
//   }

// };

//  // Get all books
// exports.getBooks = function(req, res) {
//   var pageOptions = {
//     page: Number(req.query.page) || 0,
//     limit: Number(req.query.limit) || 10
//   };
//   if (req.query.title) {
//     var title = req.query.title;
//     User.findOne({ _id: req.decoded.userId }, (err, user) => {
//       // Check if error was found
//       if (err) {
//         res.json({ success: false, message: err }); // Return error
//       } else {
//         Book.ensureIndexes({ title: 'text' });
//         Book.findOne({ createdBy: user.email, title: title }, function(err, book) {
//           // Check if error was found or not
//           if (err) {
//             res.json({
//               success: false,
//               message: err
//             }); // Return error message
//           } else {
//             if (!book) {
//               Book.find(
//                 {
//                   createdBy: user.email,
//                   title: { $regex: title }
//                 },
//                 function(err, book2) {
//                   if (err) {
//                     res.json({
//                       success: false,
//                       message: 'No book found.'
//                     });
//                   } else {
//                     console.log(book2);
//                     res.json({
//                       success: true,
//                       books: book2
//                     });
//                   }
//                 }
//               )
//                 .skip(pageOptions.page * pageOptions.limit)
//                 .limit(pageOptions.limit);
//             } else {
//               res.json({ success: true, books: book });
//             }
//           }
//         })
//           .skip(pageOptions.page * pageOptions.limit)
//           .limit(pageOptions.limit)
//           .sort({ date: -1 });
//       }
//     });
//   } else {
//     User.findOne({ _id: req.decoded.userId }, (err, user) => {
//       // Check if error was found
//       if (err) {
//         res.json({ success: false, message: err }); // Return error
//       } else {
//         Book.find({ createdBy: user.email }, (err, books) => {
//           // Check if error was found or not
//           if (err) {
//             res.json({ success: false, message: err }); // Return error message
//           } else {
//             // Check if blogs were found in database
//             if (!books) {
//               res.json({ success: false, message: 'No books found.' }); // Return error of no blogs found
//             } else {
//               res.json({ success: true, books: books }); // Return success and blogs array
//             }
//           }
//         })
//           .skip(pageOptions.page * pageOptions.limit)
//           .limit(pageOptions.limit)
//           .sort({ date: -1 });
//       }
//     });
//   }
// };
 
// exports.getBookById = function(req, res) {
//   User.findOne({ _id: req.decoded.userId }, (err, user) => {
//     // Check if error was found
//     if (err) {
//       res.json({ success: false, message: err }); // Return error
//     } else {
//       Book.findOne(
//         { createdBy: user.email, _id: req.params.id },
//         (err, book) => {
//           // Check if error was found or not
//           if (err) {
//             res.json({
//               success: false,
//               message: err
//             }); // Return error message
//           } else {
//             // Check if blogs were found in database
//             if (!book) {
//               res.json({
//                 success: false,
//                 message: 'No book found.'
//               }); // Return error of no blogs found
//             } else {
//               res.json({
//                 success: true,
//                 books: book
//               }); // Return success and blogs array
//             }
//           }
//         }
//       ).sort({ date: -1 });
//     }
//   });
// };

 
// exports.editBook = function(req, res) {
//   User.findOne({ _id: req.decoded.userId }, (err, user) => {
//     // Check if error was found
//     if (err) {
//       res.json({ success: false, message: err }); // Return error
//     } else {
//       var doc = {
//         title: req.body.title,
//         description: req.body.description,
//         typeB: req.body.typeB,
//         created_date: req.body.created_date,
//         address: req.body.address,
//         status: req.body.status,
//         phoneNumber: req.body.phoneNumber

//       };
//       Book.update(
//         { createdBy: user.email, _id: req.params.id },
//         doc,
//         (err, books) => {
//           // Check if error was found or not
//           if (err) {
//             res.json({
//               success: false,
//               message: err
//             }); // Return error message
//           } else {
//             // Check if blogs were found in database
//             if (!books) {
//               res.json({
//                 success: false,
//                 message: 'No books found.'
//               }); // Return error of no blogs found
//             } else {
//               res.json({
//                 success: true,
//                 message: 'Edit sucessfully'
//               }); // Return success and blogs array
//             }
//           }
//         }
//       );
//     }
//   });
// };
 

// exports.deleteBook = function(req, res) {
//   User.findOne({ _id: req.decoded.userId }, (err, user) => {
//     // Check if error was found
//     if (err) {
//       res.json({ success: false, message: err }); // Return error
//     } else {
//       Book.remove(
//         { createdBy: user.email, _id: req.params.id },
//         (err, books) => {
//           // Check if error was found or not
//           if (err) {
//             res.json({
//               success: false,
//               message: err
//             }); // Return error message
//           } else {
//             // Check if blogs were found in database
//             if (!books) {
//               res.json({
//                 success: false,
//                 message: 'No books found.'
//               }); // Return error of no blogs found
//             } else {
//               res.json({
//                 success: true,
//                 message: 'delete sucessfully'
//               }); // Return success and blogs array
//             }
//           }
//         }
//       );
//     }
//   });
// };



const mongoose = require('mongoose')
    

exports.getBooks = function(req, res) {
  Book.find({}, function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};




exports.postBook = function(req, res) {
  const new_book = new Book(req.body);
  new_book.save(function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};


exports.getBookById = function(req, res) {
  Book.findById(req.params.bookId, function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};


exports.editBook = function(req, res) {
  Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}, 
    function(err, book) {
    if (err)
      res.send(err);
    res.json(book);
  });
};


exports.deleteBook = function(req, res) {


  Book.remove({
    _id: req.params.bookId
  }, function(err, book) {
    if (err)
      res.send(err);
    res.json({ message: 'Book successfully deleted' });
  });
};
