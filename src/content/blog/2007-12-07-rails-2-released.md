---
title: "Rails 2.0 Released!"
date: 2007-12-07
tags: ["Rails General"]
description: ""
---

So today Rails 2.0 was finally released; it seems as though the Rails core team has been polishing this up for ages. I don't think there's a whole lot to get excited about. In short, Rails 2.0 gives you better opportunity to make use of best practices, such as using the will_paginate plugin instead of build-in pagination (Rails 2.0 drops pagination support from core). Support for RESTful development is much improved, allowing more flexible route declarations and finally dropping the annoying semicolon separator for the edit action: projects/1;edit.

One very cool feature that should better allow developers to present meaningful error messages to users upon exceptions is the new rescue_from class method in ActionController::Base, which allows you to specify an exception class to rescue and an action to call to handle the error.

A few of my disappointments of Rails 2.0 is that my two most pressing present concerns with Rails were not addressed:

A cohesive way of managing "fixture-like" data in an application. While simple Rails applications can rely on fixtures just fine, real production applications are not quite this simple and may rely on different sets of data that distinguish between semi-permanent "application" data and true test data. Multiple this by the dimension of multiple deployment environments (staging, production) which each may require different sets of data. I typically end up writing my own rake tasks and duplicate the fixtures data for specialized uses. It would be nice to see Rails provide an effective and standardized mechanism for being more flexible with "fixture-like" data rather than forcing us to use one inflexible "fixtures" directory.
Using the :include class in ActiveRecord finders creates severe limitations on the type of data you can get back. There have been numerous situations where I've wanted to use :include to get an object tree populated from one query yet still return an aggregation result in the select clause. A perfect example is listing forum threads, showing the number of comments but also including the user data who posted the thread. This is currently impossible with ActiveRecord because the select clause cannot be used with the include clause.
I plan on talking more about these two main issues for me in future posts, hopefully soliciting some responses. I haven't found anything that adequately addresses my concerns.

Ultimately Rails 2.0 is sprinkled with various small changes rather than a fundamental architectural shift. As a result, it should be fairly easy to upgrade existing applications to Rails 2.0 and would probably be a good idea to do so, especially to force yourself to abandon bad practices that Rails 2.0 is less tolerant of.

One piece of reading that I would highly recommend if you already are familiar with Rails 1.2 and want to get up to speed on Rails 2.0 is the Peepcode PDF available here. I've found some of the Peepcode screencasts to be annoying slow an drawn-out, but this PDF is a must-have, packed full with the information you want to know, and quick to read.
