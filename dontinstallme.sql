-- NOTE: DON'T ACTUALLY RUN THIS! THIS IS JUST FOR REFERENCE!!!
-- Changed the charset to utf8, it's more standard...
-- Also fixed that nasty "there can be only one auto column and it must be defined as a key" bug.
-- Now the user can specify a prefix! Woo Hoo!!!
-- --------------------------------------------------------
-- 
-- Table structure for table `#__apps`
-- 
DROP TABLE IF EXISTS `#__apps`;
CREATE TABLE `#__apps` (
  `ID` int(20) NOT NULL auto_increment PRIMARY KEY,
  `name` mediumtext NOT NULL,
  `author` mediumtext NOT NULL,
  `email` mediumtext NOT NULL,
  `code` longtext NOT NULL,
  `library` longtext NOT NULL,
  `version` text NOT NULL,
  `maturity` mediumtext NOT NULL,
  `category` mediumtext NOT NULL
) TYPE=MyISAM CHARACTER SET `utf8` COLLATE `utf8_general_ci` AUTO_INCREMENT=1 ;

-- 
-- Dumping data for table `#__apps`
-- 

REPLACE INTO `#__apps` VALUES (1, 'Calculator', 'Psychiccyberfreak', 'bj@psychdesigns.net', 'var winHTML = \\''<STYLE type=\\"text/css\\"> .calcBtn { font-weight: bold; width: 100%; height: 100%; } </style><form name=\\"calculator\\"><table border=\\"0\\" cellpadding=\\"2\\" cellspacing=\\"0\\" width=\\"100%\\" height=\\"95%\\"><tr><td colspan=\\"4\\"><input type=\\"text\\" name=\\"calcResults\\" value=\\"0\\" style=\\"text-align: right; width: 100%;\\"></td></tr><tr><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" C \\" name=\\"calclear\\" onclick=\\"gCalculator.OnClick(\\\\\\''c\\\\\\'')\\"></td><td></td><td></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" = \\" name=\\"calequal\\" onclick=\\"gCalculator.OnClick(\\\\\\''=\\\\\\'')\\"></td></tr><tr><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 7 \\" name=\\"cal7\\" onclick=\\"gCalculator.OnClick(\\\\\\''7\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''7\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 8 \\" name=\\"cal8\\" onclick=\\"gCalculator.OnClick(\\\\\\''8\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''8\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 9 \\" name=\\"cal9\\" onclick=\\"gCalculator.OnClick(\\\\\\''9\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''9\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" / \\" name=\\"caldiv\\" onclick=\\"gCalculator.OnClick(\\\\\\''/\\\\\\'')\\"></td></tr><tr><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 4 \\" name=\\"cal4\\" onclick=\\"gCalculator.OnClick(\\\\\\''4\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''4\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 5 \\" name=\\"cal5\\" onclick=\\"gCalculator.OnClick(\\\\\\''5\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''5\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 6 \\" name=\\"cal6\\" onclick=\\"gCalculator.OnClick(\\\\\\''6\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''6\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" * \\" name=\\"calmul\\" onclick=\\"gCalculator.OnClick(\\\\\\''*\\\\\\'')\\"></td></tr><tr><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 1 \\" name=\\"cal1\\" onclick=\\"gCalculator.OnClick(\\\\\\''1\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''1\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 2 \\" name=\\"cal2\\" onclick=\\"gCalculator.OnClick(\\\\\\''2\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''2\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 3 \\" name=\\"cal3\\" onclick=\\"gCalculator.OnClick(\\\\\\''3\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''3\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" + \\" name=\\"calplus\\" onclick=\\"gCalculator.OnClick(\\\\\\''+\\\\\\'')\\"></td></tr><tr><td colspan=\\"2\\"><input class=\\"calcBtn\\" type=\\"button\\" value=\\" 0 \\" name=\\"cal0\\" onclick=\\"gCalculator.OnClick(\\\\\\''0\\\\\\'')\\" ondblclick=\\"gCalculator.OnClick(\\\\\\''0\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" . \\" name=\\"caldec\\" onclick=\\"gCalculator.OnClick(\\\\\\''.\\\\\\'')\\"></td><td><input class=\\"calcBtn\\" type=\\"button\\" value=\\" - \\" name=\\"calminus\\" onclick=\\"gCalculator.OnClick(\\\\\\''-\\\\\\'')\\"></td></tr></table></form>\\'';\r\r\nnewWindow(\\"Calculator\\", winHTML, 190, 200);', 'function Calculator_OnClick(keyStr)\r\r\n{\r\r\nvar resultsField = document.calculator.calcResults;\r\r\n\r\r\nswitch (keyStr)\r\r\n{\r\r\ncase \\"0\\":\r\r\ncase \\"1\\":\r\r\ncase \\"2\\":\r\r\ncase \\"3\\":\r\r\ncase \\"4\\":\r\r\ncase \\"5\\":\r\r\ncase \\"6\\":\r\r\ncase \\"7\\":\r\r\ncase \\"8\\":\r\r\ncase \\"9\\":\r\r\ncase \\"0\\":\r\r\ncase \\".\\":\r\r\n\r\r\nif ((this.lastOp==this.opClear) || (this.lastOp==this.opOperator))\r\r\n{\r\r\nresultsField.value = keyStr;\r\r\n}\r\r\nelse\r\r\n{\r\r\n// ignore extra decimals\r\r\nif ((keyStr!=\\".\\") || (resultsField.value.indexOf(\\".\\")<0))\r\r\n{\r\r\nresultsField.value += keyStr;\r\r\n}\r\r\n\r\r\n}\r\r\n\r\r\nthis.lastOp = this.opNumber;\r\r\nbreak;\r\r\n\r\r\ncase \\"*\\":\r\r\ncase \\"/\\":\r\r\ncase \\"+\\":\r\r\ncase \\"-\\":\r\r\nif (this.lastOp==this.opNumber)\r\r\nthis.Calc();\r\r\nthis.evalStr += resultsField.value + keyStr;\r\r\n\r\r\nthis.lastOp = this.opOperator;\r\r\nbreak;\r\r\n\r\r\ncase \\"=\\":\r\r\nthis.Calc();\r\r\nthis.lastOp = this.opClear;\r\r\nbreak;\r\r\n\r\r\ncase \\"c\\":\r\r\nresultsField.value = \\"0\\";\r\r\nthis.lastOp = this.opClear;\r\r\nbreak;\r\r\n\r\r\ndefault:\r\r\nalert(\\"\\''\\" + keyStr + \\"\\'' not recognized.\\");\r\r\n}\r\r\n\r\r\n}\r\r\n\r\r\nfunction Calculator_Calc()\r\r\n{\r\r\nvar resultsField = document.calculator.calcResults;\r\r\n//alert(\\"eval:\\"+this.evalStr+resultsField.value);\r\r\nresultsField.value = eval(this.evalStr+resultsField.value);\r\r\nthis.evalStr = \\"\\";\r\r\n}\r\r\n\r\r\nfunction Calculator()\r\r\n{\r\r\nthis.evalStr = \\"\\";\r\r\n\r\r\nthis.opNumber = 0;\r\r\nthis.opOperator = 1;\r\r\nthis.opClear = 2;\r\r\n\r\r\nthis.lastOp = this.opClear;\r\r\n\r\r\nthis.OnClick = Calculator_OnClick;\r\r\nthis.Calc = Calculator_Calc;\r\r\n}\r\r\n\r\r\ngCalculator = new Calculator(); ', '1.0', 'Alpha', 'Office');
REPLACE INTO `#__apps` VALUES (2, 'Web Browser', 'Psychiccyberfreak', 'bj@psychdesigns.net', 'var winHTML = \\''<form name=\\"submitbox\\" action=\\"#\\" onSubmit=\\"return gBrowser.Go()\\" ><input type=\\"text\\" id=\\"browserUrlBox\\" value=\\"http://www.google.com/\\" style=\\"width: 94%;\\" /><input type=\\"button\\" value=\\"Go\\" onClick=\\"gBrowser.Go()\\" style=\\"width: 6%;\\"><br /><iframe style=\\"width: 99%; height: 90%; background-color: #FFFFFF;\\" src=\\"http://www.google.com\\" id=\\"browserIframe\\" /></form>\\'';\r\r\nnewWindow(\\"Web Browser\\", winHTML, 500, 400);', 'function browser_Go()\r\r\n{\r\r\nurlbox = document.getElementById(\\"browserUrlBox\\");\r\r\nURL = urlbox.value;\r\r\nif(URL.charAt(4) == \\":\\" && URL.charAt(5) == \\"/\\" && URL.charAt(6) == \\"/\\")\r\r\n{\r\r\n}\r\r\nelse\r\r\n{\r\r\n//but wait, what if it\\''s an FTP site?\r\r\nif(URL.charAt(3) == \\":\\" && URL.charAt(4) == \\"/\\" && URL.charAt(5) == \\"/\\")\r\r\n{\r\r\n}\r\r\nelse\r\r\n{\r\r\n//if it starts with an \\"ftp.\\", it\\''s most likely an FTP site.\r\r\nif((URL.charAt(0) == \\"F\\" || URL.charAt(0) == \\"f\\") && (URL.charAt(1) == \\"T\\" || URL.charAt(1) == \\"t\\") && (URL.charAt(2) == \\"P\\" || URL.charAt(2) == \\"p\\") && URL.charAt(3) == \\".\\")\r\r\n{\r\r\nURL = \\"ftp://\\"+URL;\r\r\n}\r\r\nelse\r\r\n{\r\r\n//ok, it\\''s probably a plain old HTTP site...\r\r\nURL = \\"http://\\"+URL;\r\r\n}\r\r\n}\r\r\n}\r\r\nIframe = document.getElementById(\\"browserIframe\\");\r\r\nIframe.src = URL;\r\r\nurlbox.value = URL;\r\r\n\r\r\nreturn false;\r\r\n}\r\r\n\r\r\nfunction Browser()\r\r\n{\r\r\nthis.Go = browser_Go;\r\r\nreturn false;\r\r\n}\r\r\n\r\r\ngBrowser = new Browser(); ', '1.0', 'Alpha', 'Internet');
REPLACE INTO `#__apps` VALUES (3, 'Settings', 'Psychiccyberfreak', 'bj@psychdesigns.net', 'winHTML = \\"<div padding=10>\\";\r\r\nwinHTML += \\"<h3>Wallpaper Background Color</h3>\\";\r\r\nwinHTML += \\"<input type=\\''button\\'' value=\\''White\\'' onClick=\\''setWallpaperColor(\\\\\\"white\\\\\\")\\''>\\";\r\r\nwinHTML += \\"<input type=\\''button\\'' value=\\''Black\\'' onClick=\\''setWallpaperColor(\\\\\\"black\\\\\\")\\''>\\";\r\r\nwinHTML += \\"<input type=\\''button\\'' value=\\''Blue\\'' onClick=\\''setWallpaperColor(\\\\\\"blue\\\\\\")\\''>\\";\r\r\nwinHTML += \\"<input type=\\''button\\'' value=\\''Red\\'' onClick=\\''setWallpaperColor(\\\\\\"red\\\\\\")\\''>\\";\r\r\nwinHTML += \\"<input type=\\''button\\'' value=\\''Green\\'' onClick=\\''setWallpaperColor(\\\\\\"green\\\\\\")\\''>\\";\r\r\nwinHTML += \\"<h3>Wallpaper</h3>\\";\r\r\nwinHTML += \\"<input type=\\''button\\'' value=\\''Blank\\'' onClick=\\''setWallpaper()\\''>\\";\r\r\nwinHTML += \\"<input type=\\''button\\'' value=\\''Default\\'' onClick=\\''setWallpaper(\\\\\\"./wallpaper/default.gif\\\\\\")\\''>\\";\r\r\nwinHTML += \\"</div>\\";\r\r\nnewWindow(\\"Control Panel\\", winHTML, 190, 200);', '//put your javascript library here. Don\\''t forget to make it a class!!!', '1.0', 'Beta', 'System');
REPLACE INTO `#__apps` VALUES (4, 'Hello World', 'jaymacdonald', 'jaymac407@gmail.com', ' var winHTML = \\"<div padding=10>\\";\r\r\nwinHTML += \\"<h2>Hello World</h2>\\";\r\r\nwinHTML += \\"</div>\\";\r\r\nnewWindow(\\"Hello World\\", winHTML, 190, 200);', '','1.0','Alpha','System');
-- --------------------------------------------------------

-- 
-- Table structure for table `#__users`
-- 
DROP TABLE IF EXISTS `#__users`;
CREATE TABLE `#__users` (
  `username` mediumtext NOT NULL,
  `email` mediumtext NOT NULL,
  `password` mediumtext NOT NULL,
  `logged` tinyint(1) NOT NULL default '0',
  `ID` int(11) NOT NULL auto_increment PRIMARY KEY,
  `level` mediumtext NOT NULL
) TYPE=MyISAM CHARACTER SET `utf8` COLLATE `utf8_general_ci` AUTO_INCREMENT=1 ;

-- Registry
DROP TABLE IF EXISTS `#__registry`;
CREATE TABLE `#__registry` (
  `ID` int(11) NOT NULL auto_increment PRIMARY KEY,
  `userid` int(11) NOT NULL,
  `appid` int(20) NOT NULL,
  `varname` mediumtext NOT NULL,
  `value` mediumtext NOT NULL
) TYPE=MyISAM CHARACTER SET `utf8` COLLATE `utf8_general_ci` AUTO_INCREMENT=1 ;
