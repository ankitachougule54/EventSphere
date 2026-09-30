Browser
   │
   ▼
public/index.html
   │
   │  <div id="root"></div>
   ▼
src/index.js
   │
   │  ReactDOM.createRoot()
   │
   ▼
<BrowserRouter>
   │
   ▼
<App />
   │
   ▼
<Routes>
   │
   ▼
<Route path="/" element={<GuestLayout />}>
   │
   ▼
GuestLayout.jsx
   │
   ├── GuestHeader
   │
   ├── GuestNavbar
   │
   ├── <Outlet />
   │
   └── GuestFooter
   │
   ▼
Matched Page

<Routes>

    <Route path="/" element={<GuestLayout />}>

        <Route index element={<Home />} />

        <Route path="home" element={<Home />} />

        <Route path="about" element={<About />} />

        <Route path="services" element={<Services />} />

        <Route path="contact" element={<Contact />} />

        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />

    </Route>

</Routes>

Route Mapping
URL	            Component	            Purpose
/	             Home.jsx	            Home page
/home	         Home.jsx	            Home page
/about	         About.jsx	            About page
/services	     Services.jsx       	Services page
/contact	     Contact.jsx	        Contact page
/login	         Login.jsx	            Login page
/register	     Register.jsx	        Registration page


# MERN Routing Flow
## 1. Complete Frontend Routing Flow

```text
                         USER
                           |
                           v
                       BROWSER
                           |
                           v
                  public/index.html
                           |
                           |
                    <div id="root">
                           |
                           v
                     src/index.js
                           |
                           v
                    ReactDOM.createRoot()
                           |
                           v
                     <BrowserRouter>
                           |
                           v
                         <App />
                           |
                           v
                     src/App.js
                           |
                           v
                       <Routes>
                           |
                           v
                  Route path="/" 
                  element={<GuestLayout />}
                           |
                           v
                    GuestLayout.jsx
                           |
             +-------------+-------------+
             |             |             |
             v             v             v
       GuestHeader    GuestNavbar    GuestFooter
                           |
                           v
                       <Outlet />
                           |
                           v
                 React Router checks URL
                           |
            +--------------+--------------+
            |              |              |
            v              v              v
         /about         /login        /register
            |              |              |
            v              v              v
        About.jsx       Login.jsx     Register.jsx

        
        
        <Route path="/" element={<GuestLayout />}>
                    |
                    +---- index route
                    |        |
                    |        v
                    |     Home.jsx
                    |
                    +---- /home
                    |        |
                    |        v
                    |     Home.jsx
                    |
                    +---- /about
                    |        |
                    |        v
                    |     About.jsx
                    |
                    +---- /services
                    |        |
                    |        v
                    |     Services.jsx
                    |
                    +---- /contact
                    |        |
                    |        v
                    |     Contact.jsx
                    |
                    +---- /login
                    |        |
                    |        v
                    |     Login.jsx
                    |
                    +---- /register
                             |
                             v
                          Register.jsx

How <Outlet /> Works
GuestLayout.jsx:
<GuestNavbar />
<Outlet />
<GuestFooter />

URL: /about

        GuestLayout
             │
     ┌───────┴────────┐
     ▼                ▼
 GuestNavbar       GuestFooter
             │
             ▼
          <Outlet />
             │
             ▼
         About.jsx

--------------------------------
        Guest Navbar
--------------------------------

          About Page

--------------------------------
        Guest Footer
--------------------------------

http://localhost:3000/login
Browser
   │
   ▼
/login
   │
   ▼
BrowserRouter
   │
   ▼
App.js
   │
   ▼
Route path="login"
   │
   ▼
<Login />
   │
   ▼
Login.jsx




----------------------------BACKEND FOLDER STRUCTURE----------------------

server2/
│
├── controllers/
│   ├── EmployeeController.js
│   ├── ItemController.js
│   └── UserController.js
│
├── middlewares/
│   └── upload.js
│
├── models/
│   ├── Employee.js
│   ├── Item.js
│   └── User.js
│
├── routes/
│   ├── EmployeeRouter.js
│   ├── ItemRouter.js
│   └── UserRouter.js
│
├── uploads/
│   └── uploaded images...
│
├── .env
├── index.js
├── package.json
└── package-lock.json                                         




















































                    USER
                     │
                     ▼
                 Browser
                     │
                     ▼
              index.html
                     │
                     ▼
                 index.js
                     │
                     ▼
              BrowserRouter
                     │
                     ▼
                  App.js
                     │
                     ▼
              React Routes
                     │
                     ▼
              GuestLayout
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
       Navbar                <Outlet />
                                │
                                ▼
                     ┌──────────┼──────────┐
                     │          │          │
                     ▼          ▼          ▼
                   Home       Login      Register
                                │          │
                                │          │
                                └────┬─────┘
                                     │
                                API Request
                                     │
                                     ▼
                              Express Server
                                     │
                                     ▼
                                   Routes
                                     │
                                     ▼
                                Controller
                                     │
                                     ▼
                                   Model
                                     │
                                     ▼
                                  MongoDB
                                     │
                                     ▼
                                  Response
                                     │
                                     ▼
                                React Page
                                     │
                                     ▼
                               UI Updated
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)




















