# Natural Wanderer

## Project Brief


In one week, build a full-stack app MERN app with CRUD functionality, working solo, in a pair, or in a group of three. I was in a group with Mike Edwards and Hannah Tinacci, all of whom have missed travel, nad have a love for the outdoors

## Link to Deployed Project
https://natural-wanderer.netlify.app/

![gif overview of project](https://media.giphy.com/media/brzYagmlnnrFwpwDgE/giphy.gif)

## Overview and Concept
During lockdown we have had a lot of time to think about places to go, and fawn over national parks and wild spaces that people have been enjoying in their own backyard. The initial concept for the app was to build a clone of the UK National Parks website, focusing on what is in our own backyard! I am a huge advocate for the natural beauty in the uk, and take every opportunity to get out into the national parks. Soon after we started building out our wireframes however, we decided to expand the scope, and make the site into a more global site, and build in an almost trip-advisor like element with comments and recommendations for the park. The aesthetic for the site was to be clean, simple and easy to use, and in order to achieve this we settled on Semantic UI as our framework. 
![screenshot of homepage ](readme-components/screenshot-of-home.png)

## Technologies Used
* Node.js
* MongoDB
* Express
* React
* JavaScript
* CSS
* Semantic UI
* GitHub
* Heroku
* Netlify

## Approach Taken

The idea for the project came to us whilst we discussed our interests, and started to think up a theme for our project. We are all fond of travel, and I was keen to incorporate some natural/outdoorsy element to the project. Once we had settled on a project concept, we started to write our pseudocode, with post-MVP features listed in order of preference, and wireframes of design layout and user flow were made. We started a Trello for visibility, task assignment and assessment of priorities, and a Google Sheet for collecting information for our database. We outlined our models, and tried to plan out all of the models we would need to achieve the functionality we had planned. 

As soon as we had finished our planning we decided to tackle elements of the project individually. We split the work up by issuing tickets on Trello. This was a very efficient way to manage the workload, and as such we were able to get the backend finished quickly and helped us reach MVP ahead of schedule. During the day, we coded on our own sections, but stayed in a zoom room together to allow for quick consults if we hit a roadblock in our code. This was very beneficial, and allowed us to bounce ideas around if we got stuck. We had regular stand-ups as a group to merge the project together, and discuss any problems we had had, or any ideas to add to the project. I really enjoyed working in the team, and the level of independence was a  big benefit to this way of working. 

Once the backend was done, there were a few sections that I became responsible for, and these are the areas that I would work on during the day and in the evening when not adding to our seeds file, which ended up being a monumental job! 

The first page that I worked on was the park show page. This is where the information for an individual park was displayed. This page has several key pieces of functionality. Before I started working on the functionality of the page however it was important to get the information rendering for the correct parks. This was done by pulling information about the specific park from the database. In order to do this, I used params from ‘react-router-dom’ to access the ID of the park from the URL. This allowed me to make a get request using the park's unique ID so that the information populated related to the correct park. Once the information was pulled in, it was just a case of displaying the data on the page in the JSX, most of it did not even need to be mapped through before it could be displayed. 


