/*
Picup helper
================

About:
----------------
The Picup iPhone application allows webapps to request photos from the iPhone device, 
in place of the traditional file input form field. Call Picup.convertFileInput for 
each file input field that allows iPhone photo uploads. This function should be called 
after the document has loaded, such as in an onLoad observer.

NOTE: Make sure that the client browser is Mobile Safari before you replace the file inputs.

Examples:
----------------
• Converting a file-upload field into a Picup button:

    Picup.convertFileInput( fileInputField,  { 	'referrername' : escape('My Web App'),
                                             	'purpose'      : escape('Upload A Photo') });

• Opening an existing upload in the Picup app:

    Picup.openFileWithId('p12');                                            

• Generating a Picup URL:

    // URL to upload a photo:
    
    Picup.urlForOptions('new', { 'referrername' : escape('My Web App'),
                                 'purpose'      : escape('Upload A Photo') });
                                  
    // URL to view a photo:
    Picup.urlForOptions('view', { 'picID' : 'p12' });            
    
• Defining a custom callback handler:

    // To handle the return data from the Picup app, define the Picup.callbackHandler
    // function, which is passed a query string of return values.
    
	// If Picup.callbackHandler is defined, the page will observe the location.hash.
	// If it changes (e.g. the callback URL returns control to the page that launched Picup), 
	// Picup.callbackHandler will be called with an object containing key/value pairs of the 
	// parameters.
	
    Picup.callbackHandler = function(data){
		for(var key in data){
			console.log(key + " = " + data[key]);
		}
    }

Additional Notes:
----------------
If you have multiple file input fields that use Picup, the last input field that launched 
the app will be referenced by Picup.activeFileInput. 

More info:
----------------
API documentation, with explainations of the possible options can be found at http://picupapp.com

================
© William Lindmeier, 2010
http://picupapp.com

*/

var Picup = {
    
    customURLScheme : 'fileupload://',     
    windowname : 'fileupload',
    activeFileInput : null,
    currentHash : '', 
    hashObserverId : null,

	// Override this as a function to handle hash changes
    callbackHandler : null,

    openFileWithId : function(picID){
        window.open(Picup.urlForOptions('view', {'picID' : picID}), Picup.windowname);
        return false;
    },
    
    convertFileInput : function(inputOrInputId, options){
        var input = inputOrInputId;
        if(typeof(inputOrInputId) == 'string'){
           input = document.getElementById(inputOrInputId);
        }
    	input.type = 'button';
    	input.value = "Choose Photo...";
    	input.picupOptions = options;
    	input.onclick = function(){     	    
    	    Picup.activeFileInput = this;
    		window.open(Picup.urlForOptions('new', this.picupOptions), Picup.windowname);
    		// start the observer
    		if(Picup.callbackHandler){
	    		Picup.currentHash = window.location.hash;
	    		Picup.hashObserverId = setInterval('Picup.checkHash()', 500);
    		}			
    	};
    	input.disabled = false;
    	
    	return false;
    },
    
    checkHash : function(){	    
    	if(window.location.hash != Picup.currentHash){
    		// The hash has changed
    		clearInterval(Picup.hashObserverId);
    		Picup.currentHash = window.location.hash;
    		
	    	var hash = window.location.hash.replace(/^\#/, '');
    		var paramKVs = hash.split('&');
			var paramHash = {};
			var paramOutput = [];
			for(var p=0;p<paramKVs.length;p++){
				var kvp = paramKVs[p];
				// we only want to split on the first =, since data:URLs can have = in them
				var kv = kvp.replace('=', '&').split('&');
				paramHash[kv[0]] = kv[1];
			}
			Picup.callbackHandler(paramHash);
    	}
    },
    
    urlForOptions : function(action, options){
	    var url = Picup.customURLScheme+action+'?';
    	var params = [];
    	for(var param in options){
    		params.push(param+'='+options[param]);
    	}
    	var uploadURL = url + params.join('&');
    	return uploadURL;
    },
    
}; 