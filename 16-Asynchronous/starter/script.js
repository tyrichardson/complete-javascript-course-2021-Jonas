'use strict';

// HTML tag query selectors
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
     <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url) // this return makes the return of getJSON a Promise
    .then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
      return response.json();
    });
};

///////////////////////////////////////
// Vanilla JS: XMLHttpRequest
/*
const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        const html = `
     <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${+data.population / 1000000}.toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages.name}</p>
            <p class="country__row"><span>💰</span>${data.currencies.name}</p>
          </div>
        </article>
    `;

        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;

    })
}

// order received and placed on DOM is not guaranteed
getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');
*/
///////////////////////////////////////

// Control order using Callbacks
/*

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // first callback
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      // second callback, nested in first callback

      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      // Render country 1
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');
// getCountryAndNeighbour('germany');

// Callback Hell looks like this

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

///////////////////////////////////////
// Promises were the cure for Callback Hell
// Fetch was the new method for this
// don't require events/callbacks
// Asynchronous Tasks

/* Old way:
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
request.send();
*/
/*
const request = fetch(`https://restcountries.eu/rest/v2/name/portugal`);
console.log(request);
*/

// Fetch builds the promise; console.log consumes it
// Fetch returns a Promise -- at first Pending; then a status of "fulfilled" or "rejected"
/* Promise {<pending>}
__proto__: Promise
catch: ƒ catch()
constructor: ƒ Promise()
finally: ƒ finally()
then: ƒ then()
Symbol(Symbol.toStringTag): "Promise"
__proto__: Object
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: Response
body: (...)
bodyUsed: false
headers: Headers {}
ok: true
redirected: false
status: 200
statusText: ""
type: "cors"
url: "https://restcountries.eu/rest/v2/name/portugal"
__proto__: Response
*/
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) { // then method on all fetch Promises
                                // runs when Promise status is returned
      console.log(response);
      response.json() // json method on all fetch Promises is another Promise
      .then(function (data) { // returns an array; data from the Response Body
        console.log(data);
        renderCountry(data[0]);
      })
  });
}
getCountryData('portugal');
*/

// REFACTORED for simplicity
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
      return response.json();
    })
      .then(function (data) {
        renderCountry(data[0]);
      });
};
getCountryData('portugal');
*/

// REFACTORED AGAIN using Arrow Functions
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => response.json())
  .then(data => renderCountry(data[0]));
}
getCountryData('portugal');
*/

// CHAINING AJAX CALLS (Promise Chaining)
/*
const getCountryData = function (country) {
  // fetch Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // fetch Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    }) // the then methods after this fetch go on the previous .then chain, NOT on the second fetch method (which would be a nested callback)
      .then(response => response.json())
      .then(data => renderCountry(data, 'neighbour'));
}
getCountryData('portugal');
// getCountryData('germany');
*/

// ERROR HANDLING IN PROMISES (status REJECTED) (lost internet connection)
// example of handling in the .then callback
/*
const getCountryData = function (country) {
  // fetch Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response =>
      response.json(),
      err => alert(err))
  // first callback is for "fulfilled", second callback is for "rejected" (error)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // fetch Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    }) // the then methods after this fetch go on the previous .then chain, NOT on the second fetch method (which would be a nested callback)
      .then(response => response.json())
      .then(data => renderCountry(data, 'neighbour'));
}

btn.addEventListener('click', function () {
  getCountryData('portugal');
  // getCountryData('germany');
})
*/

// REFACTORED WITH CATCH METHOD AT END OF .THEN CALLBACK (Promise) CHAIN
/*
const getCountryData = function (country) {
  // fetch Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(
      response => response.json(),
    )
    // first callback is for "fulfilled", second callback is for "rejected" (error)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // fetch Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    }) // the then methods after this fetch go on the previous .then chain, NOT on the second fetch method (which would be a nested callback)
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}. Please try again.`);
    })
    .finally(() => { // this works because .catch returns a Promise with the .finally method on it
      countriesContainer.style.opacity = 1;
  })
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
  // getCountryData('germany');
});

*/

// ERROR HANDLING IMPROVED -- RETURN ALL ERRORS, NOT GENERIC ERRORS
/*
const getCountryData = function (country) {
  // fetch Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      console.log(response);

      if (!response.ok)
        throw new Error(`Country not found (${response.status})`)
          // if Promise rejected, this call the .catch at the end of the chain

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // fetch Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    }) // the then methods after this fetch go on the previous .then chain, NOT on the second fetch method (which would be a nested callback)
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}. Please try again.`);
    })
    .finally(() => {
      // this works because .catch returns a Promise with the .finally method on it
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
  // getCountryData('germany');
});
*/

// BUT WHAT ABOUT ERRORS IN THE SECOND FETCH?
// Helper function to handle repeated code: getJSON()

/*
const getCountryData = function (country) {
  // fetch Country 1
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      // if (!neighbour) return; //DOESN'T WORK FOR ISLAND NATIONS!
      if (!neighbour) throw new Error('No neighbour found.')

      // fetch Country 2
      return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong: ${err.message}. Please try again.`);
    })
    .finally(() => {
      // this works because .catch returns a Promise with the .finally method on it
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
  // getCountryData('germany');
  // getCountryData('Australia');
});
*/

