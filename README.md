# Project OOP

## Table of Contents

1. About the Project
   - purpose
2. Built With
3. Getting Started
   - Prerequisites
   - Installation
4. Description and Usage
5. Roadmap
6. Contributing
7. Licences
8. Contact
9. Acknowledgements

## 1. About the Project

### Purpose

Poker: The purpose of this web application is to provide the user with a simplified poker game.

Color: The purpose of this web application is to provide the user with an easy-to-use color-creator.



## 2. Built With

HTML
CSS
Typescript
npm
Vite
GitHub


## 3. Getting Started

### Prerequisites

1. An IDE like e.g. VS Code or IntelliJ
2. Node.js, npm, Vite
3. Web browser, e.g. Google Chrome.
4. The HTML-documents requires links to the following style-sheet and javascript-file.
<link rel="stylesheet" href="src/styles/poker.css">
    <link rel="icon" href="src/icons/class-scene-svgrepo-com.svg" type="image/svg">
    <script defer type="module" src="src/main.ts"></script>
    <script defer type="module" src="src/modules/poker-controller.ts"></script>
5. Access to https://github.com/hobornemann/OOP

### Installation

1. The project is public. 
2. Log in to GitHub and clone the project:
   https://github.com/hobornemann/OOP
3. Make sure that any new html-pages include the following css-links and javascript-links:
<link rel="stylesheet" href="src/styles/poker.css">
    <link rel="icon" href="src/icons/class-scene-svgrepo-com.svg" type="image/svg">
    <script defer type="module" src="src/main.ts"></script>
    <script defer type="module" src="src/modules/poker-controller.ts"></script>
4. Launching the web application: In VS Code, standing in the Terminal window, you type: npm run dev
Ctrl+click on the link http://localhost:xxxx/
The application opens in your web browser.
If you try to open the application in the Live Server, it will not work. 
The package.json needs to include the following two dependencies (or later versions thereof): 

 "devDependencies": {
    "typescript": "^5.2.2",
    "vite": "^5.1.4"
  }

## 4. Description and Usage

### Description



The web application consists of two 'single-page applications':

Poker:

The Poker application provides the user with a simplified Poker-game. 

- User prompts:  The user is prompted to provider the number of players as well as their respective names.

- Interactivity during game: The user is prompted to decide which two cards each player should throw away before receiving two new cards. 

- Console application: The web app does not really have any user interface. The user needs to check the console to understand what is happening in the game.

- Offline functionality: Has not been added

Color:

The Color application provides the user with a simple color-creator app. 

- User input:  The user provides the values for the colors red, green, blue (each 0-255) and optionally a value for opacity (0-1)

- Interactivity: When submitting the input values, the color of the background changes to the color created. 

- Conversion:  The app also provides a conversion to the corresponding hex-color string. 



### Usage

1. Type Safety / Potential Bugs:
- Since 100% of the code-base has been written in Typescript, I have minimised the number of potential problems that may arise. 

2. Color-App:  Intuitive Navigation and Interaction:

-  The usage of labels and input fields makes it easy for the user to understand how the app works. 

3. Poker-App:  Not so intuitive

-  Although the prompts are intuitive for the user to react to, the user is asked to check messages in the console to understand what is happening in the game. This is not very user-friendly and would need to be fixed by implementing a good UI before releasing the app. 


### Code

The code/mark-up/assets can be found in the following files / folder:

HTML:                               index.html, color.html
Style:                              style.css 
Types:                              poker.d.ts, index.d.ts
EventListeners:                     main.ts, color.ts
Functions:                          poker-controller.ts, poker-model.ts 
Files excluded from repo:           .gitignore
README:                             README.md
Icons:                              icons folder
Dependencies:                       package.json
Package-lock:                       package-lock.json
Typescript Configuration:           tsconfig.json
Installed packages/modules          node_modules folder


### Code Review 

In this section, I will provide some comments on the project and code, i.e. what I perceive to be the strengths and weaknesses. 

1. Strengths

a) Typescript:
100% of the code base has been written and type-checked in Typescript. No outstanding errors.

b) Color: Design and usability:
The clean design and the intuitive interaction functionality makes it easy for the user to understand the the color-creator application.



2. Improvement Potential

a) Poker: User Interface

b) Offline capability:
The use of a service worker would improve the user experience quite a bit. This should be part of future roadmap.

c) Testing:
> The application has not been properly tested. The project lacks both unit tests and proper UI-test. 

d) Error handling:
> Although try-catch blocks have been added, error handling may still be a weakness of the project at this point.

e) Language
> The app is targeting a English speaking audience, but will probablly be understood by most people. 
 
f) Code-functionality
> I had finished task 1 - 7 and they worked as they should.
> I did not manage to finsish task 8 on time, nor did I manage to implement proper error handling. 


## 5. Roadmap 

There are many outstanding things to do before publishing this project:
- finsish code, error handling, UI etc



## 6. Contributing

Any suggestions for improvements, further developments of the project or other contributions are more than welcome.

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 7. Licences

No licences are required for development or publication of this web application. 

## 8. Contact

Project assignment designed by:
Sandra Larsson
Sandra.Larsson@ChasAcademy.se

Project developed by:

Hans-Olov Bornemann
hans-olov.bornemann@chasacademy.se

Project-link:
https://github.com/hobornemann/OOP

## 9. Acknowledgements

Many thanks to Sandra Larsson for providing the project specification, description of required functionality as well as the design guidelines of this application.

Thanks also to the following communities/organisations/companies for providing open source and/or free version of their services/products:

Developer.Mozilla.org
GitHub
Microsoft




