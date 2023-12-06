<script>
export default {

};
</script>

<template>
  <footer class="footer  bg-light">
    <div class="container">
      <div class="footer__content">
        <p>
          Maintenance Management Project Front-End alternative with VueJS
          <a href="https://softuni.bg/" target="_blank">SoftUni</a> 2023
        </p>
      </div>
      <div class="footer__actions">
        <a href="https://github.com/Moramarth" target="_blank">
          <i class="fa-brands fa-github fa-lg" />
        </a>

        <a href="https://www.linkedin.com/in/george-y-lazarov/" target="_blank">
          <i class="fa-brands fa-linkedin fa-lg" />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
    width: 100%;
    margin-top: auto;
    border-top: 0.1rem solid rgba(0,0,0,0.4);
    padding: 2.0rem;
}

.footer .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2.0rem;
}

.footer .footer__content {
    margin-right: auto;
    font-size: 1.4rem;
    line-height: 1.22;
}

.footer .footer__content p {
    margin: 0;
}

.footer .footer__actions {
    display: flex;
    gap: 1.4rem;
    font-size: 2.4rem;
    line-height: 1.22;
}

.footer .footer__actions a {
    display: block;
    text-decoration: none;
    position: center;
}

.footer .footer__actions a:hover {
    opacity: 0.5;
}

.footer .footer__actions i {
    width: 3.0rem;
    height: 1.0rem;
    object-fit: contain;
    object-position: center center;
    color: #0b0b0b;
}

@media (max-width: 767.98px) {
    .footer {
        text-align: center;
    }

    .footer .footer__content {
        width: 100%;
    }

    .footer .footer__actions {
        justify-content: center;
        width: 100%;
    }
}
</style>
