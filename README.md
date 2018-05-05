# MMM-OneBusAway


![Alt text](/img/screenshot.png?raw=true "A preview of the MMM-OneBusAway module.")

A module for the [Magic Mirror](https://magicmirror.builders/). 

This module displays ETA for buses using the [OneBusAway API](http://developer.onebusaway.org/modules/onebusaway-application-modules/1.1.13/api/where/index.html)


## Installation

To install, clone this repository into your modules folder. Then add the following to your configuration file:
```
{
	module: 'MMM-OneBusAway',
	position: 'top_right',
	config: {
        stopId: "1_905",    //the stop id you want to see the buses ETA
        fadeSpeed: 1000 * 60 // 1 minute
	}
},
```
To get the stopId you want for your location you can use the [OneBusAway API](http://api.pugetsound.onebusaway.org/api/where/stops-for-location.xml?key=TEST&lat=47.619127&lon=-122.329993) with the lattitude and longitude of the stop you want.

## Configuration Options

The following properties can be configured:

| Options | Description|
| --- | --- |
|```stopId```| Can be changed to any **string**, must be a valid stopId known by [OneBusAway API](http://api.pugetsound.onebusaway.org/api/where/stops-for-location.xml?key=TEST&lat=47.619127&lon=-122.329993) |
| ```fadeSpeed```| The refresh interval for the buses ETA, in milliseconds|