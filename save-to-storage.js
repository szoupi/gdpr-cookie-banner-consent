const storageType = sessionStorage; // or localStorage
const consentPropertyName = 'aead_consent';

const shouldShowPopUp = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true); // set value true (or 1 or whatever) if accepted

window.onload = () => {
    if (shouldShowPopUp()) {
        const consent = confirm('Συμφωνώ με του όρους');
        if (consent) {
            saveToStorage();
        }

    }

}