const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');
const SaveData = document.querySelector('.save-btn');
const data = {
    "bannerImage" : bannerImage.value,
    "blogTitleField" :blogTitleField.value,
    "blogTitleField" : blogTitleField.value

}
SaveData.addEventListener('click',()=>{
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('myData', data);
        alert('Data saved to local storage!');
    } else {
        alert('Sorry, your browser does not support local storage.');
    }
})

function displayStoredData() {
    const storedData = localStorage.getItem('myData');
    bannerImage = storedData.bannerImage;
    blogTitleField = storedData.blogTitleField;
    blogTitleField = storedData.blogTitleField;
}

window.onload = displayStoredData;
