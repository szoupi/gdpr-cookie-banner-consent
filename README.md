# gdpr-cookie-banner-consent

## CHANGE GOOGLE ANALYTICS SCRIPT
### THE SCRIPT IS CREATED ON THE FLY
1/2 IN THE gdpr-cookie-consent.js change the UA id of google script
2/2 IN THE aead_ga.js FILE change the UA id of google script

### YOUTUBE IFRAME
Μη αποδεκτή λύση διότι
Λειτουργεί μόνο με τη προσθήκη data-src αντί για src
data-src="https://www.youtube-nocookie.com/embed/1AzXWLadbo0" 
data-cookiecategory="functionality" 
and remove src attribute
BUG: JOOMLA REMOVES THE IFRAME IF I CHANGE IT
SHOULD CHANGE IT WITH JS ON THE FLY


### OTHER SCRIPTS
<!-- * Change script type="text/javascript" to script type="text/plain"  -->
<!-- * add the cookie category eg: data-cookiecategory="targeting"  -->


## COOKIE BANNER
Add cookie html banner to the footer of the page as module (in wp use plugin "Custom CSS and JS)

## LINK TO BANNER
Add link with id="enable-cookie-banner" at bottom of the page:
<div><a id="enable-cookie-banner" href="#">Διαχείριση Cookies</a></div>



## ASSETS (JOOMLA MAINLY)
* upload aead_ga.js to to site root /
* upload video-blocked-accept-cookies-first.png files to site root /
* Create folder "gdpr-cookie-consent" to site root / and upload there only gdpr-cookie-consent.js and style.css. These are the files that are loaded at the head (automatically???)

## AT THE HEAD OF THE PAGE
* Load /gdpr-cookie-consent/style.css  
* Load /gdpr-cookie-consent/gdpr-cookie-consent.js 