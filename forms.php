<p> Current Node: </p>
<div id="elemSelected"></div>
<div id="forms">
	<p class="input"> Select Node: </p> <input type="text" id="selectNode" onkeydown="selectNode(this.value,event)"/>
	<div id="error"> <p> </p></div>
	<hr />
	<p class="input"> Set Current Node Name: </p> <input type="text" id="setNodeName" onkeydown="setNodeName(this.value,event)"/>
	<p class="input createNode"> Set Probability: </p> <input type="number" name="probability" min="0" max="1" step=".01" onkeydown="setProbability(this.value)"/>
	<hr />
	<p class="input"> New Node Name: </p> <input type="text" id="newNodeName" onkeydown="makeBranch(event)"/>
	<p class="input createNode"> Create Node </p> <input type="button" onclick="makeBranch()"/>
</div>