---
title: "New SliceHost VPS"
date: 2008-02-02
tags: ["Personal"]
description: ""
---

Until now I've been running a my personal sites and a few other random sites I host on a dedicated box running CentOS 4 and Plesk.  Last week I took the plunge for a SliceHost VPS and decided to configure everything myself and try to squeeze it all on a 256MB slice for $20/month.  Although there isn't anything specifically about SliceHost that makes it well-suited for Rails hosting (after all, it's just a Linux VPS - put whatever you want on it), the SliceHost guys are Rails developers and the documentation available on articles.slicehost.com is geared towards Rails production environments.

I wanted to use the switch as a learning experience with setting up a cluster of mongrels behind Apache 2.2, a setup I've never tried before.  I've used FastCGI with Apache and Nginx proxying to mongrel clusters, but I was looking for a more powerful setup using Apache as the front-end web server.  So I configured Apache 2.2 (with the Debian layout, much different than the "conventional" layout) with mod_proxy_balancer and PHP.  MySQL and Apache were fine-tuned to run with the smallest memory footprint that is practical.  Apache is proxying to a cluster of mongrels hosting BenHughes.name (which will eventually be a larger site) and a new Facebook application I'm currently developing.

To reduce the memory requirement, and because I find it a better piece of software, I switched this blog and my economics blog to WordPress running as PHP within Apache.  I toyed with the idea of keeping these on Typo and Mephisto, respectively, and running them with just one mongrel instance, but doing so would really eat up my memory on my 256MB slice quickly.  WordPress is pretty nice and has a much larger community of people developing themes.

I also moved my two Subversion repositories over (one private, one public and yet to be used: http://svn.railsgarden.com/).  Previously I was hosting DNS and E-mail which was just a hassle, so I decided to switch all of my domains to Google Apps and host the DNS at SliceHost, maintainable through their management portal. 

I have to say I've been exceedingly happy with SliceHost thusfar - their management portal is simple and to-the-point with no BS.  They have dedicated resources and do not oversell.  $20/month for what I'm getting is a pretty darn good deal - it feels good to continue having root on my own Linux system out there in a data center.  Hell for $20/month a VPS is a great way to just fool around with and learn with.  I may get another slice just for that purpose.