dojo.provide("desktop.apps.Messenger._base");
dojo.requireLocalization("desktop", "apps");
dojo.requireLocalization("desktop", "messages");
dojo.requireLocalization("desktop.apps.Messenger", "messenger");

dojo.declare("desktop.apps.Messenger", desktop.apps._App, {
	init: function(args){
        this.windows = [];
    	var win = this.makeBuddyListWin(); //OH YA WE ARE DRAW UI
        this.setListener();
        this.initSounds();
        this.timer = setInterval(dojo.hitch(this, "updateStatus"), 10000);
        this.updateStatus();
        win.show();
    },
    kill: function(stright){
        dojo.forEach(this.windows, function(win){
            if(!win.closed)
		        win.close();
		});
        this.cleanupSounds();
		this.removeListener(); //Tell crosstalk we are no longer intrested in recieving events.
        clearInterval(this.timer);
	}
});

