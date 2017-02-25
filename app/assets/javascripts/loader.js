// load web fonts
(function(w){
	var doc = w.document.documentElement.classList;
	if( doc.contains("fonts-loaded") ){ return; }
	
	(new FontFaceObserver("Exo 2", {
		weight: 600
	})).load().then(function(){
		console.log("Exo 2: 600");
		doc.add("fonts-loaded-headers");
		(new FontFaceObserver("Lora", {
			weight: 400
		})).load().then(function(){
			console.log("Lora: 400");
			doc.add("fonts-loaded-main");
			w.Promise.all([
				(new FontFaceObserver("Lora", {
					weight: 700
				})).load(),
				(new FontFaceObserver("Lora", {
					style: "italic"
				})).load(),
				(new FontFaceObserver("Lora", {
					weight: 700,
					style: "italic"
				})).load(),
			]).then(function(){
				console.log("All fonts loaded");
				doc.add("fonts-loaded");
				__cookie.set('fontsLoaded', true);
			});
		});
	});
	
}( this ));
