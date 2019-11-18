# Design thinking:

## Initial design thoughts

At the outset, when thining about how to implement this task, I had a major constraint to consider. Due to storm damage, I had no internet access at home, and I expected to be doing most of the dev work there.
With that in mind, I spent some time (at the nearest public wifi hotspot) trying to figure out feasible ways of using the various map views offline. I could easily download some geojson data from OpenStreetMaps. What was less easy was figuring out a component suitable for rendering that geodata.
Past experience lead me to believe that the Google Maps component would not be suitable for offline use. Research suggested the same of TomTom and MapBox, both containing calls to tiling endpoints. So I settled on trying Leaflet and D3.

Leaflet initially looked very promising. It could handle geodata directly, and the tiling interface was customisable. But not optional, I discovered. After trying several alternatives, I found that even when connected online Leaflet was not rendering my geodata as expected.

D3 can operate totally offline, as it is a low-level rendering library. But it meant I would need to implement the out-of-the-box features of the other compoents. But I'd used D3 in the past and was fairly confient that this could be made to work well enough in the timeframe.
However, while D3 could render the geodata, the results were surprisingly ugly!

This lead me to my next fall-back idea: to create my own map data, and use D3 to render it as a dynamic SVG image. That was more low-level than I'd like, but also gave the greatest degree of control. And of course was totally workable offline. So that is what I opted for.

## Implementation 1

I chose to implement four main screens or views:

- Home: to show the initial map and a list of selected destinations;
- Search: to show a search input plus a list of matching addresses;
- Pick: to show the full-size map with cross-hairs to locate user's current position;
- Directions: to show the final tour sequence, plus a map with tour paths;

I used a standard React/Redux framework to set up the initial App with a Redux-based view-switching mechanism. Having the four main views available made for easier trials and dev at the outset. I also mocked up a promise-driven api to return the geodata and address lists for the autofill of search screen.

First up for development was the home screen: mainly populating and displaying the list of test destinations.
This also involved the trials with Leaflet, as mentioned above.

I abandoned the idea of teh api returning the snapshot of geodata I'd obtained from OpenStreetView, and instead returned randomly generated data. This was easier to tweak during development.

I began exploring how to integrate D3 into React, and opted to put D3's rendering into a `useEffect` function. This worked very well overall.

## Implementation 2

I did the next round of dev offline, as expected. I implemented the search screen, calling the api for addresses once the search string was two or more characters. The Home screen's ListRow component looked like a good candidate for reuse here, so I moved it into its own file.

I also implemented a debounce function, but never got to adding it in. Thats something to do: add a mock delay to the api call and handle slow responses.

Final tweak for this round was to get the Home and Search screens working. Clicking on a Search result now adds it to the Home screen's list of destinations. And clicking on a destination removes it from the list.

## Implementation 3

It became clear that having dynamic mock data was not helpful. So I modified the code to create and export a snapshot of random data, which then remained constant. I had decided to use a map that was one big grid, with 'Manhattan distances' between all points. That made the basic check of tour length simpler. I assume that the online APIs for a real-world app would provide the shortest distances between any two points. This was my way of handling a similar problem without the benefit of that API.

The first attempt at solving the TSP worked well. This was a brute-force approach that searched all permutations of the intermediate locations, checking for the shortest overall tour. That seemed to work fast enough for tours of up to 10 or so locations. Subsequent work used a nearest-neighbour approach to handle larger arays - not optimal, but generally good.

Also I had some issues with how D3 and React interacted, when it came to handling zoom and pan actions. So there was some trial-and-erroring going on with the map reducer to see if central control would work. This was necessary when it came to implementing the Pick screen.

Finally I implemented the timeout requirement. This meant adding a messaging feature to the app. I opted to use polling via one interval timer rather than cancelling and reinstating a series of timeouts, just because this was a simpler tidy-up on app exit. Also there was not obvious need for the interval to be fast, so it had minimal load on the browser.

## Implementation 4

Final changes to the app prior to submission. I'd given myself a limit of about 16 hours, and at this point was looking at more like 17 with this doc still to write.

I completed the Directions display to my satisfaction. This included modifying the TSP solver to return a promise, rather than blocking. In a case where the code ran slowly (for around 9 destinations) the Directions screen displays a 'please wait' type message. This could be improved to show a loading icon instead.

The zoom and pan of the Pick screen map works nicely now. The trick is to avoid making the SVG into a React component. What worked best was to have a component with a div. Then in the `useEffect` function I used D3 to locate the div and populate it with all the SVG-related contents, including the usual zoom/pan handling.

## TODO

Due to the web access issues, I was forced to ignore the CI/CD pipeline. In fairness, setting that toolchain up from scratch is not in my skillset. But no internet ruled it out anyway.

Same applies with the authentication layer. Unclear what was expected in this case. I ignored the persisted data - normally I would use localStorage for this, but the authentication requirement suggested that this was supposed to be a back-end thing.

The Pick screen doesn't actually select user location. This due to the mock data, rather than actual lat/long. Plus a desktop environment doesn't guarantee great accuracy of location. I assume that the spec expected an out-of-the-box component to handle that sort of selecting, so I left it as a simple mock.
