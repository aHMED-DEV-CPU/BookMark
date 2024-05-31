var siteName = document.getElementById("name");
var siteUrl = document.getElementById("url");
var bookMarkContainer;

if (localStorage.getItem("bookmarks") == null) {
    bookMarkContainer = [];
} else {
    bookMarkContainer = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookMark();
}

function addBookMark() {
    if (validationBookMarkName() && validationBookMarkUrl()) {
        var bookMark = {
            name: siteName.value,
            url: siteUrl.value,
        };
        bookMarkContainer.push(bookMark);
        clearBookMark();
        displayBookMark();
        localStorage.setItem("bookmarks", JSON.stringify(bookMarkContainer));
        siteName.classList.remove("is-valid", "is-invalid");
        siteUrl.classList.remove("is-valid", "is-invalid");
        hideModal();
    } else {
        showModal();
    }
}

function clearBookMark() {
    siteName.value = null;
    siteUrl.value = null;
}

function displayBookMark() {
    var cartona = "";
    for (let i = 0; i < bookMarkContainer.length; i++) {
        cartona += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${bookMarkContainer[i].name}</td>
                    <td><button type="button" class="btn view"> <a href="https://${bookMarkContainer[i].url
            }" target="_blank"><i class="fa-solid fa-eye"></i>  Visit</a></button>
                    </td>
                    <td><button type="button" onclick="deleteBookMark(${i})" class="btn delete"><i class="fa-solid fa-trash-can"></i>  Delete</button></td>
                </tr>`;
    }
    document.getElementById("table").innerHTML = cartona;
}

function deleteBookMark(deleteIndex) {
    bookMarkContainer.splice(deleteIndex, 1);
    displayBookMark();
    localStorage.setItem("bookmarks", JSON.stringify(bookMarkContainer));
}

function validationBookMarkName() {
    var regex = /^[a-zA-Z_]{3,}$/gim;
    if (regex.test(siteName.value)) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        return true;
    } else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        return false;
    }
}

function validationBookMarkUrl() {
    var regex = /^[a-z]+\.com$/gim;
    if (regex.test(siteUrl.value)) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        return true;
    } else {
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        return false;
    }
}

function showModal() {
    var modalElement = document.getElementById("exampleModal");
    modalElement.classList.add("d-block");
}

function hideModal() {
    var modalElement = document.getElementById("exampleModal");
    modalElement.classList.remove("d-block");
}
