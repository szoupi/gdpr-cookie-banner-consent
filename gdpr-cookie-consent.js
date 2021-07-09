/**
 * COOKIES CATEGORIES
 * strict
 * functionality
 * targeting
 * 
 */
// const messageImage = video-blocked-accept-cookies-first.png



// set and get cookies function
const cookieStorage = {
    getItem: (item) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        
            console.log(`${item}`);

        return cookies[item];
    },
    setItem: (item, value) => {
        document.cookie = `${item}=${value};`
    }
}

const deleteAllCookies = () => {
    let cookies = document.cookie.split(";");
    console.log(`cookies ${cookies} to be deleted`);

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `cookiename= ${name}; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
        console.log(`cookie ${name} deleted`);
    }
}

// create GOOGLE ANALYTICS scripts MANUALLY
// <script data-cookiecategory="targeting" async src="https://www.googletagmanager.com/gtag/js?id=UA-159826830-1"></script>
const loadGoogleAnalyticsFn = () => {
    const gascript1 = document.createElement('script');
    gascript1.src = 'https://www.googletagmanager.com/gtag/js?id=UA-159826830-1';
    gascript1.async = true;
    document.head.append(gascript1);

    const gascript2 = document.createElement('script');
    // TODO make dynamic variable
    gascript2.src = 'https://aead.gr/aead_ga.js';
    document.head.append(gascript2);
}


const enableScripts = (acceptedCookieCategory) => {
    // disabled scripts are plain text
    // enabled are converted to javascript
    let scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].dataset.cookiecategory == acceptedCookieCategory) {
            
            console.log(i, scripts[i].dataset.cookiecategory);
            scripts[i].type = 'text/javascript';
            console.log(scripts[i], ' changed');
        }
    }
}

const msg = (myid) => {

}



const enableIframes = (acceptedCookieCategory) => {

    // if iframes are accepted enable them
    let iframes = document.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; i++) {
        if (iframes[i].dataset.src && iframes[i].dataset.cookiecategory == acceptedCookieCategory) {
    
            // console.log(i, iframes[i].dataset.src);
            iframes[i].setAttribute('src', iframes[i].dataset.src );
        }
    }
}



const storageType = cookieStorage; //set storage type to cookies
const consentPropertyName = 'cookie_consent_user_accepted'; //custom name for our cookie 

//ask/show msg banner if consent cookie is missing
const shouldShowPopup = () => !storageType.getItem(consentPropertyName); 
// console.log( storageType.getItem(consentPropertyName) +'shouldShowPopup')

// if consent is given set cookie value to true
let consent_level = '';
const consent_max_age =';max-age=5184000' // 2 months 60x60x24x60, ;key=value format

const saveToStorage = () => storageType.setItem(consentPropertyName, consent_level + consent_max_age);

console.log(saveToStorage)


// ///////////////////////////////////////////////////////////////////////////////////
window.onload = () => {
    
    // it is called when the accept button is clicked
    const acceptFn = event => {

        // 0. initialize variables
        const functionalityCookie = document.getElementById('functionality-cookie');
        const targetingCookie = document.getElementById('targeting-cookie');

        deleteAllCookies();

        consent_level = 'strict' + ' '; // just for reference

        // 1. select accepted categories
        // 1.1 if functionality cookies are accepted save value
        if (functionalityCookie.checked) {
            consent_level += functionalityCookie.value  + ' ';;
        }

        // 1.2 if targeting cookies are accepted save value to array
        if (targetingCookie.checked) {
            consent_level += targetingCookie.value;    
        }

        // 2. Loop for each selected category
        consent_level
            .split(' ')
            .forEach(category => {
                enableScripts(category);
                console.log(' enable script with category ' + category);
                enableIframes(category);
                console.log('enable iframe with category ' + category);                
            });
        
        console.log(consent_level);       
        saveToStorage(storageType);   
        
        
        //3. hide msg banner
        consentPopup.classList.add('hidden'); 

        //4. reload page
        location.reload();

    }

    
    // SHOW COOKIE BANNER 
    const enableCookieBannerFn = () => {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 1000);
    }    
    

    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');
    acceptBtn.addEventListener('click', acceptFn);
    
    // SHOW COOKIE BANNER MANUALLY
    const enableCookieBannerBtn = document.getElementById('enable-cookie-banner');
    enableCookieBannerBtn.addEventListener('click', enableCookieBannerFn);

    // ACCEPT ALL
    const acceptAllBtn = document.getElementById('acceptAll');
    acceptAllBtn.addEventListener('click', () => {
        console.log('acceptAll selected');
        consent_level = 'strict functionality targeting'; // add all categories that apply
        saveToStorage(storageType);
        loadGoogleAnalyticsFn();

        //3. hide msg banner
        consentPopup.classList.add('hidden');
         
        //4. reload page
        location.reload();


    })



    // TODO convert iframes to img
    const hideYouTubeIframeFn = () => {
        let iframes = document.getElementsByTagName('iframe');
        for (let i = 0; i < iframes.length; i++) {
            // if iframe has data-src, it means it should be hidden on purpose
            if (iframes[i].dataset.src) {
                // make dynamic varibles
                iframes[i].setAttribute('src', 'https://aead.gr/video-blocked-accept-cookies-first.png')

                let mydiv = document.createElement('div');
                mydiv.setAttribute('id', 'msg' + i);
                mydiv.innerHTML = 'Για την προβολή των βίντεο μέσω της πλατφόρμας YouTube, είναι απαραίτητο να αποδεχθείτε τα cookies λειτουργικότητας, σύμφωνα με την <a href="politiki-cookies" id="#"> Πολιτική cookies </a>';            
                // let a = document.createElement('a');
                // // a.setAttribute('id', 'accept');
                // a.setAttribute('href', '#');
                // a.innerHTML = 'Enable cookie banner!!';            

                // mydiv.appendChild(a);
                iframes[i].insertAdjacentElement('afterend', mydiv);
                // a.addEventListener('click', enableCookieBannerFn() );


            }
        }

    }


    // IF cookie is missing display consent banner...
    if (shouldShowPopup(storageType)) {

        hideYouTubeIframeFn();
        enableCookieBannerFn();


    // ... ELSE loop through stored cookie's accepted categories and enable scripts
    } else {

        const cookiesAcceptedCategories = storageType.getItem(consentPropertyName).split(' ');
        
        //check ONLY ONCE IF functionality cookies are allowed
        // if NO hide YouTube iframes
        // the code is outside loop because of negative parameter
        if (![...cookiesAcceptedCategories].includes('functionality')) {
            hideYouTubeIframeFn();
        }

        cookiesAcceptedCategories.forEach(category => {
            // ENABLE GOOGLE ANALYTICS IF ACCEPTED
            if (category == 'targeting') {
                loadGoogleAnalyticsFn();
            } 

            enableScripts(category);
            console.log(' cookie is here scripts enabled ' + category);

         

            enableIframes(category);
            console.log(' cookie is here frames enabled '+ category);
            
        }); 
    }



};