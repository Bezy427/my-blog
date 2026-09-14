# Blog API

A full-stack blog application built with Spring Boot, MySQL, React, and Tailwind CSS.

## Features

User registration and authentication.
JWT-based authentication
Access and refresh token flow
Create blog posts
View blog posts
Update your own posts
Delete your own posts
Ownership-based authorization
Form validation
Loading and error states
Responsive React interface
RESTful API Architecture

# Tech Stack

## Backend

Java
Spring Boot
JWT
Spring Data JPA
MySQL
Maven

## Frontend

React
React Router
Tailwind CSS
Vite
JavaScript

# Architecture

## Authorization

Authenticated users can create posts.

Users can only update or delete posts that the own.

Authorization is enforced on the backend rather than relying on the React interface.

# Running the project

## Backend

Configure the required database and JWT environment variables, then:

mvn spring-boot:run

## Frontend

Create .env:

VITE_API_URL=http://localhost:8080

Then install dependencies:

npm install

Start the development server:

npm run dev

The frontend runs on:

http://localhost:5173

## Future Improvements

Comment API
Comment management
Pagination
Search
Post categories
Image uploads
Admin functionality
Automated testing 