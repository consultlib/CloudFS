({
	currentFeed: false,
	init: function(args)
	{
	    dojo.require("dijit.layout.LayoutContainer");
	    dojo.require("dijit.layout.SplitContainer");
	    dojo.require("dijit.layout.ContentPane");
	    dojo.require("dijit.Tree");
	    dojo.require("dijit.Toolbar");
	    dojo.require("dijit.form.TextBox");
	    dojo.require("dijit.form.ValidationTextBox");
	    dojo.require("dijit.form.Button");
	    dojo.require("dijit.form.FilteringSelect");
	    dojo.require("dijit.form.CheckBox");
	    dojo.require("dojo.data.ItemFileReadStore");
	    dojo.require("dijit.Dialog");
	    dojo.require("dojox.validate.web");
		dojo.requireLocalization("desktop", "common");
		dojo.requireLocalization("desktop", "messages");
		dojo.requireLocalization("desktop", "apps");
		var cm = dojo.i18n.getLocalization("desktop", "common");
		var app = dojo.i18n.getLocalization("desktop", "apps");
	
	    this.win = new api.Window({
	        title: app["RSS Reader"],
	        onClose: dojo.hitch(this, this.kill)
	    });
		var store = this.feedStore = new api.Registry({
			appid: this.id,
			name: "rssFeeds",
			identifier: "id",
			data: {
				label: "label",
				items: [
					{
						id: 0,
						label: "Feeds",
						title: "Feeds",
						category: true,
						children: [
							{
								id: 1,
								label: "Psych Desktop",
								title: "Psych Desktop",
								url: "http://www.psychdesktop.net/rss.xml",
								category: false
							},
							{
								id: 2,
								label: "Slashdot",
								title: "Slashdot",
								url: "http://rss.slashdot.org/Slashdot/slashdot",
								category: false
							},
							{
								id: 3,
								label: "Ajaxian",
								title: "Ajaxian",
								url: "http://feeds.feedburner.com/ajaxian",
								category: false
							},
							{
								id: 4,
								label: "Dojo Toolkit",
								title: "Dojo Toolkit",
								url: "http://dojotoolkit.org/rss.xml",
								category: false
							},
							{
								id: 5,
								label: "xkcd",
								title: "xkcd",
								url: "http://www.xkcd.com/rss.xml",
								category: false
							},
							{
								id: 6,
								label: "HFLW's blog",
								title: "HFLW's blog",
								url: "http://psychdesigns.net/psych/rss.xml",
								category: false
							},
							{
								id: 7,
								label: "Jay's blog",
								title: "Jay's blog",
								url: "http://www.jaymacdesigns.net/feed/",
								category: false
							}
						]
					}
				]
			}
		});
	    this.toolbar = new dijit.Toolbar({
	        layoutAlign: "top"
	    });
	    var button = new dijit.form.Button({
	        label: cm.refresh,
	        iconClass: "icon-22-actions-view-refresh",
	        onClick: dojo.hitch(this, this.refresh)
	
	    });
	    this.toolbar.addChild(button);
	    var button = new dijit.form.DropDownButton({
	        label: cm.add,
	        iconClass: "icon-22-actions-list-add",
	        dropDown: this.addFeedDialog()
	    });
	    this.toolbar.addChild(button);
	    var button = new dijit.form.Button({
	        label: cm.remove,
	        iconClass: "icon-22-actions-list-remove",
	        onClick: dojo.hitch(this, this.removeFeed)
	
	    });
	    this.toolbar.addChild(button);
	    this.win.addChild(this.toolbar);
	
	    this.hiddenBar = new dijit.layout.ContentPane({
	        layoutAlign: "bottom",
	        style: "display: none; height: 0px;"
	
	    },
	    document.createElement("div"));
	
	    var client = new dijit.layout.SplitContainer({
	        orientation: "horizontal",
	        layoutAlign: "client"
	    });
		
		var model = new dijit.tree.TreeStoreModel({
			store: this.feedStore,
			query: {category: true}
		})
	    this.left = new dijit.Tree({
	        model: model,
			getIconClass: function(item){
				if(item != null && this.model.store.hasAttribute(item, "iconClass"))
					return this.model.store.getValue(item, "iconClass");
			}
	    });
		dojo.connect(this.left, "onClick", this, "changeFeeds");
	    this.left.startup();
	    client.addChild(this.left);
	
	    this.right = new dijit.layout.ContentPane({
	        style: "overflow: auto;",
	        minsize: 50,
	        sizeShare: 30
	
	    },
	    document.createElement("div"));
	    client.addChild(this.right);
	
	    this.win.addChild(client);
	    this.win.onClose = dojo.hitch(this, this.kill);
	    this.win.show();
	    this.win.startup();
		this.refresh();
	},
	
	changeFeeds: function(e)
	{
		if(!this.feedStore.isItem(e)) return;
	    this.currentFeed = e;
		if(this.feedStore.getValue(e, "category") === true) return;
	    this.fetchFeed(this.feedStore.getValue(e, "url"));
	},
	
	removeFeed: function(t) {
		if (!this.feedStore.isItem(this.currentFeed)) return;
		this.feedStore.deleteItem(this.currentFeed);
		this.feedStore.save();
	},
	
	addFeedDialog: function()
	{
		var cm = dojo.i18n.getLocalization("desktop", "common");
	    var dialog = new dijit.TooltipDialog({});
	    this._form = {
	        title: new dijit.form.TextBox({required: true}),
		isCategory: new dijit.form.CheckBox({
			onChange: dojo.hitch(this, function(val) {
				if(!this._form) return;
				this._form.url.setDisabled(val);
				this._form.category.setDisabled(val);
			})
		}),
		category: new dijit.form.FilteringSelect({
			store: this.feedStore,
			searchAttr: "title",
			query: {category: true}
		}),
	        url: new dijit.form.ValidationTextBox({
			isValid: function(isFocused) {
				return dojox.validate.isUrl(this.textbox.value);
			}
		}),
		icon: new dijit.form.FilteringSelect({
			searchAttr: "name",
			labelAttr: "label",
			labelType: "html",
			store: new dojo.data.ItemFileReadStore({
				data: {identifier: "name", items: [
					{label: "", name: ""},
					{label: "<div class='icon-16-actions-go-home'></div>", name: "icon-16-actions-go-home"},
					{label: "<div class='icon-16-apps-internet-news-reader'></div>", name: "icon-16-apps-internet-news-reader"},
					{label: "<div class='icon-16-apps-internet-web-browser'></div>", name: "icon-16-apps-internet-web-browser"},
					{label: "<div class='icon-16-apps-internet-group-chat'></div>", name: "icon-16-apps-internet-group-chat"},
					{label: "<div class='icon-16-apps-accessories-text-editor'></div>", name: "icon-16-apps-accessories-text-editor"},
					{label: "<div class='icon-16-actions-system-search'></div>", name: "icon-16-actions-system-search"},
					{label: "<div class='icon-16-status-weather-clear'></div>", name: "icon-16-status-weather-clear"}
				]}
			})
		})
	    };
	    var line = document.createElement("div");
	    var p = document.createElement("span");
	    p.innerHTML = cm.name+": ";
	    line.appendChild(p);
	    line.appendChild(this._form.title.domNode);
	    var line2 = document.createElement("div");
	    var p = document.createElement("span");
	    p.innerHTML = cm.url+": ";
	    line2.appendChild(p);
	    line2.appendChild(this._form.url.domNode);
	
	    var line3 = document.createElement("div");
	    var p = document.createElement("span");
	    p.innerHTML = cm.icon+": ";
	    line3.appendChild(p);
	    line3.appendChild(this._form.icon.domNode);
	
	    var line4 = document.createElement("div");
	    var p = document.createElement("span");
	    p.innerHTML = cm.isCategory+": ";
	    line4.appendChild(p);
	    line4.appendChild(this._form.isCategory.domNode);
	
	
	    var line5 = document.createElement("div");
	    var p = document.createElement("span");
	    p.innerHTML = cm.category+": ";
	    line5.appendChild(p);
	    line5.appendChild(this._form.category.domNode);
	
	    var button = new dijit.form.Button({
	        label: cm.add
	    });
		var div = document.createElement("div");
		dojo.style(div, "color", "red");
	    dojo.connect(button, "onClick", this, function(e) {
			if(this._form.title.getValue() == "") return;
			if(!this._form.isCategory.checked) {
				if(!this._form.url.isValid()) return;
				if(!this._form.category.isValid()) return;
			}
			if(!this._form.icon.isValid()) return;
			this.feedStore.fetch({query: {title: this._form.title.getValue()}, onComplete: dojo.hitch(this, function(f) {
				if(typeof f[0] != "undefined") {
					var msg = dojo.i18n.getLocalization("desktop", "messages");
					div.innerHTML = msg.allreadyExists;
					return;
				}
				var makeItem = dojo.hitch(this, function(items) {
					var maxID = this.feedStore._arrayOfAllItems.length; //feels hackish
					var item = this.feedStore.newItem({
						id: maxID,
						title: this._form.title.getValue(),
						label: this._form.title.getValue(),
						url: this._form.url.getValue(),
						iconClass: this._form.icon.getValue() || null,
						category: this._form.isCategory.checked
					}, (typeof items[0] != "undefined" ? {
						attribute: "children",
						parent: items[0]
					} : null));
					this.updateCount(item);
					this.feedStore.save();
				});
				if(!this._form.isCategory.checked) {
					this.feedStore.fetch({
						query: {
							category: true,
							id: this._form.category.getValue()
						},
						onComplete: makeItem
					})
				}
				else makeItem([]);
		        this._form.title.setValue("");
		        this._form.url.setValue("");
		        this._form.icon.setValue("");
		        this._form.isCategory.setChecked(false);
		        div.innerHTML = "";
			})});
	
	    })
	    dialog.startup();
		dialog.containerNode.appendChild(div);
	    dialog.containerNode.appendChild(line);
	    dialog.containerNode.appendChild(line2);
	    dialog.containerNode.appendChild(line3);
	    dialog.containerNode.appendChild(line4);
	    dialog.containerNode.appendChild(line5);
	    dialog.containerNode.appendChild(button.domNode);
		return dialog;
	},
	
	kill: function()
	{
	    if (typeof(this.win) != "undefined") {
	        this.win.close();
	    }
	},
	refresh: function() {
		this.feedStore.fetch({onItem: dojo.hitch(this, function(item) {
			this.updateCount(item);
		})})
	},
	
	updateCount: function(item) {
		var store = this.feedStore
		api.xhr({
	        url: store.getValue(item, "url"),
	        preventCache: true,
			xsite: true,
	        load: function(data) {
				var items = data.getElementsByTagName("item").length;
				store.setValue(item, "label", store.getValue(item, "title")+(items > 0 ? " ("+items+")" : ""))
			},
	        handleAs: "xml"
	
	    });	
	},
	fetchFeed: function(url)
	{
	    api.xhr({
	        url: url,
	        preventCache: true,
			xsite: true,
	        load: dojo.hitch(this, function(data, ioArgs) {
	            var items = data.getElementsByTagName("item");
	            var text = "";
	            dojo.forEach(items, 
	            function(item) {
	                var title = item.getElementsByTagName("title")[0].textContent;
	                var content = item.getElementsByTagName("description")[0].textContent;
	                var url = item.getElementsByTagName("link")[0].textContent;
	                text += "<div style='border: 1px solid black;'><h4><a href='javascript:desktop.app.launchHandler(null, {url: \"" + escape(url) + "\"}, \"text/x-uri\")'>" + title + "</a></h4><p>" + content + "</p></div>";
	
	            });
	            this.right.setContent(text);
	
	        }),
	        handleAs: "xml"
	
	    });
	
	}
})