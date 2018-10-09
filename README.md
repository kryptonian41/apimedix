# Apimedix

This is a assignment project for **Innovaccer's Hackercamp 2019**.

## Demo

You can view the live example [here](https://www.apimedix.herokuapp.com).

## Tech Stack Used

### Backend

1. Node.js - To set up the server
2. MongoDb
3. Axios - To make API calls
4. Cheerio - JQuery alternative for the server
   - Used for scrapping data from web.

### Frontend

1. Vue.js
2. Webpack

### Testing

Using Jest for both frontend and backend unit testing.

---

## Developement Setup

Start the backend node server by running the following command in the root directory.

> `$ npm install`
>
> `$ npm run dev`

Start Vue development server by running the following commands in a seperate terminal window.

> `$ cd client`
>
> `$ npm install`
>
> `$ npm run dev`

Default port configuration

- Node server - 4000
- Vue development server - 8080

Go to localhost:8080, the proxy is already setup so that our vue dev server can communicate with our node server.

---
