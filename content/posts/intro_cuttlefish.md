+++
draft = false
image = "images/posts/cuttlefish2.png"
backgroundColor = "#fc0390"
date = "2018-07-30T20:11:33-05:00"
title = "Introducing Cuttlefish"
tags = ["color theory", "color palettes"]
categories = ["R", "tidyverse", "software"]
+++

I decided to try something new. I'm creating an `R` color paletting package, perhaps because I wanted to get my feet wet with color theory, perhaps because I needed an excuse to name a bit of software after all of our favorite cephalopod, the humble cuttlefish, perhaps because my only qualification is that my favorite color is yellow. Who knows what drives my distractions?  It certainly isn't my need to write my dissertation...

Let's dive right in!

Allow me to first enlighten my motivation; I really suck at creating color palettes for plots. That's the abridged version but allow me to enlighten further; I really suck at creating color palettes and it takes me longer to settle on colors for a chart than it does to make the chart, or do the analysis, for that matter. My solution? Create a package that would perform the mental grunt work for me and produce a palette that fits my particular asthetic tastes. 

Before I go any further, I think I first need to address the elephant the room, or rather the 89 elephants collectively named "there's already a package that does this". I'm looking at you, [`rcolorbrewer`](https://www.rdocumentation.org/packages/RColorBrewer/versions/1.1-2) and secretly envying you, [`earthtones`](https://cran.r-project.org/web/packages/earthtones/index.html). First, who cares? This is about self-exploration, programming practice, procrastinating on the things that really matter, learning a bit about colors and color theory... Second (for those of you dissatisified with my more hedonistic motivations), I wanted to make something that was a bit more specific to individual taste. How? Well, I thought of instead of developing discrete choices from colors that I thought might look good, how about taking an image of my choosing that, ostensibly, has an aesthetically pleasing coloration and extracting colors from it.

Boom! A problem, a solution, and still one dissertation yet to be written; all the components of a much needed distraction. 

Let me paint this picture with a couple of examples. Say that I have an image whose colors I'm drawn to, for example, the image below ([source](http://blogs.bl.uk/asian-and-african/2014/05/british-library-releases-over-200-japanese-and-chinese-prints-into-public-domain.html)). There are first a couple of conditions that I want met: 

1. The colors must be as unique as possible. In other words, starting from the first color and ending at the last color, the distance between the colors must as close to equidistant to one another as possible.
2. The colors must be drawn from the colorspace of the image provided. Colors shouldn't be intermediate values that don't exist in the image.
3. There needs to be some flexibility in the ability to choose how color palettes are created, which may or may not come into conflict with the first two bullet points above.

<img src='/images/posts/chinese_latterns.png' alt='Chinese Latterns' class='right-img'>

Neat! A blueprint to start thinking of algorithm. But, before I begin fleshing out what could be the most attention polarizing section of this post, just a disclaimer: This is just **a** solution, not **the** solution. More than likely, the following words **aren't** the best solution. At some point the dissertation has to get written and side projects have to be just that.

In order to entertain the first condition, I first need translate colors into some sort of metric that will allow them to be partitioned in geometric space. Cue HSV, or hue saturation value, which projects color hues into angular space from 0˚ to 360˚. This means that finding the most unique colors is simply calculating the max distance between color \(i\) and color \(i + 1\). This value is just another angle, which can be obtained by dividing n (or the number of colors you want in your palette) by 360˚. It's the second condition that gets a little tricky, particularly in light of condition #1. I'll ask the obvious, what if the color that is optimal distance away (optimal with respect to condition 1) doesn't exist in the image provided? For this particular problem I chose the "find the next best option" approach. Literally, if that color at that angle distance away from the color doesn't exist, then the algorithm is designed to find the closest match within proximity. I am not sure if this is the best approach but it was the solution that popped up in my brain at the moment. Ideally, with time and a bit more understanding about the distribution of colors in an image, this functionality could be replaced by something that is more desirable.

We can give this a go with the image above and see what we are working with. First, you have to obtain the `cuttlefish` package, which can be found [here](https://github.com/jcbain/cuttlefish). Load in the library and make reference to the path to your photo and then all the heavy lifting is done in the `create_palette()` function. This takes two parameters, the first is the path to the image and the second is the number of colors you want in your palette. The entire script would look something like this...

```splus
devtools::install_github("jcbain/cuttlefish")
library(cuttlefish)

cols <- create_palette("chinese_latterns.png", n=5)

# scales to display the palette
scales::show_col(cols)
```

Thanks to the `scales` package, the final line should render a color swatch with the selected colors. 

<img src='/images/posts/palette_1.png' alt='palette' class='left-img img-small'>

There is one more question that I, up until this point, simply omitted. What happens if two colors are the next best option? This is where the "S" (saturation) and "V" (value) from HSV come into play. Up until now, these values in the color were completely ignored but this scenario is bound to play out a couple times over the next millenia. The "S" and "V" gives me an out, a way to chose one over the other in the steps of the algorithm. There is a third parameter, `max.distance`, which essentially chooses the saturation and value farthest away from the original color in these respective spaces if `max.distance` is specified to be `TRUE`. `FALSE`, as you may have guessed, will return the nearest.

<img src='/images/posts/palette_2.png' alt='NPR palette' class='right-img img-small'>

Okay, so condition #1 and #2 are met, at least a rough draft, and I have even managed to drag out a caveat, but what about condition #3. You, as a user, may want to extract the most prominent colors of an image instead. Imagine a logo where the number of colors are limited to only a few. I'm imagining the NPR logo...the classic blue, orange, white and black. In this scenario, I would want to turn off the mechanism that makes conditions #1 and #2 tick and instead get the most prominent colors (*prominent* here refers the color with the most pixels) of the image. Well, the `create_palette()` function comes with a parameter, `prominent.ord`, that when set to `TRUE` will do just that. Below's some sample code to help you visualize...

```splus
cols <- create_palette("npr_logo.png", n = 4, prominent.ord = TRUE)

scales::show_col(cols)
```

And there you have it! That's `cuttlefish` in its current condition. Sure, there isn't a lot of functionality but it is new and I supposedly have more important things to work on. But don't worry, this is just the beginning of this project that will be expanded upon as I begin to understand colors a bit more.



