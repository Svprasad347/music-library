1. BeatBoxx - Music Library App using React Micro Frontend

This project is a simple music library built using React. It follows micro frontend architecture where I created two separate React apps
- `core-app` – handles login and main layout[HOST]
- `music-library` – handles song listing, filtering, grouping, and admin features[REMOTE]

Both apps are connected using Module Federation (Vite plugin). 

-------------------------------------

## Main Features

- Login as **Admin** or **User**
- View songs and **filter, sort, group** them
- Admin can **add** or **delete** songs
- Responsive UI using **Bootstrap**
- Fully tested using **Jest + React Testing Library**
- Test coverage: `100%` lines/functions/statements

-------------------------------------------

## Project Structure

music-application/
├── core-app/
│   ├── src/
│   │   └── Authorization/
│   │       └── Login.jsx         
│   └── README.md                
├── music-library/
│   ├── src/
│   │   └── Components/
│   │       └── SongsList.jsx    
│   └── README.md                 
├── README.md                     


---

## Testing Information

I tested all important features:

- Rendering of songs
- Filter and search input
- Sorting (by title, artist, album)
- Group by feature
- Add song (admin only)
- Delete song (admin only)
- Role-based button visibility

To run tests with coverage:

`npm run test -- --coverage`

How to Run Project
Step 1: Install packages
cd core-app
`npm install`

cd music-library
`npm install`

Step 2: Start both apps 

First run music-library
Terminal 1: cd music-library
`npm run dev:music-library`

Terminal 2: cd core-app
`npm run dev:core-app`

Login Details 
1.admin → can add/delete songs 
2.user → can only view songs

UI Design
Modern login screen centered on screen

Music list is mobile-friendly

Song management UI is clean and grouped properly

Tools Used

React 18,
Vite,
Module Federation (@originjs/vite-plugin-federation),
Bootstrap 5,
Jest + React Testing Library


About Me
This is my micro-frontend React assignment.
I did everything hands-on — from setup, routing, UI, testing, and debugging.
It helped me understand micro frontend concepts better and improve my React testing skills.

Thanks for checking out my work! 