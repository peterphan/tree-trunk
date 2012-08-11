/* Finds node with matching string from form input */
function findNode(str, elem) {
	var label = elem.label;
	if(str == elem.label.attr("text")) {
		return elem;
	}

	var length = elem.branches.length;
	for(var i=0; i<length; i++) {
		var node = findNode(str, elem.branches[i].node);
		if(node) {
			return node;
		}
	}
	return null;
}

/* If node is found, sets current_elem to the node and updates text displays */
function selectNode(str, event) {
	if(event.keyCode == ENTER_KEY) {
		var node = findNode(str.toUpperCase(), root);
		if(!node) {
			document.getElementById('error').innerHTML = "UNABLE TO LOCATE " + str;
			document.getElementById('error').style.color = "red";
		} else {
			dblClickNode(node);
		}
		document.getElementById('selectNode').value = "";
	}
}

/* Updates the name of the selected node */
function setNodeName(str, event) {
	if(current_elem && event.keyCode == ENTER_KEY) {
		var label = current_elem.label;
		label.attr("text", str.toUpperCase());
		document.getElementById('setNodeName').value = "";
		document.getElementById('elemSelected').innerHTML = label.attr("text");
	}
}

/* Returns an array of xcoordinates for children nodes */
function getXCoordinates(childrenSize, xCoord, yCoord) {
	var xCoords = new Array();
	var offsetBetweenNodes = OFFSET_WIDTH_BETWEEN_NODES/(Math.sqrt(yCoord)) + OFFSET_WIDTH_BETWEEN_NODES;
	console.log("xCoord func: offset:" + offsetBetweenNodes);
	for(var i=0; i<Math.floor(childrenSize/2); i++) {
		xCoords.push(xCoord - offsetBetweenNodes*(i+1));
	}

	if(childrenSize % 2 == 1) xCoords.push(xCoord);

	for(var i=0; i<Math.floor(childrenSize/2); i++) {
		xCoords.push(xCoord + offsetBetweenNodes*(i+1));
	}
	console.log(xCoords.length);
	return xCoords;
}

/* Updates the new element coordinates */
function RearrangeBranches(endY) {
	var length = current_elem.branches.length;
	var circle = current_elem.circle;
	var label = current_elem.label;
	var startX = circle.attr("cx");
	var startY = label.getBBox().y2;
	var xCoords = getXCoordinates(length, startX, startY);	
	for(i=0; i<length; i++) {
		var branch = current_elem.branches[i];
		if(branch.line) {
			branch.line.remove();
		}
		var line = canvas.makeLine(startX, startY, xCoords[i], endY);
		branch.line = line;
		var node = branch.node;
		node.circle.attr("cx", xCoords[i]);
		node.label.attr("x", xCoords[i]);
		transformElement(node.label, 0, node.label.getBBox().height+node.circle.getBBox().height/2);
	}
}

/* Makes and appends branch to current selected node, rearranges the location of branches */
function makeBranch(event) {
	if(canvas) {
		try { if(event.keyCode != ENTER_KEY) {return;}}
		catch (err) {console.log(err.message);}
		
		var textField = document.getElementById('newNodeName');
		if(!textField.value) return;

		// Set up vars
		var label = current_elem.label;
		var circle = current_elem.circle;
		var endY = label.getBBox().y2 + OFFSET_HEIGHT_BETWEEN_NODES;

		// create and append node to branches
		var node = canvas.makeNode(circle.attr("cx"), endY+CIRCLE_RADIUS, textField.value.toUpperCase());
		node.parent = current_elem;
		var branch = new Branch(canvas.makeLine(0,0,0,0), node); //null, node); //null, node);
		current_elem.branches.push(branch);

		RearrangeBranches(endY);
		textField.value = "";
	}
}

/* Helper function, removes nodes and lines */
function recursiveRemove(node) {
	var length = node.branches.length;
	if(length > 0) {
		for(var i=0; i<length; i++) {
			recursiveRemove(node.branches[i].node);
			var line = node.branches[i].line;
			node.branches[i].line = null;
			line.remove();
		}
	}
	var circle = node.circle;
	var label = node.label;
	node.circle = null;
	node.label = null;
	circle.remove();
	label.remove();
}

/* Removes all current circles, lines, and labels and adds default node */
function resetCanvas() {
	prev = null;
	recursiveRemove(root);
	root = canvas.makeNode(canvas.width/2, CIRCLE_RADIUS, "DEFAULT");
	current_elem = root;
	current_elem.circle.attr("fill", CIRCLE_SELECTED);
	prev = root;
	document.getElementById('elemSelected').innerHTML = "DEFAULT";
}

/* TODO: */
function setProbability(val) {
	
}

function setCProbability(val) {

}

/* TODO:
	jquery dialog
	considerations, what happens to its children... maybe delete all children?
	maybe in the future allow its children to remain and add clicking and dragging */
function deleteNode() {

}