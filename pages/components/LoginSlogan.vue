<template>
  <v-row justify="center" style="height: 100%"
    ><v-col cols="10">
      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
        "
      >
        <div style="font-style: normal; font-weight: 400; font-size: 30px">
          <NuxtLink to="/" style="text-decoration: none; color: white">
            Blog</NuxtLink
          >
        </div>
        <div>
          <div
            style="
              font-style: normal;
              font-weight: 700;
              font-size: 35px;
              line-height: 50px;
              margin-bottom: 12px;
            "
          >
            Start your journey with us.
          </div>
          <div
            style="
              font-style: normal;
              font-weight: 300;
              font-size: 16px;
              line-height: 24px;
            "
          >
            unlock the power of creating resumes, writing posts, and connecting
            with others in our vibrant blog community.
          </div>
        </div>
        <div>
          <Swiper
            :height="215"
            :modules="[SwiperAutoplay, SwiperPagination]"
            :slides-per-view="1"
            :loop="true"
            :effect="'creative'"
            :autoplay="{
              delay: 8000,
              disableOnInteraction: true,
            }"
            :pagination="true"
          >
            <SwiperSlide>
              <div
                style="padding: 16px; background: #1167e4; border-radius: 16px"
              >
                <div
                  style="
                    height: 50%;
                    ont-style: normal;
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 24px;
                  "
                >
                  Simply unbelievable! I am really satisfied with my projects
                  and business. This is Absolutely wonderful!
                </div>
                <div
                  class="d-flex align-center"
                  style="height: 50%; margin-top: 30px"
                >
                  <div class="d-flex" style="margin-right: 10px">
                    <img
                      src="~/assets/images/AmirAbroun.png"
                      alt=""
                      style="border-radius: 8px; height: 64px; width: 64px"
                    />
                  </div>
                  <div class="d-flex align-center">
                    <div>
                      <div style="font-weight: 600; font-size: 16px">
                        Amir Abroun
                      </div>
                      <div style="font-weight: 300; font-size: 12px">
                        Backend Developer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style="padding: 16px; background: #1167e4; border-radius: 16px"
              >
                <div
                  style="
                    height: 50%;
                    ont-style: normal;
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 24px;
                  "
                >
                  Simply unbelievable! I am really satisfied with my projects
                  and business. This is Absolutely wonderful!
                </div>
                <div
                  class="d-flex align-center"
                  style="height: 50%; margin-top: 30px"
                >
                  <div class="d-flex" style="margin-right: 10px">
                    <img
                      src="~/assets/images/ShayanKhalighi.jpeg"
                      alt=""
                      style="border-radius: 8px; height: 64px; width: 64px"
                    />
                  </div>
                  <div class="d-flex align-center">
                    <div>
                      <div style="font-weight: 600; font-size: 16px">
                        Shayan Khalighi
                      </div>
                      <div style="font-weight: 300; font-size: 12px">
                        Front End developer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                style="padding: 16px; background: #1167e4; border-radius: 16px"
              >
                <div
                  style="
                    height: 50%;
                    ont-style: normal;
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 24px;
                  "
                >
                  Simply unbelievable! I am really satisfied with my projects
                  and business. This is Absolutely wonderful!
                </div>
                <div
                  class="d-flex align-center"
                  style="height: 50%; margin-top: 30px"
                >
                  <div class="d-flex" style="margin-right: 10px">
                    <img
                      src="~/assets/images/AmirAbroun.png"
                      alt=""
                      style="border-radius: 8px; height: 64px; width: 64px"
                    />
                  </div>
                  <div class="d-flex align-center">
                    <div>
                      <div style="font-weight: 600; font-size: 16px">
                        Rana Nasiri
                      </div>
                      <div style="font-weight: 300; font-size: 12px">
                        Designer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div></v-col
    ></v-row
  >
</template>
