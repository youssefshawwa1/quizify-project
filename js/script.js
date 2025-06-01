(function () {
  "use strict";
  const api = "quiz_api.php?";
  async function fetchCategories() {
    const response = await fetch(api + "request=categories");
    return response.json();
  }
  async function loadCategories() {
    showLoading();
    const dataObj = await fetchCategories();
    let html = `
          <div class="container text-center">
        <h2 class="fw-bold">Quiz Categories</h2>
        <p class="text-muted">
          Choose a category and then choose quiz to start. Choose a category and
          then choose quiz to start.
        </p>

        <div
          class="row mt-4 gap-3 g-3 justify-content-center align-items-center"
        >

`;
    dataObj.data.forEach((element) => {
      html += `
                    <div
                        class="category-container col-12 col-sm-5 col-lg-3 border rounded-3 border-3 p-4 shadow position-relative m-0"
                        style="max-height: 150px"
                    >
                    <div class="clickable-category position-absolute top-0 end-0 w-100 h-100"
                          cid="${element["category_id"]}"
                          cname="${element["category_name"]}"></div>
                        <div class="category-card p-4"
                      ">
                        <img
                            src="${element["img_url"]}"
                            class="category-icon img-fluid rounded rounded-3"
                            alt="${element["category_name"]} img"
                        />
                        <div class="category-title" id='${element["category_id"]}'>${element["category_name"]}</div>
                        </div>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="25"
                        class="position-absolute top-0 end-0 me-3 mt-3"
                        >
                        <path
                            fill="currentColor"
                            d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7c0 0 0 0 0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5L109 384c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8c0 0 0 0 0 0s0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4c0 0 0 0 0 0s0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5l-48.6 0c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8c0 0 0 0 0 0s0 0 0 0s0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80l0-16 160 0 0 16c0 44.2-35.8 80-80 80z"
                        />
                        </svg>
                        
                    </div>

        
        `;
    });
    html += "</div></div>";
    setTimeout(() => {
      document.querySelector("main").innerHTML = html;
      addCategoryEvent();
      document
        .querySelector("#login-form")
        .addEventListener("submit", handleLogin);
    }, 300);
  }
  function addCategoryEvent() {
    const c = document.querySelectorAll(".clickable-category");
    c.forEach((cate) => {
      cate.addEventListener("click", function () {
        loadCategoryQuizes(
          cate.getAttribute("cid"),
          cate.getAttribute("cname")
        );
      });
    });
  }
  function addQuizEvent() {
    const c = document.querySelectorAll(".clickable-quiz");
    c.forEach((quiz) => {
      quiz.addEventListener("click", function () {
        loadQuestions(
          quiz.getAttribute("qid"),
          quiz.getAttribute("qname"),
          quiz.getAttribute("cid"),
          quiz.getAttribute("cname")
        );
      });
    });
  }
  async function loadCategoryQuizes(id, name) {
    showLoading();

    const dataObj = await fetchQuizes(id);

    let html = `
             <div class="container text-center mt-5">
              <h1 class="fw-bold">${name}</h1>
              <p class="text-muted">Select a topic to test your level in ${name}.</p>
            </div>

            <div class="container mt-4">
              <div
                class="row g-4 justify-content-center align-items-center gap-4 g-3"
              >`;

    dataObj.data.forEach((quiz) => {
      html += `
               <div class="col-xs-12 col-sm-5 col-sm-3 position-relative quiz-container"
                >
                <div class=" clickable-quiz position-absolute top-0 start-0 w-100 h-100"
                    qid="${quiz["quiz_id"]}"
                    qname="${quiz["quiz_name"]}"
                    cid="${id}"
                    cname="${name}" 
                ></div>
                  <a class="text-decoration-none text-dark">
                    <div class="card quiz shadow-sm p-3">
                      <div class="card-body">
                        <h5 class="card-title">${quiz["quiz_name"]}</h5>
                        <p class="card-text text-muted  d-lg-block d-xs-block d-md-none d-sm-none">${quiz["description"]}</p>
                        <p class="card-text text-muted nb-questions">${quiz["nb_questions"]} Questions</p>

                      </div>
                    </div>
                  </a>
                </div>`;
    });
    html += `</div>
          <div class="text-center mt-4">
            <button class="btn btn-secondary px-4" id="home">Go Back</button>
            </div>
         </div>`;

    setTimeout(() => {
      document.querySelector("main").innerHTML = html;
      addQuizEvent();
      document.querySelector("#home").addEventListener("click", () => {
        loadCategories();
      });
    }, 300);
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
  async function loadQuestions(id, name, cid, cname) {
    showLoading();
    const dataObj = await fetchQuestions(id);

    let html = `
     <div class="container text-center my-5">
          <h2 class="mb-4 text-center" qname="${name}" qid="${id}" cid="${cid}" cname="${cname}" id="quiz-title">${name}</h2>
          <p class="text-muted">Start this quiz and pay attention to 
          answering all questions 
          </p>
          </div>

        <div class="container my-5">`;
    const shuffleData = shuffle(dataObj.data);
    shuffleData.forEach((question) => {
      html += ` <div class="card mb-4 question" id="${question["question_id"]}">
                <div class="card-body">
                <h5 class="card-title">${question["question"]}</h5>`;
      let options = [
        question["option_1"],
        question["option_2"],
        question["option_3"],
        question["option_4"],
      ];
      let shufledOptions = shuffle(options);
      let i = 1;
      shufledOptions.forEach((option) => {
        html += `

          <div class="form-check mt-2">
            <input class="form-check-input" type="radio" name="${
              question["question_id"]
            }" id="${question["question_id"] + "" + i}" value="${option}">
            <label class="form-check-label w-100 ms-1" for="${
              question["question_id"] + "" + i
            }">
              ${option}
            </label>
          </div>
        `;
        i++;
      });

      html += "</div></div>";
    });
    html += `
          <div class="text-center">
            <button class="btn btn-secondary px-4" id="cancel-quiz">Go Back</button>

            <button class="btn btn-secondary px-4 submit-quiz-button" id="submit-quiz">Submit</button>
            </div>
          </div>
    `;
    html += `
    
      <div
      class="modal modal-sm fade"
      id="notAnsweredModal"
      tabindex="-1"
      aria-labelledby="notAnsweredModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="notAnswered">Some Questions Not Answered!</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Please make sure to answere all questions!</p>
          </div>
          <div class="modal-footer">
            <button
              data-bs-dismiss="modal"
              aria-label="Close"
              class="btn btn-secondary px-4 submit">OK</button>
          </div>
      </div>
    </div>
    </div>`;
    setTimeout(() => {
      document.querySelector("main").innerHTML = html;
      document.querySelector("#cancel-quiz").addEventListener("click", () => {
        loadCategoryQuizes(cid, cname);
      });
      document
        .querySelector("#submit-quiz")
        .addEventListener("click", handleSubmitQuiz);
    }, 300);
  }
  async function handleSubmitQuiz() {
    const infoo = document.querySelector("#quiz-title");
    let chosen = {
      answeres: {},
      info: {
        cname: infoo.getAttribute("cname"),
        cid: infoo.getAttribute("cid"),
        qid: infoo.getAttribute("qid"),
        qname: infoo.getAttribute("qname"),
      },
    };
    const q = document.querySelectorAll(".question");
    let allAnswered = true;
    q.forEach((item) => {
      try {
        chosen.answeres[item.id] = item.querySelector(
          `input[type="radio"]:checked`
        ).value;
      } catch {
        allAnswered = false;
        return;
      }
    });
    if (!allAnswered) {
      const modal = document.querySelector("#notAnsweredModal");
      const bModal = new bootstrap.Modal(modal);
      bModal.show();
    } else {
      const response = await fetch("getScore.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chosen),
      });
      const data = await response.json();
      showLoading();
      setTimeout(() => {
        loadScore(data);
      }, 300);
    }
  }
  async function loadScore(promisedData) {
    const data = await promisedData;
    let score = data["score"];
    let pass = false;
    let aboveAvg = false;
    if (score >= 50) {
      pass = true;
    }
    if (score > data["average"]) {
      aboveAvg = true;
    }

    let html = `
    
              <div class="container">
              <div class="card shadow rounded-4 mx-auto mt-5 p-4 text-center" 
              style="max-width: 500px;">
              <h2 class="mb-4">Your Quiz Result</h2>
              <p>You Scored</p>
              <div id="scoreDisplay" class="fw-bold fs-1 d-flex justify-content-center text-white align-items-center">
              <span class="d-flex justify-content-center text-white align-items-center rounded-circle bg-${
                pass ? "" : "danger"
              } p-4 score ">%${score}</span></div>
              <p id="message" class="lead mt-3">
              ${
                pass
                  ? "You have passed the quiz"
                  : "You have failed the quiz want to try again?"
              }</p>
              <p id="message" class="lead mt-3 text-start">
              Average scores: %${parseFloat(data["average"])} <br>
              ${
                aboveAvg ? "You were above average!" : "You were under average!"
              } <br>
              Course Details: <br>
              Category: ${data["cname"]} <br>
              Quiz Name: ${data["qname"]}
              </p>
              
          <div class="text-center">
            <button class="btn btn-secondary px-4" id="back-to-category">Go Back</button>

            <button class="btn btn-secondary px-4 submit-quiz-button" id="try-quiz-again">Try Again</button>
            </div>
          </div>
              </div>
              </div>
    
    `;
    document.querySelector("main").innerHTML = html;
    document
      .querySelector("#back-to-category")
      .addEventListener("click", () => {
        loadCategoryQuizes(data["cid"], data["cname"]);
      });
    document.querySelector("#try-quiz-again").addEventListener("click", () => {
      loadQuestions(data["qid"], data["qname"], data["cid"], data["cname"]);
    });
  }
  async function fetchQuizes(category) {
    const response = await fetch(api + `request=quizzes&cid=${category}`);
    return response.json();
  }
  async function fetchQuestions(quiz) {
    const response = await fetch(api + `request=questions&qid=${quiz}`);
    return response.json();
  }
  function showLoading() {
    document.querySelector("main").innerHTML = `
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

  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const message = document.querySelector("#success-message");
    message.style.visibility = "visible";
    if (
      formData.get("username").length == 0 &&
      formData.get("password").length == 0
    ) {
      message.innerHTML = "Please write username and password!!";
    } else if (formData.get("username").length == 0) {
      message.innerHTML = "Please write username!!";
    } else if (formData.get("password").length == 0) {
      message.innerHTML = "Please write password!!";
    } else {
      fetch("validate.php", {
        method: "post",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          message.innerHTML = "Loading.";
          setTimeout(() => {
            if (data.success) {
              message.innerHTML = "Success.";
              setTimeout(() => {
                window.location.href = "dashboard.php";
              }, 300);
            } else {
              message.innerHTML = "Incorrect username or password!!";
            }
          }, 300);
        })
        .catch((error) => {
          message.innerHTML = "An error occured!!!";
        });
    }
  }
  function handleAboutUs() {
    document.querySelector("#about-us-btn").addEventListener("click", () => {
      loadAboutUs();
    });
  }
  function loadAboutUs() {
    showLoading();
    const html = `    <div class="container py-5 about-us">
      <h1 class="text-center mb-5">About Us</h1>
      <div class="row justify-content-center gap-4">
        <div class="p-info-card col-12 col-sm-6 mx-4" style="width: 18rem">
          <img
            src="assets/joe.png"
            class="p-info-card-img-top"
            alt="Profile Image"
          />
          <div class="p-info-card-body">
            <h5 class="p-info-card-title my-4">Youssef Shawwa</h5>
            <p class="p-info-card-text">
                I am a dedicated computer science student passionate about programming and problem-solving. I enjoy coding challenges, developing applications, and exploring new languages.
            </p>
            <a href="#" class="btn portfolio-btn my-3 btn btn-primary shadow-none shadow-hover">Portfolio</a>

            <div class="d-flex justify-content-center mt-3 gap-3">
              <a href="https://www.linkedin.com/in/youssef-shawwa/" class="text-decoration-none" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#0a66c2"
                  class="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.436.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                  />
                </svg>
              </a>
              <a href="https://www.facebook.com/youssef.shawwa" class="text-decoration-none" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#3b5998"
                  class="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                  />
                </svg>
              </a>
              <a href="http://instagram.com/youssef.shawwa" class="text-decoration-none" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#e4405f"
                  class="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                  />
                </svg>
              </a>
              <a href="https://github.com/youssefshawwa1" class="text-decoration-none" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#333"
                  class="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
         <div class="p-info-card col-12 col-sm-6 mx-4" style="width: 18rem">
          <img
            src="assets/abd.png"
            class="p-info-card-img-top"
            alt="Profile Image"
          />
          <div class="p-info-card-body">
            <h5 class="p-info-card-title my-4">Abdulnasser Mestrah</h5>
            <p class="p-info-card-text">
          CS student specialized in Backend who loves working with databases, APIs, and Python. Always looking to optimize and scale systems.

            </p>
            <a href="#" class="btn portfolio-btn my-3">Portfolio</a>

            <div class="d-flex justify-content-center my-3 gap-3">
              <a href="https://www.facebook.com/abady.mestrah" class="text-decoration-none" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#3b5998"
                  class="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                  />
                </svg>
              </a>
              <a href="http://instagram.com/abadymestrah" class="text-decoration-none" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#e4405f"
                  class="bi bi-instagram"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    setTimeout(() => {
      document.querySelector("main").innerHTML = html;
    }, 300);
  }
  document.addEventListener("DOMContentLoaded", function () {
    loadCategories();
    handleAboutUs();
  });
})();
