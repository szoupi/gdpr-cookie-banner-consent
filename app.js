
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

const enableScripts = () => {
    // if script are accepted enable them
    // disabled scripts are plain text
    // enabled are converted to javascript

    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        // if (scripts[i].dataset.cookiescript =='accepted') {
    
            console.log(i, scripts[i].dataset.cookiescript);
            scripts[i].type = 'text/javascript';
        // }
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
const consentPropertyName = 'aead_consent'; //custom name for our cookie 

//ask/show msg banner if consent cookie is missing
const shouldShowPopup = () => !storageType.getItem(consentPropertyName); 

// if consent is given set cookie value to true
let consent_level = '';
const consent_max_age =';max-age=5184000' // 2 months 60x60x24x60, ;key=value format

const saveToStorage = () => storageType.setItem(consentPropertyName, consent_level + consent_max_age);

console.log(saveToStorage)

// console.log(consent_level)




window.onload = () => {
    
    const acceptFn = event => {

        // 0. initialize variables
        const functionalityCookie = document.getElementById('functionality-cookie');
        const targetingCookie = document.getElementById('targeting-cookie');


        const consent_level_array = [];
        consent_level_array.push('strict'); // add strict just for reference 
        
        // 1. select accepted categories
        if (functionalityCookie.checked) {
            consent_level_array.push(functionalityCookie.value);
            console.log(functionalityCookie.value);
            console.log(consent_level_array);

            // ENABLE FUNCTION

        }
        if (targetingCookie.checked) {
            consent_level_array.push(targetingCookie.value);
            console.log(targetingCookie.value);
            console.log(consent_level_array);

        }

        // 2. save content into cookie storage
        consent_level = consent_level_array.join(' '); // consent_level is string
        // console.log(consent_level);       
        saveToStorage(storageType);

        //3. hide msg banner
        consentPopup.classList.add('hidden'); 
    }

    const consentPopup = document.getElementById('consent-popup');
    const acceptBtn = document.getElementById('accept');
    acceptBtn.addEventListener('click', acceptFn);

    if (shouldShowPopup(storageType)) {
        setTimeout(() => {
            consentPopup.classList.remove('hidden');
        }, 1000);
    }

};