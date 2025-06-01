<?php
session_start(); // Must be at the very top
include "config.php";
// Check if user is logged in
if (!isset($_SESSION['user']) || $_SESSION['user']['logged_in'] !== true) {
    // Redirect to login if not authenticated
    header('Location: index.html');
    exit();
}

// Now you can access user information
$currentUser = $_SESSION['user']['username'];


?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Navigation Bar</title>
    <script src="js/bootstrap.min.js"></script>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <script src="js/dashboard.js"></script>
    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <nav class="navbar navbar-expand-sm navbar-custom">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img
            src="assets/logo.png"
            alt="Logo"
            width="30"
            height="30"
            class="d-inline-block align-text-top"
          />
          Quizify
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="dashboard.php"
                >Dashboard</a
              >
            </li>
           <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="index.html"
                >Student Page</a
              >
            </li>
            <li class="nav-item">
              <a type="button" class="nav-link active" id="adminlogging"
                ><?php echo $currentUser; ?></a
              >

            </li>
            <li class="nav-item">
              <a href="logout.php" type="button" class="nav-link active" id="adminlogging"
                >LogOut</a
              >

            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="py-5 px-3">
      <div class="container">
        <h1 class="mb-4">Hello <?php echo $currentUser?> your options are:</h1>
        <div class="row justify-content-center g-2 gap-3">
          <div class="col-sm-12 col-md-3 adminOptions rounded-3">
            <a
              
              class="btn btn-lg btn-block p-4 w-100"
              id="edit-create-category-button"
              >Edit/Create Category.</a
            >
          </div>
        </div>
      </div>
    </main>
    <footer class="text-center py-3 text-muted">
      &copy; 2025 <strong>Quizify</strong>
      <br />
      Designed and Developed by Abdulnasser Mestrah & Youssef Shawwa
    </footer>

  </body>
</html>
