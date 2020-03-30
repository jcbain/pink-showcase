+++
draft = false
image = "images/posts/cuttlefish2.png"
backgroundColor = "#8c34eb"
date = "2018-07-30T20:11:33-05:00"
title = "Introducing Cuttlefish"
tags = ["color theory", "color palettes"]
categories = ["R", "tidyverse", "software"]
+++

I decided to try something new. I'm creating an `R` color paletting package, perhaps because I wanted to get my feet wet with color theory, perhaps because I needed an excuse to name a bit of software after all of our favorite cephalopod, the humble cuttlefish, perhaps because my only qualification is that my favorite color is yellow. Who knows what drives my distractions?  It certainly isn't my need to write my dissertation...

Let's dive right in!

Allow me to first enlighten my motivation; I really suck at creating color palettes for plots. That's the abridged version but allow me to enlighten further; I really suck at creating color palettes and it takes me longer to settle on colors for a chart than it does to make the chart, or do the analysis, for that matter. My solution? Create a package that would perform the mental grunt work for me and produce a palette that fits my particular asthetic tastes. 

Before I go any further, I think I first need to address the elephant the room, or rather the 89 elephants collectively named "there's already a package that does this". I'm looking at you, [`rcolorbrewer`](https://www.rdocumentation.org/packages/RColorBrewer/versions/1.1-2) and secretly envying you, [`earthtones`](https://cran.r-project.org/web/packages/earthtones/index.html). First, who cares? This is about self-exploration, programming practice, procrastinating on the things that really matter, learning a bit about colors and color theory... Second (for those of you dissatisified with my more hedonistic motivations), I wanted to make something that was a bit more specific to individual taste. How? Well, I thought of instead of developing discrete choices from colors I thought my look good, how about taking an image of my choosing that, ostensibly, has an aesthetically pleasing coloration and extracting colors from it.

Boom! A problem, a solution, and still one dissertation yet to be written; all the components of a much needed distraction. 

Let me paint this picture with a couple of examples. Say that I have an image whose colors I'm drawn to, for example, the image below ([source](http://blogs.bl.uk/asian-and-african/2014/05/british-library-releases-over-200-japanese-and-chinese-prints-into-public-domain.html)). There are first a couple of conditions that I want met: 

1. The colors must be as unique as possible. In other words, starting from the first color and ending at the last color, the distance between the colors must as close to equidistant to one another as possible.
2. The colors must be drawn from the colorspace of the image provided. Colors shouldn't be intermediate values that don't exist in the image.
3. There needs to be some flexibility in the ability to choose how color palettes are created, which may or may not come into conflict with the first two bullet points above.

<img src='/images/posts/chinese_latterns.png' alt='Chinese Latterns' class='right-img'>

Neat! A blueprint to start thinking of algorithm. But, before I begin fleshing out what could the most attention polarizing section of this post, just a disclaimer: This is just **a** solution, not **the** solution. More than likely, the following words **aren't** the best solution. At some point the dissertation has to get written and side projects have to be just that.

In order to entertain the first condition, I first need translate colors into some sort of metric that will allow them to be partitioned in geometric space. Cue HSV, or hue saturation value, which projects color hues into angular space from 0˚ to 360˚. This means that finding the most unique colors is simply calculating the max distance between color \(i\) and color \(i + 1\). This value is just another angle, which can be obtained by dividing n (or the number of colors you want in your palette) by 360˚.







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


