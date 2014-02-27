/**
 * Array of active projects
 */
active_projects = ["casataller", "dlp", "fartfighter", "damian", "dblog", "llf", "sp", "kde", "angel"];

/**
 * Each project has the following attributes:
 * @name Project name
 * @category Project category (web, game, ...)
 * @date End date
 * @desc Short description
 * @long-desc Long description
 * @tags List of tags
 * @links List of links (url and text)
 * @images List of images (img, thumb and title)
 */
projects = {
	"casataller": {
		"name": "Casa taller",
		"category": "web",
		"date": "Dec 2013",
		"desc": "Web site for design and illustration workshops.",
		"long_desc": [
			"Casa Taller is the website for a series of bookbinding (and other crafts) workshops. It has a careful minimalistic design. The background shapes a house to match the title (<em>casa</em> means house in Spanish.",
			"It's been develop in simple responsive HTML5. In the mobile version the background shrinks to half house. The navigation is made with AJAX. Jekyll has been used as a static generator."
		],
		"tags": ["html5", "responsive", "jekyll"],
		"links": [{"url": "http://casataller.info", "text": "Casa taller"} ],
		"images": [
			{"img": "casa_taller01.png", "title": "Desktop version"},
			{"img": "casa_taller02.png", "title": "Mobile version"},
			{"img": "casa_taller03.png", "title": "Mobile version with visible navigation"}
		]
	},

	"dlp": {
		"name": "DLP",
		"category": "web",
		"date": "Dec 2013",
		"desc": "Web site for DLP, a consulting company.",
		"long_desc": [
			"The color template uses only black and white to match the company's logo. The home page shows a big logo, but in the rest of pages only the bottom part is visible. So it saves space.",
			"The page uses Wordpress, so a new theme has been developed from the scratch. Also the page is responsive and margins, footers, lists... adapt to multiple widths."
		],
		"tags": ["html5", "wordpress"],
		"links": [{"url": "http://dlpconsultoria.com", "text": "DLP"} ],
		"images": [
			{"img": "dlp01.png", "title": "Home page"},
			{"img": "dlp02.png", "title": "Pavigation page"},
			{"img": "dlp03.png", "title": "Contact page"},
			{"img": "dlp04.png", "title": "Mobile version"},
			{"img": "dlp05.png", "title": "Mobile version with visible menu"}
		]
	},

	"fairycave": {
		"name": "Fairy Cave",
		"category": "web",
		"date": "Dec 2013",
		"desc": "Web site and shop",
		"tags": ["html", "wordpress"],
		"links": [{"url": "http://fairycave.net", "text": "Fairy Cave"} ],
		"images": [
			{"img": "images/projects/sp01.png", "thumb": "images/projects/thumb_sp01.png", "title": "Title screen"},
			{"img": "images/projects/sp02.png", "thumb": "images/projects/thumb_sp02.png", "title": "Options screen"},
			{"img": "images/projects/sp03.png", "thumb": "images/projects/thumb_sp03.png", "title": "Game"}
		]
	},

	"fartfighter": {
		"name": "Fart Fighter (Remake)",
		"category": "game",
		"date": "In progress",
		"desc": "A Street Fighter alike game, but featuring South Park characters.",
		"long_desc": [
			"Fart Fighter was a game that I develop during my school days. It's based on South Park's characters Terrance & Phillip. So that, instead of fighting they fart.",
			"The game is in progress and it's build using the Javascript game engine Quintus."
		],
		"tags": ["game", "quintus"],
		"links": [{"url": "https://github.com/polypiel/fart-fighter", "text": "Project", "type": "github"}],
		"images": [
			{"img": "fartfighter01.png", "title": "Game"}
		]
	},
	"dblog": {
		"name": "Damian Flores' Blog",
		"category": "web",
		"date": "Sept 2013",
		"desc": "A Wordpress theme for a personal blog.",
		"long_desc": [
			"The blog uses Wingdings font as base. Images, bars, buttons... are build with Wingdings characters. Color and randomness make the site even more crazy."
		],
		"tags": ["wordpress", "wingdings"],
		"links": [{"url": "http://damianflores.es/blog/", "text": "Web page"} ],
		"images": [
			{"img": "dblog01.png", "title": "Home page"},
			{"img": "dblog02.png", "title": "Post entry page"}
		]
	},
	"damian": {
		"name": "Damian Flores' Site",
		"category": "web",
		"date": "Oct 2013",
		"desc": "Portfolio of the graphical designer Damian Flores.",
		"long_desc": [
			"The web is the portfolio and CV of Damian Flores, a graphical designer based in London.",
			"It uses Ajax for navigation, so it's a SPI (Single Page Interface) web. The data is in JSON format and Handlebars template system is used to build the pages."
		],
		"tags": ["ajax", "handlebars", "sass"],
		"links": [{"url": "http://damianflores.es/", "text": "Web page"} ],
		"images": [
			{"img": "damian01.png", "title": "Home page"},
			{"img": "damian02.png", "title": "Portfolio page"},
			{"img": "damian03.png", "title": "Project page"},
			{"img": "damian04.png", "title": "About page"}

		]
	},
	"sp": {
		"name": "SuperPalitos",
		"category": "game",
		"date": "2007",
		"desc": "Paper and pencil game developed in Java.",
		"long_desc": [
		],
		"tags": ["java", "swing"],
		"links": [
			{"url": "https://github.com/polypiel/superpalitos", "text": "Github", "type": "github"},
			{"url": "https://sites.google.com/site/superpalitos/", "text": "Web page"}
		],
		"images": [
			{"img": "sp01.png", "title": "Title screen"},
			{"img": "sp02.png", "title": "Options screen"},
			{"img": "sp03.png", "title": "Game"}
		]
	},
	"llf": {
		"name": "La Liga Fanática",
		"category": "web",
		"date": "2012-2013",
		"desc": "Collaborator of a fantasy football manager game.",
		"long_desc": [
			"I try to improve the usability of the site proposing and developing changes."
		],
		"tags": ["php", "codeignition", "bootstrap"],
		"links": [{"url": "http://laligafanatica.es/", "text": "Web page"}],
		"images": [
			{"img": "llf01.png", "title": "General table page"},
			{"img": "llf02.png", "title": "Team page"},
			{"img": "llf03.png", "title": "League page"},
			{"img": "llf04.png", "title": "Home page"}
		]
	},
	"kde": {
		"name": "KDE Widgets",
		"category": "widget",
		"date": "2008",
		"desc": "Some widgets for KDE desktop",
		"long_desc": [],
		"tags": ["widget", "kde", "superkaramba"],
		"links": [
			{"url": "http://kde-look.org/content/show.php/Last.sk?content=51167", "text": "Last.sk Page"},
			{"url": "http://code.google.com/p/lastsk/", "text": "Last.sk Google Project"},
			{"url": "http://kde-look.org/content/show.php/SKFortune?content=46458", "text": "SKFortune Page"},
			{"url": "http://kde-look.org/content/show.php/kpod?content=68256", "text": "kpod"}
		],
		"images": [
			{"img": "sk01.png","title": "Last.sk screenshot"},
			{"img": "sk02.png", "title": "Last.sk screenshot"}
		]
	},
	"angel": {
		"name": "My personal web",
		"category": "web",
		"date": "Feb 2014",
		"desc": "This web.",
		"long_desc": ["This is meta."],
		"tags": ["responsive", "jekyll", "handlebars"],
		"links": [
			{"url": "https://github.com/polypiel/web", "text": "Github", "type": "github"}
		]
	}
}
