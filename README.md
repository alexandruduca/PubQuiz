# <p align="center">Pub Quiz Iași</p>

## Overview
The objective of the application is to digitize each aspect of the physical event Quiz Iași, from reservation to a new event and tracking game results based on season and game number to presenting and advertising the event to potential new participants.

The solution includes two types of users: regular users and administrators. Users can view pages with useful information, such as ‘About’ and ‘Frequently Asked Questions,’ providing a way to promote the Quiz Iași event for those who haven’t participated in this type of event before. The ‘Game Results’ page is the central point of the application, allowing players to  immediately view the results of a game by rounds at the end of a session or any results from the past. Additionally, users can create a team or request entry into an existing team, which will be managed by the team leader. The team leader can view and accept/decline new joining requests, manage existing members (removal, assignment as leader), delete or leave the team. Furthermore, the leader is responsible for registering the team for the next event, choosing the table where the team would like to be seated, and handling payment. On the other hand, the administrator can enter new game results, including the number of the game and season, the teams, the names of the rounds, and the outcomes for each team for every round and also modify existing results, offering consistency for each game.

## Tech Stack
Frontend:
<ul>
  <li>React</li>
  <li>TypeScript</li>
  <li>Redux Toolkit</li>
  <li>Redux Saga</li>
  <li>React Router</li>
  <li>i18n</li>
  <li>Material UI</li>
</ul>
Backend:
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>MongoDB</li>
  <li>Mongoose</li>
  <li>JWT</li>
</ul>

## Application and Database Architecture
The application follows the Three-Tier Architecture, dividing it into three logically distinct layers:
<ul>
  <li>presentation: it represents the software's visual and interactive aspects, providing a well-designed interface for users to interact with the underlying technology.</li>
  <li>logic: containing the business logic of the program and acting as a bridge between the user interface and data storage to process data.</li>
  <li>data: managing, retrieving, and storing data.</li>
</ul>

The diagram below represents the database architecture, detailing its primary components and their interactions.
<div align="center">
  <img src="https://i.imgur.com/gE0pXUz.png" alt="database architecture" height=500px>
</div>

## Presentation
<ul>
  <li>
    <a href="https://youtu.be/_ON2usJ9pRI">User Features</a>
  </li>
  <li>
    <a href="https://youtu.be/ov129FCOunU">Admin Features</a>
  </li>
</ul>
