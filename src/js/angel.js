var Angel = {
	init: function(config) {
		this.config = config;

		// Setup Handlebars
		this.setupTmpls();

		// Fills projects.seq and set project.next/project.previuos
		for(var i = 0; i < this.config.projects.seq.length; i++) {
			var p = this.config.projects.map[this.config.projects.seq[i]];
			p.id = this.config.projects.seq[i];
			p.previous = (i > 0) ? this.config.projects.map[this.config.projects.seq[i-1].id] : null;
			p.next = (i <  this.config.projects.seq.length) ? this.config.projects.map[this.config.projects.seq[i+1]] : null;
			this.config.projects.seq[i] = p;
		}

		// Parses page
    this.initPage(urlmodule.currentUrl());

    // Setups navigation
    this.config.container.sspiNavigable({
			toLoad: this.config.toLoad,
			beforeNavigate: this.preNavigate,
			afterNavigate: this.postNavigate
		});
	},

	setupTmpls: function() {
		var self = Angel;

		// Registers templates
		self.config.tmpls = {};
		$('script[type="text/x-handlebars-template"]').each(function(i, e) {
			var elem = $(e);
			self.config.tmpls[elem.attr('id')] = Handlebars.compile(elem.html());
		});
		// Used in project links
		Handlebars.registerHelper('linkIcon', function(type) {
			return type || "external-link";
		});
	},

	/**
	 * @param url Used to set the active page
	 */
	initPage: function(url) {
		var self = Angel;

		// Templating
		$('[data-tmpl]').each(function(i, e) {
			var elem = $(e);
			var tmpl = elem.data('tmpl');
			var err = false;

			// Loads context
			var context = {}
			switch (tmpl) {

				case "projects-tmpl":
					context = {'projects': self.config.projects.seq};
					break;

				case "project-tmpl":
					if(url.params && url.params["p"] && self.config.projects.map[url.params["p"]]) {
						context = self.config.projects.map[url.params["p"]];
					} else {
						err = true;
					}
					break;

				default:
					err = true;
			}

			// Loads template
			if(!err) {
				var html = self.config.tmpls[tmpl](context);
				elem.html(html);
			} else {
				// template not found
				// TODO SimpleSPI.navigate("/404.html");
				window.location = "/404.html";
			}
		});


		// Active page
		self.config.menu.each(function(index, elem) {
			var jelem = $(elem);
			var href = jelem.attr('href');
			if(href !== undefined) {
				if(href === url.page) {
					jelem.parent().addClass('active');
				} else {
					jelem.parent().removeClass('active');
				}
			}
		});

		// Grid
		var projects_grid = $('.projects-grid')[0];
		if(projects_grid) {
			salvattore.register_grid(projects_grid);
		}

		// Magnific Popup
		$('.project-photos').magnificPopup({ delegate: 'a', type: 'image', gallery:{enabled:true} });
	},

	// sspi events
	preNavigate: function(event, promise, url) {
		var self = Angel;

		self.config.container.removeClass('animated slideInRight');
		//self.config.container.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			promise.resolve();
		//});
	},
	postNavigate: function(event, url) {
		var self = Angel;

		self.config.container.addClass('animated slideInRight');
		self.initPage(url);
	}
};
