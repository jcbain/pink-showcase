+++
draft = false
image = "images/posts/cuttlefish2.png"
date = "2018-07-30T20:11:33-05:00"
title = "Introducing Cuttlefish"
tags = ["color theory", "color palettes"]
categories = ["R", "tidyverse", "software"]
+++



I created something new. Actually, I <u>am creating</u> something new and I am proud to say that I finally got to name something after my favorite cephalopod, the humble cuttlefish. Don't know what a cuttlefish is? 

They're basically chameleon squids but more chameleon than a chameleon and more squid than a squid and they obviously can do things with color that hummingbirds do with flight.

`cuttlefish` (you can find the repo [here](https://github.com/jcbain/cuttlefish)) is a package in which you can take your favorite images and extract the colors from them to form a color palette. Right now there is one main function that you would use to do this with two different methods of color extraction, which is what the remainder of this post is about. *I know, you were hoping for more animal gifs.*

Imagine we have the following image.


<img src='/images/posts/chinese_latterns.png' alt='Chinese Latterns' class='right-img'>

The print is Chinese and the artist is unknown. You can read up more about the piece [here](http://blogs.bl.uk/asian-and-african/2014/05/british-library-releases-over-200-japanese-and-chinese-prints-into-public-domain.html). The colors are simply perfect for demonstrations purposes. 

We start this out like we start out most...install the package. 
```splus
devtools::install_github("jcbain/cuttlefish")
```

Next, we load it up.
```splus
library(cuttlefish)
```

Then you simply call the `create_palette()` function with a path to the image and the number of colors you want to extract.
```splus
cols <- create_palette("chinese_latterns.png", n=5)

# scales to display the palette
scales::show_col(cols)
```
<img src='/images/posts/palette_1.png' alt='palette' class='left-img img-small'>

Note, if you are following along, you might realize that the color palette you were given is different than the color palette that I'm displaying here. That is because `cuttlefish`'s `find_segments` function randomly picks a color from all of the unique colors in the image as a starting point. These colors are represented in the HSV (hue saturation value) color space because the color hues are projected onto an angular dimension from 0˚ to 360˚. This is important because I wanted to maximize the distance between segments to avoid overlap in colors when segmenting the color palette. In other words, I wanted colors to be 360˚/n away from one another. Now, you may be asking, "What if there isn't a color that is 360˚/n away from color *i*?" Well, I simply take the closest color to that distance away from color *i*. Now you could be thinking, "What if multiple colors are equidistant?" Simple, since all colors are unique from the possible selection, you can either take the farthest in terms of saturation and value of the subset of close colors or the closest by specifying `max.distance` parameter. `TRUE` will return the most distant by saturation and value and `FALSE` will return the nearest.  This was a design decision and some might want colors of a more similar saturation. For example, you could do

```splus
cols <- create_palette("chinese_latterns.png", 5, max.distance = FALSE)
```

Now, occasionally images won't contain a distribution of a lot of colors (although the image probably has a bunch of unique colors). This is often the case with logos. For this, using the default segmentation above might not provide what is wanted. Instead, I've built an option to find the most prominent colors in the image by simply specifying `prominent.ord=TRUE` in the `create_palette` function. Take the NPR logo for instance.

<!-- <img src='/images/posts/npr_logo.png' alt='NPR logo' class='right-img'> -->


```splus
cols <- create_palette("npr_logo.png", n = 4, prominent.ord = TRUE)

scales::show_col(cols)
```

Would provide...

<img src='/images/posts/palette_2.png' alt='NPR palette' class='right-img img-small'>



I know that there isn't a whole lot of functionality quite yet but I will be building it up over the months to come. There is one final bit though before closing up this post. Like any respectable and non-respectable `R` package, `cuttlefish` needed a hex sticker so a hex sticker I created...which is the blog image for this post!

<!-- <img src='/images/posts/cuttlefish2.png' alt='cuttlefish sticker' class='left-img'> -->


