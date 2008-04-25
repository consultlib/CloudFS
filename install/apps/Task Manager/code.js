({
	kill: function() {
	    clearTimeout(this.timer);
	    if (!this.win.closed) {
	        this.win.close();
	    }
	},
	init: function(args) {
	    dojo.require("dijit.layout.LayoutContainer");
	    dojo.require("dijit.layout.ContentPane");
	    dojo.require("dijit.ProgressBar");
	    dojo.require("dijit.Toolbar");
	    dojo.require("dijit.form.Button");
	    dojo.require("dijit.Menu");
		dojo.requireLocalization("desktop", "common");
		dojo.requireLocalization("desktop", "apps");
		dojo.requireLocalization("desktop", "system");
		var nls = dojo.i18n.getLocalization("desktop", "common");
		var app = dojo.i18n.getLocalization("desktop", "apps");
	    //make window
	    this.win = new api.Window({
	        title: app["Task Manager"],
	        width: "350px",
	        height: "450px",
			onClose: dojo.hitch(this, "kill")
	    });
	    //var layout = new dijit.layout.LayoutContainer({sizeMin: 60, sizeShare: 60}, document.createElement("div"));
	    this.main = new dijit.layout.ContentPane({
	        layoutAlign: "client"
	    },
	    document.createElement("div"));
	    //layout.addChild(this.main);
	    //this.toolbar = new dijit.Toolbar({layoutAlign: "top"});
	    //layout.addChild(this.toolbar);
	    this.win.addChild(this.main);
	    this.win.show();
	    this.win.startup();
	    this.timer = setTimeout(dojo.hitch(this, "home"), 1000);
		this.home();
	
	},
	
	executeKill: function(id) {
		var sys = dojo.i18n.getLocalization("desktop", "system");
	    if (desktop.app.getInstance(id).status != "killed") {
	        if(desktop.app.kill(id)) {
	        api.ui.notify(sys.killSuccess.replace("%s", id));
		}
		else {
			api.ui.notify({
				message: sys.killFail.replace("%s", id),
				type: "error"
			});
		}
	    }
	    else {
	        api.ui.notify({
	            type: "warning",
	            message: sys.allreadyKilled
	        });
	
	    }
	    this.home();
	
	},
	home: function() {
		var sys = dojo.i18n.getLocalization("desktop", "system");
		var app = dojo.i18n.getLocalization("desktop", "apps");
	    var data = desktop.app.getInstances();
	    var html = "<table style='width: 100%;'><thead><tr style='background-color: #dddddd;'><td>"+sys.name+"</td><td>"+sys.instance+"</td><td>"+sys.id+"</td><td>"+sys.status+"</td><td>"+sys.actions+"</td></tr></thead><tbody>";
	    for (var x = 0; x < data.length; x++) {
	        if (typeof(data[x]) == "object") {
	            // Error handler, for some reason, it sometimes fucksup.
	            if (data[x].status != "killed") {
	                html += "<tr><td>" + app[data[x].name] + "</td><td>" + data[x].instance + "</td><td>" + data[x].appid + "</td><td>" + sys[data[x].status] + "</td><td><a href='javascript:void(0);' onClick='desktop.app.instances[" + this.instance + "].executeKill("+ data[x].instance + ")'>"+sys.kill+"</a></td></tr>";
	
	            }
	
	        }
	
	    }
	    this.main.setContent(html);
	    this.timer = setTimeout(dojo.hitch(this, this.home), 1000);
	}
})