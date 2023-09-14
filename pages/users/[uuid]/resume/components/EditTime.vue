<template>
  <v-dialog v-model="dialog" persistent width="350">
    <template v-slot:activator="{ props }">
      <v-btn v-if="editMode" variant="text" v-bind="props" class="pa-0">
        {{ date ? date : "now" }}
      </v-btn>
      <span v-else>{{ formattedDate(date) }}</span>
    </template>
    <v-card>
      <v-card-title class="mt-3"> Edit Date</v-card-title>
      <v-divider class="mx-4" />
      <v-card-text>
        <v-form ref="aboutUsForm">
          <v-row class="ma-0 nb">
            <v-col md="12" class="d-flex">
              <v-select
                v-model="positionYear"
                :items="yearsList()"
                label="Year"
                color="blue"
                :disabled="inPosition"
                hide-details
              ></v-select>
              <v-select
                v-model="positionMonth"
                :items="monthsItems"
                item-title="title"
                item-value="key"
                label="Month"
                color="blue"
                :disabled="inPosition"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-checkbox
                label="Still in position"
                v-model="inPosition"
                color="blue"
                hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-row class="ma-0 mb-4" justify="end" align="center">
          <v-btn color="gray" variant="text" @click="resetForm"> close</v-btn>
          <v-btn color="blue" variant="text" @click="onConfirm">
            confirm
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { store } from "~/store";
const emit = defineEmits(["valueChange"]);

const dialog = ref(false);
const props = defineProps({
  date: String || undefined,
  editMode: Boolean,
  parent: String,
  keySelector: String,
  index: Number,
  mode: String,
});
const user = computed(() => store.state.user?.user);

const positionMonth = ref();
const positionYear = ref();
const monthsItems = [
  { key: "01", title: "January" },
  { key: "02", title: "February" },
  { key: "03", title: "March" },
  { key: "04", title: "April" },
  { key: "05", title: "May" },
  { key: "06", title: "June" },
  { key: "07", title: "July" },
  { key: "08", title: "August" },
  { key: "09", title: "September" },
  { key: "10", title: "October" },
  { key: "11", title: "November" },
  { key: "12", title: "December" },
];
const inPosition = ref(false);
const yearsList = () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 15;
  const endYear = currentYear;
  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return years;
};
const formattedDate = (date: any) => {
  if (date) {
    const [year, month] = date.split("-");
    positionYear.value = year;
    positionMonth.value = month;
    const formattedMonth = new Date(year, month - 1).toLocaleString("default", {
      month: "short",
    });

    return `${formattedMonth} ${year} `;
  } else {
    inPosition.value = true;
    return "Now";
  }
};
const resetForm = () => {
  positionMonth.value = null;
  positionYear.value = null;
  dialog.value = false;
};
const onConfirm = () => {
  if (inPosition.value) {
    if (props.parent == "education") {
      if (props.keySelector == "finished_at") {
        if (
          user.value &&
          user.value.resume &&
          user.value.resume.education
        )
          //@ts-ignore
          user.value.resume.education[props.index].finished_at = undefined;
      } else {
        if (
          user.value &&
          user.value.resume &&
          user.value.resume.education
        )
          //@ts-ignore
          user.value.resume.education[props.index].started_at = undefined;
      }
    } else {
      if (props.keySelector == "finished_at") {
        if (
          user.value &&
          user.value.resume &&
          user.value.resume.experiences
        )
          //@ts-ignore
          user.value.resume.experiences[props.index].finished_at =
            undefined;
      } else {
        if (
          user.value &&
          user.value.resume &&
          user.value.resume.experiences
        )
          //@ts-ignore
          user.value.resume.experiences[props.index].started_at =
            undefined;
      }
    }
  } else {
    if (props.parent == "education") {
      if (props.keySelector == "finished_at") {
        if (
          user.value &&
          user.value.resume &&
          user.value.resume.education
        )
          //@ts-ignore
          user.value.resume.education[props.index].finished_at =
            positionYear.value.toString() + "-" + positionMonth.value;
      } else {
        if (
          user.value &&
          user.value.resume &&
          user.value.resume.education
        )
          //@ts-ignore
          user.value.resume.education[props.index].started_at =
            positionYear.value.toString() +
            "-" +
            positionMonth.value.toString();
      }
    } else {
      if (props.keySelector == "finished_at") {
        if (
          user.value &&
          user.value.resume &&
          user.value.resume.experiences
        )
          //@ts-ignore
          user.value.resume.experiences[props.index].finished_at =
            positionYear.value.toString() +
            "-" +
            positionMonth.value.toString();
      } else {
        if (
          user.value &&
          user.value.resume &&
          user.value.resume.experiences
        )
          //@ts-ignore
          user.value.resume.experiences[props.index].started_at =
            positionYear.value.toString() +
            "-" +
            positionMonth.value.toString();
      }
    }
  }
  dialog.value = false;
  emit("valueChange");
};
</script>
