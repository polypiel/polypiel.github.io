---
layout: default
---

<article id="content-div">
	<header class="section-header">
		<h1>Contact</h1>
	</header>

	<p class="summary">If you'd like to contact me you may use the following form.</p>

<?php if(isset($_GET["e"])) {?>
	<p class="error"><i class="fa fa-frown-o fa-2x"></i> Oops! Something went wrong. Please, revise your input and try again.</p>
<?php } ?>

	<form id="contactform" action="email.php" method="POST" style="max-width: 500px;">
		<label for="name">Name<span class="required">*</span></label>
		<input id="name" type="text" name="name" required="required">

		<label for="email">Email</label>
		<input id="email" type="email" name="email">

		<label for="message">Message<span class="required">*</span></label>
		<textarea id="message" name="message" required="required" rows="6"></textarea>

		<label for="captcha">3 + 5 =<span class="required">*</span></label>
		<input id="captcha" type="text" name="captcha" required="required">

		<input id="submit" type="submit" name="submit" value="Submit">
	</form>
</article>
