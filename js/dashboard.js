(function () {
  "use strict";
  let categoryName;
  let categories;
  let quizes;
  let mainElement;
  async function handleOpenEditCategory(evt) {
    loadCategories(await fetchCategories());
  }
  async function fetchCategories() {
    const response = await fetch("getCategories.php");
    return await response.json();
  }
  function showLoading() {
    mainElement.innerHTML = `
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="50"
                        class="loader"
                        >
                        <path
                            fill="currentColor"
                            d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7c0 0 0 0 0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5L109 384c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8c0 0 0 0 0 0s0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4c0 0 0 0 0 0s0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5l-48.6 0c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8c0 0 0 0 0 0s0 0 0 0s0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80l0-16 160 0 0 16c0 44.2-35.8 80-80 80z"
                        />
                        </svg>

    `;
  }
  async function loadCategories(dataPromis) {
    mainElement = document.querySelector("main");
    showLoading();
    const data = await dataPromis;
    categories = data;
    let html = `
             <div class="container text-center mt-5">
              <h1 class="fw-bold">All Categories</h1>
              <p class="text-muted">${
                data.length > 0
                  ? "Chose Category to edit or create new category"
                  : "No categories yet, create one!"
              } .</p>
            </div>
            <button class="add-btn"
                          data-bs-toggle="modal"
                data-bs-target="#newCategoryModal"
                id="open-new-category-modal"
          >
          <svg class="cate-icon" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </button>
            <div class="container mt-4">
              <div class="row justify-content-center align-items-center gap-4 g-3">`;
    data.forEach((element) => {
      html += `
       <div class="col-xs-12 col-sm-5 col-sm-3 gap-4 g-3 position-relative" id="${element["category_id"]}">
                <div class="cate-container row  border border-3 rounded-3">
                <div class="col-4 position-relative">
                <img
                    src="${element["img_url"]}"
                    class="category-icon img-fluid cate-img d-block position-absolute top-50 start-50 translate-middle w-100 rounded-3 "
                    alt="${element["category_name"]}-img"
                />
                    </div>
                    
                    <div class="col-8 position-relative">
                        
                        <div class="col-12  text-center h-50">${element["category_name"]}</div>

                        <div class="col-12 text-center h-50">
                        <a class="btn position-relative optoin edit-category-button"
                        cid = "${element["category_id"]}"
                        cname = "${element["category_name"]}">
                            <div class="position-absolute">Edit</div>
                            <svg class="cate-icon" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg></a>
                        <a 
                        class="btn position-relative optoin delete-category-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        cid = "${element["category_id"]}"
                        cname = "${element["category_name"]}"
                        >
                            <div class="position-absolute">Delete</div>
                            <svg class="cate-icon" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </a>
                        
                        </div>
                        <div class="col-12  text-end position-absolute bottom-0 start-0 p-2 pb-0">By: ${element["instructor_username"]}</div>
                    </div>

                          </div></div>`;
    });
    html += "</div></div></main>";
    html += `
              <div class="text-center mt-4">
            <button class="btn btn-secondary px-4" id="back-to-dashboard">Go Back</button>
            </div>`;
    html += `
          <div
      class="modal zoom"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteModalLabel">Attention!</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <span class="cat-to-delete fw-bold" id="cat-to-delete">"category Name"</span> category? This action cannot be
            undone. You can delete it only if it is empty.</p>
            <div class="m-auto text-center mb-4 success-message" id="delete-message"></div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn delete-button"
            >
              Cancel
            </button>
            <button type="button " class="btn delete-button" id="confirm-delete">Delete</button>
        </div>
      </div>
    </div>
    </div>

        <div
      class="modal zoom"
      id="newCategoryModal"
      tabindex="-1"
      aria-labelledby="newCategoryModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="newCategoryModalLabel">Create New Category</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="new-category">
              <div class="mb-3">
                <label for="category-name" class="form-label"> Category Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="category-name"
                  placeholder="ex: Science"
                  name="category_name"
                  value= ""
                />
              </div>
              <div class="mb-3">
                <label for="image_url" class="form-label">Image URL:</label>
                <input
                  type="text"
                  class="form-control"
                  id="image_url"
                  placeholder="https://www.example.com/image.png"
                  name="image_url"
                  value=""
                />
              </div>
                <div class="mb-3">
                <label for="Description" class="form-label">Description: </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Optional."
                  name="description"
                  value= ""
                ></textarea>

              </div>
              <div class="m-auto text-center mb-4 success-message" id="success-message"></div>
              <button type="submit" class="btn w-100 submit-button">
                Create
              </button>
            </form>

          </div>
      </div>
    </div>
    </div>
      
      `;

    setTimeout(() => {
      mainElement.innerHTML = html;
      handleCreateEditCategory(true);
      handleEditCategoryButton();
      handleDeleteCategory();
      document
        .querySelector("#back-to-dashboard")
        .addEventListener("click", () => {
          location.reload();
        });
    }, 300);
  }

  function isImageUrl(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url.toLowerCase());
  }
  async function checkCategoryExists(newCategory) {
    const api = "quiz_api.php?";
    const response = await fetch(api + "request=categories");
    const dataObj = await response.json();
    let isThere = false;
    for (let item of dataObj.data) {
      if (item["category_name"].toLowerCase() == newCategory.toLowerCase()) {
        isThere = true;
      }
    }

    return isThere;
  }

  async function editCategory(data) {
    const newData = data;
    newData.type = "edit";
    const response = await fetch("newEditDeleteCategory.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const d = await response.json();
    return d.success;
  }

  async function sendData(data, url) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const d = await response.json();
    return d.success;
  }
  async function openQuizesPage(event) {
    event.preventDefault();
    const cid = event.target.getAttribute("cid");
    if (!cid) {
      return;
    }
    categoryName = event.target.getAttribute("cname");
    const data = await fetchQuizes(cid);

    loadQuizes(data);
  }
  async function fetchQuizes(cid) {
    const response = await fetch("getQuizes.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: cid,
    });

    const data = await response.json();
    return data;
  }

  async function loadQuizes(promisedData) {
    showLoading();
    const mainData = await promisedData;
    const data = mainData["quizes"];
    const categoryInfo = mainData["category"][0];
    const cid = categoryInfo["category_id"];
    quizes = data;
    let html = `
             <div class="container text-center mt-5">
              <h1 class="fw-bold">${categoryName}</h1>

            <div class=" text-start w-100 p-3">
              <div class="card info-card w-100 m-auto">
                <div class="card-body">
                  <h5 class="card-title text-center">Category Information</h5>
                  <h6 class="card-subtitle mb-2 text-muted">All details:</h6>
                  <p class="card-text">
                  <ul m-0 p-0>
                    <li><span class="text-bold">Category Name: </span> ${categoryInfo["category_name"]}</li>
                    <li><span class="text-bold">Date Created: </span> ${categoryInfo["date_created"]}</li>
                    <li><span class="text-bold">Created/Edited By: </span> ${categoryInfo["instructor_username"]}</li>
                    <li><span class="text-bold">Description: </span> ${categoryInfo["description"]}</li>
                    <li><span class="text-bold">Number of Quizes: </span> ${data.length}</li>
                  </ul>
                  </p>
                </div>
              </div>
            </div>
            <button class="add-btn"
                          data-bs-toggle="modal"
                data-bs-target="#newQuizModal"
                id="open-new-quiz-modal"
          >
          <svg class="cate-icon" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </button>
                <button class="add-btn edit-btn"
                          data-bs-toggle="modal"
                data-bs-target="#editCategoryModal"
                id="open-edit-category-modal"
          >
            <svg class="cate-icon" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg></a>
        </button>
            <div class="container mt-4">
              <div class="row justify-content-center align-items-center gap-4 g-3">`;

    data.forEach((element) => {
      html += `<div class="col-xs-12 col-sm-5 col-sm-3 gap-4 g-3 position-relative" id="${element["quiz_id"]}">
                <div class="quiz-container row  border border-3 rounded-3">
         
                    <div class="col-12 position-relative">
                        
                        <div class="col-12  text-center h-50">${element["quiz_name"]}</div>
                        <div class="col-12 text-center h-50 justify-content-around d-flex align-items-start">
                        <a class="btn position-relative optoin edit-quiz-button"
                        cid="${element["category_id"]}"
                        qid="${element["quiz_id"]}"
                        t="edit">
                        <div class="position-absolute">Edit</div>
                            <svg class="cate-icon" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg></a>
                        <a 
                        class="btn position-relative optoin delete-quiz-button"
                        cid="${element["category_id"]}"
                        qid="${element["quiz_id"]}"
                        qname="${element["quiz_name"]}"
                        t="delete">
                        
                            <div class="position-absolute">Delete</div>
                            <svg class="cate-icon" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </a>
                        <div class="">${element["nb_questions"]}</div>
                        </div>
      <div class="col-12  text-end position-absolute bottom-0 start-0 p-2 pb-0">By: ${element["instructor_username"]}</div>

                    </div>

                          </div></div>`;
    });
    html += "</div></div></main>";
    html += `</div>
          <div class="text-center mt-4">
            <button class="btn btn-secondary px-4" id="back-to-categories">Go Back</button>
            </div>
         </div>`;

    html += `
        <div
      class="modal zoom"
      id="newQuizModal"
      tabindex="-1"
      aria-labelledby="newQuizModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="newQuizModalLabel">Create New Quiz in ${categoryName}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="new-quiz" cid="${cid}">
              <div class="mb-3">
                <label for="quiz_name" class="form-label">Quiz Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="quiz_name"
                  placeholder="ex: Python"
                  name="quiz_name"
                />
              </div>
                <div class="mb-3">
                <label for="description" class="form-label">Description: </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Optional."
                  name="description"
                  value= ""
                ></textarea>

              </div>
              <div class="m-auto text-center mb-4 success-message" id="success-message"></div>
                  <input
                  type="number"
                  class="form-control d-none"
                  id="category_id"
                  name="category_id"
                  value="${cid}"
                />
              <button type="submit" class="btn w-100 submit-button">
                Create
              </button>
              
            </form>

          </div>
      </div>
      </div></div>`;

    html += `
              <div
      class="modal zoom"
      id="editCategoryModal"
      tabindex="-1"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >
         <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editCategoryModalLabel">Edit ${categoryName}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
 <form id="edit-category">
              <div class="mb-3">
                <label for="category-name" class="form-label"> Category Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="category-name"
                  placeholder="ex: Science"
                  name="category_name"
                  value= ""
                />
              </div>
              <div class="mb-3">
                <label for="image_url" class="form-label">Image URL:</label>
                <input
                  type="text"
                  class="form-control"
                  id="image_url"
                  placeholder="https://www.example.com/image.png"
                  name="image_url"
                  value=""
                />
              </div>
                <div class="mb-3">
                <label for="Description" class="form-label">Description: </label>
                <textarea
                  class="form-control"
                  id="category_description"
                  placeholder="Optional."
                  name="description"
                  value= ""
                ></textarea>

              </div>
                <div class="m-auto text-center mb-4 success-message" id="success-message"></div>
                  <input
                  type="number"
                  class="form-control d-none"
                  id="category_id"
                  placeholder="ex: 1, 5, max 15"
                  name="category_id"
                  value="${cid}"
                />
              <button type="submit" class="btn w-100 submit-button">
                Edit
              </button>
            </form>

          </div>
          </div>
       `;
    let html2 = `
         <div
      class="modal zoom"
      id="deleteQuizModal"
      tabindex="-1"
      aria-labelledby="deleteQuizModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteQuizModalLabel">Attention!</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <span class="q-delete fw-bold" id="quiz-to-be-deleted"></span> with all its questions? This action cannot be
            undone.</p>
            <div class="m-auto text-center mb-4 success-message" id="success-message-delete-quiz"></div>

          </div>
          <div class="modal-footer" id="submit-delete-container">

            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn delete-button"
            >
              Cancel
            </button>
            <button type="button " class="btn delete-button" id = "delete-quiz-submit">Delete</button>
        </div>
      </div>
    </div>
    </div>`;
    setTimeout(() => {
      mainElement.innerHTML = html;
      mainElement.innerHTML += html2;
      handleCreateQuiz();
      handleEditQuiz();
      handleCreateEditCategory(false, categoryInfo);
      handleDeleteQuiz();

      document
        .querySelector("#back-to-categories")
        .addEventListener("click", () => {
          loadCategories(categories);
        });
    }, 300);
  }
  async function handleEditCategoryButton() {
    const btns = document.querySelectorAll(".edit-category-button");
    btns.forEach((element) => {
      element.addEventListener("click", openQuizesPage);
    });
  }

  async function handleCreateEditCategory(isCreate, categoryInfo = null) {
    let form;
    if (isCreate) {
      form = document.querySelector("#new-category");
    } else {
      form = document.querySelector("#edit-category");
    }
    const messageDiv = document.querySelector("#success-message");
    const cName = document.querySelector("#category-name");
    const image = document.querySelector("#image_url");
    document
      .querySelectorAll("#open-edit-category-modal, #open-new-category-modal")
      .forEach(function (element) {
        element.addEventListener("click", function () {
          if (categoryInfo != null) {
            document.querySelector("#category-name").value =
              categoryInfo["category_name"];
            document.querySelector("#image_url").value =
              categoryInfo["img_url"];
            const description = document.querySelector("#category_description");
            description.value = categoryInfo["description"];
            description.innerHTML = categoryInfo["description"];
          } else {
            form.reset();
          }
        });
      });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      let validImage = false;
      let validName = false;
      const formData = new FormData(form);
      const name = formData.get("category_name");
      const imgUrl = formData.get("image_url");
      const description = formData.get("description");
      if (name.length == 0 || name.length > 30) {
        cName.setAttribute("placeholder", "");
        validName = false;
        setTimeout(() => {
          cName.setAttribute("placeholder", "Please enter category name!");
        }, 100);
      } else if ((await checkCategoryExists(name)) && isCreate) {
        validName = false;
        cName.setAttribute("placeholder", "");
        setTimeout(() => {
          cName.setAttribute("placeholder", "Category name already Exists!");
        }, 100);

        cName.value = "";
      } else {
        validName = true;
      }
      if (imgUrl.length == 0) {
        validImage = false;
        image.setAttribute("placeholder", "");
        setTimeout(() => {
          image.setAttribute("placeholder", "Please enter image url!");
        }, 100);
      } else if (!isImageUrl(imgUrl)) {
        validImage = false;
        image.setAttribute("placeholder", "");
        setTimeout(() => {
          image.setAttribute("placeholder", "Please enter valid image url!");
          image.value = "";
        }, 100);
        image.value = "";
      } else {
        validImage = true;
      }
      if (validName && validImage) {
        let data = {
          name: name,
          img: imgUrl,
          description: description,
          type: "new",
        };
        messageDiv.innerHTML = "Loading.";
        messageDiv.style.visibility = "visible";
        if (isCreate) {
          if (await sendData(data, "newEditDeleteCategory.php")) {
            const updatedCategoires = await fetchCategories();
            categories = updatedCategoires;
            messageDiv.innerHTML = "Success!";
            // Correct way to initialize and hide
            setTimeout(() => {
              const modal = document.getElementById("newCategoryModal");
              const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
              modalInstance.hide();
              setTimeout(() => {
                loadCategories(categories);
              }, 100);
            }, 300);
          } else {
            messageDiv.innerHTML = "Error.";
          }
        } else {
          let cid = formData.get("category_id");
          data.cid = cid;
          if (await editCategory(data)) {
            const updatedQuizes = await fetchQuizes(cid);
            const updatedCategoires = await fetchCategories();
            categories = updatedCategoires;
            messageDiv.innerHTML = "Success!";
            setTimeout(() => {
              const modal = document.getElementById("editCategoryModal");
              const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
              modalInstance.hide();
              setTimeout(() => {
                categoryName = name;
                loadQuizes(updatedQuizes);
              }, 300);
            }, 300);
          }
        }
      }
    });
  }
  async function handleEditQuiz() {
    const btns = document.querySelectorAll(".edit-quiz-button");
    btns.forEach((e) => {
      e.addEventListener("click", () => {
        loadQuestions(e.getAttribute("cname"), e.getAttribute("qid"));
      });
    });
  }
  async function loadQuestions(cname, qid) {
    showLoading();
    const mainData = await fetchQuestions(qid);
    const questions = mainData["questions"];
    const quizInfo = mainData["quiz"][0];
    const average = mainData["average"];
    const cid = quizInfo["category_id"];
    const qname = quizInfo["quiz_name"];
    let html = `
     <div class="container text-center my-5">
          <h2 class="mb-4 text-center" qname="${qname}" qid="${qid}" cid="${cid}" cname="${cname}" id="quiz-title">${qname}</h2>
          </div>

            <div class=" text-start w-100 p-3">
              <div class="card info-card w-100 m-auto">
              <button class="btn submit-button w-25 position-absolute bottom-0 end-0 p-2 m-4"
              id="all-submitions-btn">
              All Submitions
              </button>
                <div class="card-body">
                  <h5 class="card-title text-center">Quiz Information</h5>
                  <h6 class="card-subtitle mb-2 text-muted">All details:</h6>
                  <p class="card-text">
                  <ul m-0 p-0>
                    <li><span class="text-bold">Category Name: </span> ${
                      quizInfo["quiz_name"]
                    }</li>
                    <li><span class="text-bold">Date Created: </span> ${
                      quizInfo["date_created"]
                    }</li>
                    <li><span class="text-bold">Created/Edited By: </span> ${
                      quizInfo["instructor_username"]
                    }</li>
                    <li><span class="text-bold">Description: </span> ${
                      quizInfo["description"]
                    }</li>
                    <li><span class="text-bold">Number of Questions: </span> ${
                      questions.length
                    }</li>
                    <li><span class="text-bold">Average Scores: </span> %${parseFloat(
                      average
                    )}</li>
                    <li><span class="text-bold">Number of Submittions: </span> ${
                      mainData["totalSubmition"]
                    }</li>
                  </ul>
                  </p>
                </div>
              </div>
            </div>
              <p class="text-muted text-center my-4">${
                questions.length == 0
                  ? "Add new questions Now!"
                  : "Edit, add, delete questions."
              }
          </p>
          `;
    html += `<button class="add-btn"
                          data-bs-toggle="modal"
                data-bs-target="#newEditQuesiton"
                id="new-edit-question-btn"
          >
          <svg class="cate-icon" width="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
        </button>
                <button class="add-btn edit-btn"
                          data-bs-toggle="modal"
                data-bs-target="#editQuizModal"
                id="open-edit-quiz-modal"
          >
            <svg class="cate-icon" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg></a>
        </button>
        <div class="container my-5" id="questions-container">`;

    questions.forEach((q) => {
      html += ` <div class="card mb-4 question" id="${q["question_id"]}">
       <div class="text-center position-absolute end-0 bottom-0 d-flex justify-content-center align-items-center quiz-options">
                      <a 
                        class="btn position-relative optoin edit-question-button d-none" 
                        cid = "${cid}"
                        cname = "${cname}"
                        question_id="${q["question_id"]}">
                            <div class="position-absolute">Edit</div>
                            <svg class="cate-icon" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                      </a>
                        <a 
                        class="btn position-relative optoin delete-question-button "
                        question_id="${q["question_id"]}"
                        >
                            <div class="position-absolute">Delete</div>
                            <svg class="cate-icon" width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </a>
                        </div>
                <div class="card-body">
                <h5 class="card-title">${q["question"]}</h5>
                <ol>`;

      //here for each option
      let options = [
        q["option_1"],
        q["option_2"],
        q["option_3"],
        q["option_4"],
      ];
      let currectOption = q["correct_option"];
      let indexOfCurrect = options.indexOf(currectOption);
      let i = 1;
      options.forEach((option) => {
        html += `
        <li class=" w-100 ms-1 mt-2" for="${q["question_id"] + "" + i}">
        ${option}
              ${indexOfCurrect == i - 1 ? "(Currect)" : ""}
        </li>
        `;
        i++;
      });
      html += "</ol></div></div>";
    });

    html += `
          </div>
    `;

    html += `
              <div class="text-center">
            <button class="btn btn-secondary px-4" id="go-back-to-quizes">Go back</button>
            </div>
       <div
      class="modal zoom"
      id="newEditQuesiton"
      tabindex="-1"
      aria-labelledby="newEditQuesitonLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="newEditQuesitonLabel">New question in ${qname} quiz.</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="newEditQuestion">
             
              <div class="mb-3">
                <label for="question" class="form-label"> Question: </label>
                <textarea
                rows="1"
                  type="text"
                  class="form-control"
                  id="question"
                  name="question"
                  value= ""
                ></textarea>
              </div>`;
    html += `
              <div class="d-flex align-items-center">
                <p class="w-75">Options: </p>
                <p class="w-25">Currect Option: </p>

              </div>`;
    for (let i = 1; i < 5; i++) {
      html += `

              <div class="mb-3">
                <label for="option_${i}" class="form-label">Option ${i}:</label>
                <div class ="d-flex">
                <textarea
                rows="1"
                 type="text"
                  class="form-control w-75"
                  id="option_${i}"
                  name="option_${i}"
                  value=""
                ></textarea>
                <label class="w-25 d-flex justify-content-center align-items-center"> 
                <input
                 type="radio" 
                 value ="option_${i}" 
                 name="currect" 
                 class="form-check-input shadow"
                 id="currect_optoin${i}"/>
              
                </label>
                </div>

              </div>
                `;
    }

    html += `
              <div class="m-auto text-center mb-4 success-message" id="success-message"></div>
              <button type="submit" class="btn w-100 submit-button">
                Create
              </button>
            </form>

          </div>
      </div>
    </div>
</div>`;
    html += `        <div
      class="modal zoom"
      id="editQuizModal"
      tabindex="-1"
      aria-labelledby="editQuizModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editQuizModalLabel">Edit ${qname}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="edit-quiz">
              <div class="mb-3">
                <label for="qname" class="form-label"> New Name:</label>
                <input
                  type="text"
                  class="form-control"
                  id="qname"
                  name="qname"
                  value= ""
                  placeholder="New quiz name"
                />
              </div>
              <div class="mb-3">
                <label for="Description" class="form-label">Description: </label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  placeholder="Optional."
                  name="description"
                ></textarea>

              </div>
              <div class="m-auto text-center mb-4 success-message" id="success-message-edit-quiz"></div>
              <button type="submit" class="btn w-100 submit-button">
                Edit Name
              </button>
            </form>

          </div>
      </div>
    </div>
    </div>`;
    html += `          <div
      class="modal zoom"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteModalLabel">Attention!</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete <span class="q-delete fw-bold">This Quesion</span>? This action cannot be
            undone.</p>
            <div class="m-auto text-center mb-4 success-message" id="success-message-delete-question"></div>

          </div>
          <div class="modal-footer">

            <form>
            <button
              type="button"
              data-bs-dismiss="modal"
              class="btn delete-button"
            >
              Cancel
            </button>
            <button type="button " class="btn delete-button" id = "delete-question">Delete</button>
            </form>
        </div>
      </div>
    </div>
    </div>
`;
    setTimeout(() => {
      mainElement.innerHTML = html;
      handleEditCreateQuestion(cname, qid);
      handleEditQuizInfo(qid, cid, cname, qname, quizInfo["description"]);
      handleAllSubmitionBtn(qid, qname, cid);
      document
        .querySelector("#go-back-to-quizes")
        .addEventListener("click", () => {
          handlegoBackToQuizes(cid);
        });

      document
        .querySelectorAll(".delete-question-button")
        .forEach((element) => {
          element.addEventListener("click", async (e) => {
            e.preventDefault();
            handleDeleteQuestion(
              element.getAttribute("question_id"),
              qid,
              qname,
              cname,
              cid
            );
          });
        });
    }, 300);
  }

  async function handleAllSubmitionBtn(qid, qname, cid) {
    const btn = document.querySelector("#all-submitions-btn");
    btn.addEventListener("click", async () => {
      loadSubmitions(qid, qname, cid);
    });
  }
  async function fetchSubmitions(qid, order) {
    const response = await fetch("getSubmitions.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qid: qid,
        order: order,
      }),
    });
    const d = await response.json();
    return d;
  }
  async function loadSubmitions(qid, qname, order = "score", cid) {
    const response = await fetchSubmitions(qid, order);
    if (response.success) {
      const data = response.data;
      let html = `
          <table class="table table-striped">
              <thead>
              <tr>
              <td id="sort-by-nb">#</td>
              <td id="sort-by-date">Date Submited</td>
              <td id="sort-by-score">Score</td>
              </tr>
              </teahd>
         
         <tbody>
      `;
      const rows = data.map((row, i) => {
        return `<tr><td>${i}</td><td>${row["date_submitted"]}</td><td>${row["score"]}</td> </tr>`;
      });
      rows.forEach((row) => {
        html += row;
      });
      html += `</tbody></table>
       <div class="text-center mt-4">
      <button class="btn btn-secondary px-4" id="show-questions">Show Questions</button>
      </div>`;
      const qustionsContainer = document.querySelector("#questions-container");
      const questions = qustionsContainer.innerHTML;
      const allSubmitionBtn = document.querySelector("#all-submitions-btn");
      const goBackBtn = document.querySelector("#go-back-to-quizes");
      allSubmitionBtn.classList.add("d-none");
      setTimeout(() => {
        qustionsContainer.innerHTML = html;
        goBackBtn.style.visibility = "hidden";
        const showBtn = document.querySelector("#show-questions");
        showBtn.addEventListener("click", function () {
          setTimeout(() => {
            allSubmitionBtn.classList.remove("d-none");
            qustionsContainer.innerHTML = questions;
            goBackBtn.style.visibility = "visible";
          }, 300);
        });
      }, 300);
    }
  }
  async function handleDeleteQuestion(question_id, qid, qname, cname, cid) {
    const modal = document.getElementById("deleteModal");
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
    modalInstance.show();
    let deleteBtn = document.querySelector("#delete-question");
    const message = document.querySelector("#success-message-delete-question");
    const data = {
      question_id: question_id,
      type: "delete",
      qid: qid,
    };
    removeAllEventListeners(deleteBtn);
    deleteBtn = document.querySelector("#delete-question");
    deleteBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      message.innerHTML = "Loading.";
      message.style.visibility = "visible";
      if (await sendData(data, "newEditDeleteQuestion.php")) {
        message.innerHTML = "Success!";
        message.style.visibility = "visible";
        setTimeout(() => {
          modalInstance.hide();
          setTimeout(() => {
            loadQuestions(cname, qid);
          }, 100);
        }, 300);
      } else {
        message.innerHTML = "Error.";
        message.style.visibility = "visible";
      }
    });
  }
  async function handlegoBackToQuizes(cid) {
    showLoading();
    const quizes = await fetchQuizes(cid);
    loadQuizes(quizes);
  }
  async function handleEditQuizInfo(qid, cid, cname, qname, description) {
    const form = document.querySelector("#edit-quiz");
    document
      .querySelector("#open-edit-quiz-modal")
      .addEventListener("click", function () {
        document.querySelector("#qname").value = qname;
        document.querySelector("#description").value = description;
        // form.reset();
      });
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const message = document.querySelector("#success-message-edit-quiz");
      const qname = formData.get("qname");
      const description = formData.get("description");
      const isThere = await checkQuizExists(cid, qname);
      if (qname.length == 0 || qname.length > 30) {
        message.innerHTML = "Please enter valid quiz name!";
        message.style.visibility = "visible";
        return;
      } else if (isThere) {
        message.innerHTML = "Quiz name already exists!!";
        message.style.visibility = "visible";
        return;
      } else {
        message.innerHTML = "Loading.";
        message.style.visibility = "visible";
        const data = {
          cid: cid,
          qid: qid,
          name: qname,
          description: description,
          type: "edit",
        };
        if (await sendData(data, "newEditDeleteQuestion.php")) {
          message.innerHTML = "Success!";
          setTimeout(() => {
            const modal = document.getElementById("editQuizModal");
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
            modalInstance.hide();
            setTimeout(() => {
              loadQuestions(cname, qid);
            }, 100);
          }, 300);
        } else {
          message.innerHTML = "Error.";
          message.style.visibility = "visible";
        }
      }
    });
  }
  async function handleDeleteQuiz() {
    const btns = document.querySelectorAll(".delete-quiz-button");
    btns.forEach((element) => {
      element.addEventListener("click", async (evt) => {
        const qname = evt.target.getAttribute("qname");
        if (qname == null) {
          return;
        }
        const modal = document.getElementById("deleteQuizModal");
        const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
        const q = document.querySelector("#quiz-to-be-deleted");
        let deleteBtn = document.querySelector("#delete-quiz-submit");
        const message = document.querySelector("#success-message-delete-quiz");
        const qid = evt.target.getAttribute("qid");
        deleteBtn.setAttribute("qid", qid);
        q.innerHTML = qname;
        modalInstance.show();
        const data = {
          qid: qid,
          type: "delete",
        };
        removeAllEventListeners(deleteBtn);
        deleteBtn = document.querySelector("#delete-quiz-submit");
        deleteBtn.addEventListener("click", async (e) => {
          e.preventDefault();

          message.innerHTML = "Loading.";
          message.style.visibility = "visible";
          if (await sendData(data, "newEditDeleteQuiz.php")) {
            const updatedQuizes = await fetchQuizes(
              evt.target.getAttribute("cid")
            );
            message.innerHTML = "Success!";
            setTimeout(() => {
              modalInstance.hide();
              setTimeout(() => {
                loadQuizes(updatedQuizes);
              }, 100);
            }, 300);
          } else {
            message.innerHTML = "Error.";
            message.style.visibility = "visible";
          }
        });
      });
    });
  }
  function removeAllEventListeners(element) {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
  }
  async function handleEditCreateQuestion(cname, qid) {
    let type;
    const form = document.querySelector("#newEditQuestion");
    const newBtn = document.querySelector("#new-edit-question-btn");
    const editBtns = document.querySelectorAll(".edit-question-button");
    const modal = document.getElementById("newEditQuesiton");
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
    newBtn.addEventListener("click", () => {
      type = "new";
      form.reset();
    });
    editBtns.forEach((element) => {
      element.addEventListener("click", function (e) {
        modalInstance.show();
        type = "edit";

        // if (type == "edit") {
        //   console.log(element);
        // }
      });
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const message = document.querySelector("#success-message");
      const q = formData.get("question");
      const o1 = formData.get("option_1");
      const o2 = formData.get("option_2");
      const o3 = formData.get("option_3");
      const o4 = formData.get("option_4");
      const ansr = formData.get("currect");

      if (
        q.length == 0 ||
        o1.length == 0 ||
        o2.length == 0 ||
        o3.length == 0 ||
        o4.length == 0 ||
        ansr == null
      ) {
        message.innerHTML = `Please fill all fields! ${
          ansr == null ? "and select correct option." : ""
        }`;
        message.style.visibility = "visible";
        return;
      } else {
        message.innerHTML = "Loading.";
        message.style.visibility = "visible";
        const answer = document.querySelector(`#${ansr}`);
        const data = {
          question: q,
          option_1: o1,
          option_2: o2,
          option_3: o3,
          option_4: o4,
          currect: answer.value,
          qid: qid,
          type: type,
        };
        if (await sendData(data, "newEditDeleteQuestion.php")) {
          message.innerHTML = "Success!";
          setTimeout(() => {
            modalInstance.hide();
            setTimeout(() => {
              loadQuestions(cname, qid);
            }, 100);
          }, 300);
        } else {
          message.innerHTML = "Error.";
        }
      }
    });
  }
  async function handleCreateQuiz() {
    const form = document.querySelector("#new-quiz");
    const messageDiv = document.querySelector("#success-message");
    const qName = document.querySelector("#quiz_name");
    document
      .querySelector("#open-new-quiz-modal")
      .addEventListener("click", function () {
        form.reset();
      });
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      let validName = false;
      const formData = new FormData(form);
      const name = formData.get("quiz_name");
      const description = formData.get("description");
      const cid = formData.get("category_id");

      const isThere = await checkQuizExists(cid, name);
      if (name.length <= 0 || name.length > 40) {
        validName = false;
        qName.setAttribute("placeholder", "");
        qName.value = "";
        setTimeout(() => {
          qName.setAttribute("placeholder", "Please enter valid quiz name!");
        }, 100);
      } else if (isThere) {
        validName = false;

        qName.setAttribute("placeholder", "");

        setTimeout(() => {
          qName.value = "";
          qName.setAttribute("placeholder", "Quiz name already exists");
        }, 100);
      } else {
        validName = true;
      }

      if (validName) {
        const data = {
          name: name,
          description: description,
          cid: cid,
          type: "new",
        };
        messageDiv.innerHTML = "Loading.";
        messageDiv.style.visibility = "visible";
        if (await sendData(data, "newEditDeleteQuiz.php")) {
          const updatedQuizes = await fetchQuizes(cid);
          messageDiv.innerHTML = "Success!";
          setTimeout(() => {
            const modal = document.getElementById("newQuizModal");
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
            modalInstance.hide();
            setTimeout(() => {
              loadQuizes(updatedQuizes);
            }, 100);
          }, 300);
        } else {
          messageDiv.innerHTML = "Error.";
        }
      }
    });
  }

  async function checkQuizExists(cid, qName) {
    const api = "quiz_api.php?";
    const response = await fetch(api + `request=quizzes&cid=${cid}`);
    const dataObj = await response.json();
    let isThere = false;
    for (let item of dataObj.data) {
      if (item["quiz_name"].toLowerCase() == qName.toLowerCase()) {
        isThere = true;
      }
    }

    return isThere;
  }

  async function fetchQuestions(qid) {
    const response = await fetch("getQuestions.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: qid,
    });
    const d = await response.json();
    return d.data;
  }
  async function handleDeleteCategory() {
    const deleteBtn = document.querySelectorAll(".delete-category-btn");
    deleteBtn.forEach((element) => {
      element.addEventListener("click", async (evt) => {
        const message = document.querySelector("#delete-message");
        const name = document.querySelector("#cat-to-delete");
        const cid = element.getAttribute("cid");
        name.innerHTML = element.getAttribute("cname");
        let confirmDel = document.querySelector("#confirm-delete");
        removeAllEventListeners(confirmDel);
        confirmDel = document.querySelector("#confirm-delete");
        message.innerHTML = "";
        message.style.visibility = "hidden";
        confirmDel.addEventListener("click", async (e) => {
          const data = await fetchQuizes(cid);

          if (data["quizes"].length != 0) {
            message.innerHTML = "The category needs to be empty.";
            message.style.visibility = "visible";
          } else {
            message.innerHTML = "Loading.";
            message.style.visibility = "visible";
            const data = {
              type: "delete",
              cid: cid,
            };
            if (await sendData(data, "newEditDeleteCategory.php")) {
              const updatedCategoires = await fetchCategories();
              categories = updatedCategoires;
              message.innerHTML = "Success.";
              // deleteModal
              setTimeout(() => {
                const modal = document.getElementById("deleteModal");
                const modalInstance =
                  bootstrap.Modal.getOrCreateInstance(modal);
                modalInstance.hide();
                setTimeout(() => {
                  loadCategories(categories);
                }, 100);
              }, 300);
            } else {
              message.innerHTML = "Error.";
            }
          }
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelector("#edit-create-category-button")
      .addEventListener("click", handleOpenEditCategory);
  });
})();
