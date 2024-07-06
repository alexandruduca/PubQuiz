# <p align="center">Pub Quiz Iași</p>

## Overview
Our goal with Pub Quiz Iași is to address the primary need of the Quiz Iași event: a dedicated web application and distinct identity, as we believe this event has significant potential for growth through digitalization.

At the moment, the game results are only known at the end of the game, when the presenter publicly announces them. However, there is a lack of visual support while reporting the results, and to keep track of the data, participants frequently take down the final scores of all teams on paper. Furthermore, a client who did not attend an event is uninformed of the results, which are not made public due to the lack of a results generation mechanism.

The solution includes two user roles: regular users and administrators. Users can view pages with useful information, such as ‘About’ and ‘Frequently Asked Questions,’ providing a way to promote the Quiz Iași event for those who haven’t participated in this type of event before. The ‘Game Results’ page serves as the application's central point, allowing players to instantly view game results at the end of a session or review past results. Users can also form teams or request to join existing ones, which are managed by team leaders. Team leaders can review and accept or decline membership requests, manage current members (remove or assign as leaders), and either delete or leave the team. Furthermore, the leader is responsible for registering the team for the next event, choosing the table where the team would like to be seated. 

Administrators, on the other hand, can input new game results, including the game and season number, team names, round names, and outcomes for each round, as well as modify existing results to ensure consistency.

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
