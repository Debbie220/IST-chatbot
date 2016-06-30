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


module.exports = function() {
  // console.log('WARNING: The TMDB_API_KEY was not specified '+
  //   'so you will be using a mock of the TMDB API responses');
  return {
    /**
     * Search for movies based on the parameters provided
     * by the user during the dialog
     */
    searchResponses: function(params, callback) {
      var results = {
        total_responses: 2,
        responses: [{
          response_id: 0,
          response_class: 'ccidpasswordresetstudent'
        }, {
          response_id: 1,
          response_class: 'equipmentrental'
        }, {
          response_id: 2,
          response_class: 'travelpackagesadd'
        }]
      };
      return callback(null, results);
    },

    getResponseInformation: function(params, callback) {
      var responses = [{
        response_id: 0,
        response_class: 'ccidpasswordresetstudent',
        response_text: 'I apologise that I cannot directly help you out with this issue but here is what you need to do; You should call (call with your phone number on file) or visit our walk-in office with OneCard or government-issued Photo ID Client must provide: ID number, full name, month and day of date of birth, full address on file, phone number on file'
      }, {
        response_id: 1,
        response_class:'ccidpasswordresetemployee',
        response_text: 'do this'
      }, {
        response_id: 2,
        response_class: 'ccidpasswordresetapplicant',
        response_text: 'do this'
      },{
        response_id: 3,
        response_class: 'equipmentrental',
        response_text: 'I apologise that I cannot help you with that at the moment, I would need you to fill out a form which I do not have currently available'
      }, {
        response_id: 4,
        response_class: 'travelpackagesadd',
        response_text: 'To add a new travel package, you would have to contact TAMIS/TEMS for support. You can click on the link and it will take you to where you can find their contact information'
      }];
      for (var i = 0; i < responses.length; i++) {
        if(responses[i].response_class == params.response_class){
          return callback(null, responses[i]);
        }
      }
      return callback(null, 'none');
    },

    /**
     * Returns movie information based on the movie_id
     */
    getMovieInformation: function(params, callback) {
      var movies = [{
        fake: true,
        movie_id: 0,
        movie_name: 'MOCK: Star Wars: The Force Awakens',
        runtime: 136,
        popularity: 8.5,
        poster_path: 'http://image.tmdb.org/t/p/w300//fYzpM9GmpBlIC893fNjoWCwE24H.jpg',
        trailer_url: 'https://www.youtube.com/embed/sGbxmsDFVnE?controls=0&amp;showinfo=0',
        certification: 'PG-13',
        release_date: '2015-12-14',
        overview: 'This is static information, check the README file in Github to '+
        'know how to use real data from themoviedb.com'
      }, {
        fake: true,
        movie_id: 1,
        movie_name: 'MOCK: Zoolander 2',
        runtime: 100,
        popularity: 4.2,
        poster_path: 'http://image.tmdb.org/t/p/w300//fnY5UDKdopZnGvzgbJIz9fAFImx.jpg',
        trailer_url: 'https://www.youtube.com/embed/U-CNKSzxIXM?controls=0&amp;showinfo=0',
        certification: '',
        release_date: '2016-02-12',
        overview: 'This is static information, check the README file in Github to '+
        'know how to use real data from themoviedb.com'
      }, {
        fake: true,
        movie_id: 2,
        movie_name: 'MOCK: Batman v Superman',
        runtime: 145,
        popularity: 7.5,
        poster_path: 'http://image.tmdb.org/t/p/w300//eJrlh2g9UGAd7R6mQAOQIIs329H.jpg',
        trailer_url: 'https://www.youtube.com/embed/nIGtF3J5kn8?controls=0&amp;showinfo=0',
        certification: '',
        release_date: '2016-01-05',
        overview: 'This is static information, check the README file in Github to '+
        'know how to use real data from themoviedb.com'
      }
    ];
    return callback(null, movies[params.movie_id]);
    }
  };
};
