({
	kill: function() {
		if(!this.win.closed) this.win.close();
	},
	
	init: function() {
		dojo.require("dijit.form.Button");
		dojo.require("dijit.form.TextBox");
		dojo.require("dijit.layout.ContentPane");
		dojo.requireLocalization("desktop", "apps");
		var app = dojo.i18n.getLocalization("desktop", "apps");
		var win = this.win = new api.Window({
			title: app["Calculator"],
			width: "200px",
			height: "270px",
			onClose: dojo.hitch(this, "kill")
		});
		var textbox = new dijit.form.TextBox({
			layoutAlign: "top",
			style: "text-align: right;"
		});
		win.addChild(textbox);
		var client = new dijit.layout.ContentPane({
			layoutAlign: "client"
		});
		win.addChild(client);
		var c = document.createElement("table");
		dojo.style(c, {
			border: "0px",
			width: "100%",
			height: "100%"
		});
		dojo.forEach([
			["(", ")",  "", "C"],
			["7", "8", "9", "/"],
			["4", "5", "6", "*"],
			["1", "2", "3", "-"],
			["0", ".", "=", "+"]
		], function(row) {
			var rowNode = document.createElement("tr");
			dojo.forEach(row, function(cell) {
				var cellNode = document.createElement("td");
				dojo.style(cellNode, "padding", "0px");
				if(cell != "") {
					var button = new dijit.form.Button({
						style: "width: 100%; height: 100%; margin: 0px;",
						label: cell,
						onClick: dojo.hitch(this, function(){
							if((parseInt(cell)+"" != "NaN" || cell == ".") && this.answerShown) this.clear(textbox); 
							if(cell == "=") return this.onSubmit(textbox);
							if(cell == "C") return this.clear(textbox);
							this.answerShown = false;
							textbox.setValue(textbox.getValue() + cell);
						})
					});
					dojo.style(button.focusNode, {
						width: "100%",
						height: "100%"
					});
					cellNode.appendChild(button.domNode);
				}
				else {
					this.eNode = document.createElement("div");
					dojo.style(this.eNode, {
						textAlign: "center",
						color: "red",
						fontWeight: "bold"
					});
					cellNode.appendChild(this.eNode);
				}
				rowNode.appendChild(cellNode);
			}, this);
			c.appendChild(rowNode);
		}, this);
		client.setContent(c);
		win.show();
	},
	clear: function(t) {
		this.answerShown = false;
		this.eNode.textContent = "";
		t.setValue("");
	},
	answerShown: false,
	onSubmit: function(t) {
		this.answerShown = true;
		var v = t.getValue();
		this.eNode.textContent = "";
		if(!this.validate(v)) return this.eNode.textContent = "E";
		t.setValue(eval(t.getValue()));
	},
	
	validate: function(v) {
		//Check for matching parenthesis
		if(v.split("(").length != v.split(")").length) return false;
		//Check for invalid characters
		for(var i=0; i < v.length; i++) {
			var c = v[i];
			if(!(parseInt(c)+"" != "NaN"
			|| c == ")"
			|| c == "("
			|| c == "/"
			|| c == "*"
			|| c == "+"
			|| c == "-"
			|| c == "."
			)) return false;
		}
		//Check for stray decimal points
		var parts = v.split(".");
		for(var i=0; i<parts.length;i++) {
			if(parts[i] == "" && i!=0) return false;
			if(parseInt(parts[i].charAt(0))+"" == "NaN" && i != 0) return false;
		}
		return true;
	}
})