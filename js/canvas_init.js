// CONSTANTS
OFFSET = 4;
CIRCLE_RADIUS = 8;
LABEL_FONTSIZE = 12;
LABEL_COLOR = "#000";
CIRCLE_COLOR = "#88dddd"; // LIGHT BLUE
CIRCLE_SELECTED = "#FE2E2E"; // PINKISH RED
ENTER_KEY = 13;
OFFSET_BETWEEN_NODES = 45;
CHILD_SEPARATOR_VALUE = 2;

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
	this.p = null;
}

function transformElement(elem, dx, dy) {
	elem.transform("t"+dx+","+dy);
}

function dblClickNode(event, node) {
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

/* FOR DEBUGGING */
function consoleDimensions(elem) {
	console.log("width: " + elem.getBBox().width);
	console.log("height: " + elem.getBBox().height);
	console.log("x1, y1: (" + elem.getBBox().x + ", " + elem.getBBox().y + ")");
	console.log("x2, y2: (" + elem.getBBox().x2 + ", " + elem.getBBox().y2 + ")");
}

/* CONSTRUCTOR */
function Canvas(containerID) {
	this.container = document.getElementById(containerID);
	this.width = this.container.offsetWidth;
	this.width.toString = this.width + "px";
	this.height = this.container.offsetHeight;
	this.height.toString = this.height + "px";
	this.container.style.position = "relative";
	this.paper = Raphael(this.container, this.width, this.height);
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
	node.circle = circle;
	node.label = label;
	node.circle.dblclick(function(event) {
		return dblClickNode(event, node);
	});

	transformElement(node.circle, 0, OFFSET);
	transformElement(node.label, 0, node.label.getBBox().height + node.circle.getBBox().height/2);
	return node;
}