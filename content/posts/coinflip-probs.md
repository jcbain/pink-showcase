+++
draft = false
image = "images/posts/chi_right.gif"
backgroundColor = "#fcba03"
date = "2018-06-18T23:30:12-05:00"
title = "Coin Flip Probability with Python"
tags = ["probability"]
categories = ["python"]
+++

I would like to extend a sincere thank you to David Robinson for ruining my productivity this evening. Normally, Twitter is my study population, which makes thumbing through tweet after tweet field work 🤷‍♂️. But this evening I stumbled across this gem that set me off into a trajectory that had nothing to do with my conventional social media ventures, you know identifying hate speech or building computational linguistic models. Below is the tweet in question...

{{< tweet 1008409373423611904 >}}

I'm no statitician but I am generally dealing in probability daily and, admittedly, this one got me. To summarize, when using a fair coin, getting two heads in a row takes 6 flips on average while getting a heads and then a tails only takes four. What isn't written but implied in this tweet is that this phenomenon is unintuitive. 

The second section of his tweet is a simulated demonstration using `R`, which brings me to the crux of this post. I don't really intend on explaining **why** this phenoment occurs but rather whether I can translate this simulation to another popular "data science" programming language, `python`. Spoiler alert, it can be done. Additionally, can I extend the functionality to match any arbitrary sequence of flips? Hmm... let's find out whether I would tease something in a post and not deliver some sort of solution. 

First things first, I need a function to simulate the flipping of a fair coin. I could just return `true` or `false` but I often find being more explicit with respect to a certain task makes reading the program easier as time passes.

```python
import numpy as np

def flip_coin():
    """Simulate flipping a coin.
    
    Returns
    -------
    str
        "H" for heads/ "T" for tails.
    """
    flip = np.random.binomial(1, .5, 1)
    if flip[0] == 1:
        side = "H"
    else:
        side = "T"
    return side
```

Then I need a function to flip the coin multiple times and to stop only when a certain sequence of sides were met. In other words, stop when two heads were flipped in a row. From this, I want the number of times it took to achieve this sequence to be returned.

```python
def flip_condition(stop_condition=['H', 'T'], print_opt=False):
    """Flip coin until flip pattern is met.
    
    Parameters
    ----------
    stop_condition: list
        The sequence of flips to be matched before flipping stops.
    
    print_opt: bool
        Option to print the sequence of flips.
        
    Returns
    -------
    int
        The number of flips it took to match the pattern.
    """
    flip_list = []
    
    current_index = 0
    current_condition = None
    while current_condition != stop_condition:
        flip_list.append(flip_coin())
        if len(flip_list) >= len(stop_condition):
            current_condition = [flip_list[i] for i in range(current_index - len(stop_condition) +1 , current_index + 1)]
        else:
            pass
        current_index +=1
        
    if print_opt:
        print(flip_list)
    return current_index 
```

This also includes an option to print the sequence (in case you want to check my programming...I would 😜). And then I just run it many times and take the average for both conditions.

```python
mean_ht = np.mean([flip_condition(['H', 'T']) for i in range(10000)])
mean_hh = np.mean([flip_condition(['H','H']) for i in range(10000)])

print("Average # of flips to achieve heads and then heads again: {}".format(mean_hh))
print("Average # of flips to achieve heads and then tails: {}".format(mean_ht))

# Average # of flips to achieve heads and then heads again: 6.0081
# Average # of flips to achieve heads and then tails: 3.9829
```

Looks like probability holds up in `Python`! Oh, but I also created the function to capture any pattern. How about heads, tails, heads?

```python
np.mean([flip_condition(['H', 'T', 'H']) for i in range(10000)])

# 9.9231
```

or heads, heads, heads

```python
np.mean([flip_condition(['H', 'H', 'H']) for i in range(10000)])

# 14.1544
```

Well that was neat! 🦖🦕

If you want to play around with the code, I've posted in this notebook [here](https://github.com/jcbain/fun_side_projects/blob/master/hh_probs/coin_flip_props.ipynb)
