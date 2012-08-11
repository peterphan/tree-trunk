// CONSTANTS
OFFSET = 4;
CIRCLE_RADIUS = 8;
LABEL_FONTSIZE = 12;
LABEL_COLOR = "#FFFFFF";
CIRCLE_COLOR = "#88dddd"; // LIGHT BLUE
CIRCLE_SELECTED = "#FE2E2E"; // PINKISH RED
ENTER_KEY = 13;
OFFSET_WIDTH_BETWEEN_NODES = 50;
OFFSET_HEIGHT_BETWEEN_NODES = 35;

// Global
root = null;
prev = null;
current_elem = null;

function Branch(line, node) {
	this.line = line;
	this.node = node;
}

function Node(circle, label) {
	this.parent = null;
	this.branches = new Array();
	this.circle = circle;
	this.label = label;
	this.p = null; // probability
	this.cp = null; // conditional probability
}

function transformElement(elem, dx, dy) {
	elem.transform("t"+dx+","+dy);
}

/* MAKE BETTER, FIX COORDINATES */
function onHover(node) {
	var hover = document.getElementById('hover');
	hover.innerHTML = node.label.attr("text");
	hover.style.padding = "3px";
	hover.style.display = "block";
	hover.style.top = $(canvas.container).offset().top + "px";
	hover.style.left = $(canvas.container).offset().left +"px";
}

function onUnhover(node) {
	var hover = document.getElementById('hover');
	hover.innerHTML = "";
	hover.style.display = "none";
}

/* Action for when a node is double clicked */
function dblClickNode(node) {
	prev.circle.attr("fill", CIRCLE_COLOR);
	current_elem = node;
	node.circle.attr("fill", CIRCLE_SELECTED);
	prev = current_elem;
	document.getElementById('elemSelected').innerHTML = node.label.attr("text");
	document.getElementById('selectNode').value = node.label.attr("text");
	document.getElementById('setNodeName').value = node.label.attr("text");
	document.getElementById('error').innerHTML = "Selected node " + node.label.attr("text");
	document.getElementById('error').style.color = "blue";
}

/* CONSTRUCTOR */
function Canvas(containerID, sidebarID) {
	this.container = document.getElementById(containerID);
	this.sidebar = document.getElementById(sidebarID);
	this.width = this.container.offsetWidth;
	this.height = this.container.offsetHeight;
	this.container.style.position = "relative";

	this.paper = Raphael(this.container, this.width, this.height);
	this.background = this.paper.rect(0, 0, this.width, this.height);
	this.background.attr("fill", "grey");


	root = this.makeNode(this.width/2, CIRCLE_RADIUS, "DEFAULT");
	current_elem = root;
	current_elem.circle.attr("fill", CIRCLE_SELECTED);
	prev = root;
	document.getElementById('elemSelected').innerHTML = "DEFAULT";
}

Canvas.prototype.makeLabel = function(xCoord, yCoord, str) {
	var label = this.paper.text(xCoord, yCoord, str);
	label.attr("font-size", LABEL_FONTSIZE);
	label.attr("fill", LABEL_COLOR);
	return label;
}

Canvas.prototype.makeCircle = function(xCoord, yCoord) {
	var circle = this.paper.circle(xCoord, yCoord, CIRCLE_RADIUS);
	circle.attr("fill", CIRCLE_COLOR);
	return circle;
}

Canvas.prototype.makeLine = function(x1, y1, x2, y2) {
	return this.paper.path("M"+x1+" "+y1+"L"+x2+" "+y2);
}

Canvas.prototype.makeNode = function(xCoord, yCoord, str) {
	var circle = this.makeCircle(xCoord, yCoord);
	var label = this.makeLabel(xCoord, yCoord, str);
	var node = new Node(circle, label);

	// events
	node.circle.dblclick(function(event) {
		return dblClickNode(node);
	});

	node.circle.hover(
		function(event) { return onHover(node)}, 
		function(event) { return onUnhover(node)});

	transformElement(node.circle, 0, OFFSET);
	transformElement(node.label, 0, node.label.getBBox().height + node.circle.getBBox().height/2);
	return node;
}