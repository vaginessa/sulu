 var Command = function() {
	return this;
}

Command.prototype.toggleBookmark = function toggleBookmark() {
	var v = this.GUI.activeView();
	var self = this;
	if (v){
		const {shell} = require('electron');
		var view = this.GUI.activeView().model; 
		var file = view.activeRowData();  
		if (file){
			var path = require("path"); 
			var fn =  path.join(view.path, file.name) + file.ext; 
			var index = self.config.settings.bookmarks.indexOf(fn);
			if ( index === -1 ){ 
			 	self.config.settings.bookmarks.push(fn);
			} else {
				self.config.settings.bookmarks.splice(index, 1);
			}
			self.config.save();
			view.refresh();
		} else {
			this.GUI.app.msg("please select a file.");
		}
	} else {
		this.GUI.app.msg("please select a file system view.");
	}
	return false;  
};

function FileIcons(client){
	this.bookmarkClass = "fa fa-bookmark glow";
	this.init(client);
	return this;
}

FileIcons.prototype.init = function(client) {  
	client.app.config.settings.bookmarks = client.app.config.settings.bookmarks || [];
	client.app.events.on("init-filesystem-item-icon", this.getFileSystemItemIcon); 
	
	this.command = new Command();
	client.app.registerHotKey("ctrl+b", this.command.toggleBookmark);
};

FileIcons.prototype.getFileSystemItemIcon = function(fileSystemItem){  
	if (fileSystemItem.bookmarked){
 		fileSystemItem.bookmarkClass = this.bookmarkClass;
	}
	return fileSystemItem;
};

module.exports = FileIcons;