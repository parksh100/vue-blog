<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">라이언데이터서비스</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">홈</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">SNS</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              소셜미디어
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/sns/blog">Blog자동화</a></li>
              <li><a class="dropdown-item" href="#">Shorts 자동화</a></li>
              <li><a class="dropdown-item" href="#">Youtube 자동화</a></li>
              <li>
                <hr class="dropdown-divider" />
                <a class="dropdown-item" href="#">소셜미디어 자동화</a>
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}
</style>
