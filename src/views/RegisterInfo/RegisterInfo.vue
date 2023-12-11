<script>
import ImageModal from './ImageModal.vue';

export default {
  components: {
    ImageModal,
  },

};
</script>

<template>
  <section
    class="section"
  >
    <div class="container">
      <div class="section__head">
        <h1>Registration info and tutorial</h1>
      </div>
      <div class="section__body">
        <h2> Registration for the service is available only for our business partners.</h2>
        <div class="section__body-group info-page">
          <ul>
            <li>
              <div class="info-page-text">
                <p>
                  You will receive a message to the provided e-mail in your contract.
                </p>
                <p>
                  Follow the link to start the registration process for our system.
                </p>
              </div>
              <ImageModal
                tiny-img-u-r-l="register_page_tiny_png/Email_Invite_192x120.png"
                original-img-u-r-l="register_page_normal_size/email_invite.png"
                :is-landscape="true"
              />
            </li>
            <li>
              <div class="info-page-text">
                <p>
                  Your e-mail will be set as a prime identifier.
                </p>
                <p>
                  Enter a strong password and submit the form.
                </p>
              </div>
              <ImageModal
                tiny-img-u-r-l="register_page_tiny_png/registration_form_105x120.png"
                original-img-u-r-l="register_page_normal_size/registration form.PNG"
                :is-landscape="false"
              />
            </li>
            <li>
              <div class="info-page-text">
                <p>
                  After form submission an empty profile is automatically created for you.
                </p>
                <p>
                  Please press the EDIT PROFILE button to fill the next form.
                </p>
              </div>
              <ImageModal
                tiny-img-u-r-l="register_page_tiny_png/Empty_Profile_263x120.png"
                original-img-u-r-l="register_page_normal_size/empty_profile.png"
                :is-landscape="true"
              />
            </li>
            <li>
              <div class="info-page-text">
                <p>
                  Please fill your personal information correctly.
                </p>
                <p>
                  Profile picture field is optional.
                </p>
              </div>
              <ImageModal
                tiny-img-u-r-l="register_page_tiny_png/edit_profile_with_data_91x120.png"
                original-img-u-r-l="register_page_normal_size/edit_profile_with_data.png"
                :is-landscape="false"
              />
            </li>
            <li>
              <div class="info-page-text">
                <p>You are ready to use our services as intended.</p>
              </div>
              <ImageModal
                tiny-img-u-r-l="register_page_tiny_png/profile_with_data_244x120.png"
                original-img-u-r-l="register_page_normal_size/profile with data.PNG"
                :is-landscape="true"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style  scoped>
.info-page > ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 3rem;
}

.info-page > ul > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    border: solid 1px black;
    border-radius: 1rem;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 1.8rem;
    text-shadow: 0 0 1.0rem rgba(0, 0, 0, 0.4);
}

.info-page > ul > li > div.info-page-img {
    box-shadow: 0 0 1.0rem rgba(0, 0, 0, 0.6);
    border-radius: 1rem;
    overflow: hidden;
    transition: box-shadow 0.5s;
}

.info-page > ul > li > div.info-page-img:hover {
    box-shadow: 0 0 3.0rem rgba(0, 0, 0, 0.6);
}

@media (max-width: 991.98px) {
    .info-page > ul > li {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
