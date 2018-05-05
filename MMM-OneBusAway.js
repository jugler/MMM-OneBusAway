"use strict";

Module.register("MMM-OneBusAway",{
    result: [],
    message: 'Loading...',
	// Default module config.
	defaults: {
        text: "OneBusAway Widget hello world!",
        stopId: "1_905",
        routes: ["1_100146","40_100236"],
        fadeSpeed: 1000
	},

	// Override dom generator.
	getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.className = "oneBusAway";
        if (this.result.length==0){
            Log.log("Departures list is empty");
            this.message = "No buses departing soon";
        } else{ //extract times of arrival for the buses
                for(var departure in this.result){
                    if (departure<5){
                        var busIcon = document.createElement("img");
                        busIcon.className = "badge";
                        busIcon.src = "modules/MMM-OneBusAway/oba_logo.png";
                        busIcon.style.height = "22px";
                        busIcon.style.width = "22px";
                        var nextStop = document.createElement("div");
                        var nextStopText = document.createElement("span");
                        var departureDetails = this.result[departure]
                        var busShortName = departureDetails['routeShortName'];
                        var busDepartureTimeStamp = departureDetails['scheduledArrivalTime'];
                        var busDepartureDate = new Date(busDepartureTimeStamp);
                        console.log("Departure for route: " + busShortName);
                        console.log("Departure time: " + busDepartureDate);
                        var dateNow = new Date();
                        var departingInMinutes = (busDepartureDate - dateNow)/60000; //difference in minutes
                        if (departingInMinutes>0){
                            departingInMinutes = departingInMinutes.toFixed(0);
                            var departureMessage =  busShortName + ": " + departingInMinutes + "mins";
                            console.log(departureMessage);
                            nextStopText.innerHTML = departureMessage;
                            nextStop.appendChild(busIcon);
                            nextStop.appendChild(nextStopText);
                            wrapper.appendChild(nextStop);
                        }
                    }
                }
                this.message = departureMessage;
        }
        
		return wrapper;
    },
    getStyles: function() {
		return ["MMM-OneBusAway.css"];
	},
    
    start: function() {
        var self = this;

        self.getBusesInfo();
        setInterval(function() {
          self.getBusesInfo();
          self.updateDom();
        },  1000*60);
      },

    
    
      getBusesInfo: function () {
        this.sendSocketNotification('GET_BUSES_INFO', this.config.stopId);
      },

      socketNotificationReceived: function(notification, payload) {
        if (notification === "BUSES_INFO") {
            var self = this;
            this.result = payload;
            //this.message = this.result.toString();
            this.updateDom();
        }
      },
});