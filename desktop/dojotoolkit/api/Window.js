dojo.provide("api.Window");
dojo.require("dojox.layout.ResizeHandle");
dojo.require("dojo.dnd.move");
dojo.require("dijit.layout._LayoutWidget");
dojo.require("dojox.fx.easing");
dojo.require("dijit._Templated");

dojo.declare("api.Window", [dijit.layout._LayoutWidget, dijit._Templated], {
	//	summary:
	//		The window widget
	//	example:
	//	|	var win = new api.Window({
	//	|		title: "Foo",
	//	|		height: "200px",
	//	|		width: "400px"
	//	|	});
	//	|	var widget = new dijit.layout.ContentPane();
	//	|	widget.setContent("baz");
	//	|	win.addChild(widget);
	//	|	win.show();
	//	|	win.startup();
	//	|	setTimeout(dojo.hitch(win, "destroy"), 1000*5);
	templatePath: dojo.moduleUrl("api", "templates/Window.html"),
	//	_winListItem: storeItem
	//		The store item that represents this window on desktop.ui._windowList
	_winListItem: null,
	//	closed: Boolean
	//		Is the window closed?
	closed: false,
	onClose: function() {
		//	summary:
		//		What to do on destroying of the window
	},
	onResize: function() {
		//	summary:
		//		What to do on the resizing of the window
	},
	onMinimize: function() {
		//	summary:
		//		What to do on the minimizing of the window
	},
	/*
	 * Property: onMaximize
	 * 
	 * What to do upon maximize of window
	 */
	onMaximize: function() {
		//	summary:
		//		What to do upon maximize of window
	},
	//	showMaximize: Boolean
	//		Whether or not to show the maximize button
	showMaximize: true,
	//	showMinimize: Boolean
	//		Whether or not to show the minimize button
	showMinimize: true,
	//	showClose: Boolean
	//		Whether or not to show the close button
	showClose: true,
	//	maximized: Boolean
	//		Whether or not the window is maximized
	maximized: false,
	//	minimized: Boolean
	//		Whether or not the window is minimized
	minimized: false,
	//	allwaysOnTop: boolean
	//		Whether or not the window is to always stay on top of other windows
	alwaysOnTop: false,	 	 	 
	//	height: String
	//		The window's height in px, or %.
	height: "480px",
	//	width: String
	//		The window's width in px, or %.
	width: "600px",
	//	title: String
	//		The window's title
	title: "",
	//	resizable: Boolean
	//		Weather or not the window is resizable.
	resizable: true,
	//	pos: Object
	//		Internal variable used by the window maximizer
	pos: {},
	//	_minimizeAnim: Boolean
	//		Set to true when the window is in the middle of a minimize animation.
	//		This is to prevent a bug where the size is captured mid-animation and restores weird.
	_minimizeAnim: false,
	postCreate: function() {
		this.domNode.title="";
		this.makeDragger();
		this.sizeHandle = new dojox.layout.ResizeHandle({
			targetContainer: this.domNode,
			activeResize: true
		}, this.sizeHandle);
		if(!this.resizable)
		{
			this.killResizer();
		}
		dojo.addClass(this.sizeHandle.domNode, "win-resize");
		dojo.connect(this.sizeHandle.domNode, "onmousedown", this, function(e){
			this._resizeEnd = dojo.connect(document, "onmouseup", this, function(e){
				dojo.disconnect(this._resizeEnd);
				this.resize();
			});
		});
		
		if(dojo.isIE){
			this.connect(this.domNode,'onresize',"_onResize");
		}
		this.connect(window,'onresize',"_onResize");
		this.bringToFront();
	},
	show: function()
	{
		//	summary:
		//		Shows the window
		desktop.ui.containerNode.appendChild(this.domNode);
		dojo.style(this.domNode, "width", this.width);
		dojo.style(this.domNode, "height", this.height);
		this.titleNode.innerHTML = this.title;
		this._winListItem = desktop.ui._windowList.newItem({
			label: this.title,
			icon: this.icon,
			id: this.id
		});
		if(this.maximized == true) this.maximize();
		dojo.style(this.domNode, "display", "block");
		var calcWidth = this.domNode.offsetWidth;
		var calcHeight = this.domNode.offsetHeight;
		var bodyWidth = this.containerNode.offsetWidth;
		var bodyHeight = this.containerNode.offsetHeight;
		dojo.style(this.domNode, "width", ((calcWidth - bodyWidth)+calcWidth)+"px");
		dojo.style(this.domNode, "height", ((calcHeight - bodyHeight)+calcHeight)+"px");
		var viewport = dijit.getViewport();
		dojo.style(this.domNode, {
			top: ((viewport.h/2) - (((calcHeight - bodyHeight)+calcHeight)/2))+"px",
			left: ((viewport.w/2) - (((calcWidth - bodyWidth)+calcWidth)/2))+"px"
		});
		if (desktop.config.fx >= 2) {
			if (desktop.config.fx < 3) this._toggleBody(false);
			dojo.style(this.domNode, "opacity", 0);
			var anim = dojo.fadeIn({
				node: this.domNode,
				duration: desktop.config.window.animSpeed
			});
			dojo.connect(anim, "onEnd", this, function() {
				if (desktop.config.fx < 3) this._toggleBody(true);
				this.resize();
			});
			anim.play();
		} else this.resize();
	},
	_toggleBody: function(/*Boolean*/show) {
		//	summary:
		//		Toggles the display of the window's body
		//	show:
		//		If true the body is shown, if false then the body is hidden.
		if(show) {
			dojo.style(this.containerNode, "display", "block");
			dojo.style(this.dragContainerNode, "display", "none");
		}
		else {
			dojo.style(this.containerNode, "display", "none");
			dojo.style(this.dragContainerNode, "display", "block");
		}
	},
	setTitle: function(/*String*/title) {
		//	summary:
		//		Sets window title after window creation
		//	title:
		//		The new title
		this.titleNode.innerHTML = title;
		desktop.ui._windowList.setValue(this._winListItem, "label", title);
		this.title = title;
	},
	_getPoints: function(/*Object*/box) {
		//	summary:
		//		Get the points of a box (as if it were on an xy plane)
		//	box:
		//		the box. {x: 24 (x position), y: 25 (y position), w: 533 (width), h: 435 (height)}
		return {
			tl: {x: box.x, y: box.y},
			tr: {x: box.x+box.w, y: box.y},
			bl: {x: box.x, y: box.y+box.h},
			br: {x: box.x+box.w, y: box.y+box.h}
		}
	},
	_onTaskClick: function()
	{
		//	summary:
		//		Called when the task button on a panel is clicked on
		//		Minimizes/restores the window
		var s = this.domNode.style.display;
		if(s == "none")
		{
			this.restore();
			this.bringToFront();
		}
		else
		{
			if(!this.bringToFront()) this.minimize();
		}
	},
	_toggleMaximize: function() {
		//	summary:
		//		Toggles the window being maximized
		if(this.maximized == true) this.unmaximize();
		else this.maximize();
	},
	makeResizer: function() {
		//	summary:
		//		Internal method that makes a resizer for the window.
		dojo.style(this.sizeHandle.domNode, "display", "block");
	},
	killResizer: function()
	{
		//	summary:
		//		Internal method that gets rid of the resizer on the window.
		/*dojo.disconnect(this._dragging);
		dojo.disconnect(this._resizeEvent);
		dojo.disconnect(this._doconmouseup);
		this.sizeHandle.style.cursor = "default";*/
		dojo.style(this.sizeHandle.domNode, "display", "none");
	},
	minimize: function()
	{
		//	summary:
		//		Minimizes the window to the taskbar
		if(this._minimizeAnim && desktop.config.fx >= 2) return;
		this.onMinimize();
		if(desktop.config.fx >= 2)
		{
			this._minimizeAnim = true;
			if(desktop.config.fx < 3) this._toggleBody(false);
			var pos = dojo.coords(this.domNode, true);
			this.left = pos.x;
			this.top = pos.y;
			var win = this.domNode;
			console.log("test");
			this._width = dojo.style(win, "width");
			this._height = dojo.style(win, "height");
			var taskbar = dijit.byNode(dojo.query(".desktopTaskbarApplet")[0].parentNode);
			if(taskbar) var pos = dojo.coords(taskbar._buttons[this.id], true);
			else var pos = {x: 0, y: 0, w: 0, h: 0};
			var anim = dojo.animateProperty({
				node: this.domNode,
				duration: desktop.config.window.animSpeed,
				properties: {
					opacity: {end: 0},
					top: {end: pos.y},
					left: {end: pos.x},
					height: {end: pos.h},
					width: {end: pos.w}
				},
				easing: dojox.fx.easing.easeIn
			});
			dojo.connect(anim, "onEnd", this, function() {
				dojo.style(this.domNode, "display", "none");
				if(desktop.config.fx < 3) this._toggleBody(true);
				this._minimizeAnim = false;
			});
			anim.play();
		}
		else
		{
			dojo.style(this.domNode, "opacity", 100)
			dojo.style(this.domNode, "display", "none");
		}
		this.minimized = true;
	},
	restore: function()
	{
		//	summary:
		//		Restores the window from the taskbar
		if(this._minimizeAnim && desktop.config.fx >= 2) return;
		this.domNode.style.display = "inline";
		if(desktop.config.fx >= 2)
		{
			this._minimizeAnim = true;
			if(desktop.config.fx < 3) this._toggleBody(false);
			var anim = dojo.animateProperty({
				node: this.domNode,
				duration: desktop.config.window.animSpeed,
				properties: {
					opacity: {end: 100},
					top: {end: this.top},
					left: {end: this.left},
					height: {end: this._height},
					width: {end: this._width}
				},
				easing: dojox.fx.easing.easeOut
			});
			dojo.connect(anim, "onEnd", this, function() {
				if(desktop.config.fx < 3) this._toggleBody(true);
				this.resize();
				this._minimizeAnim = false;
			});
			anim.play();
		}
		this.minimized = false;
	},
	maximize: function()
	{
		//	summary:
		//		Maximizes the window
		this.onMaximize();
		this.maximized = true;
		var viewport = dijit.getViewport();
		dojo.addClass(this.domNode, "win-maximized");
		if(this._drag) this._drag.onMouseUp(); this._drag.destroy();
		this.killResizer();
		this.pos.top = dojo.style(this.domNode, "top");
		//this.pos.bottom = dojo.style(this.domNode, "bottom");
		this.pos.left = dojo.style(this.domNode, "left");
		//this.pos.right = dojo.style(this.domNode, "right");
		this.pos.width = dojo.style(this.domNode, "width");
		this.pos.height = dojo.style(this.domNode, "height");
		var win = this.domNode;
		var max = desktop.ui._area.getBox();
		if(desktop.config.fx >= 2)
		{
			//api.log("maximizing... (in style!)");
			if(desktop.config.fx < 3) this._toggleBody(false);
			var anim = dojo.animateProperty({
				node: this.domNode,
				properties: {
					top: {end: max.T},
					left: {end: max.L},
					width: {end: viewport.w - max.R - max.L},
					height: {end: viewport.h - max.B - max.T}
				},
				duration: desktop.config.window.animSpeed
			});
			dojo.connect(anim, "onEnd", this, function() {
				if(desktop.config.fx < 3) this._toggleBody(true);
				this.resize();
			});
			anim.play();
		}
		else
		{
			//api.log("maximizing...");
			win.style.top = max.T;
			win.style.left = max.L;
			win.style.width = (viewport.h - max.R - max.L)+"px";
			win.style.height = (viewport.h - max.B - max.T)+"px";
			this.resize();
		}
	},
	makeDragger: function()
	{
		//	summary:
		//		internal method to make the window moveable
		if(desktop.config.window.constrain) 
		{
			this._drag = new dojo.dnd.move.parentConstrainedMoveable(this.domNode, {
				handle: this.handle
			});
		}
		else
		{
			this._drag = new dojo.dnd.Moveable(this.domNode, {
				handle: this.handle
			});
		}
		this._dragStartListener = dojo.connect(this._drag, "onMoveStart", dojo.hitch(this, function(mover){
			if(desktop.config.fx < 3) this._toggleBody(false);
		}));
		this._dragStopListener = dojo.connect(this._drag, "onMoveStop", dojo.hitch(this, function(mover){
			if (desktop.config.fx < 3) {
				this._toggleBody(true);
				this.resize();
			}
		}));
	},
	unmaximize: function()
	{
		//	summary:
		//		Unmaximizes the window
		dojo.removeClass(this.domNode, "win-maximized");
		this.makeDragger();
		if(this.resizable == true)
		{		
			this.makeResizer();
		}
		var win = this.domNode;
		if(desktop.config.fx >= 2)
		{
			if(desktop.config.fx < 3) this._toggleBody(false);
			var anim = dojo.animateProperty({
				node: this.domNode,
				properties: {
					top: {end: this.pos.top},
					left: {end: this.pos.left},
					width: {end: this.pos.width},
					height: {end: this.pos.height}
				},
				duration: desktop.config.window.animSpeed
			});
			dojo.connect(anim, "onEnd", this, function(e) {
				if(desktop.config.fx < 3) this._toggleBody(true);
				this.resize();
			});
			void(anim); //fixes a weird ass IE bug. Don't ask me why :D
			anim.play();
		}
		else
		{
			win.style.top = this.pos.top+"px";
			win.style.left = this.pos.left+"px";
			win.style.height= this.pos.height+"px";
			win.style.width= this.pos.width+"px";
			this.resize();
		}
		this.maximized = false;
	},
	bringToFront: function()
	{
		//	summary:
		//		Brings the window to the front of the stack
		//	returns:
		//		true if it had to be raised
		//		false if it was already on top
		var ns = dojo.query("div.win", desktop.ui.containerNode);
		var maxZindex = 10;
		var alwaysOnTopNum = 0;		// Number of wins with 'alwaysOnTop' property set to true
		var topWins = new Array();	// Array of reffernces to win widgets with 'alwaysOnTop' property set to true
		var winWidget;			// Reffernce to window widget by dom node
		for(var i=0;i<ns.length;i++)
		{
			if(dojo.style(ns[i], "display") == "none") continue;
			if(dojo.style(ns[i], "zIndex") > maxZindex)
			{
				maxZindex = dojo.style(ns[i], "zIndex");
			}
			winWidget = dijit.byNode(ns[i]);
			if ( winWidget.alwaysOnTop == true ) {
				alwaysOnTopNum++;
				topWins.push( winWidget );
			}
		}
		var zindex = dojo.style(this.domNode, "zIndex");
		if(maxZindex != zindex)
		{
			maxZindex++;
			dojo.style(this.domNode, "zIndex", maxZindex);
			// Check for win widgets with 'alwaysOnTop' property set to true
			if ( topWins.length > 0 ) {
				for ( i=0; i < topWins.length; i++ ) {
					maxZindex++;
					dojo.style(topWins[i].domNode, "zIndex", maxZindex);
				}
			}
			return true;
		}
		return false;
	},
	uninitialize: function() {
		if(!this.closed) this.onClose();
		if(this._winListItem) desktop.ui._windowList.deleteItem(this._winListItem);
		if(this._drag) this._drag.destroy();
		if(this.sizeHandle) this.sizeHandle.destroy();
	},
	close: function()
	{
		//	summary:
		//		closes the window
		if (!this.closed) {
			this.closed = true;
			if(this._winListItem) desktop.ui._windowList.deleteItem(this._winListItem);
			this._winListItem = false;
			this.onClose();
			var onEnd = dojo.hitch(this, function() {
				this.destroy();
			})
			if (desktop.config.fx >= 2) {
				if(desktop.config.fx < 3) this._toggleBody(false);
				var anim = dojo.fadeOut({
					node: this.domNode,
					duration: desktop.config.window.animSpeed
				});
				dojo.connect(anim, "onEnd", this, onEnd);
				anim.play();
			}
			else onEnd();
		}
	},
	resize: function(/*Object?*/args){
		//	summary:
		//		Explicitly set the window's size (in pixels)
		//	args:
		//		{w: int, h: int, l: int, t: int}
		var node = this.domNode;
		
		//first take care of our size if we're maximized
		if(this.maximized && typeof args == "undefined") {
			var max = desktop.ui._area.getBox();
			var viewport = dijit.getViewport();
			dojo.style(node, "top", max.T+"px");
			dojo.style(node, "left", max.L+"px");
			dojo.style(node, "width", (viewport.w - max.R - max.L)+"px");
			dojo.style(node, "height", (viewport.h - max.B  - max.T)+"px");
		}
		else if(this.maximized && typeof args != "undefined") {
			var fx = desktop.config.fx;
			desktop.config.fx = 0;
			this.unmaximize();
			desktop.config.fx = fx;
		}
		
		// set margin box size, unless it wasn't specified, in which case use current size
		if(args){
			// Offset based on window border size
			if(args.w) {
				var calc = node.offsetWidth;
				var c = this.containerNode.offsetWidth;
				args.w = ((calc-c)+args.w);
			}
			if(args.h) {
				var calc = node.offsetHeight;
				var c = this.containerNode.offsetHeight;
				args.h = ((calc-c)+args.h);
			}
			dojo.marginBox(node, args);

			// set offset of the node
			if(args.t){ node.style.top = args.t + "px"; }
			if(args.l){ node.style.left = args.l + "px"; }
			
		}
		
		// If either height or width wasn't specified by the user, then query node for it.
		// But note that setting the margin box and then immediately querying dimensions may return
		// inaccurate results, so try not to depend on it.
		var mb = dojo.mixin(dojo.marginBox(this.containerNode), args||{});

		// Save the size of my content box.
		this._contentBox = dijit.layout.marginBox2contentBox(this.containerNode, mb);
		
		// Callback for widget to adjust size of it's children
		this.layout();
	},
	layout: function(){
		//	summary:
		//		Layout the widge
		dijit.layout.layoutChildren(this.containerNode, this._contentBox, this.getChildren());
	},
	addChild: function(/*Widget*/ child, /*Integer?*/ insertIndex){
		//	summary:
		//		Add a child to the window
		//	child:
		//		the child to add
		//	insertIndex:
		//		at what index to insert the widget
		dijit._Container.prototype.addChild.apply(this, arguments);
		if(this._started){
			dijit.layout.layoutChildren(this.containerNode, this._contentBox, this.getChildren());
		}
	},
	removeChild: function(/*Widget*/ widget){
		//	summary:
		//		Remove a child from the widget
		//	widget:
		//		the widget to remove
		dijit._Container.prototype.removeChild.apply(this, arguments);
		if(this._started){
			dijit.layout.layoutChildren(this.containerNode, this._contentBox, this.getChildren());
		}
	},
	_onResize: function(e) {
		//	summary:
		//		Event handler. Resizes the window when the screen is resized.
		if (this.maximized && !this.minimized) {
			var max = desktop.ui._area.getBox();
			var c = dojo.coords(this.domNode);
			var v = dijit.getViewport();
			dojo.style(this.domNode, "width", v.w - max.L - max.R);
			dojo.style(this.domNode, "height", v.h - max.T - max.B);
		}
		else if(this.maximized && this.minimized) {
			var max = desktop.ui._area.getBox();
			var v = dijit.getViewport();
			this.pos.width = v.w - max.L - max.R;
			this.pos.height = v.h - max.T - max.B;
		}
		this.resize();
	},
	startup: function() {
		//	summary:
		//		starts the widget up
		this.inherited("startup", arguments);
		this.resize();
	}
});

dojo.extend(dijit._Widget, {
	// layoutAlign: String
	//		"none", "left", "right", "bottom", "top", and "client".
	//		See the LayoutContainer description for details on this parameter.
	layoutAlign: 'none'
});