// TEST EVENT QUEUES (callback queue vs priority queue -- "microtask queue")
/*
console.log('Test start'); // displayed first
setTimeout(() => console.log('0 sec timer'), 0); // displayed last
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // displayed third -- Promises get put onto the stack before regular callbacks


// add this one; it displays before the setTimeout
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 5000; i++) {
    console.log(res);
  }
})
console.log('Test end'); // displayed second
*/

// INSTANTIATE NEW PROMISES, EXECUTOR FUNCTION
// creates a new Promise, just like fetch()

// resolve and reject are functions
// resolve marks the Promise "fulfilled"; reject as "rejected"
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw is happening now!");
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN!') // argument is "res" below
    } else {
      reject('You lost your money!') // argument is error message passed to .catch
    }
  }, 2000)
})

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

*/

// PROMISIFYING setTimeout()-- refactor old callback chains into promise chains
// encapsulation
/*

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening now!');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN!'); // argument is "res" below
    } else {
      reject('You lost your money!'); // argument is error message passed to .catch
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  })
}

wait(1)
  .then(() => {
    console.log("I waited for 1 second.");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 2 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 3 seconds");
    return wait(1);
  })
  .then(() => {
    console.log("I waited for 4 seconds");
  })

  // This displays similar results as the following Callback Hell, but is easier to read, write, and maintain

  /*
  setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/
/*
// immediately create a resolved or rejected Promise
Promise.resolve("abc").then(x => console.log(x));
Promise.reject(new Error("Problem!")).catch(x => console.error(x));

DISPLAYS:
Promise {<pending>}
script.js:418 Lottery draw is happening now!
script.js:471 abc
script.js:472 Error: Problem!
    at script.js:472
(anonymous) @ script.js:472
Promise.catch (async)
(anonymous) @ script.js:472
script.js:438 I waited for 1 second.
script.js:428 You lost your money!
script.js:442 I waited for 2 seconds
script.js:446 I waited for 3 seconds
script.js:450 I waited for 4 seconds
*/

/*
navigator.geolocation.getCurrentPosition( // regular callback
  position => console.log(position),
  err => console.error(err)
);

console.log("Getting position"); // displays first
*/

// PROMISIFY the navigator call above
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position), // position is the returned object
      err => reject(err)
    );
  })
}
*/

/*
// REFACTORED
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos)); // the then handles the fulfilled promise
*/

// REFACTORED CODE FROM CODING CHALLENGE 1
// Promisifying the Geolocation API

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);
*/

// CODE CHALLENGE 2 -- loading images
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImag;

createImage('img/img-1.jpg')
  .then(img => {
    currentImag = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImag.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImag = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImag.style.display = 'none';
  })
  .catch(err => console.error(err));
*/

// ASYNC/AWAIT -- ES6 EASIEST WAY TO CONSUME PROMISES
// it doesn't build promises; only consumes them
// no writing callbacks and .then blocks to consume chained promises
// but under the hood, it is .then and promise chaining
// fetch().then(res => console.log(res))...

/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error(`Problem getting location data`);

    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // Country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );

    if (!resGeo.ok) throw new Error(`Problem getting country`);

    const data = await res.json();
    // console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`${err.message}`);

    // Reject promise returned from async function to propagate down to catch below.
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);

whereAmI()
  .then(city => console.log(`2: ${city}`))
  .catch(err => console.error(`2: ${err.message}`))
  .finally(() => console.log('3. Finished getting location'));
// Refactor from .then promise chaining to async/await

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log(`3: Finished getting location`);
})();
*/

// ADD ERROR HANDLING with TRY/CATCH (above)
/*
try {
  let y = 1;
  const x = 2;
  x = 3;
} catch(err) { // do something with err.message that is "caught"
  alert(err.message);
}
*/

// PARALLEL PROMISES -- performant loading of files
// example of loading in a series -- NOT GOOD without the Promise.all()
// Promise.all() is a Promise Combinator -- returns array if all resolve
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    /*
    const [data1] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c1}`
    );
    const [data2] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c2}`
    );
    const [data3] = await getJSON(
      `https://restcountries.eu/rest/v2/name/${c3}`
    );
    
    // if any Promise rejects, Promise.all() fails completely
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    // console.log([data1.capital, data2.capital, data3.capital]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

// PROMISE COMBINATORS
// Promise.race -- first settled Promise (fulfilled or rejected) wins and is returned as a singleton -- others are ignored.
/*
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/iceland`),
  ]);
  console.log(res[0]);
})();
*/
/*
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request too too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/denmark`),
  timeout(0.01), // this number determines if error or Denmark wins
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));
  */

/*
// Promise.allSettled -- returns array of all results of all Promises
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// whereas .all short-circuits if any of the Promises reject
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res))
 .catch(err => console.error(err));
*/
/*
// COMPARED RESULTS FROM .allSettled and .all
(3)[{ … }, { … }, { … }]
0: { status: "fulfilled", value: "Success" }
1: { status: "rejected", reason: "ERROR" }
2: { status: "fulfilled", value: "Another success" }
length: 3
__proto__: Array(0)

 Uncaught (in promise) ERROR    127.0.0.1/:1
 */

// Promise.any is from ES2021 -- returns first fulfilled Promise; ignores rejected Promises -- so will return one fulfilled or nothing
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
