/*jslint evil: true */
/*--------------------------------------------------------------------------
*  Mojo JavaScript framework, version 1.0
*  Copyright 2009 Palm, Inc.  All rights reserved.
*--------------------------------------------------------------------------*/
/**
* @name mojo.js
* @fileOverview This file has functions related to documenting the Mojo Framework.
*/

// if there's an appropriately named Prototype loader global, then we're running in an environment with
// prototype built-in and should initialize it to copy it into the global object. 
if (window.InstallPrototypeBuiltIn) {
	InstallPrototypeBuiltIn(window);
} else if (window.palmInitPrototype) {
	palmInitPrototype(window,navigator,document);	
}

/**
* This section contains some methods that can be used to debug your applications and other utility functions (assert, require, loadScriptWithCallback ...)
* @namespace
* @name Mojo
*/
window.Mojo = {

	Version: {
		MAJOR: 0,
		MINOR: 1,
		POINT: 0,
		toString: function () { return [this.MAJOR, this.MINOR, this.POINT].join('.'); },
		use: 0
	},
	
	// This is a hash of version numbers to framework submissions.
	// It controls which framework build is used for each supported version.
	Versions: {
		"1": "344",
		"2": "344"
	},
	
	VersioningScheme: {
		PRE_RELEASE: "submissions",
		use: this.VERSION
	},

	findScriptTag: function() {
		if (document.querySelector) {
			return document.querySelector('script[x-mojo-version],script[x-mojo-submission]');			
		}
		var scriptTags = document.getElementsByTagName("script");
		for (var i=0; i < scriptTags.length; i++) {
			var scriptTag = scriptTags[i];
			if (scriptTag.src.match(/mojo.js/) && (scriptTag.hasAttribute('x-mojo-submission') || scriptTag.hasAttribute('x-mojo-version'))) {
				return scriptTag;
			}
		}
		return null;
	},
	
	/**
	* @private determineVersioning
	* @param {Object} url
	*/
	determineVersioning: function(url) {
		var match;
		var whichFramework;
		var scriptTag = this.findScriptTag();			
		if(scriptTag) {
			
			whichFramework = scriptTag.getAttribute('x-mojo-version');
			if(whichFramework) {
				whichFramework = Mojo.Versions[whichFramework];
			}
			else {
				whichFramework = scriptTag.getAttribute('x-mojo-submission');
			}
			
			if(whichFramework !== 'trunk') {
				Mojo.VersioningScheme.use = Mojo.VersioningScheme.PRE_RELEASE;
			}
						
			Mojo.Version.use = whichFramework;
		} else {

			match = document.baseURI.match(/framework=trunk/);
			if (match) {
				console.log("Framework trunk specified in a URL.");
				return;
			}
			match = url.match(/\?([sv]\w+)=([0-9]*)/);
			if (match) {
				// url match is ?submission=X, want to use a folder called submissions, not submission.
				if ((match[1] + "s") === Mojo.VersioningScheme.PRE_RELEASE) {
					Mojo.VersioningScheme.use = Mojo.VersioningScheme.PRE_RELEASE;
					Mojo.Version.use = match[2].valueOf();
					Mojo.Version.warnAboutSubmissionMethod = true;
				} else {
					console.log("WARNING, illegal parameters provided to mojo.js: " + match[1] + "=" + match[2]);
				}
			} else {
				match = url.match(/\?trunk/);
				if (match) {
					Mojo.Version.use = 'trunk';
					Mojo.Version.warnAboutSubmissionMethod = true;
				} else {
					throw("ERROR, illegal framework include: Please specify a framework submission. (e.g. x-mojo-submission=\"14\")");
				}
			}
		}
	},

	/**
	* @private
	*/
	generateFrameworkHome: function() {
		if (Mojo.VersioningScheme && Mojo.VersioningScheme.use) {
			return "/" + Mojo.VersioningScheme.use + "/" + Mojo.Version.use;
		} else {
			return "/trunk";
		}
	},

	/** @private */
	load: function() {
		var s, initialFileName, builtinFrameworkName, builtinFrameworkVersion;
		var script_tags = document.getElementsByTagName("script");
		for(var i = 0; i < script_tags.length; i++) {
			if (script_tags[i].src && script_tags[i].src.match(/mojo\.js(\?.*)?$/)) {
				s = script_tags[i].src;
			}
			if (s) {
				Mojo.loadString = s;
				Mojo.determineVersioning(s);
			}
		}

		builtinFrameworkVersion = Mojo.Version.use;
		builtinFrameworkName = "palmInitFramework" + builtinFrameworkVersion.replace(/\./g, "_");
		
		builtinFrameworkInit = window[builtinFrameworkName];
		if (builtinFrameworkInit) {
			console.log("=========> Calling " + builtinFrameworkName);
			builtinFrameworkInit(window,navigator,document);
		} else {
			// if prototype is built-in, pull in framework directly, rather than loader that pulls in
			// prototype then framework. This is a little hacky, since it depends on knowing what's in
			// loader.js, but it will work correctly for all the old submissions. 
			if (window.palmInitPrototype || window.InstallPrototypeBuiltIn) {
				initialFileName = 'framework';
			} else {
				initialFileName = 'loader';
			}
			s = '<script type="text/javascript" onerror="Mojo.reportLoadError();" src="/usr/palm/frameworks/mojo' +
			Mojo.generateFrameworkHome() +
			'/javascripts/' + initialFileName + '.js"><\/script>';
			document.write(s);
		}
	},

	/**
	* @private
	* @param {Object} event
	*/
	reportLoadError: function(event) {
		var errorString = 'The load of framework submission ' + Mojo.Version.use +
		' failed. Perhaps it is not installed?';
		console.error(errorString);
		document.write(errorString);
		alert(errorString);
	}
};

Mojo.isLightweight = document.baseURI.match(/lightweight=true/);
if (Mojo.isLightweight) {
	var otherMojo = window.opener.Mojo;
	var f = function finishLoading(loadEvent) {
		window.removeEventListener('load', arguments.callee, false);
		otherMojo.Controller.appController.finishOpenStage(loadEvent.target.defaultView);
	};
	window.addEventListener('load', f, false);
	otherMojo.loadStylesheets(document, false);
	otherMojo.loadStylesheets(document, true);
} else {
	Mojo.load();
}

if((Mojo.Version.use === 'trunk' || parseInt(Mojo.Version.use,10) >= 135 )) {
	if(window.PalmSystem && window.PalmSystem.stagePreparing) {
		window.PalmSystem.stagePreparing();
	}
}
