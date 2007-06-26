/*
    Psych Desktop
    Copyright (C) 2006 HFLW

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
	*/
/*********************\
|    Psych Desktop    |
| Right Click Engine  |
|(c)2006 Psych Designs|
\*********************/
desktop.rightclick = new function()
{
	this.init = function()
	{
		this.menu = dojo.widget.createWidget("PopupMenu2", {targetNodeIds: ["windowcontainer", "taskbar", "taskbarhider"]});
		this.menu.addChild(dojo.widget.createWidget("MenuItem2", {caption: "right click"}));
	}
}
