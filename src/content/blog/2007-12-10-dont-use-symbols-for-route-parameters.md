---
title: "Don't use symbols for route parameters!"
date: 2007-12-10
tags: ["Rails General"]
description: ""
---

I've ran into this issue more than once: Be sure that you are using strings and not symbols when specifying parameters for routes. Particularly, if you specify a symbol for :action, Rails will fail to see your controller action yet still show your Rails view! This can sometimes be very difficult to diagnose. So, don't do this:

    map.connect '/pages/:slug', :controller => 'pages', :action => :show

Do this:

    map.connect '/pages/:slug', :controller => 'pages', :action => 'show'
