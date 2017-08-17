# O shit waddup
Waddup is a tool to get an aggregated developer news feed to the command line so it's available as a quick 5min update during your day.

## Installation
`yarn add --global wdp`

or

`npm i -g wdp`

## Usage
`wdp`

Scroll through the boxes to find an item you want to read, click to select / open.

## Things I'm working on

* Faster initial render, the HTTP requests clog up the pipe. Stagger the requests so that first paint can come as soon as first request is done
* Arrow keys to navigate, return to select item, N/P to jump between boxes
* Some hacker news items won't open.. Fun bug!
* Do something more useful/fun with the ETH/USD graph
