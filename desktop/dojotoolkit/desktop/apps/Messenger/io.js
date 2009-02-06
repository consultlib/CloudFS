dojo.provide("desktop.apps.Messenger.io");

dojo.extend(desktop.apps.Messenger, {
    listener: null,
    currentUsername: null,
    setListener: function(){
        this.listener = desktop.crosstalk.subscribe("IM", dojo.hitch(this, "recieveMessage"), this.instance); 
    },
    removeListener: function(){
        desktop.crosstalk.unsubscribe(this.listener);
    },
    sendMessage: function(uid, msg){
        this.pushMsg(uid, msg, true);
        desktop.crosstalk.publish("IM", {text: msg}, uid, this.sysname, null, dojo.hitch(this, function(messageID){
            var kd = setTimeout(dojo.hitch(this, function(){
                this.checkSent(messageID, uid);
            }), 2000);
        }));
        this.playSend();
    },
    checkSent: function(id, uid){
		var strings = dojo.i18n.getLocalization("desktop.apps.Messenger", "messenger");
	    desktop.crosstalk.exists(id, dojo.hitch(this, function(notsent){
		    if(notsent){
			    this.pushMsg(uid, strings.userOffline);
    		}
	    }));
    },
    recieveMessage: function(msg){
        var uid = msg._crosstalk.sender;        
        this.pushMsg(uid, msg.text, false);
        this.playReceive();
    },
    getCurrentUsername: function(cback){
        if(this.currentUsername) cback(this.currentUsername);
        desktop.user.get({onComplete: dojo.hitch(this, function(data){
            this.currentUsername = data.username;
            cback(this.currentUsername);
        })});
    }
});
