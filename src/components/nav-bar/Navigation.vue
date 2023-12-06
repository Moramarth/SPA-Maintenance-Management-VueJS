<script>
import AccountDropdown from './components/AccountDropdown.vue';
import ClientActions from './components/ClientActions.vue';
import ContractorActions from './components/ContractorActions.vue';
import EngineerActions from './components/EngineerActions.vue';
import SupervisorActions from './components/SupervisorActions.vue';

export default {
  components: {
    AccountDropdown,
    ClientActions,
    ContractorActions,
    EngineerActions,
    SupervisorActions,
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <button
      class="navbar-toggler collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <ul class="navbar-nav">
        <!-- if user_is_staff  -->
        <li><a class="nav-link" href="{% url 'admin page' %}">Go to Administration</a></li>
        <!-- {% endif %} -->

        <!-- if user_is_authenticated -->
        <li class="nav-item dropdown">
          <a
            id="navbarDropdown"
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Actions
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- if viewer_group.name == 'Clients' -->
            <ClientActions />
            <!-- elif viewer_group.name == "Contractors" -->
            <ContractorActions />
            <!-- elif viewer_group.name == "Engineering"  -->
            <EngineerActions />
            <!-- elif viewer_group.name == "Supervisor" -->
            <SupervisorActions />
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="nav-link" href="#">Show Buildings</a></li>
            <li><a class="nav-link" href="#">Show Partners</a></li>
            <li><a class="nav-link" href="#">Show Reviews</a></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <AccountDropdown />
        </li>
        <!-- {% else %} -->
        <li><a class="nav-link" href="#">Login</a></li>
        <li><a class="nav-link" href="#">Registration</a></li>
        <!-- {% endif %} -->
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>
