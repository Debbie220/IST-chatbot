#!/bin/env node
/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var watson = require('watson-developer-cloud'),
  extend   = require('util')._extend,
  async    = require('async'),
  fs       = require('fs');

// load the environment variables
if (fs.existsSync('../.env.js')){
  console.log('Loading environment variables from .env.js');
  extend(process.env, require('../.env.js'));
}

var dialogFile = __dirname + '/dialog_id';
var classifierFile = __dirname + '/classifier_id';

var dialogTrainingFile = __dirname + '/template.xml';
var classifierTrainingFile = __dirname + '/classifier_training.csv';

var dialogService = watson.dialog({
  url: 'https://gateway.watsonplatform.net/dialog/api',
  password: "WwTn4in3ZDXa",
  username: "dd5373a3-3d1a-4ad9-8561-ffd1b6781370",
  version: 'v1'
});

var classifierService = watson.natural_language_classifier({
  url: 'https://gateway.watsonplatform.net/natural-language-classifier/api',
  password: "nLIZ1dGJG2Tt",
  username: "02b8f4e7-283f-4985-b1bc-2d6eda60c600",
  version: 'v1'
});

// var params = {
//   language: 'en',
//   name: 'My Classifier',
//   training_data: fs.createReadStream('./classifier.csv')
// };
//
// classifierService.create(params, function(err, response) {
//   if (err)
//     console.log(err);
//   else
//     console.log(JSON.stringify(response, null, 2));
// });

// classifierService.remove({
//   classifier_id: '2374f9x69-nlc-7554' },
//   function(err, response) {
//     if (err)
//       console.log('error:', err);
//     else
//       console.log(JSON.stringify(response, null, 2));
// });

classifierService.list({},
  function(err, response) {
    if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  }
);

var params = {
  dialog_id: '643575b1-5257-4f41-8a29-0a6117264a05',
  file: fs.createReadStream(dialogTrainingFile)
};

dialogService.updateDialog(params, function(err, dialog) {
  if (err)
    console.log(err)
  else
    console.log(dialog);
});

// var params = {
//   name: 'dialog-new',
//   file: fs.createReadStream(dialogTrainingFile)
// };
//
// dialogService.createDialog(params, function(err, dialog) {
//   if (err){
//     console.log("Oops...");
//     console.log(err.error);}
//   else
//     console.log(dialog);
// });

// dialogService.deleteDialog({dialog_id: 'c2d1243f-4cca-41de-8ea8-b584a22fc3c5'}, function(err, dialog) {
//     if (err)
//       console.log(err)
//     else
//       console.log(dialog);
// });

dialogService.getDialogs({}, function(err, dialogs) {
  if (err)
    console.log(err)
  else
    console.log(dialogs);
});
/**
 * Trains a dialog if the content of /training/dialog_id is null or empty
 */
function trainDialog(callback) {
  fs.readFile(dialogFile, 'utf8', function (err, data) {
    if (err)
      callback(err);
    else if (data === '') {
      dialogService.createDialog({
        name: 'movies-' + new Date().valueOf(),
        file: fs.createReadStream(dialogTrainingFile)
      }, function(err, dialog) {
        if (err) {
          callback(err);
        } else {
          fs.writeFileSync(dialogFile, dialog.dialog_id);
          console.log('[dialog]: dialog trained -- id=', dialog.dialog_id);
          callback(null);
        }
      });
    } else {
      console.log('[dialog]: dialog already trained -- id=', data);
      callback(null);
    }
  });
}

// /**
//  * Trains a classifier if the content of /training/classifier_id is null or empty
//  */
// function trainClassifier(callback) {
//   fs.readFile(classifierFile, 'utf8', function (err, data) {
//     if (err)
//       callback(err);
//     else if (data === '') {
//       classifierService.create({
//         language: 'en',
//         name: 'movies-' + new Date().valueOf(),
//         training_data: fs.createReadStream(classifierTrainingFile)
//       }, function(err, classifier) {
//         if (err) {
//           callback(err);
//         } else {
//           fs.writeFileSync(classifierFile, classifier.classifier_id);
//           console.log('[classifier]: classifier is being trained -- id=', classifier.classifier_id);
//           callback(null);
//         }
//       });
//     } else {
//       console.log('[classifier]: classifier already trained -- id=', data);
//       callback(null);
//     }
//   });
// }
//
//
// var train = function(cb) {
//   console.log('Training...');
//
//   async.parallel([trainDialog, trainClassifier], function (error) {
//     if (error)
//       cb(error);
//     else
//       cb(null);
//   });
// };
//
// module.exports = { train: train };
//
// // if running as an script
// if (require.main === module)
//   train(console.log);
