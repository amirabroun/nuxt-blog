<template>
  <loading v-if="loading" />
  <div v-if="user" class="d-flex justify-center" style="margin: 35px 0">
    <div style="max-width: 800px">
      <v-card><v-row style="margin: 30px 0">
          <v-col md="4" cols="12"><v-row class="justify-md-end justify-center" style="height: 100%">
              <v-col cols="10" style="background: #202a30; border-radius: 8px"><v-row justify="center"><v-col
                    cols="10"><v-row><v-col md="12" cols="6" order="2" order-md="1" class="pa-0" style="height: 100%">
                        <div class="contact-info" :class="editMode ? 'editCursor' : ''" :contenteditable="editMode"
                          @input="
                            onInput('full_name', $event, undefined, undefined)
                            ">
                          {{ user.full_name }}
                        </div>
                        <div class="job-title pa-0" contenteditable="true">
                          Backend developer
                        </div>
                      </v-col>
                      <v-col md="12" cols="6" order="1" order-md="2" class="avatar pa-0" v-if="user.avatar">
                        <img :src="user.avatar" alt="" style="border-radius: 8px; height: 100%; width: 100%" />
                      </v-col>
                      <v-col cols="12" order="3" class="education pa-0" v-if="user?.resume?.education">
                        <div class="header">
                          <div>EDUCATION</div>
                          <v-icon v-if="editMode" size="20" @click="addEducation">mdi-plus</v-icon>
                        </div>
                        <v-row class="items">
                          <v-col md="12" cols="6" class="item" v-for="(item, index) in user?.resume?.education" :key="index">
                            <div class="title" :class="editMode ? 'editCursor' : ''" :contenteditable="editMode"
                              @input="onInput('field', $event, index, 'education')">
                              <div>{{ item.field }}</div>
                              <v-icon v-if="editMode" @click="deleteEducation(index)" size="16"
                                color="red">mdi-delete</v-icon>
                            </div>
                            <div class="description">
                              <div>
                                <span :class="editMode ? 'editCursor' : ''" :contenteditable="editMode" @input="
                                  onInput(
                                    'university',
                                    $event,
                                    index,
                                    'education'
                                  )
                                  ">
                                  {{ item.university }}</span>
                                /
                                <span :class="editMode ? 'editCursor' : ''" :contenteditable="editMode" @input="
                                  onInput(
                                    'location',
                                    $event,
                                    index,
                                    'education'
                                  )
                                  ">{{ item.location }}</span>
                              </div>
                              <div>
                                <span><edit-time :editMode="editMode" :date="item.started_at" :parent="'education'"
                                    :keySelector="'started_at'" :index="index" @valueChange="valueChange" />
                                </span>
                                -
                                <span>
                                  <edit-time :editMode="editMode" :date="item.finished_at" :parent="'education'"
                                    :keySelector="'finished_at'" :index="index" @valueChange="valueChange" />
                                </span>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" order="4" class="contact pa-0">
                        <div class="header">CONTACT</div>
                        <div class="items">
                          <div v-for="(item, index) in user?.resume?.contact" :key="index">
                            <div class="item" v-if="item.title == 'phone'">
                              <span class="title">P : </span><span class="detail" :class="editMode ? 'editCursor' : ''"
                                :contenteditable="editMode" @input="onInput('phone', $event)">{{ item.link }}</span>
                            </div>
                            <div class="item" v-if="item.title == 'email'">
                              <span class="title">E : </span><span class="detail" :class="editMode ? 'editCursor' : ''"
                                :contenteditable="editMode" @input="onInput('email', $event)">{{ item.link }}</span>
                            </div>
                            <div class="item" v-if="item.title == 'address'">
                              <span class="title">A : </span><span class="detail" :class="editMode ? 'editCursor' : ''"
                                :contenteditable="editMode" @input="onInput('address', $event)">{{ item.link }}</span>
                            </div>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12" order="5" class="social">
                        <div v-for="(item, index) in user?.resume?.contact" :key="index">
                          <v-btn v-if="item.title == 'github'" variant="text" :href="item.link"><v-icon>
                              mdi-github</v-icon></v-btn>
                          <v-btn v-if="item.title == 'linkedin'" variant="text" :href="item.link"><v-icon>
                              mdi-linkedin</v-icon></v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col></v-row></v-col></v-row></v-col>
          <v-col md="8" cols="12" style="padding: 30px">
            <div class="profile" v-if="user?.resume?.summary">
              <div class="d-flex align-center">
                <span class="title">PROFILE</span>
                <v-divider class="ml-4" style="color: #3573fd; opacity: 1" />
              </div>
              <div class="profile-details" :class="editMode ? 'editCursor' : ''" :contenteditable="editMode"
                @input="onInput('summary', $event)">
                {{ user?.resume?.summary }}
              </div>
            </div>
            <div class="work-experience" v-if="user?.resume?.experiences?.length > 0 || editMode">
              <div>
                <span class="title">
                  <v-icon v-if="editMode" size="20" @click="addExperience">mdi-plus</v-icon>
                  WORK EXPERIENCE
                </span>
                <v-divider
                  style="margin-left: 200px; margin-top: -15px; margin-bottom: 30px; color: #3573fd; opacity: 2" />
              </div>

              <div class="work-items">
                <div class="details" v-for="(job, index) in user?.resume?.experiences" :key="index">
                  <v-row>
                    <v-col cols="3" class="date"><span><edit-time :editMode="editMode" :date="job && job.finished_at ? job.finished_at : null
                      " :parent="'work'" :keySelector="'finished_at'" :index="index"
                          @valueChange="valueChange" /></span><work-date /><span>{{}}<edit-time :editMode="editMode"
                          :date="job && job.started_at ? job.started_at : null
                            " :parent="'work'" :keySelector="'started_at'" :index="index"
                          @valueChange="valueChange" /></span></v-col>
                    <v-col cols="9" class="work-details">
                      <div class="job-title">
                        <div>
                          <span :class="editMode ? 'editCursor' : ''" :contenteditable="editMode" @input="
                            onInput('position', $event, index, 'work')
                            ">
                            {{ job.position }}</span><span style="color: #3573fd"> at </span><span
                            :class="editMode ? 'editCursor' : ''" :contenteditable="editMode"
                            @input="onInput('company', $event, index, 'work')">{{ job.company }}</span>
                        </div>
                        <v-icon v-if="editMode" @click="deleteExperience(index)" size="16" color="red">mdi-delete</v-icon>
                      </div>
                      <div class="description" :class="editMode ? 'editCursor' : ''" :contenteditable="editMode"
                        @input="onInput('description', $event, index, 'work')">
                        {{ job.description ? job.description : "---" }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider class="mt-2 mb-4" v-if="index != user?.resume?.experiences.length - 1" />
                </div>
              </div>
            </div>
            <div class="skills mt-3" v-if="user?.resume?.skills.length > 0">
              <div class="title">
                <span>
                  <v-icon v-if="editMode" size="20" @click="addSkill">mdi-plus</v-icon>
                  SKILLS
                </span>
                <v-divider
                  style="margin-top: -10px; margin-left: 110px; margin-bottom: 40px; color: #3573fd; opacity: 2" />
              </div>

              <v-row class="mt-2">
                <v-col cols="6" v-for="(item, index) in user?.resume?.skills" :key="index"
                  class="d-flex align-center mt-2">
                  <v-row class="item">
                    <v-col cols="5" :class="editMode ? 'editCursor' : ''" :contenteditable="editMode"
                      @input="onInput('title', $event, index, 'skills')">{{ item.title }}</v-col>
                    <v-col cols="7" class="d-flex align-center"><v-progress-linear :clickable="editMode"
                        v-model="item.percent" rounded color="#3573FD" @click="
                          setScore('percent', item.percent, index, 'skills')
                          " :style="editMode
    ? 'transform:none;left:0'
    : 'pointer-events: none'
    "></v-progress-linear><v-icon v-if="editMode" @click="deleteSkill(index)" size="16" color="red"
                        class="ml-0">mdi-close</v-icon></v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-col></v-row></v-card>
    </div>
  </div>
  <div style="width: 100%" class="d-flex justify-center mt-4 mb-8" v-if="editMode">
    <v-btn width="300" color="#3573fd" style="color: white" @click="save">Save</v-btn>
  </div>
  <v-btn v-if="isMainUser" :icon="editMode ? 'mdi-close' : 'mdi-pencil'"
    style="position: fixed; right: 12px; bottom: 12px; color: white" color="#3573fd" @click="onEditMode()" />
  <v-dialog v-model="editDialog" width="auto">
    <v-card>
      <v-card-text> You can edit items by selecting them. </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="editDialog = false">continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-model="saveAlert" width="auto">
    <v-card>
      <v-card-text>
        You haven't saved your resume. Continue to discard
        changes.</v-card-text>
      <v-card-actions><v-spacer />
        <v-btn @click="onCloseSaveAlert">continue</v-btn>
        <v-btn color="primary" @click="saveAlert = false">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { Status, store } from "~/store";
import { UserActionTypes } from "~/store/user/action-types";
import Loading from "@/components/loading.vue";
import WorkDate from "./components/WorkDate.vue";
//@ts-ignore
import EditTime from "./components/EditTime.vue";
import { User } from "~/store/user";
import { UserResume } from "~/store/user/actions";
import { useCookies } from "vue3-cookies";
interface EditedData {
  full_name?: string;
  education?: {
    field?: string;
    finished_at?: string;
    location?: string;
    started_at?: string;
    university?: string;
  }[];
  phone?: string;
  email?: string;
  address?: string;
  samary?: string;
  work?: {
    company?: string;
    position?: string;
    started_at?: string;
    finished_at?: string;
    description?: string;
  }[];
  skills?: { title?: string; percent?: number }[];
}
const { cookies } = useCookies();
const route = useRoute();
const user = computed(() => store.state.user?.user);
const loading = computed(() => store.state.user?.loading);
const updateResumeStatus = computed(() => store.state.user?.updateResumeStatus);
const editMode = ref(false);
const editDialog = ref(false);
const saveAlert = ref(false);
const hasChanged = ref(false);
const isMainUser = ref();
const editedData = ref<EditedData>({
  full_name: user.value?.full_name,
  education: [],
  phone: "",
  email: "",
  address: "",
  samary: "",
  work: [],
  skills: [],
});
onMounted(() => {
  store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
});
watch(
  () => user.value,
  () => {
    if (user.value)
      isMainUser.value = true;

    editedData.value = {
      full_name: user.value?.full_name,
      education: user.value?.resume?.education,
      phone: user.value?.resume?.contact?.find(
        (item) => item.title == "phone"
      )?.link,
      email: user.value?.resume?.contact?.find(
        (item) => item.title == "email"
      )?.link,
      address: user.value?.resume?.contact?.find(
        (item) => item.title == "address"
      )?.link,
      samary: user.value?.resume?.summary,
      work: user.value?.resume?.experiences,
      skills: user.value?.resume?.skills,
    };
  }
);
watch(
  () => updateResumeStatus.value,
  () => {
    if (updateResumeStatus.value == Status.success) {
      editMode.value = false;
      hasChanged.value = false;
    }
  }
);
const formattedDate = (date: any) => {
  if (date) {
    const [year, month] = date.split("-");
    const formattedMonth = new Date(year, month - 1).toLocaleString("default", {
      month: "short",
    });

    return `${formattedMonth} ${year} `;
  } else {
    return "now";
  }
};
const onEditMode = () => {
  if (!editMode.value) {
    editDialog.value = true;
    editMode.value = !editMode.value;
  } else if (editMode.value && hasChanged.value == true) {
    saveAlert.value = true;
  } else {
    editMode.value = !editMode.value;
  }
};
const onInput = (
  key: EditedData,
  event: { target: { textContent: any } },
  index?: number,
  parent?: string
) => {
  hasChanged.value = true;
  if (index == 0 || (index && index > 0)) {
    //@ts-ignore
    const parentArray = editedData.value[parent];
    const childProperty = key;
    const item = parentArray[index];
    item[childProperty] =
      event.target.textContent == "now" ? undefined : event.target.textContent;
  } else {
    //@ts-ignore
    editedData.value[key] = event.target.textContent;
  }
};
const save = () => {
  const payload = <UserResume>{
    uuid: route.params.uuid,
    summary: editedData.value.samary,
    skills: editedData.value.skills,
    experiences: user.value?.resume?.experiences?.map((item) => {
      if (item.finished_at) {
        return {
          company: item.company,
          position: item.position,
          started_at: item.started_at,
          finished_at: item.finished_at,
          description: item.description || "---",
        };
      } else {
        return {
          company: item.company,
          position: item.position,
          started_at: item.started_at,
          description: item.description || "---",
        };
      }
    }),
    education: user.value?.resume?.education?.map((item) => {
      if (item.finished_at) {
        return {
          field: item.field,
          finished_at: item.finished_at,
          location: item.location,
          started_at: item.started_at,
          university: item.university,
        };
      } else {
        return {
          field: item.field,
          location: item.location,
          started_at: item.started_at,
          university: item.university,
        };
      }
    }),
    contact: [
      { title: "phone", link: editedData.value.phone },
      { title: "email", link: editedData.value.email },
      { title: "address", link: editedData.value.address },
    ],
  };
  store.dispatch(`user/${UserActionTypes.updateUserResume}`, payload);
};
const onCloseSaveAlert = () => {
  editMode.value = false;
  saveAlert.value = false;
  hasChanged.value = false;
  store.dispatch(`user/${UserActionTypes.fetchUser}`, route.params.uuid);
};
const addEducation = () => {
  hasChanged.value = true;
  user.value?.resume?.education?.push({
    field: "field",
    finished_at: "finished at",
    location: "City",
    started_at: "started at",
    university: "university",
  });
};
const deleteEducation = (index: number) => {
  hasChanged.value = true;
  user.value?.resume?.education?.splice(index, 1);
};
const addExperience = () => {
  hasChanged.value = true;
  user.value?.resume?.experiences?.push({
    company: "company",
    position: "position",
    started_at: "started at",
    finished_at: "finished at",
    description: "description",
  });
};
const deleteExperience = (index: number) => {
  hasChanged.value = true;
  user.value?.resume?.experiences?.splice(index, 1);
};
const addSkill = () => {
  hasChanged.value = true;
  user.value?.resume?.skills?.push({
    title: "skill",
    percent: 50,
  });
};
const deleteSkill = (index: number) => {
  hasChanged.value = true;
  user.value?.resume?.skills?.splice(index, 1);
};
const valueChange = () => {
  hasChanged.value = true;
};
const setScore = (
  key: EditedData,
  event: number,
  index?: number,
  parent?: string
) => {
  hasChanged.value = true;
  //@ts-ignore
  const parentArray = editedData.value[parent];
  const childProperty = key;
  const item = parentArray[index];
  item[childProperty] = event;
};
</script>
<style lang="scss">
.contact-info {
  margin-top: 50px;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #3573fd;
}

.job-title {
  font-weight: 300;
  font-size: 17px;
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
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #3573fd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .items {
    .item {
      margin-top: 12px;

      .title {
        font-weight: 500;
        font-size: 16px;
        line-height: 18px;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .description {
        font-weight: 500;
        font-size: 13px;
        line-height: 14px;
        color: #a2a2a2;
      }
    }
  }
}

.contact {
  margin-top: 26px;

  .header {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: #3573fd;
  }

  .items {
    .item {
      .title {
        font-weight: 500;
        font-size: 13px;
        line-height: 14px;
        color: #ffffff;
      }

      .detail {
        font-weight: 500;
        font-size: 13px;
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
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }

  .profile-details {
    font-weight: 500;
    font-size: 13px;
    line-height: 14px;
    color: #484848;
    margin: 10px 0;
  }

  margin-bottom: 30px;
}

.work-experience {
  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }

  .work-items {
    .details {
      .date {
        font-weight: 400;
        font-size: 16px;
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
          font-weight: 500;
          font-size: 16px;
          line-height: 18px;
          color: black;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .description {
          font-weight: 500;
          font-size: 13px;
          line-height: 14px;
          margin: 7px 0;
        }
      }
    }
  }
}

.skills {
  font-weight: 500;
  font-size: 13px;
  line-height: 14px;
  color: #747474;

  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: black;
  }

  .item .v-col {
    padding: 0 12px;
  }
}

.editCursor {
  cursor: url("@/assets/svg/pencil.svg"), auto;
}
</style>
