<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
	  xmlns:svg="http://www.w3.org/2000/svg"
	  xmlns:vml="urn:schemas-microsoft-com:vml">
	<?php include("header.php"); ?>
	<body>
		<div id="container">
			<div id="sidebar">
				<?php include("forms.php"); ?>
			</div>
			<div id="hover"></div>
			<div id="panel"></div>
			<script type="text/javascript">
				canvas = null;
				window.onload = function() {
					canvas = new Canvas("panel", "sidebar");
				}
			</script>
		</div>
	</body>
</html>