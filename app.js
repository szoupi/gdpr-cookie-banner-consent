/**
 * COOKIES CATEGORIES
 * strict
 * functionality
 * targeting
 * performance
 * unclassified
 *  
 */




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

const enableScripts = (acceptedCookieCategory) => {
    // if script are accepted enable them
    // disabled scripts are plain text
    // enabled are converted to javascript

    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].dataset.cookiecategory == acceptedCookieCategory) {
    
            console.log(i, scripts[i].dataset.cookiecategory);
            scripts[i].type = 'text/javascript';
            console.log(scripts[i], ' changed');

        }
    }
}

const enableIframes = () => {

    // if iframes are accepted enable them
    const iframes = document.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; i++) {
        // if (iframes[i].dataset.src && iframes[i].dataset.cookiescript =='accepted') {
    
            // console.log(i, iframes[i].dataset.src);
            iframes[i].setAttribute('src', iframes[i].dataset.src );
        // }
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

// console.log(consent_level)




window.onload = () => {
    
    // it is called when the accept button is clicked
    const acceptFn = event => {

        // 0. initialize variables
        const functionalityCookie = document.getElementById('functionality-cookie');
        const targetingCookie = document.getElementById('targeting-cookie');
        consent_level = 'strict' + ' '; // just for reference


        // 1. select accepted categories
        // 1.1 if functionality cookies are accepted save value
        if (functionalityCookie.checked) {
            consent_level += functionalityCookie.value  + ' ';;
            console.log(consent_level);       

        }
        // 1.2 if targeting cookies are accepted save value to array
        if (targetingCookie.checked) {
            consent_level += targetingCookie.value;
            console.log(consent_level);       
     

        }

        // 2.
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
        // document.getElementById('mytext').innerHTML = '1. google targeting script ok';

    }

    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');


    acceptBtn.addEventListener('click', acceptFn);


    // IF cookie is missing display consent banner...
    if (shouldShowPopup(storageType)) {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 1000);

        // TODO convert iframes to img

        // ... ELSE loop through stored cookie's accepted categories and enable scripts
    } else {

        const cookiesAcceptedCategories = storageType.getItem(consentPropertyName).split(' '); 
        cookiesAcceptedCategories.forEach(category => {
            enableScripts(category);
            console.log(' cookie is here scripts enabled');
            enableIframes(category);
            console.log(' cookie is here frames enabled');
            
        }); 
    }



};