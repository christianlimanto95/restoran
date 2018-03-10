<html>
<head>
	<title><?php echo $title; ?></title>
	
	<link rel="stylesheet" href="<?php echo base_url("assets/css/common/default.css"); ?>" />
	<link rel="stylesheet" href="<?php echo base_url("assets/css/" . $page_name . ".css"); ?>" />
	<?php echo $additional_css; ?>
	<style>
		@font-face {
			font-family: pinarak;
			src: url(<?php echo base_url("assets/fonts/Pinarak.ttf"); ?>);
		}

		@font-face {
			font-family: square_721;
			src: url(<?php echo base_url("assets/fonts/Square_721.ttf"); ?>);
		}
	</style>
</head>
<body>
<div class="header">
</div>
<div class="container">