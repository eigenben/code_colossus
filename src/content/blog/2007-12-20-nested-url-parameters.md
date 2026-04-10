---
title: "Nested URL Parameters"
date: 2007-12-20
tags: ["Rails General", "Rails Plugins", "Rails Techniques"]
description: ""
---

One of the great things about Rails is the ability to wire together form logic with extreme ease through Rails' support of essentially representing hashes through the "object[name]" syntax of URL parameters. Arrays are also supported in a similar manner, making things like many-to-many relationship management cake.

In Rails 1.2 one issue I ran into is that this hash-based access logic cannot be nested when using helpers such as url_for (which is in turned used by helpers such as link_to, etc.) This type of functionality is rather useful when you are trying to encapsulate a set of name-value pairs within one "thing", such as a "search" which is many criteria => value pairs. For a particularly project of mine I established a pretty nice design pattern for working with searches and results in a very abstract manner, an area of Rails that I generally find underdeveloped with no standard practice.

I was lucky to stumble on a Rails plugin that monkey-patches Rails to support this: nested_params_patch. Information about this plugin is quite sparse but this article does a good job of better-explaining what the plugin does. Essentially it allows you to do things like this:

    person_url(:name => {0 => 'Ryan', 1 => 'Kinderman})

Pretty cool stuff! I am always amazed and the kind of plugins and extensions that are possible, all resulting from Ruby's dynamicism and Rails' heavily extensible architecture.
