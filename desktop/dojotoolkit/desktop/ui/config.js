dojo.provide("desktop.ui.config");
desktop.ui.config = {
	//	summary:
	//		contains some configuration dialogs
	_wallpaper: function() {
		//	summary:
		//		Creates a layoutContainer with wallpaper configuration UI and returns it
		var l = dojo.i18n.getLocalization("desktop.ui", "appearance");
		var wallpaper = new dijit.layout.LayoutContainer({title: l.wallpaper});
		var c = new dijit.layout.ContentPane({layoutAlign: "client"});
		var cbody = document.createElement("div");
		dojo.style(cbody, "width", "100%");
		dojo.style(cbody, "height", "100%");
		dojo.style(cbody, "overflow", "auto");
		
		var makeThumb = function(item) {
			if(item == "") return;
			if(item === true) item = "";
			var p = document.createElement("div");
			dojo.addClass(p, "floatLeft");
			dojo.style(p, "width", "150px");
			dojo.style(p, "height", "112px");
			dojo.style(p, "margin", "5px");
			dojo.style(p, "padding", "5px");
				if (item != "") {
					var img = document.createElement("img");
					dojo.style(img, "width", "100%");
					dojo.style(img, "height", "100%");
					img.src = item; //todo: thumbnails?
					img.name = item; //so we can look it up later, src resolves a local path to a hostname
					p.appendChild(img);
				}
			if(desktop.config.wallpaper.image == item) dojo.addClass(p, "selectedItem");
			dojo.connect(p, "onclick", null, function() {
				if(desktop.config.wallpaper.image != item) {
					dojo.query(".selectedItem", c.domNode).removeClass("selectedItem");
					dojo.addClass(p, "selectedItem");
					desktop.config.wallpaper.image = item;
					desktop.config.apply();
				}
			})
			cbody.appendChild(p);
		}
		makeThumb(true);
		dojo.forEach(desktop.config.wallpaper.storedList, makeThumb);
		c.setContent(cbody);
		wallpaper.addChild(c);
		
		var nc = dojo.i18n.getLocalization("desktop", "common");
		//botom part -------------
		var color = new dijit.ColorPalette({value: desktop.config.wallpaper.color, onChange: dojo.hitch(this, function(value) {
			desktop.config.wallpaper.color = value;
			desktop.config.apply();
		})});
		var colorButton = new dijit.form.DropDownButton({
			dropDown: color,
			label: l.bgColor
		});
		var styleLabel = document.createElement("span");
		styleLabel.innerHTML = " Style:";
		var styleButton = new dijit.form.FilteringSelect({
			autoComplete: true,
			searchAttr: "label",
			style: "width: 120px;",
			store: new dojo.data.ItemFileReadStore({
				data: {
					identifier: "value",
					items: [
						{label: l.centered, value: "centered"},
						{label: l.fillScreen, value: "fillscreen"},
						{label: l.tiled, value: "tiled"}
					]
				}
			}),
			onChange: function(val) {
				if(typeof val == "undefined") return;
				desktop.config.wallpaper.style=val;
				desktop.config.apply();
			}
		});
		styleButton.setValue(desktop.config.wallpaper.style);
		var addButton = new dijit.form.Button({
			label: nc.add,
			iconClass: "icon-22-actions-list-add",
			onClick: function() {
				api.ui.fileDialog({
					callback: function(path) {
						if(path) {
							var p = api.filesystem.embed(path);
							for(var key in desktop.config.wallpaper.storedList) {
								var val = desktop.config.wallpaper.storedList[key];
								if(val == p) return;
							}
							makeThumb(p);
							desktop.config.wallpaper.storedList.push(p);
						}
					}
				});
			}
		});
		var removeButton = new dijit.form.Button({
			label: nc.remove,
			iconClass: "icon-22-actions-list-remove",
			onClick: function() {
				var q = dojo.query("div.selectedItem img", c.domNode)
				if(q[0]) {
					dojo.forEach(desktop.config.wallpaper.storedList, function(url, i) {
						if(url == q[0].name) desktop.config.wallpaper.storedList.splice(i, 1);
					});
					q[0].parentNode.parentNode.removeChild(q[0].parentNode);
				}
			}
		});
		/*var closeButton = new dijit.form.Button({
			label: "Close",
			style: "position: absolute; right: 0px; top: 0px;",
			onClick: function() {
				win.close();
			}
		});*/
		var p = new dijit.layout.ContentPane({layoutAlign: "bottom"});
		var body = document.createElement("div");
		dojo.forEach([colorButton.domNode, styleLabel, styleButton.domNode, addButton.domNode, removeButton.domNode/*, closeButton.domNode*/], function(c) {
			dojo.addClass(c, "dijitInline");
			body.appendChild(c);
		});
		p.setContent(body);
		wallpaper.addChild(p);
		color.startup();
		return wallpaper;
	},
	_themes: function() {
		//	summary:
		//		generates a theme configuration pane and returns it
		var l = dojo.i18n.getLocalization("desktop.ui", "appearance");
		var p = new dijit.layout.LayoutContainer({title: l.theme});
		var m = new dijit.layout.ContentPane({layoutAlign: "client"});
		var area = document.createElement("div");
		var makeThumb = function(item) {
			var p = document.createElement("div");
			dojo.addClass(p, "floatLeft");
			dojo.style(p, "width", "150px");
			dojo.style(p, "height", "130px");
			dojo.style(p, "margin", "5px");
			dojo.style(p, "padding", "5px");
			var img = document.createElement("img");
			dojo.style(img, "width", "100%");
			dojo.style(img, "height", "100%");
			img.src = "./themes/"+item.sysname+"/"+item.preview;
			img.name = item.name;
			img.title = item.name;
			p.appendChild(img);
			var subtitle = document.createElement("div");
			subtitle.textContent = item.name;
			dojo.style(subtitle, "textAlign", "center");
			p.appendChild(subtitle);
			if(desktop.config.theme == item.sysname) dojo.addClass(p, "selectedItem");
			dojo.connect(p, "onclick", null, function() {
				if(desktop.config.theme != item.sysname) {
					dojo.query(".selectedItem", m.domNode).removeClass("selectedItem");
					dojo.addClass(p, "selectedItem");
					desktop.config.theme = item.sysname;
					desktop.config.apply();
				}
			})
			area.appendChild(p);
			
			if(!item.wallpaper) return;
			var wallimg = "./themes/"+item.sysname+"/"+item.wallpaper;
			for(var i in desktop.config.wallpaper.storedList){
				var litem = desktop.config.wallpaper.storedList[i];
				if(litem == wallimg) return;
			}
			desktop.config.wallpaper.storedList.push(wallimg);
		}
		desktop.theme.list(function(list) {
			dojo.forEach(list, makeThumb);
		}, true);
		m.setContent(area);
		p.addChild(m);
		return p;
	},
	_effects: function() {
		//	summary:
		//		generates an effects configuration pane and returns it
		var l = dojo.i18n.getLocalization("desktop.ui", "appearance");
		var p = new dijit.layout.ContentPane({title: l.effects});
		var rows = {
			none: {
				desc: "Provides a desktop environment without any effects. Good for older computers or browsers.",
				params: {
					checked: desktop.config.fx == 0,
					onClick: function(){
						desktop.config.fx = 0;
					}
				}
			},
			basic: {
				desc: "Provides basic transitional effects that don't require a fast computer.",
				params: {
					checked: desktop.config.fx == 1,
					onClick: function(){
						desktop.config.fx = 1;
					}
				}
			},
			extra: {
				desc: "Provides a desktop environment with extra transitional effects that require a faster computer.",
				params: {
					checked: desktop.config.fx == 2,
					onClick: function(){
						desktop.config.fx = 2;
					}
				}
			},
			insane: {
				desc: "Provides a desktop environment with full transitional effects. Requires a fast-rendering browser and a fast computer.",
				params: {
					checked: desktop.config.fx == 3,
					onClick: function() {
						desktop.config.fx = 3;
					}
				}
			}
		}
		var div = document.createElement("div");
		dojo.style(div, "padding", "20px");
		for(var key in rows) {
			var row = document.createElement("div");
			dojo.style(row, "margin", "10px");
			rows[key].params.name = "visualeffects_picker";
			row.appendChild(new dijit.form.RadioButton(rows[key].params).domNode);
			var desc = document.createElement("span");
			desc.innerHTML = "<b>&nbsp;&nbsp;" + (l[key] || key) + ":&nbsp;</b>" + (l[key+"Desc"] || rows[key].desc);
			dojo.style(desc, "padding-left", "10px");
			row.appendChild(desc);
			div.appendChild(row);
		};
		p.setContent(new dijit.form.Form({}, div).domNode);
		return p;
	},
	appearance: function() {
		//	summary:
		//		Shows the appearance configuration dialog
		var l = dojo.i18n.getLocalization("desktop.ui", "appearance");
		if(this.wallWin) return this.wallWin.bringToFront();
		var win = this.wallWin = new api.Window({
			title: l.appearancePrefs,
			onClose: dojo.hitch(this, function() {
				this.wallWin = false;
			})
		});
		var tabs = new dijit.layout.TabContainer({layoutAlign: "client"});
		var themes = desktop.ui.config._themes(); //so we can get any theme wallpaper first
		tabs.addChild(desktop.ui.config._wallpaper());
		tabs.addChild(themes);
		tabs.addChild(desktop.ui.config._effects());
		win.addChild(tabs);
		win.show();
		win.startup();
	},
	account: function() {
		//	summary:
		//		Shows the account configuration dialog
		var l = dojo.i18n.getLocalization("desktop.ui", "accountInfo");
		var cm = dojo.i18n.getLocalization("desktop", "common");
		if(this.accountWin) return this.accountWin.bringToFront();
		var win = this.accountWin = new api.Window({
			title: l.accountInfo,
			onClose: dojo.hitch(this, function() {
				this.accountWin = false;
			})
		});
		var top = new dijit.layout.ContentPane({layoutAlign: "top", style: "padding-bottom: 5px;"});
		var picture = new dijit.form.Button({iconClass: "icon-32-apps-system-users", label: "Picutre", showLabel: false})
		var chpasswd = document.createElement("div");
		dojo.style(chpasswd, "position", "absolute");
		dojo.style(chpasswd, "top", "0px");
		dojo.style(chpasswd, "right", "0px");
		var topRow = document.createElement("div");
		topRow.innerHTML = l.username+": ";
		var usernameSpan = document.createElement("span");
		topRow.appendChild(usernameSpan);
		var button = new dijit.form.Button({
			label: l.changePasswordAction,
			onClick: desktop.ui.config.password
		});
		chpasswd.appendChild(topRow);
		chpasswd.appendChild(button.domNode);
		
		topContent = document.createElement("div");
		dojo.forEach([picture, chpasswd], function(item) {
			topContent.appendChild(item.domNode || item);
		}, this);
		top.setContent(topContent);
		
		var client = new dijit.layout.TabContainer({
			layoutAlign: "client"
		});
		
		var general = new dijit.layout.ContentPane({title: l.general});
		
		var langs = [];
		var intLangs = dojo.i18n.getLocalization("desktop", "languages");
		for(var key in intLangs) {
			langs.push({value: key, label: intLangs[key]});
		}
		
		var rows = {
			name: {
				widget: "TextBox",
				params: {}
			},
			email: {
				widget: "ValidationTextBox",
				params: {
					isValid: function(blah) {
						return dojox.validate.isEmailAddress(this.textbox.value);
					}
				}
			},
			language: {
				widget: "FilteringSelect",
				params: {
					value: desktop.config.locale,
					searchAttr: "label",
					autoComplete: true,
					store: new dojo.data.ItemFileReadStore({
						data: {
							identifier: "value",
							label: "label",
							items: langs
						}
					})
				}
			}
		}
		var div = document.createElement("div");
		var elems = {};
		for(var key in rows) {
			var row = document.createElement("div");
			dojo.style(row, "marginBottom", "5px");
			row.innerHTML = l[key]+":&nbsp;";
			row.appendChild((elems[key] = new dijit.form[rows[key].widget](rows[key].params)).domNode);
			div.appendChild(row);
		};
		general.setContent(new dijit.form.Form({}, div).domNode);
		
		client.addChild(general);
		
		var bottom = new dijit.layout.ContentPane({layoutAlign: "bottom"});
		var close = new dijit.form.Button({
			label: cm.close,
			onClick: dojo.hitch(win, "close")
		});
		var p=document.createElement("div");
		dojo.addClass(p, "floatRight");
		p.appendChild(close.domNode)
		bottom.setContent(p)
		
		dojo.forEach([top, client, bottom], function(wid) {
			win.addChild(wid);
			wid.startup();
		}, this);
		desktop.user.get({callback: function(info) {
			elems["name"].setValue(info.name);
			elems["email"].setValue(info.email);
			usernameSpan.textContent = info.username
		}});
		dojo.connect(win, "onClose", this, function() {
			var args = {};
			for(var key in elems) {
				var elem = elems[key];
				if(typeof elem.isValid != "undefined") {
					if(!elem.isValid()) continue;
				}
				switch(key) {
					case "name":
						args.name = elem.getValue();
						break;
					case "email":
						args.email = elem.getValue();
						break;
					case "language":
						var oldLocale = desktop.config.locale;
						desktop.config.locale = elem.getValue();
						if(oldLocale != desktop.config.locale) {
							dojo.cookie("desktopLocale", desktop.config.locale);
							api.ui.notify(l.restartDesktopForLangChange);
						}
						break;
				}
			}
			desktop.user.set(args);
		});
		
		win.show();
		win.startup();
	},
	password: function() {
		//	summary:
		//		Shows the password change dialog
		if(this.passwordWin) return this.passwordWin.bringToFront();
		var l = dojo.i18n.getLocalization("desktop.ui", "accountInfo");
		var cm = dojo.i18n.getLocalization("desktop", "common");
		var win = this.passwordWin = new api.Window({
			title: l.changePassword,
			width: "450px",
			height: "350px",
			onClose: dojo.hitch(this, function() {
				this.passwordWin = false;
				clearTimeout(this._authTimeout);
			})
		});
		var top = new dijit.layout.ContentPane({layoutAlign: "top", style: "padding: 20px;"});
		top.setContent(l.passwordDirections);
		
		var client = new dijit.layout.ContentPane({layoutAlign: "client"});
		var row4 = document.createElement("div");
		dojo.style(row4, "textAlign", "center");
		var onChange = dojo.hitch(this, function() {
			if(this.newpasswd.getValue() == this.confpasswd.getValue()) {
				row4.textContent = l.passwordsMatch;
				this.chPasswdButton.setDisabled(false)
			}
			else {
				row4.textContent = l.passwordsDontMatch;
				this.chPasswdButton.setDisabled(true);
			}
		});
		var row2 = document.createElement("div");
		row2.innerHTML = l.newPassword+":&nbsp;";
		var newpasswd = this.newpasswd = new dijit.form.TextBox({type: "password", onChange: onChange, disabled: true});
		row2.appendChild(newpasswd.domNode)
		var row3 = document.createElement("div");
		row3.innerHTML = l.confirmNewPassword+":&nbsp;";
		var confpasswd = this.confpasswd = new dijit.form.TextBox({type: "password", onChange: onChange, disabled: true});
		row3.appendChild(confpasswd.domNode);
		var row1 = document.createElement("div");
		row1.innerHTML = l.currentPassword+":&nbsp;";
		var current = new dijit.form.TextBox({type: "password", style: "width: 125px;"});
		row1.appendChild(current.domNode);
		var resetForm = dojo.hitch(this, function() {
				current.setValue("");
				newpasswd.setValue("");
				confpasswd.setValue("");
				current.setDisabled(false);
				this.authButton.setDisabled(false);
				newpasswd.setDisabled(true);
				confpasswd.setDisabled(true);
				this.chPasswdButton.setDisabled(true);
		});
		var authButton = this.authButton = new dijit.form.Button({
			label: l.authenticate,
			onClick: dojo.hitch(this, function() {
				current.setDisabled(true);
				this.authButton.setDisabled(true);
				
				desktop.user.authentication({
					permission: "core.user.set.password",
					action: "set",
					password: current.getValue(),
					callback: dojo.hitch(this, function(data) {
						current.setDisabled(data == "0");
						authButton.setDisabled(data == "0");
						newpasswd.setDisabled(data != "0");
						confpasswd.setDisabled(data != "0");
						row4.textContent = (data == "0" ? l.authSuccess : l.authFail);
						this._authTimeout = setTimeout(resetForm, 5*60*1000);
					})
				})
			})
		})
		row1.appendChild(authButton.domNode);
		
		
		var main = document.createElement("div");
		dojo.style(main, "padding", "10px");
		dojo.forEach([row1, row2, row3, row4], function(e){ main.appendChild(e); });
		client.setContent(main);
		
		var bottom = new dijit.layout.ContentPane({layoutAlign: "bottom"});
		var div = document.createElement("div");
		dojo.addClass(div, "floatRight");
		div.appendChild((new dijit.form.Button({
			label: cm.close,
			onClick: dojo.hitch(win, win.close)
		})).domNode);
		div.appendChild((this.chPasswdButton = new dijit.form.Button({
			label: l.changePassword,
			disabled: true,
			onClick: dojo.hitch(this, function() {
				row4.textContent = l.changingPassword;
				current.setDisabled(true);
				this.authButton.setDisabled(true);
				newpasswd.setDisabled(true);
				confpasswd.setDisabled(true);
				this.chPasswdButton.setDisabled(true);
				
				desktop.user.set({
					password: newpasswd.getValue(),
					callback: function() {
						resetForm();
						row4.textContent = l.passwordChangeSuccessful;
						clearTimeout(this._authTimeout);
					}
				})
			})
		})).domNode);
		bottom.setContent(div);
		
		dojo.forEach([top, bottom, client], function(e) {
			win.addChild(e);
		});
		win.show();
		win.startup();
	}
}