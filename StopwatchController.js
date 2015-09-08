({
	doInit : function(component, event, helper) {

	},
    doScriptLoad : function(component, event, helper) {

	},
    onClick : function(component, event, helper) {
        var div = component.find("time").getElement();
        var id = event.target.id;
        var	clsStopwatch = function() {
            // Private vars
            var	startAt	= startAt || 0;	// Time of last start / resume. (0 if not running)
            var	lapTime	= lapTime || 0;	// Time on the clock when last stopped in milliseconds

            var	now	= function() {
                return (new Date()).getTime();
            };

            // Public methods
            // Start or resume
            this.start = function() {
                startAt	= startAt ? startAt : now();
            };

            // Stop or pause
            this.stop = function() {
                // If running, update elapsed time otherwise keep it
                lapTime	= startAt ? lapTime + now() - startAt : lapTime;
                startAt	= 0; // Paused
            };

            // Reset
            this.reset = function() {
                lapTime = startAt = 0;
            };

            // Duration
            this.time = function() {
                return lapTime + (startAt ? now() - startAt : 0);
            };
        };

        var stopwatch = component.get("v.stopwatch");
        var x = stopwatch || new clsStopwatch();
        if(!stopwatch){
        	component.set("v.stopwatch", x);
        }

        function pad(num, size) {
            var s = "0000" + num;
            return s.substr(s.length - size);
        }

        function formatTime(time) {
            var h = m = s = ms = 0;
            var newTime = '';

            h = Math.floor( time / (60 * 60 * 1000) );
            time = time % (60 * 60 * 1000);
            m = Math.floor( time / (60 * 1000) );
            time = time % (60 * 1000);
            s = Math.floor( time / 1000 );
            ms = time % 1000;

            newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
            return newTime;
        }

        function update() {
            div.innerHTML = "Time: " + formatTime(x.time());
        }

   		switch(id){
            case "start":
                clocktimer = setInterval(update, 1);
				x.start();
                break;
            case "stop":
                x.stop();
                clearInterval(clocktimer);
                break;
            case "reset":
                x.stop();
                x.reset();
                update();
                break;
            default:
                stop();
                break;
        }
	}
})
