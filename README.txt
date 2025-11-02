Hello to the person who will be committing in this code.
We will break this down step by step :>



[1] Before you access the site, you need to download the following things:

- Node  
- npm

For these two, I suggest you watch how to download this. This is a good video
https://www.youtube.com/watch?v=kQabFyl9r9I


[2] Next, go to the updi-ko-app folder. You will probably be overwhelmed with how 
loaded with files and folders it is. Do not worry. The only important thing you will touch is 
the src folder. 


[3] Open the terminal. Make sure that the terminal is in the directory of the src folder. 
In the terminal, type     npm start 

This will start a live server.


[4] The src folder contains the following files / folders:

- images folder         stores images 
- json folder           stores json files
- sections folder       all the raw HTML, CSS, JS for each section in the app (Home, Map, Account, etc.)
- App.css               CSS file for App.js
- App.js                JSX (HTML and JS) file of the App Component
- index.css             Global CSS (imported a lot to get global values and styling)
- index.js              Do not touch this :>

React works on a component driven architecture, where we create components in javascript with JSX (Javascript HTML).
Working with React and JSX is so different from vanilla Javascript and HTML, so it is better to learn about the basics of React.
Learn about working with components, nesting components, css, imports, and hooks (this one sucks >~<).

App.js is the component that controls the section rendered. As it stands, it contains states for the current section the user is in
as well as the selected service that the user chose 

The sections rendered are in the sections folder.
- start-section folder contains all files (CSS and JSX Component) of the Home Section of the app.
- map-section folder contains all files (CSS and JSX Component) of the Map Section of the app.

More docs will be put in the Javascript codes. Start with App.js 
Hope you can understand. If not, then call me XOXO.




Note: The 4th one is not a step, but it is better if you understand the folder structure ;>
Note 2: If by all means, this docs fails. I am so sorry.





               



