INSERT INTO user (username, email, password) VALUES 
	("noreikam", "noreikam1@gmail.com", "password"),
	("JustTrey12", "JustTrey12@gmail.com", "password"),
	("KennethHollis", "KennethHollis@gmail.com", "password"),
	("norklas",	"norklas@gmail.com", "password");

INSERT INTO post (title, post_text, user_id, created_at, updated_at) VALUES 
  ("Foil-Wrapped Fillets", "This simple but effective method involves cleaning and gutting the fish, stuffing it with herbs and veggies and wrapping it in aluminum foil. Then, place the pouch next to hot coals, flip it often and check it periodically to avoid overcooking your meal.", "1", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ("Rainbow Trout in Spring", "Trout is a favorite sport fish, but catching them in the spring may require you to change tactics. Fish later in the day when the sun is high. Pro fisherman Gary Edwards recommends using a 4-inch yarn fly called Maciag’s yarn worm.", "2", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ("Connecticut State Record Bass", "The state record largemouth bass was caught from Mashapaug Lake.  The state record smallmouth bass came from Shenipsit Lake.", "3", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ("Highland Lake", "I've caught largemouth bass, smallmouth bass, rainbow trout, brook trout, brown trout, bluegill, pumpkinseed sunfish and yellow perch at Highland Lake in Connecticut.  Latest catch was a 9 pound smallmouth on 4/12/22.", "4", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ("Bay Rat Lures", "With a large and ever-growing variety of color and size options specifically directed toward walleye, Bay Rats are a great option to add to your box. They have quality hooks, are 100% made in the USA and are one of the most durable lures on the market.", "3", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ("CT Fishing Forecast", "This spring has been a series of ups and downs.   Luckily, anglers have found a bit more consistency with the fishing this week, as a small rise in water temperatures has resulted in some better saltwater action.", "4", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


