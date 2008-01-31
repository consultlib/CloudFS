dojo.require("dojo.io.iframe");
/** 
* An API that interacts with the filesystem
* TODO: document this. Also condense it so all the callbacks are not seperate functions.
* 
* @classDescription An API that interacts with the filesystem
* @memberOf api
*/
api.fs = new function()
{ 
   this.ls = function(object)
    {
        api.xhr({
        backend: "api.fs.io.getFolder",
		content: {
			path: object.path
		},
		handleAs: "xml",
        load: function(data, ioArgs) {
			var results = data.getElementsByTagName('file');
			if (api.fs.lsArray) {
				delete api.fs.lsArray;
			}
			api.fs.lsArray = [];
			for(var i = 0; i<results.length; i++){
			api.fs.lsArray[i] = new Object();
			if(results[i].getAttribute("type") == "folder") {
			api.fs.lsArray[i].isDir = true;
			}
			else {
			api.fs.lsArray[i].isDir = false;
			}
			api.fs.lsArray[i].file = results[i].firstChild.nodeValue;
			}
	        if(object.callback) { object.callback(api.fs.lsArray); }
		},
        error: function(error, ioArgs) { api.log("Error in Crosstalk call: "+error.message); },
        mimetype: "text/xml"
        });
    }
   this.read = function(object)
    {
        api.xhr({
        backend: "api.fs.io.getFile",
		content: {
			path: object.path
		},
		handleAs: "xml",
        load: function(data, ioArgs) {
			if(!data) { if(object.onError) { object.onError(); } else { api.ui.alertDialogDialog({title: "Error", message: "Sorry! We couldn't open \""+object.path+"\". Check the file exists and try again."}); } }
			var results = data.getElementsByTagName('file');
			try {
			content = results[0].firstChild.nodeValue;
			content = content.replace(/&lt;/gi, "<");
			content = content.replace(/&gt;/gi, ">");
			content = content.replace(/&amp;/gi, "&");
			content = content.replace(/&apos;/gi, "'");
			content = content.replace(/&quot;/gi, "\"");
			}
			catch(e) {
			content = "";
			}
			var file = {
				path: object.path,
				contents: content
			};
	        if(object.callback) { object.callback(file); }
		},
        error: function(error, ioArgs) { api.log("Error in Crosstalk call: "+error.message); },
        mimetype: "text/xml"
        });
    }
   this.write = function(object)
   {
		try {
		object.content = object.content.replace(/</gi, "&lt;");
		object.content = object.content.replace(/>/gi, "&gt;");
		object.content = object.content.replace(/&/gi, "&amp;");
		object.content = object.content.replace(/'/gi, "&apos;");
		object.content = object.content.replace(/"/gi, "&quot;");
		}
		catch(e) {
		object.content = "";
		}
        api.xhr({
        backend: "api.fs.io.writeFile",
		content: {
			path: object.path,
			content: object.content
		},
		dsktp_callback: object.callback,
		load: function(data, ioArgs)
		{
			ioArgs.args.dsktp_callback(data);
		},
        error: function(error, ioArgs) { api.log("Error in Crosstalk call: "+error.message); },
        mimetype: "text/html"
        });
    }
	this.move = function(object)
    {
		if(object.newname) {
		newpath_ = object.path.lastIndexOf("/");
		newpath = object.path.substring(0, newpath_);
		newpath = newpath + "/" + object.newname;
		}
		else {
		newpath = object.newpath;
		}
        api.xhr({
        backend: "api.fs.io.renameFile",
		content: {
			path: object.path,
			newpath: newpath
		},
		dsktp_callback: object.callback,
		load: function(data, ioArgs)
		{
			ioArgs.args.dsktp_callback(data);
		},
        error: function(error, ioArgs) { api.log("Error in Crosstalk call: "+error.message); },
        mimetype: "text/html"
        });
    }
	this.rename = function(object)
	{
		api.log("renaming a file is the same as moving it, technically. - try not to use api.fs.rename.");
		this.move(object);
	}
    this.mkdir = function(object)
    {
        api.xhr({
        backend: "api.fs.io.createDirectory",
		content: {
			path: object.path
		},
		dsktp_callback: object.callback,
		load: function(data, ioArgs)
		{
			ioArgs.args.dsktp_callback(data);
		},
        error: function(error, ioArgs) { api.log("Error in Crosstalk call: "+error.message); },
        mimetype: "text/html"
        });
    }
   this.rm = function(object)
    {
        api.xhr({
        backend: "api.fs.io.removeFile",
		content: {
			path: object.path
		},
		dsktp_callback: object.callback,
		load: function(data, ioArgs) {
			ioArgs.args.dsktp_callback(data);
		},
        error: function(error, ioArgs) { api.log("Error in Crosstalk call: "+error.message); },
        mimetype: "text/html"
        });
    }
   this.copy = function(object)
    {
        api.xhr({
        backend: "api.fs.io.copyFile",
		content: {
			path: object.from,
			newpath: object.to
		},
		dsktp_callback: object.callback,
		load: function(data, ioArgs) {
			ioArgs.args.dsktp_callback(data);
		},
        error: function(error, ioArgs) { api.log("Error in Crosstalk call: "+error.message); },
        mimetype: "text/html"
        });
    }
   this.rmdir = function(object)
    {
        api.xhr({
	        backend: "api.fs.io.removeDir",
			content: {
				path: object.path
			},
			dsktp_callback: object.callback,
			load: function(data, ioArgs) {
				ioArgs.args.dsktp_callback(data);
			},
	        error: function(error, ioArgs) { api.log("Error in Crosstalk call: "+error.message); },
	        mimetype: "text/html"
        });
    }
	this.download = function(path) {
		var url = api.xhr("api.fs.io.download") + "&path=" + path;
		var frame = dojo.io.iframe.create("fs_downloadframe", "");
		dojo.io.iframe.setSrc(frame, url, true);
	}
	this.downloadFolder = function(path, as) {
		if(as == null) { as = "zip" }
		var url = api.xhr("api.fs.io.downloadFolder") + "&path=" + path + "&as=" + as;
		var frame = dojo.io.iframe.create("fs_downloadframe", "");
		dojo.io.iframe.setSrc(frame, url, true);
	}
	this.compressDownload = function(path, as) {
		if(as == null) { as = "zip" }
		var url = api.xhr("api.fs.io.compressDownload") + "&path=" + path + "&as=" + as;
		var frame = dojo.io.iframe.create("fs_downloadframe", "");
		dojo.io.iframe.setSrc(frame, url, true);
	}
	this.embed = function(path) {
		return api.xhr("api.fs.io.display") + "&path=" + path;
	}
	this.info = function(path, callback) {
		api.xhr({
			backend: "api.fs.io.info",
			content: {
				path: path
			},
			load: function(data, args) {
				callback(data);
			},
			handleAs: "json"
		})
	}
}