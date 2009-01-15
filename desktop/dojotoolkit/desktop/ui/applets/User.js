dojo.provide("desktop.ui.applets.User");
dojo.require("dijit.form.Button");

dojo.declare("desktop.ui.applets.User", desktop.ui.Applet, {
    dispName: "User",
    postCreate: function(){
        var button = new dijit.form.Button({
            label: " ",
            onClick: dojo.hitch(desktop.apps, "launch", "AccountInfo")
        });
        desktop.user.get({callback: function(data){
            console.log(data);
            button.attr("label", data.name || data.username);
        }});
        this.containerNode.appendChild(button.domNode);
        this.inherited(arguments);
    }
});
