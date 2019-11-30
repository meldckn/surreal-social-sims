var grammarRules = {

	// Generate schema first, setting resources/values to types and default values? 
	// Then they are populated as terminals for either scalarResource or booleanResource

	start: [ 
		// Use .push .new(nonterminalRule) to ensure different expansions
		// (Might be better to use Tracery's stack construct but couldn't easily
		// figure out how to query it during expansion.)
		"#[#setSubjectPlurality#]volitionRule#",
		"#[#setSubjectPlurality#]actionRule#"
	],
	// Set #role# and #intention# together so they match (e.g., "everyone wants.." vs "everyone want..")
	setSubjectPlurality: [
		"[role:#singularRole#][intention:wants]",//, does not want to]", // too awkwardly phrased w/negatives
		"[role:#pluralRole#][intention:want,like,prefer,tend]"//, do not want to]"
	],
	volitionRule: [
		// #role and #intention# are set by the [#setSubjectPlurality#] action so they match grammatically
		"V: #role.capitalize# #intention# #scalarValueChange# #scalarResource#"
	],
	actionRule: [
		// #role and #intention# are set by the [#setSubjectPlurality#] action so they match grammatically
		"A: #role.push.capitalize# #intention# to #socialVerb# #pluralRole.new(pluralRole)#",
		"A: #role.push.capitalize# #intention# to #socialVerbNoObject#"
	],

	//intention: [ "want", "like", "prefer", "tend"],
	scalarValueChange: [ "to increase", "to increase their", "to decrease", "to decrease their", "to make more", "more", "less" ],
	collectiveValueChange: [ "more", "less" ],
	booleanValueChange: [ "become" ],

	// Not sure if all kinds of resources can be used in the same contexts?
	// Or does resource imply scalar value? (A boolean resource is just a trait or mood?)
	resource: [ "#scalarResource#", "#resourceOrRelationship#" ], 

	scalarResource: [ "fiction", "reality", "satisfaction", "spoons", "drive", "stories", "story", "history", "honesty", "trust", "activity", "attention", "change", "reasons", "work", "fun", "social energy", "power", "authority" ],
	collectiveValue: [ "cuddles", "words" ],
	resourceOrRelationship: [ "change", "history", "guidance" ],
	relationship: [ "strangers", "taken in", "friends" ],

	singularRole: [ "everyone", "no one"], //"a person with #thing.s#" ], // "a person" is awk in context w/others
	pluralRole: [ 
		"heroes", "villains", "optimists", "pessimists", "leaders", "followers", // need more
		"people with #thing.s#",
		"people with #resource#",
		"#mood# people" 
		// , "people with #condition#"
	],

	// shorthand for getting a new character (no repeats)!
	otherCharacter: [ "#pluralRole.new(pluralRole)#" ], 

	// things get pluralized in pluralRole
	thing: [ "#size# ego", "pet", "chips on their shoulder" ],
	size: [ "large", "huge", "small", "tiny" ], 

	// #role #socialVerb #role (always followed by a character)
	socialVerb: [
		"praise",
		"extoll",
		"judge",
		"hug",
		"do things for", // "do #doVerb# for"? or "do #actionAdj# things for"?
		"shelter",
		"comfort",
		"look at",
		"look to",
		"glance at",
		"stare at",
		"watch",
		"study",
		"avoid eye contact with",
		"nag",
		"pester",
		"pat",
		"pet",
		"tease",
		"call",
		"text",
		"message", // sounds to similar to massage and therefore awkward?
		"connect with",
		"charm",
		"talk to ",
		"talk about #otherCharacter# to",
		"gossip with",
		"gossip about #otherCharacter# with",
		"listen to",
		"hear",
		"amplify",
		"highlight",
		"boost",
		"lift",
		"find",
		"encourage",
		"follow",
		"lead",
		"stand beside",
		"reach for",
		"learn from",
		"teach",
		"coach",
		"advise",
		"counsel",
		"guide",
		"influence",
		"manipulate",
		"persuade",
		"convince",
		"debate",
		"propose to",
		"negotiate with",
		"reconcile with",
		"share with",
		"take from",
		"visit",
		"host",
		"correct",
		"assist",
		"help",
		"caution",
		"warn",
		"hire",
		"enlist",
		"recruit",
		"solicit",
		"appoint",
		"promote",
		"fire",
		"terminate",
		"assign",
		"support",
		"provide for",
		"spoil",
		"diagnose",
		"interrogate ",
		"question",
		"treat",
		"document",
		"critique",
		"criticize",
		"meet with",
		"wait for",
		"introduce #otherCharacter# to",
		"urge",
		"demand",
		"implore",
		"flatter",
		"compliment",
		"boast to",
		"brag to",
		"belittle",
		"write to",
		"make things for", // "make #thingAdj things for"?
		"laugh at",
		"laugh with",
		"pity",
		"lie to",
		"avoid",
		"ignore",
		"ghost",
		"pass",
		"disown",
		"curse",
		"bemoan",
		"sing to",
		"bow to",
		"praise",
		"reprimand",
		"rebuke",
		"scold",
		"admonish",
		"discredit",
		"forget",
		"eat with",
		"drink with",
		"feast with",
		"go out with",
		"start dating"
	],

	// like socialVerb but doesn't accept characters after
	socialVerbNoObject: [
		"sing #otherCharacter# to sleep",
		"tell #otherCharacter.possessive# story",
		"plead with #otherCharacter# for #resource#",
		"beg #otherCharacter# for #resource#",
		"appeal to #otherCharacter.possessive# #resource#",
		// 3 characters gets a little too complicated? (e.g., "No one wants to tease people with satisfaction for people with activity's benefit")
		"tease #otherCharacter# for #otherCharacter.possessive# benefit", // both otherCharacters are different
		"compare #otherCharacter# to #otherCharacter#", // ""
		"hold #otherCharacter.possessive# gaze",
		"give #otherCharacter# a piece of their mind",
		"look to #otherCharacter# for #resource#",
		"burn bridges",
		"make #otherCharacter# #makeableAction#", 
		"make #otherCharacter# #makeableMood#" 
	],

	// e.g., people like to make other people #makeableAction#
	// Might eventually just use a rule for nonsocial/individual verbs
	makeableAction: [ 
		"smile",
		"laugh"
	],
	makeableMood: [
		"happy",
		"sad",
		"embarrassed",
		"uncomfortable"
	],
	mood: [
		"#makeableMood"
	],

	///////

	// Stuff leftover from Kate's sample grammar rules for reference
	character : ["Cheri", "Fox", "Morgana", "Jedoo", "Brick", "Shadow", "Krox", "Urga", "Zelph"],

	mood : ["quiet", "morose", "gleeful", "happy", "bemused", "clever", "jovial", "vexatious", "curious", "anxious", "obtuse", "serene", "demure"],

	nonrecursiveStory : ["The #pet# went to the beach."],
	//  story : ["#recursiveStory#", "#recursiveStory#", "#nonrecursiveStory#"],
	recursiveStory : ["The #pet# opened a book about[pet:#mood# #animal#] #pet.a#. #story#[pet:POP] The #pet# closed the book."],
	
	"story" : ["#hero.capitalize# was a great #occupation#, and this song tells of #heroTheir# adventure. #hero.capitalize# #didStuff#, then #heroThey# #didStuff#, then #heroThey# went home to read a book."],
	"monster" : ["dragon", "ogre", "witch", "wizard", "goblin", "golem", "giant", "sphinx", "warlord"],
	"setPronouns" : ["[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]", "[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]", "[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"],
	"setOccupation" : ["[occupation:baker][didStuff:baked bread,decorated cupcakes,folded dough,made croissants,iced a cake]", "[occupation:warrior][didStuff:fought #monster.a#,saved a village from #monster.a#,battled #monster.a#,defeated #monster.a#]"],
	"origin" : ["#[#setPronouns#][#setOccupation#][hero:#name#]story#"]

};