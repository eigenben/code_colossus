---
title: "Overlap of Confidence with Static Typing"
date: 2008-02-07
tags: ["Ruby Evangelism", "Ruby Language"]
description: ""
---

Since working with Ruby and other dynamic languages, I've thought a lot about the differences between statically-typed and dynamically-typed languages and what makes them different. Statically-typed languages guarantee some level of confidence of workability -- but this comes at a huge cost of flexibility, and more importantly overlaps with software testing, not making efficient use of the concept of testing.

Software testing can be used to make up for some of the lost confidence resulting from dynamic typing, yet since they must be done regardless, the outcome is suboptimal with static languages - there is an overlap between the confidence generated from static typing and the confidence generated from the test suite. With dynamic languages there is much less overlap: the test suite makes up for the confidence lost from dynamic typing, yet is also there to ensure the software works as expected.

* Jay Fields touches upon this in an interesting post here: [Static typing considered harmful](http://blog.jayfields.com/2008/02/static-typing-considered-harmful.html).
* Bruce Eckel also examines this more in depth using Python as an example [here](http://mindview.net/WebLog/log-0025), where he emphasizes "Strong test, not strong typing."
* Robert Martin is a Java programmer who asks, [Are Dynamic Languages Going to Replace Static Languages?](http://www.artima.com/weblogs/viewpost.jsp?thread=4639)

