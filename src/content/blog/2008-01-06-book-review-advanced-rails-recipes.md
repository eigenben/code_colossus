---
title: "Book Review: Advanced Rails Recipes"
date: 2008-01-06
tags: ["Book Reviews", "Rails General"]
description: ""
---

I've owned the original "Rails Recipes" book by Chad Fowler for a while now and it's packed full of interesting information, but little of it I would consider "advanced". When I heard a new book by The Pragmatic Programmers called "Advanced Rails Recipes", meant to be similar in form to the previous book but explaining more advanced techniques, I was very interested. Unfortunately it seems the publish date of this book has been pushed back a few times and it is now mid-March. Luckily it is available in beta PDF form online so last night I took the plunge and decided to buy it. It's quick to read through and several of the recipes I skipped over because I wasn't particularly interested, but suffice it to say that there is a lot of good stuff in this book. Some of the content isn't very original, but some recipes really exceeded my expectations in originality and usefulness.

I won't give an outline of the book since that's available online, but let me point out a few very interesting recipes:

* Using IRB_RC to define useful shortcuts for yourself when navigating around your application with script/console.
* Efficiently storing model-backed data in constants using class-level ActiveRecord find's. Example: load all of your states into an Array when the application starts rather than loading them each time a form is displayed that needs to use them.
* Capistrano multi-environment deployments which allow you to do things like "cap staging deploy" and "cap production deploy". I've been doing this for a while with capistrano-ext but really capistrano-ext isn't even needed. Every developer using capistrano should be making use of this and a staging environment.
* Keeping database.yml and other files out of Subversion using a Capistrano after filter when deploying apps.
* Keeping certain data outside the multiple-release capistrano paradigm by symbolic linking folders within public to subdirectories in shared. This is perfect for establishing a place to upload via FTP without requiring someone to go through the SVN commit and capistrano deploy route. I've also used this before but the mechanism described in the book is more elegant.
SQL query tracing – finding out where queries are being run and what is going on behind the scenes. Could come in useful when debugging a nasty situation.
* Using a master/slave database configuration for large applications with Rick Olsen's masochism plugin.
* My favorite: Handling complex forms spanning multiple models each with possible one-to-many or many-to-many relationships using the "presenter" pattern. Essentially this allows you to have a layer of design abstraction between the controller and the models whereby you can design a "presenter" which acts as as "manager" of multiple model objects meant to be displayed using the same form. Difficult to explain in full here (buy the book!) but this sounds like a very elegant solution for more data-complex applications. I may do some refactoring with Rarenewspapers.com's back-end to use this pattern.
* The book is still in beta form and there are definitely errors. Hopefully some more recipes will also be added (I'm hungry for more!) before the book is released, but ultimately the knowledge presented in Advanced Rails recipes will be very insightful for professional Rails developers.
