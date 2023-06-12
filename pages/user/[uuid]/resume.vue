<template>
  <div style="width: 100%">
    <loading v-if="loading" />
    <div v-if="user_info" class="d-flex justify-center" style="margin: 50px 0">
      <div style="max-width: 595px">
        <v-card
          ><v-row style="margin: 30px 0">
            <v-col cols="4"
              ><v-row justify="end">
                <v-col cols="10" style="background: #202a30; border-radius: 8px"
                  ><v-row justify="center"
                    ><v-col cols="10"
                      ><div class="contact-info">
                        {{ user_info.full_name }}
                      </div>
                      <div class="job-title">Backend developer</div>
                      <div class="avatar">
                        <img
                          :src="user_info.avatar"
                          alt=""
                          style="border-radius: 8px; height: 90%; width: 90%"
                        />
                      </div>
                      <div class="education">
                        <div class="header">EDUCATION</div>
                        <div class="items">
                          <div class="item">
                            <div class="title">Computer Science</div>
                            <div class="description">
                              <div>Azad Tehran Markaz / Tehran</div>
                              <div>2016 - 2020</div>
                            </div>
                          </div>
                          <div class="item">
                            <div class="title">Software Engineer</div>
                            <div class="description">
                              <div>Azad Tehran Markaz / Tehran</div>
                              <div>2020 - now</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="contact">
                        <div class="header">CONTACT</div>
                        <div class="items">
                          <div class="item">
                            <span class="title">P : </span
                            ><span class="detail">09123931233</span>
                          </div>
                          <div class="item">
                            <span class="title">E : </span
                            ><span class="detail">{{ user_info.email }}</span>
                          </div>
                          <div class="item">
                            <span class="title">A : </span
                            ><span class="detail"
                              >Ye khiaboon hamin tarafa, yekam oonvar tar
                              ,Tehran</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="social">
                        <v-icon> mdi-github</v-icon
                        ><v-icon> mdi-linkedin</v-icon>
                      </div>
                    </v-col></v-row
                  ></v-col
                ></v-row
              ></v-col
            >
            <v-col cols="8" style="padding: 30px"
              ><div class="profile">
                <div class="d-flex align-center">
                  <span class="title">PROFILE</span>
                  <v-divider class="ml-4" style="color: #3573fd; opacity: 1" />
                </div>
                <div class="profile-details">
                  {{ user_info.resume.summary }}
                </div>
              </div>
              <v-divider style="color: #3573fd; opacity: 1" />
              <div class="work-experience">
                <div class="title">WORK EXPERIENCE</div>
                <div class="work-items">
                  <div
                    class="details"
                    v-for="(job, index) in user_info.resume.experiences"
                    :key="index"
                  >
                    <v-row>
                      <v-col cols="3" class="date"
                        >{{ formattedDate(job.finished_at) }}<work-date />{{
                          formattedDate(job.started_at)
                        }}</v-col
                      >
                      <v-col cols="9" class="work-details">
                        <div class="job-title">
                          {{ job.position
                          }}<span style="color: #3573fd"> at </span
                          >{{ job.company }}
                        </div>
                        <div class="description">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi.
                        </div>
                        <v-divider
                          class="my-2"
                          v-if="
                            index != user_info.resume.experiences.length - 1
                          "
                        />
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
              <div class="skills">
                <div class="title">SKILLS</div>
                <v-row class="mt-2">
                  <v-col
                    cols="6"
                    v-for="(item, index) in user_info.resume.skills"
                    :key="index"
                    class="d-flex align-center"
                  >
                    <v-row class="item">
                      <v-col cols="5">{{ item.title }}</v-col>
                      <v-col cols="7" class="d-flex align-center"
                        ><v-progress-linear
                          :model-value="item.percent"
                          rounded
                          color="#3573FD"
                        ></v-progress-linear
                      ></v-col>
                    </v-row>
                  </v-col>
                </v-row></div></v-col></v-row
        ></v-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { store } from "~/store";
import { UserActionTypes } from "~/store/user/action-types";
import Loading from "@/components/loading.vue";
import WorkDate from "./components/WorkDate.vue";
const route = useRoute();
const user_info = computed(() => store.state.user?.user_info);
const loading = computed(() => store.state.user?.loading);
onMounted(() => {
  store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
});
const formattedDate = (date: any) => {
  if (date) {
    const [year, month, day] = date.split("-");
    const formattedMonth = new Date(year, month - 1, day).toLocaleString(
      "default",
      { month: "short" }
    );

    return `${formattedMonth} ${year} `;
  } else {
    return "now";
  }
};
</script>
<style lang="scss">
.contact-info {
  margin-top: 50px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #3573fd;
}
.job-title {
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;
  color: #ffffff;
}
.avatar {
  margin-top: 26px;
  img {
    border-top: 2px solid #3573fd;
  }
}
.education {
  margin-top: 26px;
  .header {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #3573fd;
  }
  .items {
    .item {
      margin-top: 12px;
      .title {
        font-family: "IRANSansX";
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #ffffff;
      }
      .description {
        font-style: normal;
        font-weight: 500;
        font-size: 9px;
        line-height: 14px;
        color: #a2a2a2;
      }
    }
  }
}
.contact {
  margin-top: 26px;
  .header {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #3573fd;
  }
  .items {
    .item {
      .title {
        font-style: normal;
        font-weight: 500;
        font-size: 9px;
        line-height: 14px;
        color: #ffffff;
      }
      .detail {
        font-style: normal;
        font-weight: 500;
        font-size: 9px;
        line-height: 14px;
        color: #a2a2a2;
      }
    }
  }
}
.social {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  color: white;
}
.profile {
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
  }
  .profile-details {
    font-style: normal;
    font-weight: 500;
    font-size: 9px;
    line-height: 14px;
    color: #a2a2a2;
    margin: 10px 0;
  }
}
.work-experience {
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin: 19px 0 !important;
  }
  .work-items {
    .details {
      .date {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 0;
      }
      .work-details {
        min-height: 122px;
        .job-title {
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 18px;
          color: black;
        }
        .description {
          font-style: normal;
          font-weight: 500;
          font-size: 9px;
          line-height: 14px;
          margin: 7px 0;
        }
      }
    }
  }
}
.skills {
  font-style: normal;
  font-weight: 500;
  font-size: 9px;
  line-height: 14px;
  color: #747474;
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: black;
  }
  .item .v-col {
    padding: 0 12px;
  }
}
</style>
